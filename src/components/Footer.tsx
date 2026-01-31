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
                            {t('description')}
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <a href="https://www.facebook.com/cvgenfy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>

                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-foreground">{t('product')}</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            <li>
                                <Link href={`/${locale}/templates`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('templates')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/resume-builder`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {t('createResume')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-foreground">{t('legalSupport')}</h3>
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
                    {t('copyright', { year: new Date().getFullYear() })}
                </p>
            </div>
        </footer>

    );
}
