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

export interface TemplateConfig {
    id: TemplateId;
    name: string;
    category: TemplateCategory;
    thumbnail: string; // Tailwind bg class for now
    component: React.ComponentType<{ data: ResumeData }>;
    props?: Record<string, any>;
}

export const categories: TemplateCategory[] = ["Minimalist", "Professional", "Modern", "Creative", "Corporate"];

// Helper to create variants
const createVariant = (
    baseId: string,
    suffix: string,
    name: string,
    category: TemplateCategory,
    Component: React.ComponentType<any>,
    props: Record<string, any>,
    thumbnailClass: string
): TemplateConfig => ({
    id: `${baseId}-${suffix}`,
    name,
    category,
    thumbnail: thumbnailClass,
    component: (compProps) => <Component {...compProps} {...props} />,
    props
});

export const templates: TemplateConfig[] = [
    // --- Modern Family (Original) ---
    createVariant("modern", "violet", "Modern Violet", "Modern", TemplateModern, { color: "violet" }, "bg-gradient-to-br from-violet-600 to-indigo-900"),
    createVariant("modern", "blue", "Modern Blue", "Modern", TemplateModern, { color: "blue" }, "bg-gradient-to-br from-blue-600 to-cyan-800"),
    createVariant("modern", "emerald", "Modern Emerald", "Modern", TemplateModern, { color: "emerald" }, "bg-gradient-to-br from-emerald-600 to-teal-900"),

    // --- Sidebar Family ---
    createVariant("sidebar", "clean-serif", "Clean Sidebar Serif", "Professional", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-slate-50", sidebarText: "text-slate-800", font: "serif", accentColor: "text-slate-900"
    }, "bg-slate-100 border-r border-slate-300"),

    createVariant("sidebar", "navy", "Navy Sidebar", "Professional", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-slate-900", sidebarText: "text-white", font: "sans", accentColor: "text-slate-900"
    }, "bg-slate-900 border-r border-slate-800"),

    createVariant("sidebar", "beige-right", "Beige Right", "Modern", TemplateSidebar, {
        sidebarSide: "right", sidebarBg: "bg-orange-50", sidebarText: "text-slate-800", font: "sans", accentColor: "text-orange-800"
    }, "bg-orange-50 border-l border-orange-200"),

    createVariant("sidebar", "soft-blue", "Soft Blue Sidebar", "Professional", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-blue-50", sidebarText: "text-slate-800", font: "sans", accentColor: "text-blue-800"
    }, "bg-blue-50 border-r border-blue-200"),

    createVariant("sidebar", "bold-black", "Bold Black", "Creative", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-black", sidebarText: "text-white", font: "sans", accentColor: "text-black"
    }, "bg-black border-r border-gray-800"),


    // --- Header Family ---
    createVariant("header", "minimal-center", "Minimal Center", "Minimalist", TemplateHeaderCols, {
        headerBg: "bg-white", columnLayout: "two-equal", accentColor: "text-slate-900"
    }, "bg-white border-b-2 border-gray-100"),

    createVariant("header", "blue-banner", "Blue Banner", "Modern", TemplateHeaderCols, {
        headerBg: "bg-blue-600", headerText: "text-white", columnLayout: "main-left", accentColor: "text-blue-600"
    }, "bg-blue-600 border-b border-blue-700"),

    createVariant("header", "dark-banner", "Dark Header", "Corporate", TemplateHeaderCols, {
        headerBg: "bg-slate-800", headerText: "text-white", columnLayout: "main-left", accentColor: "text-slate-800"
    }, "bg-slate-800 border-b border-slate-900"),

    createVariant("header", "green-accent", "Green Accents", "Modern", TemplateHeaderCols, {
        headerBg: "bg-white", accentColor: "text-emerald-700", columnLayout: "main-left"
    }, "bg-white border-t-4 border-emerald-600"),


    // --- Classic Family ---
    createVariant("classic", "black", "Classic Standard", "Professional", TemplateClassic, { color: "black" }, "bg-white border-double border-4 border-gray-200"),
    createVariant("classic", "maroon", "Classic Maroon", "Professional", TemplateClassic, { color: "maroon" }, "bg-white border-l-4 border-red-900"),


    // --- Creative & Extra Sidebar Options ---
    createVariant("sidebar", "dark-right", "Dark Right", "Creative", TemplateSidebar, {
        sidebarSide: "right", sidebarBg: "bg-slate-900", sidebarText: "text-slate-200", font: "sans", accentColor: "text-slate-900"
    }, "bg-slate-900 border-l border-slate-700"),

    createVariant("sidebar", "teal", "Teal Sidebar", "Creative", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-teal-700", sidebarText: "text-white", font: "sans", accentColor: "text-teal-800"
    }, "bg-teal-700 border-r border-teal-800"),

    createVariant("header", "gray-min", "Gray Minimalist", "Minimalist", TemplateHeaderCols, {
        headerBg: "bg-gray-100", headerText: "text-gray-900", columnLayout: "two-equal", accentColor: "text-gray-600"
    }, "bg-gray-100 border-b border-gray-200"),

    createVariant("sidebar", "rose", "Rose Sidebar", "Creative", TemplateSidebar, {
        sidebarSide: "left", sidebarBg: "bg-rose-50", sidebarText: "text-rose-900", font: "serif", accentColor: "text-rose-700"
    }, "bg-rose-50 border-r border-rose-200"),

    // --- NEW: Bold Family ---
    createVariant("bold", "slate", "Bold Slate", "Creative", TemplateBold, { themeColor: "#0f172a" }, "bg-slate-900"),
    createVariant("bold", "indigo", "Bold Indigo", "Creative", TemplateBold, { themeColor: "#4338ca" }, "bg-indigo-700"),

    // --- NEW: Ribbon Family ---
    createVariant("ribbon", "red", "Ribbon Red", "Creative", TemplateRibbon, { themeColor: "#dc2626" }, "bg-red-600"),
    createVariant("ribbon", "cyan", "Ribbon Cyan", "Creative", TemplateRibbon, { themeColor: "#0891b2" }, "bg-cyan-600"),

    // --- NEW: Serif Family ---
    createVariant("serif", "classic", "Elegant Serif", "Professional", TemplateSerif, { themeColor: "#1f2937" }, "bg-gray-800 font-serif"),
    createVariant("serif", "gold", "Gold Serif", "Professional", TemplateSerif, { themeColor: "#854d0e" }, "bg-yellow-700 font-serif"),


];

export const getTemplate = (id: string) => {
    return templates.find((t) => t.id === id) || templates[0];
};
