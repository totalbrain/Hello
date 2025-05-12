import { useGif } from "@/contexts/GifContext";
import { AnimationStyle } from "@shared/schema";
import { cn } from "@/lib/utils";

type AnimationOption = {
  id: AnimationStyle;
  name: string;
  className: string;
};

const animationOptions: AnimationOption[] = [
  {
    id: AnimationStyle.Fire,
    name: "Fire",
    className: "text-fire font-semibold",
  },
  {
    id: AnimationStyle.Wave,
    name: "Wave",
    className: "animate-wave font-semibold",
  },
  {
    id: AnimationStyle.Fade,
    name: "Fade",
    className: "animate-fade font-semibold",
  },
  {
    id: AnimationStyle.ColorSpin,
    name: "Color Spin",
    className: "animate-spin-slow text-accent font-semibold",
  },
  {
    id: AnimationStyle.Bounce,
    name: "Bounce",
    className: "animate-bounce-slow font-semibold",
  },
];

export default function AnimationStyleSelector() {
  const { animationStyle, setAnimationStyle } = useGif();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Choose Animation Style</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {animationOptions.map((option) => (
          <div
            key={option.id}
            className={cn(
              "border rounded-lg p-3 text-center cursor-pointer transition hover:shadow-sm",
              animationStyle === option.id 
                ? "border-primary" 
                : "border-gray-200 dark:border-gray-700 hover:border-primary"
            )}
            onClick={() => setAnimationStyle(option.id)}
          >
            <div className="h-12 flex items-center justify-center mb-2">
              <span className={option.className}>Sample</span>
            </div>
            <span className="text-sm font-medium">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
