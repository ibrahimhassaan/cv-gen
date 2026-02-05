"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    if (!gaId) return null;

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
