import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AIAnalysis } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectIdea = async (rawIdea: string): Promise<AIAnalysis> => {
  const modelId = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      refinedBrief: {
        type: Type.STRING,
        description: "A professional, technical reformulation of the client's idea.",
      },
      suggestedStack: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of recommended technologies (e.g., React, Node.js, AWS).",
      },
      estimatedTimeline: {
        type: Type.STRING,
        description: "A rough estimated timeline string (e.g., '3-4 months').",
      },
    },
    required: ["refinedBrief", "suggestedStack", "estimatedTimeline"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `You are a senior technical solution architect for Rockspace, a premium web agency. 
      Analyze this client's rough project idea and structure it into a professional brief to help them understand what they need.
      
      Client Idea: "${rawIdea}"
      
      Provide a refined technical brief, a suggested tech stack, and a rough timeline estimation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are helpful, professional, and concise. You turn vague ideas into concrete technical proposals.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AIAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback if AI fails
    return {
      refinedBrief: "We received your idea. Our team will analyze it manually.",
      suggestedStack: ["TBD"],
      estimatedTimeline: "To be discussed",
    };
  }
};
