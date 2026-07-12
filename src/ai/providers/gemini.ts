import { GoogleGenAI } from "@google/genai";
import { AIProvider, AlbumTitleInput } from "./types";
import { AIResult } from "../schemas";
import { albumTitlePrompt } from "../prompts/album";

export class GeminiAIProvider implements AIProvider {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateAlbumTitle(input: AlbumTitleInput): Promise<AIResult<string>> {
    const response = await this.ai.models.generateContent({
      model: process.env.AI_MODEL || "gemini-3.5-flash",
      contents: albumTitlePrompt(input.existingDetails),
    });
    
    // In a real implementation, we would parse with Zod here.
    return { data: response.text || "Nuevo Álbum" };
  }
}
