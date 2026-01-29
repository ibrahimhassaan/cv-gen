import { NextRequest, NextResponse } from "next/server";
import { summaryModel } from "@/lib/gemini";
import { withRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
    // Check rate limit (10 requests per minute per IP)
    const rateLimitResponse = withRateLimit(req);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    try {
        const body = await req.json();
        const { resumeData, locale = 'en' } = body;

        // Map locale to language name for clearer AI instructions
        const languageMap: Record<string, string> = {
            'en': 'English',
            'id': 'Indonesian (Bahasa Indonesia)',
        };
        const language = languageMap[locale] || 'English';

        // Construct a prompt based on the complete resume data
        const prompt = `
        Write a professional summary (2-3 sentences) for a resume based on the following data.
        The summary should highlight key achievements, years of experience, and core skills.
        Write it in the first person but without using "I" repeatedly (standard resume style).
        IMPORTANT: Write the summary in ${language}.
        
        Resume Data:
        ${JSON.stringify(resumeData)}
        
        Return ONLY the summary text, no quotes or additional formatting.
        `;

        const result = await summaryModel.generateContent(prompt);
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
