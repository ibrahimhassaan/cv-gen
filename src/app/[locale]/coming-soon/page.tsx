import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function ComingSoon() {
    const t = useTranslations('comingSoon');
    const locale = useLocale();

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center z-10 px-6">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-6 animate-pulse">
                    <Rocket className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
                    {t('subtitle')}
                </p>
                <Link href={`/${locale}`}>
                    <Button variant="secondary" className="glass hover:bg-white/10">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        {t('backHome')}
                    </Button>
                </Link>
            </div>
        </main>
    );
}
