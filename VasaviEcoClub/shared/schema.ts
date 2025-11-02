import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin User Schema
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true });
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

// Events Schema
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  externalRegistrationUrl: text("external_registration_url"),
  status: text("status").notNull().default("upcoming"), // upcoming, ongoing, past
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Event Registrations Schema
export const eventRegistrations = pgTable("event_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  name: text("name").notNull(),
  rollNumber: text("roll_number").notNull(),
  branch: text("branch").notNull(),
  email: text("email").notNull(),
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations).omit({ id: true, registeredAt: true });
export type InsertEventRegistration = z.infer<typeof insertEventRegistrationSchema>;
export type EventRegistration = typeof eventRegistrations.$inferSelect;

// Members Schema
export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  year: text("year").notNull(), // e.g., "2025-2026"
  branch: text("branch").notNull(),
  email: text("email").notNull(),
  imageUrl: text("image_url"),
  isCurrent: boolean("is_current").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMemberSchema = createInsertSchema(members).omit({ id: true, createdAt: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;

// Projects Schema
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  year: text("year").notNull(), // e.g., "2025-2026"
  impact: text("impact").notNull(),
  status: text("status").notNull().default("ongoing"), // ongoing, completed
  imageUrl: text("image_url"),
  teamMembers: text("team_members").array(), // Array of student names
  isCurrent: boolean("is_current").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Gallery Schema
export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // Events, Projects, Members
  date: text("date").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertGallerySchema = createInsertSchema(gallery).omit({ id: true, uploadedAt: true });
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;

// Metrics Schema
export const metrics = pgTable("metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  icon: text("icon").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMetricSchema = createInsertSchema(metrics).omit({ id: true, updatedAt: true });
export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type Metric = typeof metrics.$inferSelect;
