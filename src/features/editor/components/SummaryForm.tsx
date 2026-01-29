"use client";

import { useResume } from "@/features/editor/ResumeContext";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { AiButton } from "@/components/ui/AiButton";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

export function SummaryForm() {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo } = resumeData;
    const t = useTranslations('editor.summaryForm');
    const locale = useLocale();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateSummary = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/ai/generate-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeData, locale }),
            });

            if (!response.ok) throw new Error('Failed to generate summary');

            const data = await response.json();
            if (data.summary) {
                updatePersonalInfo("summary", data.summary);
            }
        } catch (error) {
            console.error("Error generating summary:", error);
            // Optionally handle error state here
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6 animate-[fade-in_0.3s]">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="summary" className="text-base font-semibold">
                        {t('title')}
                    </Label>
                    <AiButton
                        size="sm"
                        onClick={handleGenerateSummary}
                        isLoading={isGenerating}
                        loadingText={t('generating')}
                        variant="outline"
                        className="h-8 text-xs"
                        icon={personalInfo.summary ? <RefreshCw className="w-3 h-3 mr-2" /> : <Sparkles className="w-3 h-3 mr-2" />}
                    >
                        {personalInfo.summary ? t('regenerate') : t('generateWithAI')}
                    </AiButton>
                </div>
                <p className="text-sm text-muted-foreground">
                    {t('description')}
                </p>
                <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                    placeholder={t('placeholder')}
                    className="min-h-[200px] text-base leading-relaxed p-4"
                />
            </div>
        </div>
    );
}
