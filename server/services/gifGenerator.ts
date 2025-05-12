import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";
import GIFEncoder from "gifencoder";
import { AnimationStyle } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";

// Canvas configuration
const WIDTH = 400;
const HEIGHT = 200;
const FONT_SIZE = 48;
const FONT_FAMILY = "Arial";
const BACKGROUND_COLOR = "#FFFFFF";
const FRAMES = 60;
const DELAY = 50; // ms

// Function to generate GIF with the specified animation style
export async function generateGif(text: string, animationStyle: AnimationStyle): Promise<string> {
  // Create canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  
  // Create GIF encoder
  const encoder = new GIFEncoder(WIDTH, HEIGHT);
  
  // Create a unique filename
  const filename = `${uuidv4()}.gif`;
  const outputPath = path.join(process.cwd(), "uploads", filename);
  
  // Create a write stream for the GIF
  const stream = fs.createWriteStream(outputPath);
  
  // Pipe the GIF data to the file
  encoder.createReadStream().pipe(stream);
  
  // Start encoding
  encoder.start();
  encoder.setRepeat(0); // 0 = loop forever
  encoder.setDelay(DELAY);
  encoder.setQuality(10); // 10 = best quality
  
  // Setup text rendering
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
  
  // Generate frames based on animation style
  for (let frame = 0; frame < FRAMES; frame++) {
    // Clear canvas
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Apply animation based on selected style
    switch (animationStyle) {
      case "fire":
        renderFireAnimation(ctx, text, frame);
        break;
      case "wave":
        renderWaveAnimation(ctx, text, frame);
        break;
      case "fade":
        renderFadeAnimation(ctx, text, frame);
        break;
      case "colorSpin":
        renderColorSpinAnimation(ctx, text, frame);
        break;
      case "bounce":
        renderBounceAnimation(ctx, text, frame);
        break;
      default:
        renderDefaultAnimation(ctx, text, frame);
    }
    
    // Add frame to GIF
    encoder.addFrame(ctx);
  }
  
  // Finish encoding
  encoder.finish();
  
  // Return the file path
  return outputPath;
}

// Animation renderers
function renderFireAnimation(ctx: any, text: string, frame: number) {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  
  // Split text into characters
  const chars = text.split("");
  
  // Calculate total width to center the whole text
  const totalWidth = ctx.measureText(text).width;
  let currentX = centerX - totalWidth / 2;
  
  // For each character
  chars.forEach((char, i) => {
    const charWidth = ctx.measureText(char).width;
    
    // Fire colors
    const r = 255;
    const g = Math.max(0, 255 - (frame + i * 5) % 256);
    const b = 0;
    
    // Flicker effect
    const flicker = Math.sin((frame + i) * 0.2) * 0.2 + 0.8;
    
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${flicker})`;
    
    // Draw with slight vertical offset for flame effect
    const offset = Math.sin((frame + i * 10) * 0.1) * 5;
    ctx.fillText(char, currentX + charWidth / 2, centerY + offset);
    
    currentX += charWidth;
  });
}

function renderWaveAnimation(ctx: any, text: string, frame: number) {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  
  // Split text into characters
  const chars = text.split("");
  
  // Calculate total width to center the whole text
  const totalWidth = ctx.measureText(text).width;
  let currentX = centerX - totalWidth / 2;
  
  // For each character
  chars.forEach((char, i) => {
    const charWidth = ctx.measureText(char).width;
    
    // Wave colors (blue tones)
    const r = 0;
    const g = 120 + Math.sin(frame * 0.05 + i * 0.5) * 40;
    const b = 255;
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    
    // Draw with wave effect
    const waveHeight = 10;
    const offset = Math.sin((frame * 0.1) + (i * 0.5)) * waveHeight;
    ctx.fillText(char, currentX + charWidth / 2, centerY + offset);
    
    currentX += charWidth;
  });
}

function renderFadeAnimation(ctx: any, text: string, frame: number) {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  
  // Calculate opacity based on frame
  const cycleLength = FRAMES / 2;
  const cycle = frame % FRAMES;
  const opacity = cycle < cycleLength 
    ? cycle / cycleLength // Fade in
    : 2 - (cycle / cycleLength); // Fade out
  
  // Set fill style with opacity
  ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
  
  // Draw text
  ctx.fillText(text, centerX, centerY);
}

function renderColorSpinAnimation(ctx: any, text: string, frame: number) {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  
  // Calculate hue for rainbow effect
  const hue = (frame * 6) % 360;
  
  // Set fill style with HSL color
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  
  // Draw text
  ctx.fillText(text, centerX, centerY);
}

function renderBounceAnimation(ctx: any, text: string, frame: number) {
  const centerX = WIDTH / 2;
  
  // Calculate bounce position
  const bounceHeight = 40;
  const cycle = frame % FRAMES;
  const normalizedCycle = cycle / FRAMES;
  
  // Simulate bouncing with easing
  const bounceY = HEIGHT / 2 + bounceHeight * Math.abs(Math.sin(normalizedCycle * Math.PI * 2));
  
  // Set fill style
  ctx.fillStyle = "#000000";
  
  // Draw text
  ctx.fillText(text, centerX, bounceY);
}

function renderDefaultAnimation(ctx: any, text: string, frame: number) {
  // Simple rotation animation as fallback
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((frame * 2 * Math.PI) / FRAMES);
  ctx.fillStyle = "#000000";
  ctx.fillText(text, 0, 0);
  ctx.restore();
}
