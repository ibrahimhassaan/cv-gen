import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable");
}

export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// Default model for text generation
export const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
    }
});

// Skills suggestion model with JSON schema enforcement
export const skillsModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    name: { type: SchemaType.STRING, description: "Skill name" },
                    level: {
                        type: SchemaType.STRING,
                        format: "enum",
                        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
                        description: "Proficiency level"
                    }
                },
                required: ["name", "level"]
            }
        },
        maxOutputTokens: 1500,
        temperature: 0.7,
    }
});

// Summary generation model (text output)
export const summaryModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
        maxOutputTokens: 1224,
        temperature: 0.85,     // Slightly higher for more creative phrasing
        topP: 0.95,            // Wider pool of words to choose from
    }
});
