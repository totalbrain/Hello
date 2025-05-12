import { GenerateGifRequest, GenerateGifResponse } from "./types";
import { apiRequest } from "./queryClient";

export async function generateGif(request: GenerateGifRequest): Promise<GenerateGifResponse> {
  const response = await apiRequest("POST", "/api/generate-gif", request);
  return response.json();
}
