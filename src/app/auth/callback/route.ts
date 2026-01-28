import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    console.log("Auth callback received code:", code ? "yes" : "no");

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("Auth callback session exchange error:", error.message);
            return NextResponse.redirect(`${origin}/en?error=${encodeURIComponent(error.message)}`);
        }

        console.log("Auth callback successful, redirecting to:", next);
        // Explicitly include locale for dashboard if needed, or let middleware handle it
        // Since we are redirecting from a server route to a localized route, 
        // the middleware will prefix it based on cookies or default locale.
        return NextResponse.redirect(`${origin}${next}`);
    }

    console.log("Auth callback: no code found, redirecting to home with auth_failed");
    // Return to home page on error
    return NextResponse.redirect(`${origin}/en?error=auth_failed`);
}
