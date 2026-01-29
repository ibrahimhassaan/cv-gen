import { createAdminClient } from "@/lib/supabaseServer";
import { ResumeData } from "@/features/editor/types";

/**
 * Fetch a public resume by ID directly from the database (server-side only).
 * This bypasses RLS using the service role key.
 */
export async function getPublicResumeDTO(resumeId: string): Promise<ResumeData | null> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("id", resumeId)
        .single();

    if (error || !data) {
        if (error) console.error("Error fetching public resume (DTO):", error);
        return null;
    }

    return data.data as ResumeData;
}
