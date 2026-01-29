"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResumeProvider, useResume } from "@/features/editor/ResumeContext";
import { EditorForm } from "@/features/editor/EditorForm";
import { TemplateSelector } from "@/features/templates/TemplateSelector";
import { getTemplate } from "@/features/templates/registry";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Download, Share2, LayoutTemplate, RotateCcw, Loader2, Eye, ChevronLeft } from "lucide-react";
import { GradientBlobs } from "@/components/GradientBlobs";
import { useTranslations } from "next-intl";
import { useUser, useClerk } from "@clerk/nextjs";
import { setPendingAction, generateShareableLink } from "@/lib/resumeStorage";
import { saveResume, getResume } from "@/lib/resumeService";
import { ShareModal } from "@/components/ShareModal";
import { ConfirmModal } from "@/components/ConfirmModal";

import { ResumeData } from "@/features/editor/types";

interface PreviewWrapperProps {
    view: "editor" | "templates" | "preview";
    resumeData: ResumeData;
    templateRef: React.RefObject<HTMLDivElement | null>;
    TemplateComponent: React.ComponentType<{ data: ResumeData }>;
}

function PreviewWrapper({
    view,
    resumeData,
    templateRef,
    TemplateComponent
}: PreviewWrapperProps) {
    const [scale, setScale] = useState(0.55);
    const [height, setHeight] = useState(0);

    // Calculate scale on resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (view === "editor") {
                if (width >= 1536) setScale(0.75);
                else if (width >= 1280) setScale(0.65);
                else setScale(0.55);
            } else if (view === "templates") {
                if (width >= 1536) setScale(0.85);
                else if (width >= 1280) setScale(0.75);
                else setScale(0.65);
            } else {
                // Preview mode (mostly for mobile)
                const containerWidth = width - 48; // accounting for padding
                // 210mm is approx 794px
                const targetScale = containerWidth / 794;
                setScale(Math.min(targetScale, 0.6));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [view]);

    // Measure height
    useEffect(() => {
        const element = templateRef.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [templateRef, resumeData]);

    return (
        <div
            style={{
                transform: `scale(${scale})`,
                marginBottom: `-${height * (1 - scale)}px`
            }}
            className="origin-top transition-all duration-500 shadow-2xl h-fit rounded-[2px] ring-1 ring-black/5 mb-8"
        >
            <div ref={templateRef} className="w-[210mm] bg-white shadow-2xl min-h-[297mm]">
                <TemplateComponent data={resumeData} />
            </div>
        </div>
    );
}

