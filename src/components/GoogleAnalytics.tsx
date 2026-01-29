"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function GoogleAnalytics() {
    const [consentGiven, setConsentGiven] = useState(false);
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    useEffect(() => {
        // Check initial consent
        if (localStorage.getItem("cookie_consent") === "true") {
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
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
            </Script>
        </>
    );
}
