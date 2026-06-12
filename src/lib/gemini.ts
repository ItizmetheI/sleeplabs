import { GoogleGenAI } from "@google/genai";

/**
 * Returns an initialized Google Gen AI SDK client.
 * Lazy initialization ensures the server doesn't crash on boot if the key is not set yet.
 */
export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing. Please populate GEMINI_API_KEY in the Settings > Secrets configuration.");
  }
  
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}