function BuilderContent() {
    const { resumeData, setResumeData } = useResume();
    const { user, isLoaded: loading } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const templateRef = useRef<HTMLDivElement>(null);
    const mobileTemplateRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<"editor" | "templates" | "preview">("editor");
    const [showSignIn, setShowSignIn] = useState(false);
    const [pendingActionType, setPendingActionType] = useState<"download" | "share" | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const t = useTranslations('editor');
    const tReset = useTranslations('modals.reset');

    // ... (existing code)

    // Handle download click using html-to-image and jsPDF
    const handleDownloadClick = async () => {
        setIsDownloading(true);
        try {
            if (user) {
                // User is authenticated - save and download
                await saveResume(resumeData, user.id);

                // Determine which ref to use based on view and screen width
                const isMobile = window.innerWidth < 1024;
                const activeRef = (view === "preview" && isMobile) ? mobileTemplateRef : templateRef;

                if (activeRef.current) {
                    // Check if we need to dynamic import to avoid SSR issues
                    const { toPng } = await import('html-to-image');
                    const { jsPDF } = await import('jspdf');

                    const element = activeRef.current;

                    // Generate high-quality image from the element
                    // pixelRatio 2 ensures good quality for print
                    const dataUrl = await toPng(element, { quality: 0.95, pixelRatio: 2 });

                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });

                    const imgProps = pdf.getImageProperties(dataUrl);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`${resumeData.personalInfo.fullName || "Resume"}_Resume.pdf`);
                }
            } else {
                // Show Clerk sign in and set pending action
                setPendingActionType("download");
                setPendingAction("download", resumeData);
                openSignIn();
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
                // Show Clerk sign in and set pending action
                setPendingActionType("share");
                setPendingAction("share", resumeData);
                openSignIn();
            }
        } catch (error) {
            console.error("Share failed", error);
        } finally {
            setIsSharing(false);
        }
    };

    // Simple reset for demo
    const handleResetClick = () => { setShowResetConfirm(true); };
    const handleResetConfirm = () => { window.location.reload(); };

    const TemplateComponent = getTemplate(resumeData.templateId).component;

    return (
        <div className="relative min-h-[calc(100vh-80px)]">
            {/* Background Animation */}
            <GradientBlobs />

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                shareUrl={shareUrl}
            />

            {/* Reset Confirmation Modal */}
            <ConfirmModal
                isOpen={showResetConfirm}
                onClose={() => setShowResetConfirm(false)}
                onConfirm={handleResetConfirm}
                title={tReset('title')}
                description={tReset('description')}
                confirmText={tReset('confirm')}
                variant="danger"
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
                                {(view === "templates" || view === "preview") && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setView("editor")}
                                        className="rounded-full hover:bg-white/50"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t('back')}
                                    </Button>
                                )}
                                <h2 className="text-md font-bold font-display text-gray-700 text-center flex-1">
                                    {view === "editor" ? t('editor') : view === "templates" ? t('selectTemplate') : t('preview')}
                                </h2>

                                {view === "editor" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setView("preview")}
                                        className="lg:hidden text-primary hover:bg-primary/10 rounded-full"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        {t('preview')}
                                    </Button>
                                )}

                                <Button variant="ghost" size="sm" onClick={handleResetClick} className="text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full">
                                    <RotateCcw className="w-4 h-4" />
                                    <span className="hidden sm:inline ml-2">{t('reset')}</span>
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
                                ) : view === "templates" ? (
                                    <div className="h-full flex flex-col">
                                        <TemplateSelector />
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col relative">
                                        {/* Mobile Preview Toolbar */}
                                        <div className="flex justify-center gap-2 mb-4 sticky top-0 bg-white/50 backdrop-blur-sm p-2 z-10 rounded-lg">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setView("templates")}
                                                className="shadow-sm bg-white"
                                            >
                                                <LayoutTemplate className="w-4 h-4 mr-2" />
                                                {t('switchTemplate')}
                                            </Button>
                                            <Button
                                                onClick={handleDownloadClick}
                                                variant="default"
                                                size="sm"
                                                className="shadow-lg shadow-primary/20"
                                                disabled={isDownloading}
                                            >
                                                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                                                {t('pdf')}
                                            </Button>
                                        </div>
                                        <div className="flex-grow overflow-y-auto flex justify-center pb-20">
                                            <PreviewWrapper
                                                view={view}
                                                resumeData={resumeData}
                                                templateRef={mobileTemplateRef}
                                                TemplateComponent={TemplateComponent}
                                            />
                                        </div>
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
                                    size="sm"
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
                                size="sm"
                                className="px-2 py-1 shadow-lg shadow-primary/20"
                                disabled={isDownloading}
                            >
                                {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                                {t('pdf')}
                            </Button>
                            <Button onClick={handleShareClick} variant="secondary" size="sm" className="px-2 py-1 shadow-md bg-white/80 hover:bg-white">
                                <Share2 className="w-4 h-4 mr-2" /> {t('share')}
                            </Button>
                        </div>

                        {/* Preview Area */}
                        <div className="w-full flex justify-center px-8 py-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            <PreviewWrapper view={view} resumeData={resumeData} templateRef={templateRef} TemplateComponent={TemplateComponent} />
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
