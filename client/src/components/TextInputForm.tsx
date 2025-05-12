import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimationStyle } from "@/lib/types";

// Icons
import { 
  Flame, 
  Waves, 
  Sparkles, 
  Palette, 
  ArrowUpDown 
} from "lucide-react";

interface TextInputFormProps {
  onSubmit: (text: string, animationStyle: AnimationStyle) => void;
}

const formSchema = z.object({
  text: z.string()
    .min(1, "Text is required")
    .max(20, "Text must be at most 20 characters"),
  animationStyle: z.enum(["fire", "wave", "fade", "colorSpin", "bounce"] as const),
});

type FormValues = z.infer<typeof formSchema>;

const animationStyles = [
  { value: "fire", label: "Fire", icon: <Flame className="h-5 w-5" /> },
  { value: "wave", label: "Wave", icon: <Waves className="h-5 w-5" /> },
  { value: "fade", label: "Fade", icon: <Sparkles className="h-5 w-5" /> },
  { value: "colorSpin", label: "Color Spin", icon: <Palette className="h-5 w-5" /> },
  { value: "bounce", label: "Bounce", icon: <ArrowUpDown className="h-5 w-5" /> },
];

const TextInputForm = ({ onSubmit }: TextInputFormProps) => {
  const [charCount, setCharCount] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      animationStyle: "fire",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.text, values.animationStyle as AnimationStyle);
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Your Animation</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-gray-700">Enter Your Text</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type something awesome..."
                      maxLength={20}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      onChange={(e) => {
                        field.onChange(e);
                        setCharCount(e.target.value.length);
                      }}
                    />
                  </FormControl>
                  <div className="absolute right-3 top-2.5 text-xs text-gray-500">
                    <span>{charCount}</span>/20
                  </div>
                </div>
                <p className="text-xs text-gray-500">Maximum 20 characters for best results</p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="animationStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">Animation Style</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3"
                  >
                    {animationStyles.map((style) => (
                      <div className="relative" key={style.value}>
                        <RadioGroupItem
                          value={style.value}
                          id={style.value}
                          className="peer hidden"
                        />
                        <label
                          htmlFor={style.value}
                          className="block cursor-pointer text-center p-3 border rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors"
                        >
                          <div className="flex justify-center mb-1">{style.icon}</div>
                          <span className="text-sm">{style.label}</span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Generate Animation
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default TextInputForm;
