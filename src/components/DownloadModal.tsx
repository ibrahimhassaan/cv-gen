"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Download, X } from "lucide-react";

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    resumeName: string;
}

export function DownloadModal({
    isOpen,
    onClose,
    onConfirm,
    resumeName,
}: DownloadModalProps) {
    const t = useTranslations('dashboardPage'); // Using dashboard translations for common terms

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
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

                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                        <Download className="h-6 w-6" />
                    </div>

                    <h2 className="mb-2 text-xl font-bold text-gray-900 font-display">
                        Ready to Download
                    </h2>
                    <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                        Your resume <span className="font-semibold text-gray-700">"{resumeName}"</span> is ready. Click below to download the PDF.
                    </p>

                    <div className="flex w-full gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
