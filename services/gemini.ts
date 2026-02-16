
import { GoogleGenAI, Type } from "@google/genai";
import { VideoMetadata } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeVideoContent = async (
  prompt: string,
  niche: string,
  imagePart?: { inlineData: { data: string; mimeType: string } }
): Promise<VideoMetadata> => {
  const model = 'gemini-3-pro-preview';

  const systemInstruction = `
    You are a world-class YouTube Growth Expert specializing in the Android tech niche.
    Your goal is to analyze a video concept or frame and generate high-engagement metadata.
    Focus on "Viral potential" for Android-related content (e.g., Pixel phones, Samsung Galaxy, App development, customization).
  `;

  const contents = imagePart 
    ? { parts: [imagePart, { text: `Analyze this video concept for the ${niche} niche: ${prompt}` }] }
    : `Analyze this video concept for the ${niche} niche: ${prompt}`;

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titles: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "5 viral, click-worthy titles specifically for Android viewers.",
          },
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "10 high-traffic hashtags (including #Android, #Tech, etc.).",
          },
          description: {
            type: Type.STRING,
            description: "A comprehensive SEO-optimized description with placeholders for links.",
          },
          bestTime: {
            type: Type.STRING,
            description: "The absolute best time of day and week to upload this specific content for maximum Android audience reach.",
          },
          targetAudience: {
            type: Type.STRING,
            description: "Detailed description of who will watch this.",
          },
          keywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Low-competition, high-volume SEO keywords.",
          },
          engagementTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Actionable tips to increase comments and likes.",
          },
        },
        required: ["titles", "hashtags", "description", "bestTime", "targetAudience", "keywords", "engagementTips"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as VideoMetadata;
  } catch (e) {
    throw new Error("Failed to parse AI response. Please try again.");
  }
};
