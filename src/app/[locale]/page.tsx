import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { FileText, Upload, Sparkles, Download, Share2, Wand2, MousePointerClick, Keyboard, TrendingUp, Timer, Trophy, Bot } from "lucide-react";
import Link from "next/link";
import { GradientBlobs } from "@/components/GradientBlobs";
import { JsonLd } from "@/components/JsonLd";

import { HeroResumesWrapper } from "@/components/HeroResumesWrapper";
// import { TemplateSlider } from "@/components/TemplateSlider";
// import { FloatingElements } from "@/components/FloatingElements";
import { useTranslations } from "next-intl";
import { TemplateSliderLazy } from "@/components/TemplateSliderLazy";

import { getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `/${locale}`,
        }
    };
}

export default function Home() {
    const t = useTranslations();

    return (
        <main id="main-content" className="min-h-screen relative overflow-hidden">
            {/* Animated Gradient Blobs */}
            <GradientBlobs />

            {/* Hero Section */}
            <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-none text-sm font-medium text-primary mb-8 animate-[fade-in_1s_ease-out]">
                            <Sparkles className="w-4 h-4" />
                            <span>{t('home.badge')}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                            {t('home.title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-[#06b6d4] bg-[length:200%_auto] animate-gradient">
                                {t('home.titleHighlight')}
                            </span>
                            <span className="text-[#facc15]">.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-[slide-up_1.2s_ease-out]">
                            {t('home.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 animate-[slide-up_1.4s_ease-out]">
                            <Link href="/templates">
                                <Button size="lg" variant="default" className="w-full sm:w-auto relative overflow-hidden group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-shadow duration-300">
                                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                                    <Sparkles className="mr-2 w-4 h-4" />
                                    {t('home.ctaPrimary')}
                                </Button>
                            </Link>
                            <Link href="/coming-soon">
                                <Button size="lg" variant="ghost" className="w-full sm:w-auto hover:text-primary transition-colors duration-300 underline-offset-4 hover:underline">
                                    <Upload className="mr-2 w-4 h-4" />
                                    {t('home.ctaSecondary')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Animated Resumes */}
                    <div className="hidden lg:block relative z-10 animate-[fade-in_0.5s_ease-out]">
                        <HeroResumesWrapper />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold mb-4">{t('features.sectionTitle')}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-300 border-white/20">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <Wand2 className="w-6 h-6" />
                            </div>
                            <CardTitle>{t('features.aiParsing.title')}</CardTitle>
                            <CardDescription>
                                {t('features.aiParsing.description')}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-300 border-white/20">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                                <FileText className="w-6 h-6" />
                            </div>
                            <CardTitle>{t('features.premiumTemplates.title')}</CardTitle>
                            <CardDescription>
                                {t('features.premiumTemplates.description')}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-300 border-white/20">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <CardTitle>{t('features.instantSharing.title')}</CardTitle>
                            <CardDescription>
                                {t('features.instantSharing.description')}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 container mx-auto px-6 py-20 border-t border-gray-100">
                <h2 className="text-3xl font-display font-bold text-center mb-16">{t('howItWorks.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-3xl bg-white shadow-lg shadow-gray-200/50 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                            <MousePointerClick className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{t('howItWorks.chooseTemplate.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">{t('howItWorks.chooseTemplate.description')}</p>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-3xl bg-white shadow-lg shadow-gray-200/50 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                            <Keyboard className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{t('howItWorks.enterDetails.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">{t('howItWorks.enterDetails.description')}</p>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-3xl bg-white shadow-lg shadow-gray-200/50 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                            <Download className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{t('howItWorks.downloadPdf.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">{t('howItWorks.downloadPdf.description')}</p>
                    </div>
                </div>
            </section>

            {/* Template Slider */}
            <section className="relative z-10 w-full bg-slate-50/50 border-y border-gray-100 py-20">
                <div className="container mx-auto px-6 mb-10 text-center">
                    <h2 className="text-3xl font-display font-bold mb-4">{t('home.chooseTemplate.title')}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t('home.chooseTemplate.subtitle')}</p>
                </div>
                <TemplateSliderLazy />
            </section>

            {/* Why a Great Resume Matters */}
            <section className="relative z-10 container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">
                        {t('whyResumeMatters.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('whyResumeMatters.titleHighlight')}</span>
                    </h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                        {t('whyResumeMatters.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                                <Timer className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('whyResumeMatters.sixSeconds.title')}</h3>
                            <p className="text-muted-foreground text-sm">{t('whyResumeMatters.sixSeconds.description')}</p>
                        </div>
                        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Bot className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('whyResumeMatters.beatAts.title')}</h3>
                            <p className="text-muted-foreground text-sm">{t('whyResumeMatters.beatAts.description')}</p>
                        </div>
                        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('whyResumeMatters.standOut.title')}</h3>
                            <p className="text-muted-foreground text-sm">{t('whyResumeMatters.standOut.description')}</p>
                        </div>
                        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('whyResumeMatters.higherSalary.title')}</h3>
                            <p className="text-muted-foreground text-sm">{t('whyResumeMatters.higherSalary.description')}</p>
                        </div>
                    </div>
                </div>
            </section>



            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    'mainEntity': [
                        {
                            '@type': 'Question',
                            'name': t('faq.q1.question'),
                            'acceptedAnswer': {
                                '@type': 'Answer',
                                'text': t('faq.q1.answer')
                            }
                        },
                        {
                            '@type': 'Question',
                            'name': t('faq.q2.question'),
                            'acceptedAnswer': {
                                '@type': 'Answer',
                                'text': t('faq.q2.answer')
                            }
                        },
                        {
                            '@type': 'Question',
                            'name': t('faq.q3.question'),
                            'acceptedAnswer': {
                                '@type': 'Answer',
                                'text': t('faq.q3.answer')
                            }
                        },
                        {
                            '@type': 'Question',
                            'name': t('faq.q4.question'),
                            'acceptedAnswer': {
                                '@type': 'Answer',
                                'text': t('faq.q4.answer')
                            }
                        },
                        {
                            '@type': 'Question',
                            'name': t('faq.q5.question'),
                            'acceptedAnswer': {
                                '@type': 'Answer',
                                'text': t('faq.q5.answer')
                            }
                        }
                    ]
                }}
            />
            {/* FAQ Section */}
            <section className="relative z-10 container mx-auto px-6 py-24">
                <h2 className="text-3xl font-display font-bold text-center mb-4">{t('faq.title')}</h2>
                <p className="text-center text-muted-foreground mb-12">{t('faq.subtitle')}</p>

                <div className="max-w-3xl mx-auto space-y-4">
                    <details className="group glass-card rounded-xl p-6 cursor-pointer">
                        <summary className="flex justify-between items-center font-semibold text-lg list-none">
                            {t('faq.q1.question')}
                            <span className="text-primary transition-transform group-open:rotate-45 text-2xl">+</span>
                        </summary>
                        <p className="mt-4 text-muted-foreground">{t('faq.q1.answer')}</p>
                    </details>

                    <details className="group glass-card rounded-xl p-6 cursor-pointer">
                        <summary className="flex justify-between items-center font-semibold text-lg list-none">
                            {t('faq.q2.question')}
                            <span className="text-primary transition-transform group-open:rotate-45 text-2xl">+</span>
                        </summary>
                        <p className="mt-4 text-muted-foreground">{t('faq.q2.answer')}</p>
                    </details>

                    <details className="group glass-card rounded-xl p-6 cursor-pointer">
                        <summary className="flex justify-between items-center font-semibold text-lg list-none">
                            {t('faq.q3.question')}
                            <span className="text-primary transition-transform group-open:rotate-45 text-2xl">+</span>
                        </summary>
                        <p className="mt-4 text-muted-foreground">{t('faq.q3.answer')}</p>
                    </details>

                    <details className="group glass-card rounded-xl p-6 cursor-pointer">
                        <summary className="flex justify-between items-center font-semibold text-lg list-none">
                            {t('faq.q4.question')}
                            <span className="text-primary transition-transform group-open:rotate-45 text-2xl">+</span>
                        </summary>
                        <p className="mt-4 text-muted-foreground">{t('faq.q4.answer')}</p>
                    </details>

                    <details className="group glass-card rounded-xl p-6 cursor-pointer">
                        <summary className="flex justify-between items-center font-semibold text-lg list-none">
                            {t('faq.q5.question')}
                            <span className="text-primary transition-transform group-open:rotate-45 text-2xl">+</span>
                        </summary>
                        <p className="mt-4 text-muted-foreground">{t('faq.q5.answer')}</p>
                    </details>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative z-10 container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#06b6d4]/20 to-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                            {t('cta.title')}<span className="text-[#facc15]">?</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            {t('cta.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/templates">
                                <Button size="lg" variant="default" className="relative overflow-hidden group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
                                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                                    <Sparkles className="mr-2 w-5 h-5" />
                                    {t('cta.button')}
                                </Button>
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground mt-6">{t('cta.trustSignals')}</p>
                    </div>
                </div>
            </section>

        </main>
    );
}
