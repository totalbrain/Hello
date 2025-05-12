import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Animation types for GIF generator
export type AnimationStyle = "fire" | "wave" | "fade" | "colorSpin" | "bounce";

// GIF generator schemas
export const generateGifSchema = z.object({
  text: z.string().min(1).max(20),
  animationStyle: z.enum(["fire", "wave", "fade", "colorSpin", "bounce"]),
});

export type GenerateGifRequest = z.infer<typeof generateGifSchema>;

export const gifResponseSchema = z.object({
  gifUrl: z.string(),
  animationStyle: z.string(),
});

export type GifResponse = z.infer<typeof gifResponseSchema>;
