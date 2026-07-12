import { GeminiAIProvider } from "../providers/gemini";
import { AIProvider } from "../providers/types";

const provider: AIProvider = new GeminiAIProvider(process.env.GEMINI_API_KEY!);

export const generateAlbumTitle = async (details: string) => {
  return await provider.generateAlbumTitle({ existingDetails: details });
};
