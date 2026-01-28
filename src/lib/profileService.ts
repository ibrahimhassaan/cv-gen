export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string;
    preferred_language: string | null;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const response = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Error fetching profile:", response.statusText);
        return null;
    }

    const profile: UserProfile | null = await response.json();
    return profile;
}

export async function updateUserLanguage(userId: string, language: string): Promise<void> {
    const response = await fetch("/api/profile", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferred_language: language }),
    });

    if (!response.ok) {
        console.error("Error updating language preference:", response.statusText);
    }
}
