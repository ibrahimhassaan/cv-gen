"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "default";
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText,
    cancelText,
    variant = "default",
}: ConfirmModalProps) {
    const t = useTranslations('common');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="glass-card relative z-10 w-full max-w-sm rounded-3xl border border-white/30 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                    <X className="h-5 w-5 text-gray-500" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>

                    <h2 className="mb-2 text-xl font-bold text-gray-900 font-display">{title}</h2>
                    <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex w-full gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1"
                        >
                            {cancelText || t('cancel')}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30' : ''}`}
                        >
                            {confirmText || t('confirm')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
