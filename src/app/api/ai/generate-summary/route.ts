import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { resumeData } = body;

        // Construct a prompt based on the complete resume data
        const prompt = `
        Write a professional summary (2-4 sentences) for a resume based on the following data.
        The summary should highlight key achievements, years of experience, and core skills.
        Write it in the first person but without using "I" repeatedly (standard resume style).
        
        Resume Data:
        ${JSON.stringify(resumeData)}
        
        Return ONLY the summary text, no quotes or additional formatting.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text().trim();

        return NextResponse.json({ summary });
    } catch (error: any) {
        console.error("Error generating summary:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate summary" },
            { status: 500 }
        );
    }
}
