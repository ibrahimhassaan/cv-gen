"use client";

import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Plus, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

export function LanguagesForm() {
    const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResume();
    const t = useTranslations('editor.languagesForm');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedId(current => current === id ? null : id);
    };

    return (
        <div className="space-y-4 animate-[fade-in_0.3s]">
            <div className="flex flex-col gap-3">
                {(resumeData.languages || []).map((lang) => (
                    <Card key={lang.id} className={cn("transition-all duration-300 group overflow-hidden border-white/40 shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm", expandedId === lang.id ? "ring-1 ring-primary/30 border-primary/50 shadow-primary/5 bg-white/80" : "hover:border-primary/30")}>
                        <div
                            className={cn("p-4 flex items-center justify-between cursor-pointer select-none transition-colors", expandedId === lang.id ? "bg-primary/5" : "group-hover:bg-white/40")}
                            onClick={() => handleToggle(lang.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="font-semibold text-sm text-foreground/80">
                                        {lang.name || <span className="text-muted-foreground/50 italic">{t('languagePlaceholder')}</span>}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {t(`levels.${lang.level}`)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeLanguage(lang.id);
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/70">
                                    {expandedId === lang.id ? <ChevronDown className="w-4 h-4 rotate-180 transition-transform" /> : <ChevronDown className="w-4 h-4 transition-transform" />}
                                </Button>
                            </div>
                        </div>

                        {expandedId === lang.id && (
                            <div className="p-4 pt-0 space-y-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">{t('languageName')}</Label>
                                        <Input
                                            value={lang.name}
                                            onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                                            placeholder={t('languagePlaceholder')}
                                            className="bg-white/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">{t('level')}</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between font-normal text-muted-foreground hover:text-foreground border-black/5 hover:border-black/10 bg-white/50">
                                                    {t(`levels.${lang.level}`)}
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[200px]">
                                                {Object.keys(t.raw('levels')).map((level) => (
                                                    <DropdownMenuItem
                                                        key={level}
                                                        onClick={() => updateLanguage(lang.id, "level", level)}
                                                        className={lang.level === level ? "bg-accent" : ""}
                                                    >
                                                        {t(`levels.${level}`)}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {(!resumeData.languages || resumeData.languages.length === 0) && (
                <p className="text-sm text-muted-foreground italic text-center py-4">{t('noLanguages')}</p>
            )}

            <Button onClick={() => {
                const newId = addLanguage();
                setExpandedId(newId);
            }} variant="outline" className="w-full border-dashed py-6 hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all">
                <Plus className="w-4 h-4 mr-2" /> {t('addLanguage')}
            </Button>
        </div>
    );
}
