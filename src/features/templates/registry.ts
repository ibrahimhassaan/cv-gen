import { TemplateModern } from "./TemplateModern";
import { TemplateClassic } from "./TemplateClassic";
import { ResumeData } from "@/features/editor/types";

export type TemplateId = "modern" | "classic";

export interface TemplateConfig {
    id: TemplateId;
    name: string;
    thumbnail: string; // URL or placeholder color
    component: React.ComponentType<{ data: ResumeData }>;
}

export const templates: TemplateConfig[] = [
    {
        id: "modern",
        name: "Modern Gradient",
        thumbnail: "bg-gradient-to-br from-violet-600 to-indigo-900",
        component: TemplateModern,
    },
    {
        id: "classic",
        name: "Classic Serif",
        thumbnail: "bg-white border text-black",
        component: TemplateClassic,
    },
];

export const getTemplate = (id: string) => {
    return templates.find((t) => t.id === id) || templates[0];
};
