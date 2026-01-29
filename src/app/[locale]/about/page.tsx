import { useTranslations } from 'next-intl';
import { GradientBlobs } from '@/components/GradientBlobs';

export default function AboutPage() {
    const t = useTranslations('aboutPage');

    return (
        <main className="min-h-screen relative overflow-hidden bg-white dark:bg-zinc-950">
            <GradientBlobs />

            {/* Hero Section */}
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

                {/* Mission */}
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
                    <div className="order-1 md:order-2 relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                        {/* Abstract visual */}
                        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
                    </div>
                </div>

                {/* Team / Expertise */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#06b6d4]/5 to-blue-500/5 border border-[#06b6d4]/10">
                        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
                    </div>
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{t('teamTitle')}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('teamText')}
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
