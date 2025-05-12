# Animated Text GIF Generator

A fullstack web application for creating beautiful animated text GIFs with various animation styles. This tool allows you to quickly generate, preview, download, and share animated text GIFs for use in presentations, social media, and more.

## Features

- **Multiple Animation Styles:** Choose from 5 different animation effects:
  - Fire: Text with a dynamic gradient fire effect
  - Wave: Text that moves in a smooth wave pattern
  - Fade: Text that gently fades in and out
  - Color Spin: Text that cycles through vibrant colors
  - Bounce: Text that bounces up and down

- **Instant Preview:** See your generated GIF immediately in the app
- **Download & Share:** Easily download your creations or copy a shareable link
- **Recent Creations:** Access your recently created GIFs for quick reference
- **Responsive Design:** Works on desktop and mobile devices
- **Dark Mode Support:** Toggle between light and dark themes

## Technology Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- shadcn/ui for UI components
- Wouter for routing
- TanStack Query for data fetching
- Lucide React for icons

### Backend
- Node.js with Express
- Canvas for GIF generation
- GIFEncoder for encoding animated GIFs

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Enter the text you want to animate (up to 20 characters)
2. Select your preferred animation style by clicking on the style previews
3. Click the "Generate GIF" button
4. Once generated, you can:
   - View the animated GIF preview
   - Download the GIF to your device
   - Copy a shareable link to your clipboard
5. Your generated GIFs will appear in the "Recently Created" section for easy access

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - UI components
  - `/src/contexts` - React context providers
  - `/src/pages` - Application pages
  - `/src/lib` - Utility functions and types
- `/server` - Backend Express application
  - `/services` - Business logic (GIF generation)
  - `routes.ts` - API endpoint definitions
- `/shared` - Code shared between frontend and backend
  - `schema.ts` - Data models and validation schemas
- `/uploads` - Directory for storing generated GIFs

## License

MIT

## Acknowledgments

- GIF generation powered by Canvas and GIFEncoder
- UI components by shadcn/ui