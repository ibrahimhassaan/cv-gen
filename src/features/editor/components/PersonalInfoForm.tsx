"use client";

import { useResume } from "@/features/editor/ResumeContext";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";

export function PersonalInfoForm() {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo } = resumeData;
    const t = useTranslations('editor.personalInfo');

    const handleChange = (field: string, value: string) => {
        updatePersonalInfo(field, value);
    };

    return (
        <div className="space-y-6 animate-[fade-in_0.3s]">
            {/* Photo Upload */}
            <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                    <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    handleChange("photoUrl", reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <label
                        htmlFor="photo-upload"
                        className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors group"
                    >
                        {personalInfo.photoUrl ? (
                            <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <Camera className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="text-[9px] text-slate-400 group-hover:text-primary transition-colors">{t('noPhoto')}</span>
                            </div>
                        )}
                    </label>
                    {personalInfo.photoUrl && (
                        <button
                            onClick={() => handleChange("photoUrl", "")}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                            title={t('remove')}
                        >
                            ×
                        </button>
                    )}
                </div>
                <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-medium">{t('profilePhoto')}</Label>
                    <p className="text-[10px] text-slate-500">{t('photoHint')}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">{t('fullName')}</Label>
                    <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder={t('fullNamePlaceholder')}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">{t('jobTitle')}</Label>
                    <Input
                        id="title"
                        value={personalInfo.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder={t('jobTitlePlaceholder')}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                        id="email"
                        value={personalInfo.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder={t('emailPlaceholder')}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={t('phonePlaceholder')}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="link">{t('portfolio')}</Label>
                <Input
                    id="link"
                    value={personalInfo.link}
                    onChange={(e) => handleChange("link", e.target.value)}
                    placeholder={t('portfolioPlaceholder')}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="summary">{t('summary')}</Label>
                <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                    placeholder={t('summaryPlaceholder')}
                    className="min-h-[120px]"
                />
            </div>
        </div>
    );
}
