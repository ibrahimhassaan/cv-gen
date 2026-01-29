import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
import { auth } from "@clerk/nextjs/server";

export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string;
    preferred_language: string | null;
}

import { currentUser } from "@clerk/nextjs/server";

/**
 * GET /api/profile
 * Get current user's profile, creates one if it doesn't exist
 */
export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // 1. Try to fetch existing profile
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

    if (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    let profile = (data && data.length > 0) ? (data[0] as UserProfile) : null;

    // 2. If profile doesn't exist, create it (Lazy Creation)
    if (!profile) {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "User not found in Clerk" }, { status: 404 });
        }

        const newProfile = {
            id: userId,
            full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "User",
            email: user.emailAddresses[0]?.emailAddress || "",
            avatar_url: user.imageUrl || "",
            updated_at: new Date().toISOString(),
        };

        const { data: createdData, error: createError } = await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single();

        if (createError) {
            console.error("Error creating profile:", createError);
            return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
        }

        profile = createdData as UserProfile;
    }

    return NextResponse.json(profile);
}

/**
 * PATCH /api/profile
 * Update current user's profile (e.g., language preference)
 */
export async function PATCH(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    let body: { preferred_language?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const updateData: { updated_at: string; preferred_language?: string } = {
        updated_at: new Date().toISOString(),
    };

    if (body.preferred_language) {
        updateData.preferred_language = body.preferred_language;
    }

    const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", userId);

    if (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
