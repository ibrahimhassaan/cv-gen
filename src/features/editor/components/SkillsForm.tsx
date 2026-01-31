"use client";

import { useResume } from "@/features/editor/ResumeContext";
import { SkillItem } from "@/features/editor/types";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, X, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AiButton } from "@/components/ui/AiButton";
import { SkillChip } from "@/components/ui/SkillChip";

export function SkillsForm() {
    const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
    const t = useTranslations('editor.skillsForm');
    const locale = useLocale();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [suggestedSkills, setSuggestedSkills] = useState<{ name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleToggle = (id: string) => {
        setExpandedId(current => current === id ? null : id);
    };

    const handleSuggestSkills = async () => {
        setIsSuggesting(true);
        try {
            const response = await fetch('/api/ai/suggest-skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    experience: resumeData.experience,
                    education: resumeData.education,
                    locale
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch suggestions');

            const data = await response.json();
            if (data.skills && Array.isArray(data.skills)) {
                // Filter out skills that are already added
                const existingNames = new Set(resumeData.skills.map(s => s.name.toLowerCase()));
                const newSuggestions = data.skills.filter((s: SkillItem) => !existingNames.has(s.name.toLowerCase()));
                setSuggestedSkills(newSuggestions);
            }
        } catch (error) {
            console.error("Error suggesting skills:", error);
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleAddSuggestedSkill = (skill: { name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }) => {
        addSkill({ name: skill.name, level: skill.level });
        setSuggestedSkills(prev => prev.filter(s => s.name !== skill.name));
    };

    const hasExperienceOrEducation = resumeData.experience.length > 0 || resumeData.education.length > 0;

    return (
        <div className="space-y-4 animate-[fade-in_0.3s]">
            {/* AI Suggestion Section */}
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-lg p-4 border border-violet-100 dark:border-violet-900/20">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-violet-900">{t('suggestedSkills')}</h3>
                    <AiButton
                        size="sm"
                        onClick={handleSuggestSkills}
                        isLoading={isSuggesting}
                        loadingText={t('suggesting')}
                        variant="outline"
                        className="h-8 text-xs bg-white/80 hover:bg-white text-violet-700 border-violet-200"
                        icon={<Sparkles className="w-3 h-3 mr-2 text-violet-600" />}
                        disabled={!hasExperienceOrEducation}
                        title={!hasExperienceOrEducation ? t('noSuggestions') : undefined}
                    >
                        {t('suggestSkills')}
                    </AiButton>
                </div>

                {suggestedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {suggestedSkills.map((skill, i) => (
                            <SkillChip
                                key={i}
                                name={skill.name}
                                level={t(`levels.${skill.level}`)}
                                onAdd={() => handleAddSuggestedSkill(skill)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground italic">
                        {hasExperienceOrEducation
                            ? (isSuggesting ? t('suggesting') : t('noSuggestions'))
                            : t('noSuggestions')}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                {resumeData.skills.map((skill) => (
                    <Card key={skill.id} className={cn("transition-all duration-300 group overflow-hidden border-white/40 shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm", expandedId === skill.id ? "ring-1 ring-primary/30 border-primary/50 shadow-primary/5 bg-white/80" : "hover:border-primary/30")}>
                        <div
                            className={cn("p-4 flex items-center justify-between cursor-pointer select-none transition-colors", expandedId === skill.id ? "bg-primary/5" : "group-hover:bg-white/40")}
                            onClick={() => handleToggle(skill.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="font-semibold text-sm text-foreground/80">
                                        {skill.name || <span className="text-muted-foreground/50 italic">{t('skillPlaceholder')}</span>}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {t(`levels.${skill.level}`)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSkill(skill.id);
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/70">
                                    {expandedId !== skill.id && <ChevronDown className="w-4 h-4 transition-transform" />}
                                </Button>
                            </div>
                        </div>

                        {expandedId === skill.id && (
                            <div className="p-4 pt-0 space-y-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">{t('skillName')}</Label>
                                        <Input
                                            value={skill.name}
                                            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                                            placeholder={t('skillPlaceholder')}
                                            className="bg-white/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">{t('level')}</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between font-normal text-muted-foreground hover:text-foreground border-black/5 hover:border-black/10 bg-white/50">
                                                    {t(`levels.${skill.level}`)}
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[200px]">
                                                {Object.keys(t.raw('levels')).map((level) => (
                                                    <DropdownMenuItem
                                                        key={level}
                                                        onClick={() => updateSkill(skill.id, "level", level)}
                                                        className={skill.level === level ? "bg-accent" : ""}
                                                    >
                                                        {t(`levels.${level}`)}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeSkill(skill.id)}
                                        className="gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        {t('remove')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {resumeData.skills.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-4">{t('noSkills')}</p>
            )}

            <Button onClick={() => {
                const newId = addSkill();
                setExpandedId(newId);
            }} variant="outline" className="w-full border-dashed py-6 hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all">
                <Plus className="w-4 h-4 mr-2" /> {t('addSkills')}
            </Button>
        </div>
    );
}
