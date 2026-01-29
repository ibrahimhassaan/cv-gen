"use client";

import { useResume } from "@/features/editor/ResumeContext";
import { templates } from "@/features/templates/registry";
import { FitPreview } from "@/components/FitPreview";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Type, Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { getDummyData } from "@/lib/dummyData";

export function TemplateSelector() {

    const { resumeData, setTemplate, setThemeColor, setFont } = useResume();
    const tp = useTranslations('templatePreview');

    const colors = [
        { name: "Violet", value: "#7c3aed", class: "bg-violet-600" },
        { name: "Blue", value: "#2563eb", class: "bg-blue-600" },
        { name: "Green", value: "#059669", class: "bg-emerald-600" },
        { name: "Red", value: "#dc2626", class: "bg-red-600" },
        { name: "Orange", value: "#d97706", class: "bg-amber-600" },
        { name: "Slate", value: "#475569", class: "bg-slate-600" },
        { name: "Black", value: "#000000", class: "bg-black" },
        { name: "Teal", value: "#0d9488", class: "bg-teal-600" },
    ];

    const fonts = [
        { name: "Sans Serif", value: "sans", class: "font-sans" },
        { name: "Serif", value: "serif", class: "font-serif" },
        { name: "Monospace", value: "mono", class: "font-mono" },
    ];

    const activeColor = colors.find(c => c.value === resumeData.themeColor) || colors[0];
    const activeFont = fonts.find(f => f.value === resumeData.font) || fonts[0];

    // Localized dummy data for preview
    const dummyData = getDummyData(tp);

    return (
        <div className="flex flex-col h-full gap-6 animate-[fade-in_0.3s]">

            {/* Color Picker - Sticky Header */}
            {/* Controls Header - Sticky */}
            <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm sticky top-0 z-20 mx-1 flex gap-12 items-center justify-center">

                {/* Font Selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1.5 px-2 text-slate-700 hover:bg-slate-100">
                            <span className="text-lg font-bold">Aa</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[180px]">
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Font Style</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {fonts.map((font) => (
                            <DropdownMenuItem
                                key={font.value}
                                onClick={() => setFont(font.value)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <span className={cn(font.class)}>{font.name}</span>
                                {resumeData.font === font.value && <Check className="w-3.5 h-3.5 text-primary" />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Color Selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1.5 px-2 text-slate-700 hover:bg-slate-100">
                            <Palette className="w-5 h-5" />
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Theme Color</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-2 grid grid-cols-4 gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setThemeColor(c.value)}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                                        resumeData.themeColor === c.value
                                            ? "border-slate-900 ring-2 ring-slate-100 ring-offset-2"
                                            : "border-transparent opacity-80 hover:opacity-100",
                                        c.class
                                    )}
                                    title={c.name}
                                />
                            ))}
                            <div className="relative">
                                <input
                                    type="color"
                                    value={resumeData.themeColor}
                                    onChange={(e) => setThemeColor(e.target.value)}
                                    className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer z-10"
                                />
                                <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 flex items-center justify-center pointer-events-none">
                                    <span className="text-[10px] font-bold text-white drop-shadow">+</span>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Template Grid - Scrollable Area */}
            <div className="flex-1 overflow-y-auto min-h-0 px-1 py-1 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => setTemplate(template.id)}
                            className={cn(
                                "group relative aspect-[210/297] rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-xl bg-white text-left",
                                resumeData.templateId === template.id
                                    ? "border-primary ring-4 ring-primary/20"
                                    : "border-muted hover:border-primary/50"
                            )}
                        >
                            {/* Live Preview Container */}
                            <div className="absolute inset-0 bg-white pointer-events-none select-none">
                                <FitPreview>
                                    <template.component data={{ ...dummyData, themeColor: resumeData.themeColor, font: resumeData.font, templateId: template.id }} />
                                </FitPreview>
                            </div>

                            {/* Overlay with Name */}
                            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <span className="text-primary-foreground font-bold text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    {template.name}
                                </span>
                            </div>

                            {/* Selected Indicator */}
                            {resumeData.templateId === template.id && (
                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg z-10">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}

                            {/* Helper label for active selection without hover */}
                            <div className={cn(
                                "absolute bottom-0 inset-x-0 p-2 text-center text-xs font-medium backdrop-blur-md transition-opacity duration-300",
                                resumeData.templateId === template.id ? "bg-primary/90 text-primary-foreground" : "bg-white/80 text-slate-900 opacity-0 group-hover:opacity-100"
                            )}>
                                {template.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
