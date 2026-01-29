import { NextRequest, NextResponse } from "next/server";
import { summaryModel } from "@/lib/gemini"; // Reusing the model configuration
import { withRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
    // Check rate limit
    const rateLimitResponse = withRateLimit(req);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    try {
        const body = await req.json();
        const { role, company, locale = 'en' } = body;

        if (!role) {
            return NextResponse.json(
                { error: "Role is required" },
                { status: 400 }
            );
        }

        // Map locale to language name
        const languageMap: Record<string, string> = {
            'en': 'English',
            'id': 'Indonesian (Bahasa Indonesia)',
            // Add other languages as needed
        };
        const language = languageMap[locale] || 'English';

        // Construct a prompt
        const prompt = `
        Write a professional short job description for a resume for the role of "${role}"${company ? ` at ${company}` : ''}.
        The description should consist of shorten 1-2 sentences highlighting typical responsibilities and achievements for this role.
        Write it in the first person implied (starting with action verbs) without using "I".
        IMPORTANT: Write the description in ${language}.
        
        Return ONLY the job description text, no introductory or concluding remarks.
        `;

        summaryModel.generationConfig.maxOutputTokens = 500;

        const result = await summaryModel.generateContent(prompt);
        const response = await result.response;
        const description = response.text().trim();

        return NextResponse.json({ description });
    } catch (error: any) {
        console.error("Error generating job description:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate job description" },
            { status: 500 }
        );
    }
}
