"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileText, User, LogOut, LayoutDashboard } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { useAuth, SignInModal } from "@/features/auth";
import { useState } from "react";

export function Navbar() {
    const t = useTranslations('nav');
    const tLang = useTranslations('language');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, signOut } = useAuth();
    const [showSignIn, setShowSignIn] = useState(false);

    const switchLocale = (newLocale: Locale) => {
        // Remove current locale prefix and add new one
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    const handleSignOut = async () => {
        await signOut();
        router.push(`/${locale}`);
    };

    return (
        <>
            <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />

            <nav className="sticky top-0 z-50 w-full bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href={`/${locale}`} className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold font-display tracking-tight hover:opacity-80 transition-opacity">
                            {t('brandName')}
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href={`/${locale}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {t('home')}
                        </Link>
                        <Link href={`/${locale}/create/manual`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {t('resume')}
                        </Link>
                        <Link href={`/${locale}/templates`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {t('templates')}
                        </Link>
                        {user && (
                            <Link href={`/${locale}/dashboard`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                {t('dashboard') || 'Dashboard'}
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Language Switcher */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">
                                <span className="uppercase">{locale}</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-1 py-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {locales.map((loc) => (
                                    <button
                                        key={loc}
                                        onClick={() => switchLocale(loc)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 transition-colors ${locale === loc ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                                    >
                                        {tLang(loc)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Auth Section */}
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-gray-200 border-t-primary rounded-full animate-spin" />
                        ) : user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                                    {user.user_metadata?.avatar_url ? (
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                            <User className="w-4 h-4 text-primary" />
                                        </div>
                                    )}
                                    <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-1 py-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium truncate">
                                            {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href={`/${locale}/dashboard`}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="font-medium"
                                onClick={() => setShowSignIn(true)}
                            >
                                {t('login')}
                            </Button>
                        )}

                        <Link href={`/${locale}/create/manual`}>
                            <Button variant="default" size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                {t('getStarted')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
