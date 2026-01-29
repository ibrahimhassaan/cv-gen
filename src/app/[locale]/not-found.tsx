import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
    const t = useTranslations('notFound');
    const locale = useLocale();

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center z-10 px-6">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-destructive/10 text-destructive mb-6">
                    <SearchX className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8 text-lg">
                    {t('message')}
                </p>
                <Link href={`/${locale}`}>
                    <Button>
                        <Home className="mr-2 w-4 h-4" />
                        {t('returnHome')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
