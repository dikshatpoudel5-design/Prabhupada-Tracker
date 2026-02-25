
import { GoogleGenAI, Type } from "@google/genai";
import { ShlokaData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const shlokaSchema = {
  type: Type.OBJECT,
  properties: {
    reference: { type: Type.STRING, description: 'The scripture reference e.g. Bg 2.13' },
    sanskrit: { type: Type.STRING, description: 'The original Sanskrit verse' },
    transliteration: { type: Type.STRING, description: 'The transliteration of the verse' },
    translation: { type: Type.STRING, description: 'The English translation by Srila Prabhupada' },
  },
  required: ['reference', 'sanskrit', 'transliteration', 'translation'],
};

export const fetchShloka = async (query: string): Promise<ShlokaData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Fetch details for the scripture verse: ${query}. Provide the Sanskrit, transliteration, and translation specifically as found in Srila Prabhupada's books (Vedabase).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: shlokaSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as ShlokaData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching shloka:", error);
    return null;
  }
};

export const fetchDailyShloka = async (): Promise<ShlokaData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Select a random, inspiring verse from Bhagavad Gita As It Is or Srimad Bhagavatam. Provide Sanskrit, transliteration, and translation.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: shlokaSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as ShlokaData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching daily shloka:", error);
    return null;
  }
};
