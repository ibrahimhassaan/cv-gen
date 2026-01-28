"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/Button";
import { GradientBlobs } from "@/components/GradientBlobs";
import { LogOut, User } from "lucide-react";
import { loadAllResumes, getPendingAction, generateShareableLink } from "@/lib/resumeStorage";
import { getResumes, saveResume, deleteResume, duplicateResume } from "@/lib/resumeService";
import { getTemplate } from "@/features/templates/registry";
import { ResumeData } from "@/features/editor/types";
import { ShareModal } from "@/components/ShareModal";
import { RenameModal } from "@/components/RenameModal";
import { CVCard } from "@/app/[locale]/dashboard/CVCard";
import { CreateCVCard } from "@/app/[locale]/dashboard/CreateCVCard";
import { CVCardSkeleton } from "@/app/[locale]/dashboard/CVCardSkeleton";

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [resumes, setResumes] = useState<ResumeData[]>([]);
    const [resumesLoading, setResumesLoading] = useState(true);

    // Modals state
    const [shareData, setShareData] = useState<{ id: string, link: string } | null>(null);
    const [renameData, setRenameData] = useState<ResumeData | null>(null);

    // For downloading PDF
    const printTemplateRef = useRef<HTMLDivElement>(null);
    const [downloadData, setDownloadData] = useState<ResumeData | null>(null);

    // Trigger download when downloadData is set
    useEffect(() => {
        const generatePdf = async () => {
            if (downloadData && printTemplateRef.current) {
                // Wait for render
                await new Promise(resolve => setTimeout(resolve, 100));

                const element = printTemplateRef.current;
                const opt = {
                    margin: 0,
                    filename: `${downloadData.personalInfo.fullName || "Resume"}_CV.pdf`,
                    image: { type: 'jpeg' as const, quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
                };

                try {
                    const html2pdf = (await import('html2pdf.js')).default;
                    await html2pdf().set(opt).from(element).save();
                } catch (e) {
                    console.error("PDF generation failed", e);
                } finally {
                    setDownloadData(null);
                }
            }
        };

        if (downloadData) {
            generatePdf();
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
                        onDownload(savedResume);
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

    const handleGenerateLink = (resume: ResumeData) => {
        const link = generateShareableLink(resume);
        setShareData({ id: resume.id, link });
    };

    const handleDelete = async (resumeId: string) => {
        if (confirm("Are you sure you want to delete this resume?")) {
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
                alert("Failed to duplicate resume");
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
                alert("Failed to rename resume");
            }
        }
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
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
                        <h1 className="text-3xl font-bold font-display mb-2 text-gray-900">Your Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage your resumes and create new ones
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full bg-white/60">
                            {user.user_metadata?.avatar_url ? (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                            )}
                            <span className="text-sm font-medium">
                                {user.user_metadata?.full_name || user.email?.split("@")[0]}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            className="text-muted-foreground hover:text-red-500"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>

                {/* Resumes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Create New Card */}
                    <CreateCVCard />

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
        </main>
    );
}
