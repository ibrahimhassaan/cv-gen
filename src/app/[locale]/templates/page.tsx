"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { templates, TemplateCategory, categories } from "@/features/templates/registry";
import { getDummyData } from "@/lib/dummyData";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FitPreview } from "@/components/FitPreview";
import { useTranslations, useLocale } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/DropdownMenu";

export default function TemplatesPage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('templates');
    const tp = useTranslations('templatePreview');
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");

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

    const [selectedColor, setSelectedColor] = useState(colors[1].value); // Default Blue
    const [selectedFont, setSelectedFont] = useState(fonts[0].value); // Default Sans

    // Localized dummy data for preview
    const dummyData = getDummyData(tp);

    // Filter templates
    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

    const handleSelectTemplate = (templateId: string) => {
        // Save to local storage same as ResumeContext would
        const saved = localStorage.getItem("cv-gen-data");
        let daata = {};
        if (saved) {
            try { daata = JSON.parse(saved); } catch { }
        }

        // Update template ID, color, and font
        localStorage.setItem("cv-gen-data", JSON.stringify({
            ...daata,
            templateId,
            themeColor: selectedColor,
            font: selectedFont
        }));

        // Navigate to editor
        router.push(`/${locale}/create/manual`);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">


            <main className="container mx-auto px-6 py-12">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t('pageTitle')}</h1>
                    <p className="text-slate-500">{t('subtitle')}</p>
                </div>

                {/* Filter Tabs & Customization Controls */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 mb-12">

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <button
                            onClick={() => setActiveCategory("All")}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all border",
                                activeCategory === "All"
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <span>{t('allTemplates')}</span>
                            </div>
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-semibold transition-all border",
                                    activeCategory === cat
                                        ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Customization Controls */}
                    <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm flex gap-4 items-center">
                        {/* Font Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1.5 px-3 rounded-full text-slate-700 hover:bg-slate-100">
                                    <Type className="w-4 h-4" />
                                    <ChevronDown className="w-3 h-3 text-slate-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Font Style</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {fonts.map((font) => (
                                    <DropdownMenuItem
                                        key={font.value}
                                        onClick={() => setSelectedFont(font.value)}
                                        className="flex justify-between items-center cursor-pointer"
                                    >
                                        <span className={cn(font.class)}>{font.name}</span>
                                        {selectedFont === font.value && <Check className="w-3.5 h-3.5 text-primary" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Color Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1.5 px-3 rounded-full text-slate-700 hover:bg-slate-100">
                                    <div
                                        className="w-4 h-4 rounded-full border border-slate-200 shadow-sm"
                                        style={{ backgroundColor: selectedColor }}
                                    />
                                    <ChevronDown className="w-3 h-3 text-slate-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[220px]">
                                <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Theme Color</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="p-2 grid grid-cols-4 gap-2">
                                    {colors.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelectedColor(c.value)}
                                            className={cn(
                                                "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                                                selectedColor === c.value
                                                    ? "border-slate-900 ring-2 ring-slate-100 ring-offset-2"
                                                    : "border-transparent opacity-80 hover:opacity-100",
                                                c.class
                                            )}
                                            title={c.name}
                                        />
                                    ))}
                                    <div className="relative group">
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer z-10"
                                        />
                                        <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                                            <span className="text-[10px] font-bold text-white drop-shadow">+</span>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map((template) => {
                        return (
                            <div key={template.id} className="group flex flex-col items-center">
                                {/* Card */}
                                <div
                                    className="relative w-full aspect-[210/297] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1"
                                    onClick={() => handleSelectTemplate(template.id)}
                                >
                                    {/* Live Preview Container */}
                                    <div className="absolute inset-0 bg-white pointer-events-none select-none">
                                        <FitPreview>
                                            <template.component
                                                data={{
                                                    ...dummyData,
                                                    themeColor: selectedColor,
                                                    font: selectedFont,
                                                    templateId: template.id
                                                }}
                                            />
                                        </FitPreview>
                                    </div>

                                    {/* Overlay Button */}
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <Button className="shadow-xl px-8" size="lg">{t('useThisTemplate')}</Button>
                                        </div>
                                    </div>

                                </div>

                                {/* Info */}
                                <div className="mt-6 w-full px-2 flex flex-col items-start gap-3">
                                    <div className="flex justify-between w-full items-center">
                                        <h3 className="font-bold text-lg text-slate-800">{template.name}</h3>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                                {template.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
