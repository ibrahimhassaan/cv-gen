"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className="relative z-10 border-t border-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href={`/${locale}`} className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            cvGenfy
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                            {/* Assuming we might want to translate this too later, but keeping static for now or adding key?
                               Current json doesn't have this long text. Keeping static english or moving to json?
                               The user didn't ask to translate this specifically, but good practice.
                               I'll leave it static for now to minimize changes, or check if user edited it recently.
                               User edited it to 'cvGenfy'. */}
                            Create professional, ATS-friendly resumes in minutes. Choose from our premium templates and land your dream job.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-foreground">Product</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            <li>
                                <Link href={`/${locale}/templates`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {/* Using nav keys or templates keys? 'templates' key exists in nav */}
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/create/manual`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Create Resume
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-foreground">Legal & Support</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            <li>
                                <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('about')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('terms')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-border border-t-gray-200 pt-8">
                <p className="text-xs text-muted-foreground text-center">
                    {t('copyright')}
                </p>
            </div>
        </footer>

    );
}
