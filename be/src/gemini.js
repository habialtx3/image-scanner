import { GoogleGenAI } from "@google/genai";
import dotenv, { parse } from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const processImage = async (file) => {
  if (!file || !file.mimetype.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  const base64Image = file.buffer.toString("base64");

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

Return the result in JSON format like this:
{
  "items": [
    {
      "original": "text 1",
      "translated": "translation 1"
    },
    {
      "original": "text 2",
      "translated": "translation 2"
    }
  ]
}

Rules:
- Split text into logical parts (sentences or lines)
- Keep order
- Only return valid JSON
- No explanation
`,
      },
    ],
  });

  const cleanText = response.text.replace(/```json/g,"").replace(/```/g, "").trim()
  let parsed

  try {
    parsed = JSON.parse(cleanText)
  } catch (error) {
    console.error("JSON parsed error",error);
    parsed = {item : [], raw : cleanText};
  }
  return parsed;
};
