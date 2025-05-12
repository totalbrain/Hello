import { useGif } from "@/contexts/GifContext";

export default function RecentGifs() {
  const { recentGifs } = useGif();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recently Created</h2>
      
      {recentGifs.length === 0 ? (
        <div className="col-span-full py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No GIFs created yet. Generate your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentGifs.map((gif, index) => (
            <div 
              key={`${gif.text}-${index}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer transition hover:shadow-md"
              onClick={() => window.open(gif.gifUrl, '_blank')}
            >
              <img 
                src={gif.gifUrl} 
                alt={`Animated text: ${gif.text}`} 
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{gif.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{gif.animationStyle} animation</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
