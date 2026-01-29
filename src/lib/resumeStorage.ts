
import { ResumeData } from "@/features/editor/types";

const RESUME_STORAGE_KEY = "cv_gen_resumes";
const PENDING_ACTION_KEY = "cv_gen_pending_action";

export type PendingAction = "download" | "share" | null;

/**
 * Get all resumes for a user
 */
export function loadAllResumes(userId: string): ResumeData[] {
    const key = `${RESUME_STORAGE_KEY}_${userId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Handle migration from single object to array if necessary
            if (!Array.isArray(parsed) && parsed.personalInfo) {
                // It's the old single resume format
                const newResume = { ...parsed, id: crypto.randomUUID(), lastModified: Date.now() };
                saveResume(userId, newResume);
                return [newResume];
            }
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    // Check for old key format
    const oldKey = `cv_gen_resume_${userId}`;
    const oldStored = localStorage.getItem(oldKey);
    if (oldStored) {
        try {
            const parsed = JSON.parse(oldStored) as ResumeData;
            const newResume = {
                ...parsed,
                id: crypto.randomUUID(),
                title: parsed.personalInfo.fullName + "'s Resume",
                lastModified: Date.now()
            };
            saveResume(userId, newResume);
            // Clean up old key
            localStorage.removeItem(oldKey);
            return [newResume];
        } catch {
            // ignore
        }
    }

    return [];
}

/**
 * Save resume data for a user
 */
export function saveResume(userId: string, data: ResumeData): ResumeData {
    const resumes = loadAllResumes(userId);
    const updatedData = { ...data };

    if (!updatedData.id || updatedData.id === "default") {
        updatedData.id = crypto.randomUUID();
        updatedData.lastModified = Date.now();
    } else {
        updatedData.lastModified = Date.now();
    }

    const index = resumes.findIndex(r => r.id === updatedData.id);
    if (index >= 0) {
        resumes[index] = updatedData;
    } else {
        resumes.push(updatedData);
    }

    const key = `${RESUME_STORAGE_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(resumes));

    return updatedData;
}

/**
 * Load specific resume data for a user
 */
export function loadResume(userId: string, resumeId: string): ResumeData | null {
    const resumes = loadAllResumes(userId);
    return resumes.find(r => r.id === resumeId) || null;
}

/**
 * Delete a resume
 */
export function deleteResume(userId: string, resumeId: string): void {
    const resumes = loadAllResumes(userId);
    const filtered = resumes.filter(r => r.id !== resumeId);
    const key = `${RESUME_STORAGE_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(filtered));
}

/**
 * Save pending action before OAuth redirect
 */
export function setPendingAction(action: PendingAction, resumeData?: ResumeData): void {
    if (action && resumeData) {
        localStorage.setItem(PENDING_ACTION_KEY, JSON.stringify({ action, resumeData }));
    } else {
        localStorage.removeItem(PENDING_ACTION_KEY);
    }
}

/**
 * Get and clear pending action after OAuth callback
 */
export function getPendingAction(): { action: PendingAction; resumeData: ResumeData } | null {
    const stored = localStorage.getItem(PENDING_ACTION_KEY);
    if (stored) {
        localStorage.removeItem(PENDING_ACTION_KEY);
        try {
            return JSON.parse(stored);
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Generate a shareable link for a resume
 * For now, this encodes the resume data in a URL-safe format
 * In production, you'd save to a database and return a short ID
 */
export function generateShareableLink(resumeData: ResumeData): string {
    // Return simple short link using the UUID
    // Note: The resume must be saved to the backend for this to work.
    // We assume the caller saves it before calling this.
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
    return `${baseUrl}/view/${resumeData.id}`;
}

/**
 * Decode a shared resume link
 */
export function decodeShareableLink(encoded: string): ResumeData | null {
    try {
        const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
        return {
            id: "shared",
            title: "Shared Resume",
            lastModified: Date.now(),
            templateId: decoded.t,
            themeColor: decoded.c,
            personalInfo: decoded.p,
            experience: decoded.e,
            education: decoded.ed,
            skills: decoded.s,
            projects: decoded.pr,
        } as ResumeData;
    } catch {
        return null;
    }
}
