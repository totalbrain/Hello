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

// Define animation styles enum
export enum AnimationStyle {
  Fire = "fire",
  Wave = "wave",
  Fade = "fade",
  ColorSpin = "colorSpin",
  Bounce = "bounce"
}

// Schema for GIF generation request
export const gifGenerationSchema = z.object({
  text: z.string().max(20, "Text must be at most 20 characters").min(1, "Text is required"),
  animationStyle: z.nativeEnum(AnimationStyle, {
    errorMap: (issue, ctx) => ({ message: "Invalid animation style" }),
  }),
});

export type GifGenerationRequest = z.infer<typeof gifGenerationSchema>;

// GIF response type
export type GifResponse = {
  gifUrl: string;
  animationStyle: AnimationStyle;
  text: string;
};
