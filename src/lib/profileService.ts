import { createClient } from "@/lib/supabase";

const supabase = createClient();

export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string;
    preferred_language: string | null;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    return (data && data.length > 0) ? (data[0] as UserProfile) : null;
}

export async function updateUserLanguage(userId: string, language: string): Promise<void> {
    const { error } = await supabase
        .from("profiles")
        .update({ preferred_language: language, updated_at: new Date().toISOString() })
        .eq("id", userId);

    if (error) {
        console.error("Error updating language preference:", error);
    }
}
