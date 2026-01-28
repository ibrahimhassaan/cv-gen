"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResumeProvider, useResume } from "@/features/editor/ResumeContext";
import { EditorForm } from "@/features/editor/EditorForm";
import { TemplateSelector } from "@/features/templates/TemplateSelector";
import { getTemplate } from "@/features/templates/registry";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Download, Share2, LayoutTemplate, RotateCcw, Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { GradientBlobs } from "@/components/GradientBlobs";
import { useTranslations } from "next-intl";
import { useAuth, SignInModal } from "@/features/auth";
import { setPendingAction, generateShareableLink } from "@/lib/resumeStorage";
import { saveResume, getResume } from "@/lib/resumeService";
import { ShareModal } from "@/components/ShareModal";

function BuilderContent() {
    const { resumeData, setResumeData } = useResume();
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const templateRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<"editor" | "templates">("editor");
    const [showSignIn, setShowSignIn] = useState(false);
    const [pendingActionType, setPendingActionType] = useState<"download" | "share" | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const t = useTranslations('editor');

    // ... (existing code)

    // Handle download click using html2pdf
    const handleDownloadClick = async () => {
        setIsDownloading(true);
        try {
            if (user) {
                // User is authenticated - save and download
                await saveResume(resumeData, user.id);

                if (templateRef.current) {
                    const element = templateRef.current;
                    const opt = {
                        margin: 0,
                        filename: `${resumeData.personalInfo.fullName || "Resume"}_CV.pdf`,
                        image: { type: 'jpeg' as const, quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
                    };

                    // Dynamic import for html2pdf
                    const html2pdf = (await import('html2pdf.js')).default;
                    await html2pdf().set(opt).from(element).save();
                }
            } else {
                // Show sign in modal and set pending action
                setPendingActionType("download");
                setPendingAction("download", resumeData);
                setShowSignIn(true);
            }
        } catch (error) {
            console.error("Download failed", error);
        } finally {
            setIsDownloading(false);
        }
    };

    // Handle share click
    const handleShareClick = async () => {
        setIsSharing(true);
        try {
            if (user) {
                // User is authenticated - save and show share modal
                // IMPORTANT: We must wait for the save to complete and get the returned resume
                // because it might have a new UUID if it was previously "default"
                const savedResume = await saveResume(resumeData, user.id);

                // Update local state with the new ID so future actions work correctly
                setResumeData(savedResume);

                const link = generateShareableLink(savedResume);
                setShareUrl(link);
                setShowShareModal(true);
            } else {
                // Show sign in modal and set pending action
                setPendingActionType("share");
                setPendingAction("share", resumeData);
                setShowSignIn(true);
            }
        } catch (error) {
            console.error("Share failed", error);
        } finally {
            setIsSharing(false);
        }
    };

    // Simple reset for demo
    const handleReset = () => { if (confirm(t('resetConfirm'))) window.location.reload(); };

    const TemplateComponent = getTemplate(resumeData.templateId).component;

    return (
        <div className="relative min-h-[calc(100vh-80px)]">
            {/* Background Animation */}
            <GradientBlobs />

            {/* Sign In Modal */}
            <SignInModal
                isOpen={showSignIn}
                onClose={() => {
                    setShowSignIn(false);
                    setPendingActionType(null);
                    setPendingAction(null);
                }}
            />

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                shareUrl={shareUrl}
            />

            <div className="flex min-h-[calc(100vh-80px)] container mx-auto p-4 gap-6 relative z-10">
                {/* Left Side: Editor Form */}
                <div className={cn(
                    "flex flex-col transition-all duration-500 ease-in-out",
                    view === "editor" ? "w-full lg:w-[55%]" : "w-full lg:w-[45%]"
                )}>
                    <div className="glass-card rounded-3xl border border-white/40 shadow-1xl flex flex-col backdrop-blur-xl bg-white/60 supports-[backdrop-filter]:bg-white/40 h-[calc(100vh-120px)]">
                        <div className="w-full px-4 py-2 border-b border-white/20 flex-shrink-0">
                            <div className="flex justify-between items-center gap-4">
                                {view === "templates" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setView("editor")}
                                        className="rounded-full hover:bg-white/50"
                                    >
                                        ← {t('back')}
                                    </Button>
                                )}
                                <h2 className="text-md font-bold font-display text-gray-700 text-center">
                                    {view === "editor" ? t('editor') : t('selectTemplate')}
                                </h2>
                                <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    {t('reset')}
                                </Button>
                            </div>
                        </div>

                        <div className={cn("flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent")}>
                            <div className="px-4 py-2 min-h-full">
                                {view === "editor" ? (
                                    <EditorForm
                                        onDownload={handleDownloadClick}
                                        isDownloading={isDownloading}
                                    />
                                ) : (
                                    <div className="h-full flex flex-col">
                                        <TemplateSelector />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Side: Live Preview */}
                <div className={cn(
                    "hidden lg:flex flex-col items-center transition-all duration-500 ease-in-out",
                    view === "editor" ? "w-[45%]" : "w-[55%]"
                )}>
                    <div className="w-full glass-card rounded-3xl border border-white/30 shadow-2xl flex flex-col backdrop-blur-md h-[calc(100vh-120px)]">
                        {/* Toolbar */}
                        <div className="p-4 border-b border-white/10 flex justify-end gap-3 z-10 bg-white/10 backdrop-blur-sm flex-shrink-0">
                            {view === "editor" && (
                                <Button
                                    variant="outline"
                                    size="xs"
                                    className="px-2 py-1 bg-white/50 border-white/40 hover:bg-white/80 shadow-sm backdrop-blur-sm"
                                    onClick={() => setView("templates")}
                                >
                                    <LayoutTemplate className="w-4 h-4 mr-2" />
                                    {t('switchTemplate')}
                                </Button>
                            )}
                            <Button
                                onClick={handleDownloadClick}
                                variant="default"
                                size="xs"
                                className="px-2 py-1 shadow-lg shadow-primary/20"
                                disabled={isDownloading}
                            >
                                {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                                {t('pdf')}
                            </Button>
                            <Button onClick={handleShareClick} variant="secondary" size="xs" className="px-2 py-1 shadow-md bg-white/80 hover:bg-white">
                                <Share2 className="w-4 h-4 mr-2" /> {t('share')}
                            </Button>
                        </div>

                        {/* Preview Area */}
                        <div className="w-full flex justify-center px-8 py-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            <div className={cn(
                                "origin-top transform transition-transform duration-500 shadow-2xl h-fit rounded-[2px] ring-1 ring-black/5 mb-8",
                                view === "editor"
                                    ? "scale-[0.55] xl:scale-[0.65] 2xl:scale-[0.75]"
                                    : "scale-[0.65] xl:scale-[0.75] 2xl:scale-[0.85]"
                            )}>
                                <div ref={templateRef} className="w-[210mm] bg-white shadow-2xl">
                                    <TemplateComponent data={resumeData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <ResumeProvider>
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <BuilderContent />
            </Suspense>
        </ResumeProvider>
    );
}
