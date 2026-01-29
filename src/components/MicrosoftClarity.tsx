"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export function MicrosoftClarity() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    useEffect(() => {
        if (!clarityId) return;

        // Check initial consent
        if (localStorage.getItem("cookie_consent") === "true") {
            clarity.init(clarityId);
        }

        // Listen for consent updates
        const handleConsentUpdate = () => {
            if (localStorage.getItem("cookie_consent") === "true") {
                clarity.init(clarityId);
            }
        };

        window.addEventListener("cookie_consent_updated", handleConsentUpdate);

        return () => {
            window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
        };
    }, [clarityId]);

    return null;
}
