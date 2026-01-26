"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { templates, TemplateCategory, categories, TemplateConfig } from "@/features/templates/registry";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FitPreview } from "@/components/FitPreview";

// Helper to map color names to hex/tailwind colors for swatches
const swatchColors: Record<string, string> = {
    violet: "bg-violet-600",
    blue: "bg-blue-600",
    emerald: "bg-emerald-600",
    rose: "bg-rose-600",
    amber: "bg-amber-500",
    slate: "bg-slate-700",
    black: "bg-black",
    maroon: "bg-red-900",
    green: "bg-green-700",
    "min-bw": "bg-white border border-gray-300",
    "min-gray": "bg-gray-400",
    "corp-blue": "bg-blue-800",
    "corp-gray": "bg-gray-600",
    "corp-teal": "bg-teal-700",
    "corp-navy": "bg-indigo-900",
    "rose-creative": "bg-pink-500",
    "violet-creative": "bg-purple-600",
    "emerald-creative": "bg-emerald-400",
};

// Helper to extract color name from ID (e.g., "modern-blue" -> "blue")
const getVariantName = (id: string) => {
    const parts = id.split("-");
    return parts.length > 1 ? parts.slice(1).join("-") : "default";
};

// Helper to extract Base group name (e.g., "modern-blue" -> "modern")
// Helper to extract Base group name (e.g., "modern-blue" -> "modern")
const getBaseId = (id: string) => id.split("-")[0];

// Dummy data for preview
const dummyData: any = {
    templateId: "",
    themeColor: "",
    personalInfo: {
        fullName: "Chloe Anderson",
        title: "Executive Retail Manager",
        email: "chloe.anderson@email.com",
        phone: "(555) 123-4567",
        link: "linkedin.com/chloe",
        summary: "Proactive retail professional with 5+ years of experience in high-volume shops. Proven track record of exceeding sales targets."
    },
    experience: [
        { id: "1", role: "Store Manager", company: "Fashion Boutique", startDate: "2019", endDate: "Present", current: true, description: "Leading a team of 15 associates to drive sales and customer satisfaction." },
        { id: "2", role: "Sales Associate", company: "Retail Chain", startDate: "2016", endDate: "2019", current: false, description: "Customer service excellence award winner for 3 consecutive years." }
    ],
    education: [
        { id: "1", institution: "City College", degree: "BA Marketing", field: "Marketing", year: "2016" }
    ],
    skills: ["Sales Management", "Customer Service", "Visual Merchandising", "Inventory Control"],
    projects: []
};

export default function TemplatesPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");

    // Group templates by their base ID
    // Map baseId -> { base: TemplateConfig, variants: TemplateConfig[] }
    const groupedTemplates = useMemo(() => {
        const groups: Record<string, { base: TemplateConfig, variants: TemplateConfig[] }> = {};

        templates.forEach(t => {
            const baseId = getBaseId(t.id);
            if (!groups[baseId]) {
                groups[baseId] = { base: t, variants: [] };
            }
            groups[baseId].variants.push(t);
        });

        return Object.values(groups);
    }, []);

    // Filter groups based on whether *any* of their variants match the category
    // Or just use the base template's category for simplicity (assuming variants share category)
    const filteredGroups = activeCategory === "All"
        ? groupedTemplates
        : groupedTemplates.filter(g => g.base.category === activeCategory);

    // State to track selected variant for each group (previewing purposes)
    // Map baseId -> selectedVariantId
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

    const handleSelectTemplate = (templateId: string) => {
        // Save to local storage same as ResumeContext would
        const saved = localStorage.getItem("cv-gen-data");
        let daata = {};
        if (saved) {
            try { daata = JSON.parse(saved); } catch { }
        }

        // Update template ID
        localStorage.setItem("cv-gen-data", JSON.stringify({ ...daata, templateId }));

        // Navigate to editor
        router.push("/create/manual");
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                            CV
                        </div>
                        <span className="font-display font-medium text-lg">CV Gen</span>
                    </div>

                    <Button variant="ghost" className="text-sm font-medium text-slate-500" onClick={() => router.push("/")}>
                        Back to Home
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Select job-winning resume template</h1>
                    <p className="text-slate-500">You can always change your template later.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-2 mb-12">
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
                            <span>All templates</span>
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

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredGroups.map((group) => {
                        const baseId = getBaseId(group.base.id);
                        const activeVariantId = selectedVariants[baseId] || group.base.id;
                        const activeVariant = group.variants.find(v => v.id === activeVariantId) || group.base;

                        return (
                            <div key={baseId} className="group flex flex-col items-center">
                                {/* Card */}
                                <div
                                    className="relative w-full aspect-[210/297] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1"
                                    onClick={() => handleSelectTemplate(activeVariantId)}
                                >
                                    {/* Live Preview Container */}
                                    <div className="absolute inset-0 bg-white pointer-events-none select-none">
                                        <FitPreview>
                                            <activeVariant.component
                                                data={{
                                                    ...dummyData,
                                                    themeColor: "#4f46e5", // Default Indigo
                                                    templateId: activeVariant.id
                                                }}
                                            />
                                        </FitPreview>
                                    </div>

                                    {/* Overlay Button */}
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <Button className="shadow-xl px-8" size="lg">Use This Template</Button>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    {activeVariant.category === "Professional" && (
                                        <div className="absolute top-4 right-4 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                            <Check className="w-3 h-3" /> RECOMMENDED
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="mt-6 w-full px-2 flex flex-col items-start gap-3">
                                    <div className="flex justify-between w-full items-center">
                                        <h3 className="font-bold text-lg text-slate-800">{group.base.name}</h3>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                                {group.base.category}
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
