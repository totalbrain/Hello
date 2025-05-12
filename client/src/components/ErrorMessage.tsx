import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-destructive">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            variant="outline" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-destructive bg-destructive/10 hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive"
            onClick={onRetry}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorMessage;
