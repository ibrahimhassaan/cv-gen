import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// Use gemini-1.5-flash for faster, cheaper responses suitable for interactive UI
export const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
        maxOutputTokens: 1000, // Limit response size to save costs
        temperature: 0.7,
    }
});
