import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { generateGif } from "./services/gifGenerator";
import { AnimationStyle } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // API endpoint to generate GIF
  app.post("/api/generate-gif", async (req: Request, res: Response) => {
    try {
      const { text, animationStyle } = req.body;

      // Validate input
      if (!text || typeof text !== "string") {
        return res.status(400).json({ message: "Text is required" });
      }

      if (text.length > 20) {
        return res.status(400).json({ message: "Text must be at most 20 characters" });
      }

      if (!animationStyle || !["fire", "wave", "fade", "colorSpin", "bounce"].includes(animationStyle)) {
        return res.status(400).json({ message: "Invalid animation style" });
      }

      // Generate GIF
      const gifPath = await generateGif(text, animationStyle as AnimationStyle);
      
      // Convert file path to URL
      const filename = path.basename(gifPath);
      const gifUrl = `/uploads/${filename}`;

      res.json({
        gifUrl,
        animationStyle,
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
