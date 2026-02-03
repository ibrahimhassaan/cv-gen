"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { GradientBlobs } from "@/components/GradientBlobs";
import { LogOut, User, Check } from "lucide-react";
import { loadAllResumes, getPendingAction, generateShareableLink } from "@/lib/resumeStorage";
import { getResumes, saveResume, deleteResume, duplicateResume } from "@/lib/resumeService";
import { getTemplate } from "@/features/templates/registry";
import { ResumeData } from "@/features/editor/types";
import { ShareModal } from "@/components/ShareModal";
import { RenameModal } from "@/components/RenameModal";
import { DownloadModal } from "@/components/DownloadModal";
import { CVCard } from "@/app/[locale]/dashboard/CVCard";
import { CreateCVCard } from "@/app/[locale]/dashboard/CreateCVCard";
import { CVCardSkeleton } from "@/app/[locale]/dashboard/CVCardSkeleton";

export default function DashboardPage() {
    const t = useTranslations('dashboardPage');
    const locale = useLocale();
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const loading = !isLoaded;
    const router = useRouter();
    const [resumes, setResumes] = useState<ResumeData[]>([]);
    const [resumesLoading, setResumesLoading] = useState(true);

    // Modals state
    const [shareData, setShareData] = useState<{ id: string, link: string } | null>(null);
    const [renameData, setRenameData] = useState<ResumeData | null>(null);
    const [pendingDownloadResume, setPendingDownloadResume] = useState<ResumeData | null>(null);

    // For downloading PDF
    const printTemplateRef = useRef<HTMLDivElement>(null);
    const [downloadData, setDownloadData] = useState<ResumeData | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Trigger download when downloadData is set
    useEffect(() => {
        const processDownload = async () => {
            if (downloadData && printTemplateRef.current) {
                try {
                    // Wait for render
                    await new Promise(resolve => setTimeout(resolve, 100));

                    const { toJpeg } = await import('html-to-image');
                    const { jsPDF } = await import('jspdf');

                    const element = printTemplateRef.current;
                    const dataUrl = await toJpeg(element, { quality: 0.85, pixelRatio: 2 });

                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });

                    const imgProps = pdf.getImageProperties(dataUrl);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                    pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`${downloadData.personalInfo.fullName || "Resume"}_Resume.pdf`);

                    // Show success alert
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);

                } catch (error) {
                    console.error("PDF generation failed", error);
                } finally {
                    setDownloadData(null);
                }
            }
        };

        if (downloadData) {
            processDownload();
        }
    }, [downloadData]);

    const onDownload = (resume: ResumeData) => {
        setDownloadData(resume);
    };

    // Check for pending action and load resumes
    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/");
            return;
        }

        const init = async () => {
            try {
                // Check for pending action from OAuth redirect
                const pending = getPendingAction();
                if (pending && pending.resumeData) {
                    const savedResume = await saveResume(pending.resumeData, user.id);

                    // Reload all resumes to include the new one
                    const allResumes = await getResumes(user.id);
                    setResumes(allResumes);

                    // Auto-trigger action
                    if (pending.action === "download") {
                        // Instead of downloading immediately, show the confirmation modal
                        setPendingDownloadResume(savedResume);
                    } else if (pending.action === "share") {
                        handleGenerateLink(savedResume);
                    }
                } else {
                    // Load all resumes
                    const saved = await getResumes(user.id);
                    setResumes(saved);
                }
            } catch (error) {
                console.error("Failed to load resumes:", error);
            } finally {
                setResumesLoading(false);
            }
        };

        init();
    }, [user, loading, router]);

    const handleGenerateLink = async (resume: ResumeData) => {
        if (!user) return;

        // Set expiration to 7 days from now
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
        const updatedResume = {
            ...resume,
            shareConfig: { enabled: true, expiresAt }
        };

        try {
            await saveResume(updatedResume, user.id);
            // Update local state
            setResumes(prev => prev.map(r => r.id === resume.id ? updatedResume : r));

            const link = generateShareableLink(updatedResume);
            setShareData({ id: resume.id, link });
        } catch (error) {
            console.error("Failed to update share config:", error);
            alert(t('errorGenerateLink'));
        }
    };

    const handleDelete = async (resumeId: string) => {
        if (confirm(t('deleteConfirm'))) {
            if (user) {
                await deleteResume(resumeId, user.id);
                setResumes(prev => prev.filter(r => r.id !== resumeId));
            }
        }
    };

    const handleDuplicate = async (resumeId: string) => {
        if (user) {
            try {
                const newResume = await duplicateResume(resumeId, user.id);
                setResumes(prev => [newResume, ...prev]);
            } catch (error) {
                console.error("Failed to duplicate resume:", error);
                alert(t('errorDuplicate'));
            }
        }
    };

    const handleRename = async (newTitle: string) => {
        if (user && renameData) {
            try {
                const updatedResume = { ...renameData, title: newTitle, lastModified: Date.now() };
                await saveResume(updatedResume, user.id);

                setResumes(prev => prev.map(r => r.id === renameData.id ? updatedResume : r));
                setRenameData(null);
            } catch (error) {
                console.error("Failed to rename resume:", error);
                alert(t('errorRename'));
            }
        }
    };

    const handleSignOut = async () => {
        await signOut({ redirectUrl: `/${locale}` });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    // Hidden Print Area
    const PrintComponent = downloadData ? getTemplate(downloadData.templateId).component : null;

    return (
        <main className="min-h-screen relative overflow-hidden bg-gray-50/50">
            <GradientBlobs />

            {/* Hidden Print Area */}
            {downloadData && PrintComponent && (
                <div className="fixed left-[10000px] top-0">
                    <div ref={printTemplateRef} className="width-[210mm]">
                        <PrintComponent data={downloadData} />
                    </div>
                </div>
            )}

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-display mb-2 text-gray-900">{t('title')}</h1>
                        <p className="text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>

                {/* Resumes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Resume Cards */}
                    {resumesLoading ? (
                        <>
                            <CVCardSkeleton />
                            <CVCardSkeleton />
                            <CVCardSkeleton />
                        </>
                    ) : (
                        resumes.map((resume) => (
                            <CVCard
                                key={resume.id}
                                resume={resume}
                                onDownload={onDownload}
                                onShare={handleGenerateLink}
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                                onRename={() => setRenameData(resume)}
                            />
                        ))
                    )}

                    {/* Create New Card */}
                    {resumesLoading ? <CVCardSkeleton /> : <CreateCVCard />}
                </div>
            </div>

            {/* Modals */}
            <ShareModal
                isOpen={!!shareData}
                onClose={() => setShareData(null)}
                shareUrl={shareData?.link || ""}
            />

            <RenameModal
                isOpen={!!renameData}
                onClose={() => setRenameData(null)}
                currentTitle={renameData?.title || ""}
                onRename={handleRename}
            />

            <DownloadModal
                isOpen={!!pendingDownloadResume}
                onClose={() => setPendingDownloadResume(null)}
                onConfirm={() => {
                    if (pendingDownloadResume) {
                        onDownload(pendingDownloadResume);
                    }
                }}
                resumeName={pendingDownloadResume?.personalInfo.fullName || "Resume"}
            />

            {/* Success Alert */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    <div className="glass-card rounded-3xl border border-green-200 bg-white/95 p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300 pointer-events-auto flex flex-col items-center">
                        <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600 shadow-sm animate-in zoom-in spin-in-180 duration-500">
                            <Check className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">Download Successful!</h3>
                        <p className="text-gray-500">Your resume has been saved to your device.</p>
                    </div>
                </div>
            )}
        </main>
    );
}
