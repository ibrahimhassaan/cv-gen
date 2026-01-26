"use client";

import { useRef, useState } from "react";
import { ResumeProvider, useResume } from "@/features/editor/ResumeContext";
import { EditorForm } from "@/features/editor/EditorForm";
import { TemplateSelector } from "@/features/templates/TemplateSelector";
import { getTemplate } from "@/features/templates/registry";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Download, Share2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

function BuilderContent() {
    const { resumeData, setResumeData } = useResume();
    const templateRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<"editor" | "templates">("editor");

    const handlePrint = useReactToPrint({
        contentRef: templateRef,
        documentTitle: `${resumeData.personalInfo.fullName || "Resume"}_CV`,
    });

    // Simple reset for demo
    const handleReset = () => { if (confirm("Reset all data?")) window.location.reload(); };

    const TemplateComponent = getTemplate(resumeData.templateId).component;

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-secondary/10">
            {/* Left Side: Editor Form */}
            <div className={cn(
                "w-full p-4 md:p-6 overflow-hidden flex flex-col border-r border-white/10 transition-all duration-300",
                view === "editor" ? "lg:w-3/5" : "lg:w-1/2"
            )}>
                <div className="max-w-2xl mx-auto w-full space-y-4 pb-4 h-full flex flex-col">
                    <div className="flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-4">
                            {view === "templates" && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setView("editor")}
                                    className="mr-2"
                                >
                                    ← Back
                                </Button>
                            )}
                            <h1 className="text-2xl font-bold font-display">
                                {view === "editor" ? "Editor" : "Select Template"}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        {view === "editor" ? (
                            <EditorForm />
                        ) : (
                            <div className="h-full overflow-y-auto pr-2">
                                <TemplateSelector />
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Right Side: Live Preview */}
            <div className={cn(
                "hidden lg:flex bg-[#1a1a1a] p-8 flex-col items-center relative transition-all duration-300",
                view === "editor" ? "w-2/5" : "w-1/2"
            )}>
                {/* Action Buttons */}
                <div className="w-full flex justify-end gap-2 mb-6 z-10 max-w-[210mm]">
                    {view === "editor" && (
                        <Button
                            variant="outline"
                            className="bg-transparent text-white border-white/20 hover:bg-white/10"
                            onClick={() => setView("templates")}
                        >
                            Change Template
                        </Button>
                    )}
                    <Button onClick={() => handlePrint()} variant="default" className="shadow-xl bg-white text-slate-900 hover:bg-slate-100">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                    <Button variant="secondary" className="shadow-xl bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">
                        <Share2 className="w-4 h-4 mr-2" /> Share Link
                    </Button>
                </div>

                {/* Preview Scaling Container */}
                <div className="flex-1 w-full flex justify-center overflow-y-auto pb-20 no-scrollbar">
                    <div className={cn(
                        "origin-top transform transition-transform duration-300 shadow-2xl h-fit",
                        view === "editor"
                            ? "scale-[0.65] lg:scale-[0.7] xl:scale-[0.85]"
                            : "scale-[0.75] lg:scale-[0.85] xl:scale-[1.0]"
                    )}>
                        <div ref={templateRef} className="w-[210mm] bg-white">
                            <TemplateComponent data={resumeData} />
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
            <BuilderContent />
        </ResumeProvider>
    );
}
