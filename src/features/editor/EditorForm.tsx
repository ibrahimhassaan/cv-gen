"use client";

import { useState } from "react";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { ExperienceForm } from "./components/ExperienceForm";
import { EducationForm } from "./components/EducationForm";
import { SkillsForm } from "./components/SkillsForm";
import { LanguagesForm } from "./components/LanguagesForm";
import { cn } from "@/lib/utils";
import { SummaryForm } from "./components/SummaryForm";
import { User, Briefcase, GraduationCap, Code, Globe, ChevronRight, Check, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem } from "./components/Accordion";

type Section = "personal" | "experience" | "education" | "skills" | "languages" | "summary";

interface EditorFormProps {
    onDownload?: () => void;
    isDownloading?: boolean;
}

export function EditorForm({ onDownload, isDownloading }: EditorFormProps) {
    const [activeSection, setActiveSection] = useState<Section>("personal");
    const t = useTranslations('editor');

    const sections: { id: Section; label: string; icon: React.ElementType }[] = [
        { id: "personal", label: t('personal'), icon: User },
        { id: "experience", label: t('experience'), icon: Briefcase },
        { id: "education", label: t('education'), icon: GraduationCap },
        { id: "skills", label: t('skills'), icon: Code },
        { id: "languages", label: t('languages'), icon: Globe },
        { id: "summary", label: t('summary'), icon: FileText },
    ];

    const activeIndex = sections.findIndex((s) => s.id === activeSection);
    // Track highest step reached to allow jumping back (optional, or just allow all if completed)
    // For now, we rely on activeIndex comparisons for 'isCompleted'.

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

    // Helper to render the correct form component
    const renderForm = (id: Section) => {
        switch (id) {
            case "personal": return <PersonalInfoForm />;
            case "experience": return <ExperienceForm />;
            case "education": return <EducationForm />;
            case "skills": return <SkillsForm />;
            case "languages": return <LanguagesForm />;
            case "summary": return <SummaryForm />;
            default: return null;
        }
    };

    return (
        <div className="pb-24 pt-4 px-2 md:px-4">
            <Accordion>
                {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const isCompleted = index < activeIndex; // Simple logic: previous steps are complete
                    const isLast = index === sections.length - 1;

                    return (
                        <AccordionItem
                            key={section.id}
                            title={section.label}
                            icon={section.icon}
                            isActive={isActive}
                            isCompleted={isCompleted}
                            onClick={() => setActiveSection(section.id)}
                            isLast={isLast}
                            stepNumber={index + 1}
                        >
                            <div className="flex flex-col gap-6">
                                {/* Form Content */}
                                <div className="animate-in fade-in zoom-in-95 duration-300">
                                    {renderForm(section.id)}
                                </div>

                                {/* Step Navigation Buttons (Inside the expandable area) */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                    {/* Back Button (except first step) */}
                                    {index > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBack();
                                            }}
                                            className="text-gray-500 hover:text-gray-900"
                                        >
                                            {t('back')}
                                        </Button>
                                    )}

                                    {/* Next or Download Button */}
                                    {isLast ? (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDownload?.();
                                            }}
                                            disabled={isDownloading}
                                            className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all rounded-full px-6"
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
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNext();
                                            }}
                                            className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all rounded-full px-6"
                                        >
                                            {t('nextStep')} <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}
