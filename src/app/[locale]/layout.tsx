import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthWrapper } from "@/components/AuthWrapper";
import { FooterWrapper } from "@/components/FooterWrapper";
import { AuthFeedback } from "@/features/auth";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Resume Gen - Create Stunning Resumes",
    description: "AI-powered professional resume generator with premium aesthetics.",
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-primary/30`}
            >
                <NextIntlClientProvider messages={messages}>
                    <AuthWrapper>
                        <Navbar />
                        <Suspense fallback={null}>
                            <AuthFeedback />
                        </Suspense>
                        {children}
                        <CookieBanner />
                        <FooterWrapper />
                    </AuthWrapper>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
