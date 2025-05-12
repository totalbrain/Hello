export type AnimationStyle = "fire" | "wave" | "fade" | "colorSpin" | "bounce";

export interface GifResult {
  url: string;
  downloadUrl: string;
  size: string;
  animationType: string;
}

export interface GenerateGifRequest {
  text: string;
  animationStyle: AnimationStyle;
}

export interface GenerateGifResponse {
  gifUrl: string;
  animationStyle: string;
}
