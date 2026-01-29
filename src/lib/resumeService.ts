import * as localStore from "@/lib/resumeStorage";
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
 * Fetch all resumes for the user.
 * If userId is provided, fetch from API route.
 * Otherwise, fetch from localStorage.
 */
export async function getResumes(userId?: string): Promise<ResumeData[]> {
    if (!userId) {
        // Authenticated user not found, fallback to local storage
        const local = localStore.loadAllResumes("anonymous");
        return local.map(ensureResumeIds);
    }

    const response = await fetch("/api/resumes", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Error fetching resumes:", response.statusText);
        return [];
    }

    const resumes: ResumeData[] = await response.json();
    return resumes.map(ensureResumeIds);
}

/**
 * Fetch a specific resume.
 */
export async function getResume(resumeId: string, userId?: string): Promise<ResumeData | null> {
    if (!userId) {
        const local = localStore.loadResume("anonymous", resumeId);
        return local ? ensureResumeIds(local) : null;
    }

    const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Error fetching resume:", response.statusText);
        return null;
    }

    const resume: ResumeData = await response.json();
    return ensureResumeIds(resume);
}

/**
 * Fetch a public resume by ID (for shared view).
 */
export async function getPublicResume(resumeId: string): Promise<ResumeData | null> {
    const response = await fetch(`/api/resumes/public/${resumeId}`, {
        method: "GET",
    });

    if (!response.ok) {
        console.error("Error fetching public resume:", response.statusText);
        return null;
    }

    const resume: ResumeData = await response.json();
    return resume;
}

/**
 * Save a resume.
 * If userId is provided, save via API route.
 * Otherwise, save to localStorage.
 */
export async function saveResume(resume: ResumeData, userId?: string): Promise<ResumeData> {
    if (!userId) {
        return localStore.saveResume("anonymous", resume);
    }

    const response = await fetch("/api/resumes", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resume),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error saving resume:", error);
        throw new Error(error.error || "Failed to save resume");
    }

    const savedResume: ResumeData = await response.json();
    return savedResume;
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

    const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error deleting resume:", error);
        throw new Error(error.error || "Failed to delete resume");
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
        await saveResume(resume, userId);
    }

    // Optionally clear local storage after sync
    // localStorage.removeItem("cv_gen_resumes_anonymous");
}
