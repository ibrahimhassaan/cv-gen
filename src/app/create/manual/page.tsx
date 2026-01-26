"use client";

import { useRef } from "react";
import { ResumeProvider, useResume } from "@/features/editor/ResumeContext";
import { EditorForm } from "@/features/editor/EditorForm";
import { getTemplate } from "@/features/templates/registry";
import { Button } from "@/components/ui/Button";
import { Download, Share2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

function BuilderContent() {
    const { resumeData, setResumeData } = useResume();
    const templateRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: templateRef,
        documentTitle: `${resumeData.personalInfo.fullName || "Resume"}_CV`,
    });

    // Simple reset for demo
    const handleReset = () => { if (confirm("Reset all data?")) window.location.reload(); };

    const TemplateComponent = getTemplate(resumeData.templateId).component;

    return (
        <div className="flex h-screen overflow-hidden bg-secondary/10">
            {/* Left Side: Editor Form */}
            <div className="w-full md:w-1/2 p-4 md:p-6 overflow-y-auto border-r border-white/10 scrollbar-thin">
                <div className="max-w-xl mx-auto space-y-8 pb-20">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold font-display">Editor</h1>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
                        </div>
                    </div>
                    <EditorForm />
                </div>
            </div>

            {/* Right Side: Live Preview */}
            <div className="hidden md:flex w-1/2 bg-[#1a1a1a] p-8 overflow-y-auto items-start justify-center relative">
                {/* Floating Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2 z-50">
                    <Button onClick={() => handlePrint()} variant="default" className="shadow-xl">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                    <Button variant="secondary" className="shadow-xl">
                        <Share2 className="w-4 h-4 mr-2" /> Share Link
                    </Button>
                </div>

                <div className="origin-top transform scale-[0.65] lg:scale-[0.8] xl:scale-[0.9] transition-transform duration-300 shadow-2xl">
                    <div ref={templateRef} className="w-[210mm]">
                        <TemplateComponent data={resumeData} />
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
