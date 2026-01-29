"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { useAuth, SignInModal } from "@/features/auth";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Extracted NavLinks component to prevent re-creation and handle closing
const NavLinks = ({
    mobile = false,
    locale,
    t,
    user,
    onNavigate
}: {
    mobile?: boolean;
    locale: string;
    t: any;
    user: any;
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
            <Link href={`/${locale}/create/manual`} className={className} onClick={handleClick}>
                {t('resume')}
            </Link>
            <Link href={`/${locale}/templates`} className={className} onClick={handleClick}>
                {t('templates')}
            </Link>
            {user && (
                <Link href={`/${locale}/dashboard`} className={className} onClick={handleClick}>
                    {t('dashboard') || 'Dashboard'}
                </Link>
            )}
        </>
    );
};

export function Navbar() {
    const t = useTranslations('nav');
    const tLang = useTranslations('language');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, signOut } = useAuth();
    const [showSignIn, setShowSignIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
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

    const handleSignOut = async () => {
        await signOut();
        router.push(`/${locale}`);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />

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
                        <NavLinks locale={locale} t={t} user={user} />
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
                            <div className="absolute right-0 mt-1 py-2 w-40 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-border/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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
                            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
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
                                <div className="absolute right-0 mt-1 py-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-border/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="px-4 py-2 border-b border-border/40">
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
                                        {t('dashboard')}
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {t('signOut')}
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

                    {/* Mobile Menu Button - Z-index must be higher than overlay */}
                    <button
                        className="md:hidden p-2 text-foreground z-[120] relative"
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
                                user={user}
                                onNavigate={() => setIsMobileMenuOpen(false)}
                            />

                            <div className="w-full h-px bg-gray-100 max-w-xs" />

                            {/* Mobile Auth & Language */}
                            <div className="flex flex-col items-center space-y-6">
                                <div className="flex items-center space-x-4">
                                    {locales.map((loc) => (
                                        <button
                                            key={loc}
                                            onClick={() => switchLocale(loc)}
                                            className={`text-sm uppercase font-medium px-3 py-1 rounded-full transition-colors ${locale === loc ? 'bg-primary/10 text-primary' : 'text-slate-500'
                                                }`}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>

                                {user ? (
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="flex items-center space-x-3">
                                            {user.user_metadata?.avatar_url ? (
                                                <img
                                                    src={user.user_metadata.avatar_url}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-primary" />
                                                </div>
                                            )}
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                                </p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            {t('signOut')}
                                        </button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="w-full max-w-xs font-medium"
                                        onClick={() => {
                                            setShowSignIn(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {t('login')}
                                    </Button>
                                )}

                                <Link href={`/${locale}/create/manual`}>
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
