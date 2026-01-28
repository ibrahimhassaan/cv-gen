import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { experience, education } = body;

        // Construct a prompt based on the user's experience and education
        const prompt = `
        Based on the following resume information, suggest 8-12 relevant technical and soft skills.
        Return ONLY a JSON array of objects with "name" and "level" properties. 
        Level should be one of: "Beginner", "Intermediate", "Advanced", "Expert".
        
        Experience:
        ${JSON.stringify(experience)}
        
        Education:
        ${JSON.stringify(education)}
        
        Example output format:
        [
            { "name": "React", "level": "Advanced" },
            { "name": "Project Management", "level": "Intermediate" }
        ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response to ensure it's valid JSON
        let cleanJson = text;

        // generic cleanup: remove markdown code block syntax if present
        const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (markdownMatch) {
            cleanJson = markdownMatch[1];
        }

        const jsonStart = cleanJson.indexOf('[');
        const jsonEnd = cleanJson.lastIndexOf(']') + 1;

        if (jsonStart === -1 || jsonEnd === -1) {
            console.error("Invalid JSON response from AI:", text);
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

        const jsonString = cleanJson.substring(jsonStart, jsonEnd);
        const skills = JSON.parse(jsonString);

        return NextResponse.json({ skills });
    } catch (error: any) {
        console.error("Error generating skills:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate skills" },
            { status: 500 }
        );
    }
}
