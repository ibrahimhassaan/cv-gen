import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { GradientBlobs } from '@/components/GradientBlobs';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return {
        title: `${t('aboutPage.title')} - cvGenfy`,
        description: t('aboutPage.subtitle'),
        alternates: {
            canonical: `/${locale}/about`,
        }
    };
}

export default function AboutPage() {
    const t = useTranslations('aboutPage');
    const locale = useLocale();

    return (
        <main className="min-h-screen relative overflow-hidden bg-white">
            <GradientBlobs />

            {/* Hero Section */}
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    'itemListElement': [
                        {
                            '@type': 'ListItem',
                            'position': 1,
                            'name': 'Home',
                            'item': `https://cvgenfy.com/${locale}`
                        },
                        {
                            '@type': 'ListItem',
                            'position': 2,
                            'name': 'About',
                            'item': `https://cvgenfy.com/${locale}/about`
                        }
                    ]
                }}
            />
            <section className="relative z-10 container mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    {t('title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </section>

            {/* Content Sections */}
            <section className="relative z-10 container mx-auto px-6 pb-24 space-y-24">

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 glass-card p-8 rounded-2xl">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{t('missionTitle')}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('missionText')}
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{t('visionTitle')}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('visionText')}
                        </p>
                    </div>

                </div>

                {/* Transparency / AI */}
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-8">
                        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-6">{t('transparencyTitle')}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t('transparencyText')}
                    </p>
                </div>

            </section>
        </main>
    );
}
