"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import { syncLocalToRemote } from "@/lib/resumeService";
import { getUserProfile, updateUserLanguage } from "@/lib/profileService";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGitHub: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const supabase = createClient();

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);

            if (event === 'SIGNED_IN' && session?.user) {
                const userId = session.user.id;

                // 1. Sync local resumes to remote
                // We don't await this to avoid blocking the UI, or we could if we want to be sure
                syncLocalToRemote(userId).catch(console.error);

                // 2. Handle Localization
                try {
                    const profile = await getUserProfile(userId);

                    if (profile?.preferred_language && profile.preferred_language !== locale) {
                        // User has a different language preference, switch to it
                        const newPath = pathname.replace(`/${locale}`, `/${profile.preferred_language}`);
                        router.replace(newPath);
                    } else if (profile && !profile.preferred_language) {
                        // User has no preference set, save current locale
                        updateUserLanguage(userId, locale);
                    } else if (!profile) {
                        // Profile might not exist yet if trigger failed or race condition
                        // We can try to update anyway if the table exists
                        // But usually handle_new_user trigger creates it.
                        // Let's just try to update language
                        updateUserLanguage(userId, locale);
                    }
                } catch (e) {
                    console.error("Error handling localization preference", e);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [locale, pathname, router]);

    const signInWithGoogle = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/callback`,
            },
        });
    };

    const signInWithGitHub = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/callback`,
            },
        });
    };

    const signOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                signInWithGoogle,
                signInWithGitHub,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
