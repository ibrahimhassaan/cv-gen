"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserProfile } from "@/lib/profileService";
import { syncLocalToRemote } from "@/lib/resumeService";

export function ClerkProfileSync() {
    const { user, isLoaded } = useUser();
    const syncCheckedRef = useRef(false);

    useEffect(() => {
        if (isLoaded && user && !syncCheckedRef.current) {
            syncCheckedRef.current = true;

            const performSync = async () => {
                try {
                    // 1. Fetch profile to trigger auto-creation on backend
                    await getUserProfile();

                    // 2. Sync local resumes to remote
                    await syncLocalToRemote(user.id);

                    console.log("[ClerkProfileSync] Profile and resumes synced for user:", user.id);
                } catch (error) {
                    console.error("[ClerkProfileSync] Sync failed:", error);
                }
            };

            performSync();
        }
    }, [isLoaded, user]);

    return null;
}
