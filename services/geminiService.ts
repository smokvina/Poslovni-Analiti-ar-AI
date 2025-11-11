import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface ReportResult {
  reportText: string;
  citations: any[];
}

export const generateBusinessReport = async (companyData: string): Promise<ReportResult> => {
  try {
    const prompt = `### ULAZNI PODACI ###

[
${companyData}
]

---
### IZVJEŠĆE O TVRTKI ###

Na temelju gornjih podataka, generiraj sljedeće izvješće:
`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }, { googleMaps: {} }],
      },
    });
    
    const reportText = response.text;
    const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

    return { reportText, citations };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate report from Gemini API.");
  }
};