import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
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

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/resumes/[id]
 * Get a specific resume by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (error) {
        console.error("Error fetching resume:", error);
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json(ensureResumeIds(data.data as ResumeData));
}

/**
 * DELETE /api/resumes/[id]
 * Delete a resume by ID
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        console.error("Error deleting resume:", error);
        return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
