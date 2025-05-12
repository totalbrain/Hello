import { useGif } from "@/contexts/GifContext";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Share, 
  Clapperboard, 
  AlertCircle, 
  Loader2
} from "lucide-react";

export default function GifPreview() {
  const { 
    isLoading, 
    generatedGifUrl, 
    error, 
    downloadGif, 
    copyShareLink, 
    dismissError 
  } = useGif();

  // Initial empty state
  if (!generatedGifUrl && !isLoading && !error) {
    return (
      <div className="preview-container rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <Clapperboard className="text-gray-400 h-16 w-16 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">Your generated GIF will appear here</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="preview-container rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center">
        <div className="py-10 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Generating your GIF...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="preview-container rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center">
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="text-destructive h-16 w-16 mb-3" />
          <p className="text-destructive font-medium mb-1">Something went wrong</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
          <Button 
            variant="secondary"
            onClick={dismissError}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Result state
  return (
    <div className="preview-container rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
      <div className="relative w-full max-w-md rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
        {generatedGifUrl && (
          <img 
            src={generatedGifUrl} 
            alt="Animated text GIF" 
            className="w-full h-auto"
          />
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button 
          onClick={downloadGif}
          className="bg-accent hover:bg-accent/90"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        
        <Button 
          variant="outline"
          onClick={copyShareLink}
        >
          <Share className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  );
}
