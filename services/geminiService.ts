
import { GoogleGenAI } from "@google/genai";

// Fixed: Correct initialization as per Google GenAI SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getArtisanStory = async (artisanName: string, craft: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a poetic and engaging 2-sentence story about a Mysore artisan named ${artisanName} who practices ${craft}. Focus on the heritage and the sensory details of their work.`,
    });
    // response.text is a property, this is correct.
    return response.text;
  } catch (error) {
    console.error("Error fetching artisan story:", error);
    return `In the heart of Mysore, ${artisanName} keeps the flame of ${craft} alive with skilled hands and a soul dedicated to tradition.`;
  }
};

export const getGeminiInsights = async (location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 unique, lesser-known travel tips for someone visiting ${location} in Mysore. Keep them short and practical.`,
    });
    // response.text is a property, this is correct.
    return response.text;
  } catch (error) {
    return "Visit during early morning to avoid crowds and enjoy the heritage architecture in soft light.";
  }
};
