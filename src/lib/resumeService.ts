import { createClient } from "@/lib/supabase";
import * as localStore from "@/lib/resumeStorage";
import { ResumeData } from "@/features/editor/types";



/**
 * Fetch all resumes for the user.
 * If userId is provided, fetch from Supabase.
 * Otherwise, fetch from localStorage.
 */
export async function getResumes(userId?: string): Promise<ResumeData[]> {
    if (!userId) {
        // Authenticated user not found, fallback to local storage
        // We use a predefined key for anonymous users or just load all
        return localStore.loadAllResumes("anonymous");
    }

    const supabase = createClient();

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching resumes:", error);
        return [];
    }

    return data.map((row) => row.data as ResumeData);
}

/**
 * Fetch a specific resume.
 */
export async function getResume(resumeId: string, userId?: string): Promise<ResumeData | null> {
    if (!userId) {
        return localStore.loadResume("anonymous", resumeId);
    }

    const supabase = createClient();

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("id", resumeId)
        .eq("user_id", userId)
        .single();

    if (error) {
        // It might be a local resume (not yet synced) or just doesn't exist.
        // Or maybe it's a shared resume?
        console.error("Error fetching resume:", error);
        return null;
    }

    return data.data as ResumeData;
}

/**
 * Fetch a public resume by ID (for shared view).
 */
/**
 * Fetch a public resume by ID (for shared view).
 * Uses Service Role key to bypass RLS.
 */
export async function getPublicResume(resumeId: string): Promise<ResumeData | null> {
    // Dynamically import to safely use admin client (server-side only)
    const { createAdminClient } = await import("./supabase");

    // Check if we have the service key (only on server)
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Service Role Key is missing. Cannot fetch public resume.");
        return null;
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("id", resumeId);

    if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching public resume:", error);
        return null;
    }

    return data[0].data as ResumeData;
}

/**
 * Save a resume.
 * If userId is provided, save to Supabase.
 * Always save to localStorage as a backup/offline cache (optional, strictly following hybrid for now).
 */
export async function saveResume(resume: ResumeData, userId?: string): Promise<ResumeData> {
    if (!userId) {
        return localStore.saveResume("anonymous", resume);
    }

    // Ensure we have a valid UUID
    const resumeToSave = { ...resume };

    if (!resumeToSave.id || resumeToSave.id === "default") {
        resumeToSave.id = crypto.randomUUID();
        // Also update local storage so UI updates? 
        // Or just let the caller handle it.
    }

    // Also update timestamp
    resumeToSave.lastModified = Date.now();

    // Prepare payload
    const payload = {
        id: resumeToSave.id,
        user_id: userId,
        title: resumeToSave.title || "Untitled Resume",
        data: resumeToSave,
        updated_at: new Date().toISOString(),
    };

    const supabase = createClient();

    const { error } = await supabase
        .from("resumes")
        .upsert(
            payload,
            { onConflict: "id" }
        )
        .select()
        .single();

    if (error) {
        console.error("Error saving resume:", error);
        throw error;
    }

    return resumeToSave;
}

/**
 * Duplicate a resume.
 */
export async function duplicateResume(resumeId: string, userId?: string): Promise<ResumeData> {
    const originalResume = await getResume(resumeId, userId);

    if (!originalResume) {
        throw new Error("Resume not found");
    }

    const newResume = {
        ...originalResume,
        id: crypto.randomUUID(),
        title: `${originalResume.title} (Copy)`,
        lastModified: Date.now(),
    };

    return saveResume(newResume, userId);
}

/**
 * Delete a resume.
 */
export async function deleteResume(resumeId: string, userId?: string): Promise<void> {
    if (!userId) {
        return localStore.deleteResume("anonymous", resumeId);
    }

    const supabase = createClient();
    const { error } = await supabase.from("resumes").delete().eq("id", resumeId);

    if (error) {
        console.error("Error deleting resume:", error);
        throw error;
    }
}

/**
 * Sync local resumes to Supabase.
 * Call this after successful login.
 */
export async function syncLocalToRemote(userId: string): Promise<void> {
    const localResumes = localStore.loadAllResumes("anonymous");

    if (localResumes.length === 0) return;

    // Upload each local resume
    for (const resume of localResumes) {
        // We might want to check if it already exists or just overwrite?
        // Upsert is safest.

        // Ensure it has a valid UUID (local storage might have weird ids?)
        // The type says id is string.

        await saveResume(resume, userId);
    }

    // Optionally clear local storage after sync
    // localStorage.removeItem("cv_gen_resumes_anonymous");
    // Or keep them? Let's keep them for now, maybe prompt user to clear later.
}
