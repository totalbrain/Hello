import { createContext, useContext, useState, ReactNode } from "react";
import { AnimationStyle, GifResponse } from "@shared/schema";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface GifContextType {
  text: string;
  setText: (text: string) => void;
  animationStyle: AnimationStyle;
  setAnimationStyle: (style: AnimationStyle) => void;
  isLoading: boolean;
  generatedGifUrl: string | null;
  error: string | null;
  recentGifs: GifResponse[];
  generateGif: () => Promise<void>;
  downloadGif: () => void;
  copyShareLink: () => void;
  dismissError: () => void;
}

const GifContext = createContext<GifContextType | undefined>(undefined);

export function useGif() {
  const context = useContext(GifContext);
  if (context === undefined) {
    throw new Error("useGif must be used within a GifProvider");
  }
  return context;
}

interface GifProviderProps {
  children: ReactNode;
}

export function GifProvider({ children }: GifProviderProps) {
  const [text, setText] = useState("");
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>(AnimationStyle.Fire);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedGifUrl, setGeneratedGifUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentGifs, setRecentGifs] = useState<GifResponse[]>([]);

  const generateGif = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiRequest("POST", "/api/generate-gif", {
        text,
        animationStyle,
      });
      
      const data = await response.json();
      
      // Create a GIF response object
      const gifResponse: GifResponse = {
        gifUrl: data.gifUrl,
        animationStyle: data.animationStyle,
        text: text
      };
      
      setGeneratedGifUrl(data.gifUrl);
      
      // Add to recent GIFs (keeping only the most recent 8)
      setRecentGifs(prev => [gifResponse, ...prev].slice(0, 8));
      
      toast({
        title: "Success",
        description: "GIF successfully generated!",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate GIF. Please try again.");
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to generate GIF",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadGif = () => {
    if (!generatedGifUrl) return;
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = generatedGifUrl;
    a.download = `animated-text-${text}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Success",
      description: "GIF downloaded successfully!",
    });
  };

  const copyShareLink = () => {
    if (!generatedGifUrl) return;
    
    // Get the full URL including the domain
    const shareUrl = window.location.origin + generatedGifUrl;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Success",
        description: "GIF URL copied to clipboard!",
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    });
  };

  const dismissError = () => {
    setError(null);
  };

  const value = {
    text,
    setText,
    animationStyle,
    setAnimationStyle,
    isLoading,
    generatedGifUrl,
    error,
    recentGifs,
    generateGif,
    downloadGif,
    copyShareLink,
    dismissError,
  };

  return <GifContext.Provider value={value}>{children}</GifContext.Provider>;
}
