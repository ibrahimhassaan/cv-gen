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

import { getTranslations } from "next-intl/server";
import Script from "next/script";

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cvgenfy.com';

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                'en': `${baseUrl}/en`,
                'de': `${baseUrl}/de`,
                'id': `${baseUrl}/id`,
                'hi': `${baseUrl}/hi`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `${baseUrl}/${locale}`,
            siteName: 'cvGenfy',
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        }
    };
}

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
                <Script
                    id="schema-org"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'SoftwareApplication',
                            'name': 'cvGenfy',
                            'applicationCategory': 'BusinessApplication',
                            'operatingSystem': 'Web',
                            'offers': {
                                '@type': 'Offer',
                                'price': '0',
                                'priceCurrency': 'USD'
                            },
                            'description': 'AI-powered professional resume generator.'
                        })
                    }}
                />
            </body>
        </html>
    );
}
