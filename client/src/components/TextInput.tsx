import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGif } from "@/contexts/GifContext";

export default function TextInput() {
  const { text, setText } = useGif();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 20 characters
    setText(e.target.value.substring(0, 20));
  };

  return (
    <div className="mb-6">
      <Label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Enter Your Text
      </Label>
      <div className="relative">
        <Input
          id="text-input"
          type="text"
          className="w-full px-4 py-3 pr-16"
          placeholder="Type something awesome"
          maxLength={20}
          value={text}
          onChange={handleTextChange}
        />
        <div className="absolute right-3 top-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{text.length}</span>/20
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter up to 20 characters to animate</p>
    </div>
  );
}
