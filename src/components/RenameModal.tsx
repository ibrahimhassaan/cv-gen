"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { X, Check } from "lucide-react";

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRename: (newTitle: string) => Promise<void>;
    currentTitle: string;
}

export function RenameModal({
    isOpen,
    onClose,
    onRename,
    currentTitle,
}: RenameModalProps) {
    const t = useTranslations('modals.rename');
    const [title, setTitle] = useState(currentTitle);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onRename(title);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="glass-card relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                    <X className="h-5 w-5 text-gray-500" />
                </button>

                <h2 className="mb-4 text-2xl font-bold text-gray-900 font-display">{t('title')}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t('placeholder')}
                            className="bg-gray-50/50 border-gray-200 text-lg"
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {t('cancel')}
                        </Button>
                        <Button type="submit" disabled={loading || !title.trim()}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    {t('saving')}
                                </span>
                            ) : (
                                t('save')
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
