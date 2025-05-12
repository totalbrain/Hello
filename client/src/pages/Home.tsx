import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TextInput from "@/components/TextInput";
import AnimationStyleSelector from "@/components/AnimationStyleSelector";
import GifPreview from "@/components/GifPreview";
import RecentGifs from "@/components/RecentGifs";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import { useGif } from "@/contexts/GifContext";

export default function Home() {
  const { generateGif } = useGif();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-10 flex-grow">
        {/* GIF Generator */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Your Animated Text GIF</h2>
            
            <TextInput />
            
            <AnimationStyleSelector />
            
            {/* Generate Button */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={generateGif}
                className="px-6 py-6 bg-primary text-white font-medium rounded-lg shadow-sm hover:bg-primary/90 transition flex items-center h-10"
              >
                <VideoIcon className="mr-2 h-4 w-4" />
                Generate GIF
              </Button>
            </div>
            
            <GifPreview />
          </div>
        </div>
        
        <RecentGifs />
      </main>
      
      <Footer />
    </div>
  );
}
