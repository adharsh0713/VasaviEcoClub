import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { verifyToken, type AuthRequest } from "./middleware/authMiddleware";
import {
  insertEventSchema,
  insertEventRegistrationSchema,
  insertMemberSchema,
  insertProjectSchema,
  insertGallerySchema,
  insertMetricSchema,
} from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "eco-club-secret-key-change-in-production";

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static("uploads"));

  // ==================== AUTH ROUTES ====================

  /**
   * POST /api/auth/login
   * Login endpoint for admin authentication
   */
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }

      const user = await storage.getAdminUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        },
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  /**
   * POST /api/auth/verify
   * Verify if token is valid
   */
  app.post("/api/auth/verify", verifyToken, async (req: AuthRequest, res) => {
    return res.json({
      success: true,
      data: { user: req.user },
      message: "Token is valid",
    });
  });

  // ==================== PUBLIC ROUTES ====================

  /**
   * GET /api/events
   * Get all events
   */
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      return res.json({
        success: true,
        data: events,
        message: "Events retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch events",
      });
    }
  });

  /**
   * POST /api/events/:id/register
   * Register for an event
   */
  app.post("/api/events/:id/register", async (req, res) => {
    try {
      const { id } = req.params;
      const registrationData = insertEventRegistrationSchema.parse({
        ...req.body,
        eventId: id,
      });

      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      if (event.status === "past") {
        return res.status(400).json({
          success: false,
          message: "Registration is closed for past events",
        });
      }

      const registration = await storage.createEventRegistration(registrationData);

      // TODO: Send email notification here
      // await sendRegistrationEmail(registration);

      return res.json({
        success: true,
        data: registration,
        message: "Registration successful. An email has been sent regarding your registration.",
      });
    } catch (error) {
      console.error("Error registering for event:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to register for event",
      });
    }
  });

  /**
   * GET /api/members
   * Get current members only
   */
  app.get("/api/members", async (req, res) => {
    try {
      const members = await storage.getCurrentMembers();
      return res.json({
        success: true,
        data: members,
        message: "Members retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching members:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch members",
      });
    }
  });

  /**
   * GET /api/projects
   * Get current projects
   */
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getCurrentProjects();
      return res.json({
        success: true,
        data: projects,
        message: "Projects retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
      });
    }
  });

  /**
   * GET /api/projects/:id
   * Get project details with team members
   */
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.json({
        success: true,
        data: project,
        message: "Project retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch project",
      });
    }
  });

  /**
   * GET /api/gallery
   * Get all gallery images
   */
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      return res.json({
        success: true,
        data: images,
        message: "Gallery images retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching gallery:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch gallery images",
      });
    }
  });

  /**
   * GET /api/metrics
   * Get all impact metrics
   */
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getAllMetrics();
      return res.json({
        success: true,
        data: metrics,
        message: "Metrics retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch metrics",
      });
    }
  });

  // ==================== ADMIN ROUTES (Protected) ====================

  /**
   * POST /api/admin/events
   * Create a new event
   */
  app.post("/api/admin/events", verifyToken, async (req: AuthRequest, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);

      return res.json({
        success: true,
        data: event,
        message: "Event created successfully",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create event",
      });
    }
  });

  /**
   * PUT /api/admin/events/:id
   * Update an event
   */
  app.put("/api/admin/events/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const event = await storage.updateEvent(id, req.body);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      return res.json({
        success: true,
        data: event,
        message: "Event updated successfully",
      });
    } catch (error) {
      console.error("Error updating event:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update event",
      });
    }
  });

  /**
   * DELETE /api/admin/events/:id
   * Delete an event
   */
  app.delete("/api/admin/events/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteEvent(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      return res.json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete event",
      });
    }
  });

  /**
   * GET /api/admin/events/:id/registrations
   * Get all registrations for an event
   */
  app.get("/api/admin/events/:id/registrations", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const registrations = await storage.getEventRegistrations(id);

      return res.json({
        success: true,
        data: registrations,
        message: "Registrations retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch registrations",
      });
    }
  });

  /**
   * POST /api/admin/members
   * Create a new member
   */
  app.post("/api/admin/members", verifyToken, async (req: AuthRequest, res) => {
    try {
      const memberData = insertMemberSchema.parse(req.body);
      const member = await storage.createMember(memberData);

      return res.json({
        success: true,
        data: member,
        message: "Member added successfully",
      });
    } catch (error) {
      console.error("Error creating member:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create member",
      });
    }
  });

  /**
   * PUT /api/admin/members/:id
   * Update a member
   */
  app.put("/api/admin/members/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const member = await storage.updateMember(id, req.body);

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      return res.json({
        success: true,
        data: member,
        message: "Member updated successfully",
      });
    } catch (error) {
      console.error("Error updating member:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update member",
      });
    }
  });

  /**
   * DELETE /api/admin/members/:id
   * Delete a member
   */
  app.delete("/api/admin/members/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMember(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      return res.json({
        success: true,
        message: "Member deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting member:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete member",
      });
    }
  });

  /**
   * POST /api/admin/projects
   * Create a new project
   */
  app.post("/api/admin/projects", verifyToken, async (req: AuthRequest, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);

      return res.json({
        success: true,
        data: project,
        message: "Project created successfully",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create project",
      });
    }
  });

  /**
   * PUT /api/admin/projects/:id
   * Update a project
   */
  app.put("/api/admin/projects/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const project = await storage.updateProject(id, req.body);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.json({
        success: true,
        data: project,
        message: "Project updated successfully",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update project",
      });
    }
  });

  /**
   * DELETE /api/admin/projects/:id
   * Delete a project
   */
  app.delete("/api/admin/projects/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProject(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete project",
      });
    }
  });

  /**
   * POST /api/admin/gallery
   * Upload a gallery image
   */
  app.post("/api/admin/gallery", verifyToken, upload.single("image"), async (req: AuthRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      const imageData = insertGallerySchema.parse({
        ...req.body,
        imageUrl: `/uploads/${req.file.filename}`,
      });

      const image = await storage.createGalleryImage(imageData);

      return res.json({
        success: true,
        data: image,
        message: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }
  });

  /**
   * DELETE /api/admin/gallery/:id
   * Delete a gallery image
   */
  app.delete("/api/admin/gallery/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteGalleryImage(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }

      return res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete image",
      });
    }
  });

  /**
   * POST /api/admin/metrics
   * Create a metric
   */
  app.post("/api/admin/metrics", verifyToken, async (req: AuthRequest, res) => {
    try {
      const metricData = insertMetricSchema.parse(req.body);
      const metric = await storage.createMetric(metricData);

      return res.json({
        success: true,
        data: metric,
        message: "Metric created successfully",
      });
    } catch (error) {
      console.error("Error creating metric:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create metric",
      });
    }
  });

  /**
   * PUT /api/admin/metrics/:id
   * Update a metric
   */
  app.put("/api/admin/metrics/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const metric = await storage.updateMetric(id, req.body);

      if (!metric) {
        return res.status(404).json({
          success: false,
          message: "Metric not found",
        });
      }

      return res.json({
        success: true,
        data: metric,
        message: "Metric updated successfully",
      });
    } catch (error) {
      console.error("Error updating metric:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update metric",
      });
    }
  });

  /**
   * DELETE /api/admin/metrics/:id
   * Delete a metric
   */
  app.delete("/api/admin/metrics/:id", verifyToken, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMetric(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Metric not found",
        });
      }

      return res.json({
        success: true,
        message: "Metric deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting metric:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete metric",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
