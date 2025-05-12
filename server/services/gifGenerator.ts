import { createCanvas } from "canvas";
import GIFEncoder from "gifencoder";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { AnimationStyle } from "@shared/schema";

// Function to generate a GIF with animated text
export async function generateGif(text: string, animationStyle: AnimationStyle): Promise<string> {
  // Create a unique filename for the GIF
  const filename = `${animationStyle}-${randomUUID()}.gif`;
  const outputPath = path.join(process.cwd(), "uploads", filename);
  
  // Canvas settings
  const width = 400;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  
  // Initialize GIF encoder
  const encoder = new GIFEncoder(width, height);
  const stream = fs.createWriteStream(outputPath);
  
  // Start the encoder
  encoder.createReadStream().pipe(stream);
  encoder.start();
  encoder.setRepeat(0);  // 0 for repeat, -1 for no-repeat
  encoder.setDelay(100); // Frame delay in ms
  encoder.setQuality(10); // Image quality (lower = better compression)
  
  // Animation settings based on style
  const frameCount = 20;
  
  // Base text settings
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const fontSize = Math.min(60, 400 / (text.length * 0.7)); // Adaptive font size
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  
  // Animation styles
  switch (animationStyle) {
    case AnimationStyle.Fire:
      generateFireAnimation(ctx, text, width, height, frameCount, encoder);
      break;
    case AnimationStyle.Wave:
      generateWaveAnimation(ctx, text, width, height, frameCount, encoder);
      break;
    case AnimationStyle.Fade:
      generateFadeAnimation(ctx, text, width, height, frameCount, encoder);
      break;
    case AnimationStyle.ColorSpin:
      generateColorSpinAnimation(ctx, text, width, height, frameCount, encoder);
      break;
    case AnimationStyle.Bounce:
      generateBounceAnimation(ctx, text, width, height, frameCount, encoder);
      break;
    default:
      generateDefaultAnimation(ctx, text, width, height, frameCount, encoder);
  }
  
  // Finish encoding
  encoder.finish();
  
  // Return the path to the generated GIF
  return outputPath;
}

// Fire animation - gradient color that moves
function generateFireAnimation(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, frameCount: number, encoder: any) {
  const colors = [
    "#ff8a00", "#ff7000", "#ff5500", "#ff4000", "#ff0000",
    "#ff2000", "#ff5500", "#ff7000", "#ff8a00"
  ];
  
  for (let frame = 0; frame < frameCount; frame++) {
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Create gradient animation
    const colorIndex = frame % colors.length;
    const startColor = colors[colorIndex];
    const endColor = colors[(colorIndex + 3) % colors.length];
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    
    ctx.fillStyle = gradient;
    ctx.fillText(text, width / 2, height / 2);
    
    encoder.addFrame(ctx);
  }
}

// Wave animation - text moves up and down
function generateWaveAnimation(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, frameCount: number, encoder: any) {
  for (let frame = 0; frame < frameCount; frame++) {
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Calculate vertical position based on sine wave
    const amplitude = 20;
    const frequency = 2 * Math.PI / frameCount;
    const y = height / 2 + amplitude * Math.sin(frame * frequency);
    
    ctx.fillStyle = "#6366F1"; // Primary color
    ctx.fillText(text, width / 2, y);
    
    encoder.addFrame(ctx);
  }
}

// Fade animation - text fades in and out
function generateFadeAnimation(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, frameCount: number, encoder: any) {
  for (let frame = 0; frame < frameCount; frame++) {
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Calculate opacity based on sine wave (0.3 to 1)
    const frequency = 2 * Math.PI / frameCount;
    const opacity = 0.3 + 0.7 * Math.abs(Math.sin(frame * frequency));
    
    ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`; // Primary color with varying opacity
    ctx.fillText(text, width / 2, height / 2);
    
    encoder.addFrame(ctx);
  }
}

// Color Spin animation - color changes in a cycle
function generateColorSpinAnimation(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, frameCount: number, encoder: any) {
  const colors = [
    "#6366F1", // Primary
    "#8B5CF6", // Accent
    "#EC4899", // Secondary
    "#10B981", // Success
    "#6366F1"  // Back to primary
  ];
  
  for (let frame = 0; frame < frameCount; frame++) {
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Calculate color interpolation
    const colorIndex = Math.floor(frame / (frameCount / (colors.length - 1)));
    const ratio = (frame % (frameCount / (colors.length - 1))) / (frameCount / (colors.length - 1));
    
    const startColor = hexToRgb(colors[colorIndex]);
    const endColor = hexToRgb(colors[colorIndex + 1]);
    
    if (startColor && endColor) {
      const r = Math.floor(startColor.r + ratio * (endColor.r - startColor.r));
      const g = Math.floor(startColor.g + ratio * (endColor.g - startColor.g));
      const b = Math.floor(startColor.b + ratio * (endColor.b - startColor.b));
      
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillText(text, width / 2, height / 2);
    }
    
    encoder.addFrame(ctx);
  }
}

// Bounce animation - text moves up and down
function generateBounceAnimation(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, frameCount: number, encoder: any) {
  for (let frame = 0; frame < frameCount; frame++) {
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Calculate vertical position using a quadratic function for bounce effect
    const normalizedFrame = frame % frameCount / frameCount;
    let y;
    
    if (normalizedFrame < 0.5) {
      // Going up (0 to 0.5)
      const t = normalizedFrame * 2; // 0 to 1
      y = height / 2 - 30 * Math.sin(t * Math.PI);
    } else {
      // Coming down (0.5 to 1)
      const t = (normalizedFrame - 0.5) * 2; // 0 to 1
      y = height / 2 - 30 * Math.sin((1 - t) * Math.PI);
    }
    
    ctx.fillStyle = "#6366F1"; // Primary color
    ctx.fillText(text, width / 2, y);
    
    encoder.addFrame(ctx);
  }
}

// Default animation (simple color change)
function generateDefaultAnimation(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, frameCount: number, encoder: any) {
  for (let frame = 0; frame < frameCount; frame++) {
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Cycle through hue
    const hue = (frame * 360 / frameCount) % 360;
    ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
    ctx.fillText(text, width / 2, height / 2);
    
    encoder.addFrame(ctx);
  }
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
