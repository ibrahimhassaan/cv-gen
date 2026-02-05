import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function PrivacyPage() {
    const t = await getTranslations('privacyPage');

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6 pb-2">
                        {t('title')}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {t('lastUpdated')}: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-sm">
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
                        <p className="lead">
                            {t('intro')}
                        </p>

                        <div className="my-12 h-px bg-border/50" />

                        <section>
                            <h2>{t('section1Title')}</h2>
                            <p>
                                {t('section1Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section2Title')}</h2>
                            <h3>{t('section2Subtitle1')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t.raw('section2Content1') }} />

                            <h3 className="mt-8">{t('section2Subtitle2')}</h3>
                            <p>
                                {t('section2Content2')}
                            </p>

                            <h3 className="mt-8">{t('section2Subtitle3')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t.raw('section2Content3') }} />
                        </section>

                        <section className="mt-12">
                            <h2>{t('section3Title')}</h2>
                            <p>
                                {t('section3Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section4Title')}</h2>
                            <p dangerouslySetInnerHTML={{ __html: t.raw('section4Content1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t.raw('section4Content2') }} />
                        </section>

                        <section className="mt-12">
                            <h2>{t('section5Title')}</h2>
                            <p>
                                {t('section5Content')}
                            </p>
                        </section>

                        <div className="my-12 h-px bg-border/50" />

                        <section>
                            <h2>{t('section6Title')}</h2>
                            <p>
                                {t('section6Content')}
                            </p>
                            <ul className="list-none pl-0">
                                <li>
                                    <Link href="/contact" className="inline-flex items-center gap-2 no-underline text-primary hover:text-primary/80 font-medium group">
                                        <span>{t('contactLink')}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
