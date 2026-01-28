"use client";

import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export function EducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
    const t = useTranslations('editor.educationForm');

    return (
        <div className="space-y-6 animate-[fade-in_0.3s]">
            {resumeData.education.map((edu) => (
                <Card key={edu.id} className="bg-secondary/5 border-secondary/20">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="w-full space-y-2">
                                <Label>{t('institution')}</Label>
                                <Input
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                    placeholder={t('institutionPlaceholder')}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 mt-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeEducation(edu.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
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
                </Card>
            ))}

            <Button onClick={addEducation} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> {t('addEducation')}
            </Button>
        </div>
    );
}
