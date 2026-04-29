import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const processImage = async (file) => {
  const imageBuffer = fs.readFileSync(file.path);
  const base64Image = imageBuffer.toString("base64");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        inlineData: {
          mimeType: file.mimetype,
          data: base64Image,
        },
      },
      {
        text: `
        Extract all text from this image and translate it into Indonesian.
        Only return the translated text.
        `,
      },
    ],
  });

  return response.text;
};