"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { templates, TemplateCategory, categories } from "@/features/templates/registry";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FitPreview } from "@/components/FitPreview";
import { useTranslations, useLocale } from "next-intl";

export default function TemplatesPage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('templates');
    const tp = useTranslations('templatePreview');
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");

    // Localized dummy data for preview
    const dummyData: any = {
        templateId: "",
        themeColor: "",
        labels: {
            profile: tp('labelProfile'),
            experience: tp('labelExperience'),
            education: tp('labelEducation'),
            skills: tp('labelSkills'),
            projects: tp('labelProjects'),
            present: tp('labelPresent')
        },
        personalInfo: {
            fullName: tp('fullName'),
            title: tp('title'),
            email: tp('email'),
            phone: tp('phone'),
            link: tp('link'),
            summary: tp('summary')
        },
        experience: [
            { id: "1", role: tp('exp1Role'), company: tp('exp1Company'), startDate: tp('exp1Start'), endDate: tp('exp1End'), current: true, description: tp('exp1Desc') },
            { id: "2", role: tp('exp2Role'), company: tp('exp2Company'), startDate: tp('exp2Start'), endDate: tp('exp2End'), current: false, description: tp('exp2Desc') }
        ],
        education: [
            { id: "1", institution: tp('eduInstitution'), degree: tp('eduDegree'), field: tp('eduField'), year: tp('eduYear') }
        ],
        skills: [
            { id: "1", name: tp('skill1'), level: "Expert" },
            { id: "2", name: tp('skill2'), level: "Advanced" },
            { id: "3", name: tp('skill3'), level: "Intermediate" },
            { id: "4", name: tp('skill4'), level: "Beginner" }
        ],
        languages: [
            { id: "1", name: "English", level: "Fluent" },
            { id: "2", name: "Bahasa Indonesia", level: "Advanced" }
        ],
        projects: []
    };

    // Filter templates
    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

    const handleSelectTemplate = (templateId: string) => {
        // Save to local storage same as ResumeContext would
        const saved = localStorage.getItem("cv-gen-data");
        let daata = {};
        if (saved) {
            try { daata = JSON.parse(saved); } catch { }
        }

        // Update template ID
        localStorage.setItem("cv-gen-data", JSON.stringify({ ...daata, templateId }));

        // Navigate to editor
        router.push(`/${locale}/create/manual`);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">


            <main className="container mx-auto px-6 py-12">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t('pageTitle')}</h1>
                    <p className="text-slate-500">{t('subtitle')}</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all border",
                            activeCategory === "All"
                                ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span>{t('allTemplates')}</span>
                        </div>
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all border",
                                activeCategory === cat
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map((template) => {
                        return (
                            <div key={template.id} className="group flex flex-col items-center">
                                {/* Card */}
                                <div
                                    className="relative w-full aspect-[210/297] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1"
                                    onClick={() => handleSelectTemplate(template.id)}
                                >
                                    {/* Live Preview Container */}
                                    <div className="absolute inset-0 bg-white pointer-events-none select-none">
                                        <FitPreview>
                                            <template.component
                                                data={{
                                                    ...dummyData,
                                                    themeColor: "#4f46e5", // Default Indigo
                                                    templateId: template.id
                                                }}
                                            />
                                        </FitPreview>
                                    </div>

                                    {/* Overlay Button */}
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <Button className="shadow-xl px-8" size="lg">{t('useThisTemplate')}</Button>
                                        </div>
                                    </div>

                                </div>

                                {/* Info */}
                                <div className="mt-6 w-full px-2 flex flex-col items-start gap-3">
                                    <div className="flex justify-between w-full items-center">
                                        <h3 className="font-bold text-lg text-slate-800">{template.name}</h3>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                                {template.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
