"use client";

import { useState } from "react";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { ExperienceForm } from "./components/ExperienceForm";
import { EducationForm } from "./components/EducationForm";
import { SkillsForm } from "./components/SkillsForm";
import { LanguagesForm } from "./components/LanguagesForm";
import { cn } from "@/lib/utils";
import { SummaryForm } from "./components/SummaryForm";
import { User, Briefcase, GraduationCap, Code, Globe, ChevronRight, ChevronLeft, Check, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

type Section = "personal" | "experience" | "education" | "skills" | "languages" | "summary";

interface EditorFormProps {
    onDownload?: () => void;
    isDownloading?: boolean;
}

export function EditorForm({ onDownload, isDownloading }: EditorFormProps) {
    const [activeSection, setActiveSection] = useState<Section>("personal");
    const t = useTranslations('editor');

    const sections: { id: Section; label: string; icon: any }[] = [
        { id: "personal", label: t('personal'), icon: User },
        { id: "experience", label: t('experience'), icon: Briefcase },
        { id: "education", label: t('education'), icon: GraduationCap },
        { id: "skills", label: t('skills'), icon: Code },
        { id: "languages", label: t('languages'), icon: Globe },
        { id: "summary", label: t('summary'), icon: FileText },
    ];

    const activeIndex = sections.findIndex((s) => s.id === activeSection);

    const handleNext = () => {
        if (activeIndex < sections.length - 1) {
            setActiveSection(sections[activeIndex + 1].id);
        }
    };

    const handleBack = () => {
        if (activeIndex > 0) {
            setActiveSection(sections[activeIndex - 1].id);
        }
    };

    return (
        <div className="space-y-4">
            {/* Stepper Navigation */}
            <div className="relative px-2">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -z-10 transform -translate-y-[50%]" />

                <div className="flex justify-between items-center relative">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        const isActive = index === activeIndex;
                        const isCompleted = index < activeIndex;

                        return (
                            <div key={section.id} className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveSection(section.id)}>
                                <div
                                    className={cn(
                                        "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10",
                                        isActive
                                            ? "bg-white text-primary shadow-[0_0_15px_rgba(124,58,237,0.3)] border-2 border-primary scale-110"
                                            : isCompleted
                                                ? "bg-gradient-to-br from-primary to-accent text-white shadow-md border-transparent"
                                                : "bg-white border-2 border-gray-100 text-gray-300 hover:border-primary/30 hover:text-primary/50"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Icon className="w-4 h-4 md:w-5 md:h-5" />}
                                </div>
                                <span className={cn(
                                    "text-[10px] md:text-xs font-semibold mt-1.5 transition-colors duration-300",
                                    isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {section.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Active Form Area */}
            <div className="mt-2 px-1">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                    {activeSection === "personal" && <PersonalInfoForm />}
                    {activeSection === "experience" && <ExperienceForm />}
                    {activeSection === "education" && <EducationForm />}
                    {activeSection === "skills" && <SkillsForm />}
                    {activeSection === "languages" && <LanguagesForm />}
                    {activeSection === "summary" && <SummaryForm />}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="sticky bottom-0 z-20 flex justify-between items-center pt-4 pb-4 border-t border-gray-100 bg-white/80 backdrop-blur-md -mx-4 px-4 mt-auto">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={activeIndex === 0}
                    className={cn(activeIndex === 0 && "opacity-0 pointer-events-none", "hover:bg-gray-100 text-muted-foreground hover:text-foreground")}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" /> {t('back')}
                </Button>

                {activeIndex === sections.length - 1 ? (
                    <Button
                        variant="gradient"
                        onClick={onDownload}
                        disabled={isDownloading}
                        className="shadow-lg shadow-green-500/20 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-8"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {t('downloading')}...
                            </>
                        ) : (
                            <>
                                {t('finishDownload')} <Check className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                ) : (
                    <Button onClick={handleNext} variant="gradient" className="rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40">
                        {t('nextStep')} <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
}
