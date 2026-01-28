import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase URL or Anon Key. Please check your .env.local file.");
        // Return a dummy client or handle as needed, but at least we've logged the error
    }

    return createBrowserClient(
        supabaseUrl || '',
        supabaseKey || ''
    );
}

export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error("Missing Supabase URL or Service Role Key.");
        throw new Error("Missing Supabase configuration");
    }

    // Use createBrowserClient for simplicity since we just need a client
    // In a real server env, createServerClient might be better but this works for basic fetch
    return createBrowserClient(
        supabaseUrl,
        supabaseServiceKey
    );
}
