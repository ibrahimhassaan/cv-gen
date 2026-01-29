"use client";

import { Check, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    shareUrl: string;
}

export function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
    const t = useTranslations('modals.share');
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md mx-4 glass-card rounded-3xl p-8 shadow-2xl border border-white/30 animate-[slide-up_0.3s_ease-out] bg-white">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold font-display mb-2 text-gray-900">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground">
                        {t('description')}
                    </p>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600 truncate font-mono">
                        {shareUrl}
                    </div>
                    <Button
                        onClick={handleCopy}
                        className="gap-2 shrink-0"
                        variant={copied ? "default" : "secondary"}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? t('copied') : t('copy')}
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
                        {t('close')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
