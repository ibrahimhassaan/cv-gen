"use client";

import { useState, useEffect, useRef } from "react";
import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { AiButton } from "@/components/ui/AiButton";

export function ExperienceForm() {
    const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
    const t = useTranslations('editor.experienceForm');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const prevCount = useRef(resumeData.experience.length);
    const [generatingIds, setGeneratingIds] = useState<Record<string, boolean>>({});
    const locale = useLocale();

    // Auto-expand new items
    useEffect(() => {
        if (resumeData.experience.length > prevCount.current) {
            const lastItem = resumeData.experience[resumeData.experience.length - 1];
            setExpandedId(lastItem.id);
        }
        prevCount.current = resumeData.experience.length;
    }, [resumeData.experience.length]);

    const handleToggle = (id: string) => {
        setExpandedId(current => current === id ? null : id);
    };

    const handleGenerateDescription = async (id: string, role: string, company: string) => {
        if (!role) return;

        setGeneratingIds(prev => ({ ...prev, [id]: true }));
        try {
            const response = await fetch('/api/ai/generate-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, company, locale }),
            });

            if (!response.ok) throw new Error('Failed to generate description');

            const data = await response.json();
            if (data.description) {
                updateExperience(id, "description", data.description);
            }
        } catch (error) {
            console.error("Error generating description:", error);
        } finally {
            setGeneratingIds(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="space-y-4 animate-[fade-in_0.3s]">
            {resumeData.experience.map((exp) => (
                <Card key={exp.id} className={cn("transition-all duration-300 group overflow-hidden border-white/40 shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm", expandedId === exp.id ? "ring-1 ring-primary/30 border-primary/50 shadow-primary/5 bg-white/80" : "hover:border-primary/30")}>
                    <div
                        className={cn("p-4 flex items-center justify-between cursor-pointer select-none transition-colors", expandedId === exp.id ? "bg-primary/5" : "group-hover:bg-white/40")}
                        onClick={() => handleToggle(exp.id)}
                    >
                        <div className="flex flex-col gap-1">
                            <h4 className="font-semibold text-sm text-foreground/80">
                                {exp.role || <span className="text-muted-foreground/50 italic">{t('rolePlaceholder')}</span>}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                {exp.company || t('companyPlaceholder')}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeExperience(exp.id);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/70">
                                {expandedId === exp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {expandedId === exp.id && (
                        <CardContent className="p-4 pt-0 space-y-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>{t('company')}</Label>
                                    <Input
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                        placeholder={t('companyPlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('role')}</Label>
                                    <Input
                                        value={exp.role}
                                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                                        placeholder={t('rolePlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>{t('startDate')}</Label>
                                    <Input
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                        placeholder={t('datePlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('endDate')}</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                            placeholder={t('datePlaceholder')}
                                            disabled={exp.current}
                                        />
                                        {/* Checkbox for 'Current' could go here */}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>{t('description')}</Label>
                                    <AiButton
                                        size="sm"
                                        onClick={() => handleGenerateDescription(exp.id, exp.role, exp.company)}
                                        isLoading={generatingIds[exp.id]}
                                        loadingText="Generating..."
                                        variant="ghost"
                                        className="h-6 text-xs px-2"
                                        disabled={!exp.role}
                                        icon={exp.description ? <RefreshCw className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                                    >
                                        {exp.description ? "Regenerate" : "Generate with AI"}
                                    </AiButton>
                                </div>
                                <Textarea
                                    value={exp.description}
                                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                    placeholder={t('descriptionPlaceholder')}
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    )}
                </Card>
            ))}

            <Button onClick={addExperience} variant="outline" className="w-full border-dashed py-6 hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all">
                <Plus className="w-4 h-4 mr-2" /> {t('addExperience')}
            </Button>
        </div>
    );
}
