"use client";

import { useState, useEffect, useRef } from "react";
import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function EducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
    const t = useTranslations('editor.educationForm');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const prevCount = useRef(resumeData.education.length);

    // Auto-expand new items
    useEffect(() => {
        if (resumeData.education.length > prevCount.current) {
            const lastItem = resumeData.education[resumeData.education.length - 1];
            setExpandedId(lastItem.id);
        }
        prevCount.current = resumeData.education.length;
    }, [resumeData.education.length]);

    const handleToggle = (id: string) => {
        setExpandedId(current => current === id ? null : id);
    };

    return (
        <div className="space-y-4 animate-[fade-in_0.3s]">
            {resumeData.education.map((edu) => (
                <Card key={edu.id} className={cn("transition-all duration-300 group overflow-hidden border-white/40 shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm", expandedId === edu.id ? "ring-1 ring-primary/30 border-primary/50 shadow-primary/5 bg-white/80" : "hover:border-primary/30")}>
                    <div
                        className={cn("p-4 flex items-center justify-between cursor-pointer select-none transition-colors", expandedId === edu.id ? "bg-primary/5" : "group-hover:bg-white/40")}
                        onClick={() => handleToggle(edu.id)}
                    >
                        <div className="flex flex-col gap-1">
                            <h4 className="font-semibold text-sm text-foreground/80">
                                {edu.degree || <span className="text-muted-foreground/50 italic">{t('degreePlaceholder')}</span>}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                {edu.institution || t('institutionPlaceholder')}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeEducation(edu.id);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/70">
                                {expandedId === edu.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {expandedId === edu.id && (
                        <CardContent className="p-4 pt-0 space-y-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex justify-between items-start">
                                <div className="w-full space-y-2">
                                    <Label>{t('institution')}</Label>
                                    <Input
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                        placeholder={t('institutionPlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>{t('degree')}</Label>
                                    <Input
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                        placeholder={t('degreePlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('field')}</Label>
                                    <Input
                                        value={edu.field}
                                        onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                        placeholder={t('fieldPlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>{t('year')}</Label>
                                <Input
                                    value={edu.year}
                                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                                    placeholder={t('yearPlaceholder')}
                                />
                            </div>
                        </CardContent>
                    )}
                </Card>
            ))}

            <Button onClick={addEducation} variant="outline" className="w-full border-dashed py-6 hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all">
                <Plus className="w-4 h-4 mr-2" /> {t('addEducation')}
            </Button>
        </div>
    );
}
