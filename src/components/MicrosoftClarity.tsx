"use client";

import { useEffect } from "react";


export function MicrosoftClarity() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    useEffect(() => {
        if (!clarityId) return;

        const loadClarity = async () => {
            const clarity = (await import("@microsoft/clarity")).default;
            clarity.init(clarityId);
        };

        // Check initial consent
        if (localStorage.getItem("cookie_consent") === "true") {
            loadClarity();
        }

        // Listen for consent updates
        const handleConsentUpdate = () => {
            if (localStorage.getItem("cookie_consent") === "true") {
                loadClarity();
            }
        };

        window.addEventListener("cookie_consent_updated", handleConsentUpdate);

        return () => {
            window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
        };
    }, [clarityId]);

    return null;
}
