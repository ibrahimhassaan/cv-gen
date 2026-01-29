"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations("cookieBanner");

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Small delay to ensure smooth entrance animation
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-md border border-border shadow-lg rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{t("title")}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("description")}{" "}
                        <Link
                            href="/privacy"
                            className="text-primary hover:underline font-medium"
                        >
                            {t("learnMore")}
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button onClick={acceptCookies} className="w-full md:w-auto">
                        {t("accept")}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={acceptCookies}
                        className="md:hidden"
                        aria-label={t("close")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
