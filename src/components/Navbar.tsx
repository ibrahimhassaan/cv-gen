"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileText, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NavLinks = ({
    mobile = false,
    locale,
    t,
    onNavigate
}: {
    mobile?: boolean;
    locale: string;
    t: (key: string) => string;
    onNavigate?: () => void;
}) => {
    const handleClick = () => {
        if (onNavigate) onNavigate();
    };

    const baseClass = "font-medium hover:text-primary transition-colors";
    const mobileClass = "text-lg py-2 text-slate-800";
    const desktopClass = "text-sm text-muted-foreground";

    const className = cn(baseClass, mobile ? mobileClass : desktopClass);

    return (
        <>
            <Link href={`/${locale}`} className={className} onClick={handleClick}>
                {t('home')}
            </Link>
            <Link href={`/${locale}/resume-builder`} className={className} onClick={handleClick}>
                {t('resume')}
            </Link>
            <Link href={`/${locale}/templates`} className={className} onClick={handleClick}>
                {t('templates')}
            </Link>
            <SignedIn>
                <Link href={`/${locale}/dashboard`} className={className} onClick={handleClick}>
                    {t('dashboard') || 'Dashboard'}
                </Link>
            </SignedIn>
        </>
    );
};

export function Navbar() {
    const t = useTranslations('nav');
    const tLang = useTranslations('language');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    // Close mobile menu when route changes
    useEffect(() => {
        const timer = setTimeout(() => setIsMobileMenuOpen(false), 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const switchLocale = (newLocale: Locale) => {
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        router.push(`/${newLocale}${pathWithoutLocale}`);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={cn(
                "sticky top-0 z-[100] w-full border-b border-gray-200 transition-colors duration-300",
                isMobileMenuOpen ? "bg-white" : "bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20"
            )}>
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href={`/${locale}`} className="flex items-center space-x-2 z-[120] relative" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold font-display tracking-tight hover:opacity-80 transition-opacity text-foreground">
                            {t('brandName')}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLinks locale={locale} t={t} />
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
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
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${locale === loc ? 'text-primary font-medium' : 'text-slate-600'}`}
                                    >
                                        {tLang(loc)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Auth Section */}
                        <SignedOut>
                            <SignInButton mode="modal" forceRedirectUrl={`/${locale}/dashboard`}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="font-medium text-slate-600 hover:text-primary"
                                >
                                    {t('login')}
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl={`/${locale}`} />
                        </SignedIn>

                        <Link href={`/${locale}/resume-builder`}>
                            <Button variant="default" size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                {t('getStarted')}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Z-index must be higher than overlay */}
                    <button
                        className="md:hidden p-2 text-slate-900 z-[120] relative"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div
                        className={`fixed inset-0 z-[110] md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                            }`}
                        style={{
                            top: '0px',
                            backgroundColor: '#ffffff', // Force white background
                            height: '100dvh' // Force full viewport height
                        }}
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 pt-20">
                            <NavLinks
                                mobile
                                locale={locale}
                                t={t}
                                onNavigate={() => setIsMobileMenuOpen(false)}
                            />

                            <div className="w-full h-px bg-gray-100 max-w-xs" />

                            {/* Mobile Auth & Language */}
                            <div className="flex flex-col items-center space-y-6">
                                <div className="flex items-center space-x-4">
                                    {locales.map((loc) => {
                                        const flags: Record<string, string> = {
                                            en: "🇺🇸",
                                            de: "🇩🇪",
                                            id: "🇮🇩",
                                            hi: "🇮🇳"
                                        };
                                        return (
                                            <button
                                                key={loc}
                                                onClick={() => switchLocale(loc)}
                                                className={`text-2xl px-3 py-1 rounded-full transition-all hover:scale-110 ${locale === loc ? 'bg-primary/10 ring-2 ring-primary/20 scale-110' : 'hover:bg-slate-50'
                                                    }`}
                                                title={tLang(loc)}
                                            >
                                                {flags[loc]}
                                            </button>
                                        );
                                    })}
                                </div>

                                <SignedOut>
                                    <SignInButton mode="modal" forceRedirectUrl={`/${locale}/dashboard`}>
                                        <Button
                                            variant="ghost"
                                            size="lg"
                                            className="w-full max-w-xs font-medium"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t('login')}
                                        </Button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton afterSignOutUrl={`/${locale}`} />
                                </SignedIn>

                                <Link href={`/${locale}/resume-builder`}>
                                    <Button variant="default" size="lg" className="w-full rounded-full shadow-lg shadow-primary/20" onClick={() => setIsMobileMenuOpen(false)}>
                                        {t('getStarted')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
