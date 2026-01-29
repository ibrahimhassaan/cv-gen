import { NextRequest, NextResponse } from "next/server";
import { skillsModel } from "@/lib/gemini";
import { withRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
    // Check rate limit (10 requests per minute per IP)
    const rateLimitResponse = withRateLimit(req);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    try {
        const body = await req.json();
        const { experience, education, locale = 'en' } = body;

        // Map locale to language name for clearer AI instructions
        const languageMap: Record<string, string> = {
            'en': 'English',
            'id': 'Indonesian (Bahasa Indonesia)',
        };
        const language = languageMap[locale] || 'English';

        const prompt = `Based on the following resume information, suggest 7-10 relevant technical and soft skills.
IMPORTANT: Return the skill names in ${language}.

Experience: ${JSON.stringify(experience)}
Education: ${JSON.stringify(education)}`;

        const result = await skillsModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the JSON response
        let skills;
        try {
            skills = JSON.parse(text);
        } catch (parseError) {
            console.error("JSON parse failed. Response text:", text);
            return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
        }

        return NextResponse.json({ skills });
    } catch (error: any) {
        console.error("Error generating skills:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate skills" },
            { status: 500 }
        );
    }
}
