"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Rocket, CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { subscribeToFeature } from "@/features/subscription/actions";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";

function SubmitButton({ t }: { t: any }) {
    const { pending } = useFormStatus();
    return (
        <Button
            disabled={pending}
            type="submit"
            variant="default"
            className="w-full sm:w-auto"
        >
            {pending ? t('subscribing') : t('notifyMe')}
        </Button>
    );
}

export default function ComingSoon() {
    const t = useTranslations('comingSoon');
    const locale = useLocale();
    const [state, formAction] = useActionState(subscribeToFeature, {});
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (state.success) {
            setInputValue("");
        }
    }, [state.success]);

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center z-10 px-6 max-w-lg w-full">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-6 animate-pulse">
                    <Rocket className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground mx-auto mb-8 text-lg">
                    {t('subtitle')}
                </p>

                <div className="bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl mb-8">
                    <form action={formAction} className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="email"
                            name="email"
                            placeholder={t('emailPlaceholder')}
                            required
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-white/80"
                        />
                        <input type="hidden" name="source" value="improve-resume" />
                        <SubmitButton t={t} />
                    </form>

                    {state.success && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {state.message || t('success')}
                        </div>
                    )}

                    {state.error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4" />
                            {state.error}
                        </div>
                    )}
                </div>

                <Link href={`/${locale}`}>
                    <Button variant="ghost" className="hover:bg-white/10">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        {t('backHome')}
                    </Button>
                </Link>
            </div>
        </main>
    );
}
