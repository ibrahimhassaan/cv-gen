import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";
import { AuthWrapper } from "@/components/AuthWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function NotFound() {
    const messages = await getMessages();

    // Component to use hooks inside the provider
    const NotFoundContent = () => {
        const t = useTranslations('notFound');

        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
                {/* Background Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />

                <div className="z-10 container mx-auto px-4 flex flex-col items-center text-center">
                    {/* Icon wrapper with glow */}
                    <div className="relative mb-8 group">
                        <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full group-hover:bg-destructive/30 transition-all duration-500" />
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-background border border-border rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300">
                            <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16 text-destructive/80" />
                        </div>
                        {/* Decorative small elements */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full blur-md animate-pulse" />
                        <div className="absolute -bottom-1 -left-3 w-6 h-6 bg-blue-500/10 rounded-full blur-md animate-pulse delay-700" />
                    </div>

                    {/* Main Text */}
                    <h1 className="text-7xl sm:text-9xl font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 mb-2">
                        404
                    </h1>

                    <h2 className="text-2xl sm:text-4xl font-semibold mb-6 tracking-tight">
                        {t('title')}
                    </h2>

                    <p className="text-muted-foreground max-w-[500px] text-lg mb-10 leading-relaxed">
                        {t('message')}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            {t('returnHome')}
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95 border border-border/50"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            <span>Go Back</span>
                        </button>
                    </div>
                </div>

                {/* Footer minimal - Keep this as decorative or remove if main footer is enough. 
                Let's keep it as extra error code info. */}
                <div className="absolute bottom-8 text-xs text-muted-foreground/50 uppercase tracking-widest font-mono pointer-events-none">
                    Error Code: 404_PAGE_NOT_FOUND
                </div>
            </div>
        );
    };

    return (
        <NextIntlClientProvider messages={messages}>
            <AuthWrapper>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <NotFoundContent />
                    </main>
                    <FooterWrapper />
                </div>
            </AuthWrapper>
        </NextIntlClientProvider>
    );
}
