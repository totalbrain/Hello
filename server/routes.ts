import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { generateGif } from "./services/gifGenerator";
import { AnimationStyle, gifGenerationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // API endpoint to generate GIF
  app.post("/api/generate-gif", async (req: Request, res: Response) => {
    try {
      // Validate request using zod schema
      const validationResult = gifGenerationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: validationResult.error.errors[0]?.message || "Invalid request" 
        });
      }
      
      const { text, animationStyle } = validationResult.data;

      // Generate GIF
      const gifPath = await generateGif(text, animationStyle);
      
      // Convert file path to URL
      const filename = path.basename(gifPath);
      const gifUrl = `/uploads/${filename}`;

      res.json({
        gifUrl,
        animationStyle,
        text
      });
    } catch (error) {
      console.error("Error generating GIF:", error);
      res.status(500).json({ message: "Failed to generate GIF" });
    }
  });

  // Serve uploaded files
  app.use("/uploads", (req, res, next) => {
    // Set caching headers
    res.setHeader("Cache-Control", "public, max-age=3600");
    next();
  }, (req, res, next) => {
    const filePath = path.join(process.cwd(), "uploads", req.path);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    next();
  });

  const httpServer = createServer(app);

  return httpServer;
}
