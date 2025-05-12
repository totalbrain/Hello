import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GifResult } from "@/lib/types";

interface ResultDisplayProps {
  result: GifResult;
  onCreateNew: () => void;
}

const ResultDisplay = ({ result, onCreateNew }: ResultDisplayProps) => {
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Animated GIF</h2>
      </div>
      
      <div className="flex justify-center bg-gray-100 border-t border-b border-gray-200 p-6">
        <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-md">
          <div className="bg-white p-4 flex justify-center items-center" style={{ minHeight: "200px" }}>
            <img 
              className="max-w-full h-auto" 
              src={result.url} 
              alt="Animated text GIF"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 text-sm">
          <p><strong>Size:</strong> <span>{result.size}</span></p>
          <p><strong>Animation:</strong> <span>{result.animationType}</span></p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={onCreateNew}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
          
          <Button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            asChild
          >
            <a 
              href={result.downloadUrl} 
              download={`animated-text-${new Date().getTime()}.gif`}
            >
              <Download className="mr-2 h-4 w-4" />
              Download GIF
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultDisplay;
