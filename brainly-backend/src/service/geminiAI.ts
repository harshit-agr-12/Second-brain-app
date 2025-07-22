import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_APIKEY });

export async function queryGemini(query:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });
  return response.text;
}
