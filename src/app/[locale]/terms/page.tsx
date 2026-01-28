import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function TermsPage() {
    const t = await getTranslations('termsPage');

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
                                {t('section1Content1')}
                            </p>
                            <p>
                                {t('section1Content2')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section2Title')}</h2>
                            <p>
                                {t('section2Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section3Title')}</h2>
                            <p>
                                {t('section3Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section4Title')}</h2>
                            <p>
                                {t('section4Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section5Title')}</h2>
                            <p>
                                {t('section5Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section6Title')}</h2>
                            <p>
                                {t('section6Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section7Title')}</h2>
                            <p>
                                {t('section7Content')}
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2>{t('section8Title')}</h2>
                            <p>
                                {t('section8Content')}
                            </p>
                        </section>

                        <div className="my-12 h-px bg-border/50" />

                        <section>
                            <h2>{t('section9Title')}</h2>
                            <p>
                                {t('section9Content')}
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
