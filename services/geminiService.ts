
import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageData } from '../types';

const PROMPT = "Generate an image where the person from the first photo is kissing the person from the second photo. Make it look as if the two people are interacting naturally. Add soft, natural lighting. Replace the original backgrounds with a smooth, clean white background to focus entirely on the subjects.";

export const generateKissingImage = async (image1: ImageData, image2: ImageData): Promise<string> => {
    // The API key is assumed to be available in the environment variables.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: image1.base64, mimeType: image1.mimeType } },
                    { inlineData: { data: image2.base64, mimeType: image2.mimeType } },
                    { text: PROMPT },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return part.inlineData.data;
                }
            }
        }
        
        throw new Error("No image data was found in the API response. The content may have been blocked.");

    } catch (error) {
        console.error("Error generating image with Gemini API:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             throw new Error("The API key is invalid. Please check your configuration.");
        }
        throw new Error("Failed to generate the image. The request may have been blocked due to safety policies or an invalid input. Please try different images.");
    }
};
