import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabaseServer";
import { auth } from "@clerk/nextjs/server";
import { ResumeData, SkillItem, LanguageItem } from "@/features/editor/types";

// Helper to ensure all items have IDs
function ensureResumeIds(resume: ResumeData): ResumeData {
    const newData = { ...resume };

    if (newData.skills) {
        newData.skills = newData.skills.map((s: string | Partial<SkillItem>) => {
            if (typeof s === 'string') return { id: crypto.randomUUID(), name: s, level: "Intermediate" } as SkillItem;
            return {
                ...s,
                id: (s as SkillItem).id || crypto.randomUUID(),
                name: (s as SkillItem).name || "",
                level: (s as SkillItem).level || "Intermediate"
            } as SkillItem;
        });
    }

    if (newData.languages) {
        newData.languages = newData.languages.map((l: Partial<LanguageItem>) => ({
            ...l,
            id: l.id || crypto.randomUUID(),
            name: l.name || "",
            level: l.level || "Beginner"
        } as LanguageItem));
    }

    if (newData.experience) {
        newData.experience = newData.experience.map(e => ({ ...e, id: e.id || crypto.randomUUID() }));
    }

    if (newData.education) {
        newData.education = newData.education.map(e => ({ ...e, id: e.id || crypto.randomUUID() }));
    }

    if (newData.projects) {
        newData.projects = newData.projects.map(p => ({ ...p, id: p.id || crypto.randomUUID() }));
    }

    return newData;
}

/**
 * GET /api/resumes
 * List all resumes for authenticated user
 */
export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching resumes:", JSON.stringify(error, null, 2));
        return NextResponse.json({ error: "Failed to fetch resumes", details: error }, { status: 500 });
    }

    const resumes = data.map((row) => ensureResumeIds(row.data as ResumeData));
    return NextResponse.json(resumes);
}

/**
 * POST /api/resumes
 * Create or update a resume (upsert)
 */
export async function POST(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    let resume: ResumeData;
    try {
        resume = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Ensure we have a valid UUID
    if (!resume.id || resume.id === "default") {
        resume.id = crypto.randomUUID();
    }

    // Update timestamp
    resume.lastModified = Date.now();

    // Prepare payload
    const payload = {
        id: resume.id,
        user_id: userId,
        title: resume.title || "Untitled Resume",
        data: resume,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from("resumes")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

    if (error) {
        console.error("Error saving resume:", error);
        return NextResponse.json({ error: "Failed to save resume" }, { status: 500 });
    }

    return NextResponse.json(resume);
}
