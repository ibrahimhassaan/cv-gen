import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import dynamic from "next/dynamic";

const CookieBanner = dynamic(() => import("@/components/CookieBanner").then(mod => mod.CookieBanner));
const ClerkProfileSync = dynamic(() => import("@/components/ClerkProfileSync").then(mod => mod.ClerkProfileSync));
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    display: "swap",
});

import { getTranslations } from "next-intl/server";
import Script from "next/script";

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cvgenfy.com';

    return {
        metadataBase: new URL(baseUrl),
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        alternates: {
            languages: {
                'en': `/en`,
                'de': `/de`,
                'id': `/id`,
                'hi': `/hi`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `/${locale}`,
            siteName: 'cvGenfy',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: '/images/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'cvGenfy - AI Resume Builder',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: ['/images/og-image.jpg'],
        }
    };
}



type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

import { deDE, enUS, idID, hiIN } from "@clerk/localizations";

const clerkLocalizations: Record<string, any> = {
    en: enUS,
    de: deDE,
    id: idID,
    hi: hiIN
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <ClerkProvider
            appearance={{ theme: 'simple' }}
            localization={clerkLocalizations[locale]}
        >
            <html lang={locale} suppressHydrationWarning>
                <body
                    className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-primary/30`}
                >
                    <NextIntlClientProvider messages={messages}>
                        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] px-4 py-2 bg-white text-primary font-bold rounded-lg shadow-lg ring-2 ring-primary">
                            Skip to content
                        </a>
                        <Navbar />
                        <ClerkProfileSync />
                        {children}
                        <CookieBanner />
                        <FooterWrapper />
                    </NextIntlClientProvider>
                    <Analytics />
                    <MicrosoftClarity />
                    <JsonLd
                        data={{
                            '@context': 'https://schema.org',
                            '@type': 'SoftwareApplication',
                            'name': 'cvGenfy',
                            'applicationCategory': 'BusinessApplication',
                            'operatingSystem': 'Web',
                            'url': 'https://cvgenfy.com',
                            'sameAs': [
                                'https://twitter.com/cvgenfy',
                                'https://www.linkedin.com/company/cvgenfy',
                                'https://www.instagram.com/cvgenfy',
                                'https://www.facebook.com/cvgenfy',
                                'https://www.youtube.com/@cvgenfy'
                            ],
                            'offers': {
                                '@type': 'Offer',
                                'price': '0',
                                'priceCurrency': 'USD'
                            },
                            'description': 'AI-powered professional resume generator.'
                        }}
                    />
                </body>
            </html>
        </ClerkProvider>
    );
}
