import { randomUUID } from "crypto";
import type {
  AdminUser, InsertAdminUser,
  Event, InsertEvent,
  EventRegistration, InsertEventRegistration,
  Member, InsertMember,
  Project, InsertProject,
  Gallery, InsertGallery,
  Metric, InsertMetric
} from "@shared/schema";

// Storage interface for all CRUD operations
export interface IStorage {
  // Admin Users
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;

  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  // Event Registrations
  getEventRegistrations(eventId: string): Promise<EventRegistration[]>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;

  // Members
  getAllMembers(): Promise<Member[]>;
  getCurrentMembers(): Promise<Member[]>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined>;
  deleteMember(id: string): Promise<boolean>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getCurrentProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Gallery
  getAllGalleryImages(): Promise<Gallery[]>;
  createGalleryImage(image: InsertGallery): Promise<Gallery>;
  deleteGalleryImage(id: string): Promise<boolean>;

  // Metrics
  getAllMetrics(): Promise<Metric[]>;
  createMetric(metric: InsertMetric): Promise<Metric>;
  updateMetric(id: string, metric: Partial<InsertMetric>): Promise<Metric | undefined>;
  deleteMetric(id: string): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private adminUsers: Map<string, AdminUser> = new Map();
  private events: Map<string, Event> = new Map();
  private eventRegistrations: Map<string, EventRegistration> = new Map();
  private members: Map<string, Member> = new Map();
  private projects: Map<string, Project> = new Map();
  private galleryImages: Map<string, Gallery> = new Map();
  private metricsData: Map<string, Metric> = new Map();

  constructor() {
    // Initialize with default admin user (password: admin123)
    const adminId = randomUUID();
    this.adminUsers.set(adminId, {
      id: adminId,
      username: "admin",
      password: "$2a$10$8K1p/a0dL1LKlOmj6fu0.eBulDOg6/K7GJ7xlJ5i4pZxZlV2j6e6e", // bcrypt hash of "admin123"
      email: "admin@ecoclub.edu",
      createdAt: new Date(),
    });

    // Initialize with ongoing energy challenge event
    const eventId = randomUUID();
    this.events.set(eventId, {
      id: eventId,
      title: "Ongoing Energy Challenge",
      date: "Ongoing",
      location: "Nationwide",
      description: "Join our ongoing energy conservation challenge! Participate in activities to reduce energy consumption and make a positive environmental impact.",
      category: "Challenge",
      imageUrl: null,
      externalRegistrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeZ0nN0Arxg4vSHN1L9OO3Co7Iw9TFwVhlY611N1tPDZydjTA/viewform?usp=publish-editor",
      status: "ongoing",
      createdAt: new Date(),
    });
  }

  // Admin Users
  async getAdminUser(id: string) {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string) {
    return Array.from(this.adminUsers.values()).find(u => u.username === username);
  }

  async createAdminUser(user: InsertAdminUser) {
    const id = randomUUID();
    const newUser: AdminUser = { ...user, id, createdAt: new Date() };
    this.adminUsers.set(id, newUser);
    return newUser;
  }

  // Events
  async getAllEvents() {
    return Array.from(this.events.values());
  }

  async getEvent(id: string) {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent) {
    const id = randomUUID();
    const newEvent: Event = { 
      ...event, 
      id, 
      createdAt: new Date(),
      imageUrl: event.imageUrl ?? null,
      externalRegistrationUrl: event.externalRegistrationUrl ?? null,
      status: event.status ?? "upcoming"
    };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>) {
    const existing = this.events.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...event };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string) {
    return this.events.delete(id);
  }

  // Event Registrations
  async getEventRegistrations(eventId: string) {
    return Array.from(this.eventRegistrations.values()).filter(r => r.eventId === eventId);
  }

  async createEventRegistration(registration: InsertEventRegistration) {
    const id = randomUUID();
    const newReg: EventRegistration = { ...registration, id, registeredAt: new Date() };
    this.eventRegistrations.set(id, newReg);
    return newReg;
  }

  // Members
  async getAllMembers() {
    return Array.from(this.members.values());
  }

  async getCurrentMembers() {
    return Array.from(this.members.values()).filter(m => m.isCurrent);
  }

  async createMember(member: InsertMember) {
    const id = randomUUID();
    const newMember: Member = { 
      ...member, 
      id, 
      createdAt: new Date(),
      imageUrl: member.imageUrl ?? null,
      isCurrent: member.isCurrent ?? true
    };
    this.members.set(id, newMember);
    return newMember;
  }

  async updateMember(id: string, member: Partial<InsertMember>) {
    const existing = this.members.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...member };
    this.members.set(id, updated);
    return updated;
  }

  async deleteMember(id: string) {
    return this.members.delete(id);
  }

  // Projects
  async getAllProjects() {
    return Array.from(this.projects.values());
  }

  async getCurrentProjects() {
    return Array.from(this.projects.values()).filter(p => p.isCurrent);
  }

  async getProject(id: string) {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject) {
    const id = randomUUID();
    const newProject: Project = { 
      ...project, 
      id, 
      createdAt: new Date(),
      imageUrl: project.imageUrl ?? null,
      status: project.status ?? "ongoing",
      isCurrent: project.isCurrent ?? true,
      teamMembers: project.teamMembers ?? null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>) {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...project };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string) {
    return this.projects.delete(id);
  }

  // Gallery
  async getAllGalleryImages() {
    return Array.from(this.galleryImages.values());
  }

  async createGalleryImage(image: InsertGallery) {
    const id = randomUUID();
    const newImage: Gallery = { ...image, id, uploadedAt: new Date() };
    this.galleryImages.set(id, newImage);
    return newImage;
  }

  async deleteGalleryImage(id: string) {
    return this.galleryImages.delete(id);
  }

  // Metrics
  async getAllMetrics() {
    return Array.from(this.metricsData.values());
  }

  async createMetric(metric: InsertMetric) {
    const id = randomUUID();
    const newMetric: Metric = { 
      ...metric, 
      id, 
      updatedAt: new Date(),
      description: metric.description ?? null
    };
    this.metricsData.set(id, newMetric);
    return newMetric;
  }

  async updateMetric(id: string, metric: Partial<InsertMetric>) {
    const existing = this.metricsData.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...metric, updatedAt: new Date() };
    this.metricsData.set(id, updated);
    return updated;
  }

  async deleteMetric(id: string) {
    return this.metricsData.delete(id);
  }
}

export const storage = new MemStorage();
