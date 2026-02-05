"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
    const [consentGiven, setConsentGiven] = useState(false);
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    useEffect(() => {
        // Check initial consent
        if (typeof window !== 'undefined' && localStorage.getItem("cookie_consent") === "true") {
            setConsentGiven(true);
        }

        // Listen for consent updates
        const handleConsentUpdate = () => {
            setConsentGiven(true);
        };

        window.addEventListener("cookie_consent_updated", handleConsentUpdate);

        return () => {
            window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
        };
    }, []);


    if (!consentGiven || !gaId) return null;

    return (
        <>
            <GoogleAnalytics gaId={gaId} />
            <script
                id="google-ads-config"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
                    `
                }}
            />
        </>
    );
}
