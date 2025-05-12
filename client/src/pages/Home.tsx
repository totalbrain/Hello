import { useState } from "react";
import TextInputForm from "@/components/TextInputForm";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import ResultDisplay from "@/components/ResultDisplay";
import { GifResult } from "@/lib/types";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GifResult | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Animated Text GIF Generator
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Create animated GIFs from your text with different effects like fire, wave, fade, color spin, and bounce.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="max-w-3xl mx-auto">
          {!isLoading && !result && !error && (
            <TextInputForm 
              onSubmit={(text, animationStyle) => {
                setIsLoading(true);
                setError(null);
                fetch("/api/generate-gif", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ text, animationStyle }),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Failed to generate GIF. Please try again.");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    setResult({
                      url: data.gifUrl,
                      downloadUrl: data.gifUrl,
                      size: "400x200px",
                      animationType: data.animationStyle,
                    });
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    setError(err.message);
                    setIsLoading(false);
                  });
              }}
            />
          )}

          {isLoading && <LoadingState />}

          {error && (
            <ErrorMessage 
              error={error} 
              onRetry={() => {
                setError(null);
              }} 
            />
          )}

          {result && (
            <ResultDisplay 
              result={result} 
              onCreateNew={() => {
                setResult(null);
              }}
            />
          )}
        </main>

        {/* Footer Section */}
        <footer className="mt-16 text-center text-gray-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Animated Text GIF Generator. All animations generated on-the-fly.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
