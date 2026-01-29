import { TemplateModern } from "./TemplateModern";
import { TemplateClassic } from "./TemplateClassic";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateHeaderCols } from "./TemplateHeaderCols";
import { TemplateBold } from "./TemplateBold";
import { TemplateRibbon } from "./TemplateRibbon";
import { TemplateSerif } from "./TemplateSerif";
import { ResumeData } from "@/features/editor/types";
import React from "react";

export type TemplateId = string;
export type TemplateCategory = "Minimalist" | "Professional" | "Modern" | "Creative" | "Corporate";

export interface TemplateProps extends Record<string, unknown> {
    data: ResumeData;
}

export interface TemplateConfig {
    id: TemplateId;
    name: string;
    category: TemplateCategory;
    thumbnail: string; // Tailwind bg class for now
    component: React.ComponentType<TemplateProps>;
    props?: Record<string, unknown>;
}

export const categories: TemplateCategory[] = ["Minimalist", "Professional", "Modern", "Creative", "Corporate"];

// Helper to create variants
const createVariant = (
    baseId: string,
    suffix: string,
    name: string,
    category: TemplateCategory,
    Component: React.ComponentType<TemplateProps>,
    props: Record<string, unknown>,
    thumbnailClass: string
): TemplateConfig => ({
    id: `${baseId}-${suffix}`,
    name,
    category,
    thumbnail: thumbnailClass,
    component: (compProps: TemplateProps) => <Component {...compProps} {...props} />,
    props
});

export const templates: TemplateConfig[] = [
    // --- Modern Family ---
    createVariant("modern", "standard", "Modern", "Modern", TemplateModern, { featureThemeBg: true }, "bg-gradient-to-br from-violet-600 to-indigo-900"),

    // --- Sidebar Family ---
    createVariant("sidebar", "light", "Sidebar Light", "Professional", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-slate-50", sidebarText: "text-slate-600", font: "serif", accentColor: "text-slate-900"
    }, "bg-slate-100 border-r border-slate-300"),

    createVariant("sidebar", "dark", "Sidebar Dark", "Professional", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-slate-900", sidebarText: "text-white", font: "sans", accentColor: "text-slate-900", featureThemeBg: true
    }, "bg-slate-900 border-r border-slate-800"),

    createVariant("sidebar", "right", "Sidebar Right", "Modern", TemplateSidebar, {
        sidebarSide: "right", sidebarBg: "bg-slate-900", sidebarText: "text-slate-200", font: "sans", accentColor: "text-slate-900", featureThemeBg: true
    }, "bg-slate-900 border-l border-slate-700"),


    // --- Header Family ---
    createVariant("header", "minimal", "Minimal Header", "Minimalist", TemplateHeaderCols, {
        headerBg: "bg-white", columnLayout: "two-equal", accentColor: "text-slate-900"
    }, "bg-white border-b-2 border-gray-100"),

    createVariant("header", "banner", "Banner Header", "Corporate", TemplateHeaderCols, {
        headerBg: "bg-slate-800", headerText: "text-white", columnLayout: "main-left", accentColor: "text-slate-600", featureThemeBg: true
    }, "bg-slate-800 border-b border-slate-900"),


    // --- Classic Family ---
    createVariant("classic", "standard", "Classic", "Professional", TemplateClassic, { color: "black" }, "bg-white border-double border-4 border-gray-200"),


    // --- Creative Options ---
    // (Consolidated into main families above or removed as duplicates)

    // --- NEW: Bold Family ---
    createVariant("bold", "standard", "Bold", "Creative", TemplateBold, { themeColor: "#0f172a" }, "bg-slate-900"),

    // --- NEW: Ribbon Family ---
    createVariant("ribbon", "standard", "Ribbon", "Creative", TemplateRibbon, { themeColor: "#dc2626" }, "bg-red-600"),

    // --- NEW: Serif Family ---
    createVariant("serif", "standard", "Serif", "Professional", TemplateSerif, { themeColor: "#1f2937" }, "bg-gray-800 font-serif"),
];

export const getTemplate = (id: string) => {
    return templates.find((t) => t.id === id) || templates[0];
};
