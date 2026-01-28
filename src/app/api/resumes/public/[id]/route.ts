import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ResumeData } from "@/features/editor/types";

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/resumes/public/[id]
 * Get a public/shared resume (no auth required, uses service role)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
        console.error("Missing Supabase configuration for public resume access");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Create admin client with service role (bypasses RLS)
    const supabase = createServerClient(
        supabaseUrl,
        serviceRoleKey,
        {
            cookies: {
                getAll() {
                    return [];
                },
                setAll() {
                    // No-op for service role client
                },
            },
        }
    );

    const { data, error } = await supabase
        .from("resumes")
        .select("data")
        .eq("id", id);

    if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching public resume:", error);
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json(data[0].data as ResumeData);
}
