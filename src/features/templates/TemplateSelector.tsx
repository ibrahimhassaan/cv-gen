import { useState } from "react";
import { useResume } from "@/features/editor/ResumeContext";
import { templates, TemplateCategory, categories } from "@/features/templates/registry";
import { FitPreview } from "@/components/FitPreview";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function TemplateSelector() {

    const { resumeData, setTemplate, setThemeColor } = useResume();
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");

    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

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

    return (
        <div className="space-y-8 animate-[fade-in_0.3s]">

            {/* Color Picker */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Accent Color</h3>
                <div className="flex flex-wrap gap-3">
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
                            className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer"
                        />
                        <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-bold text-white drop-shadow">+</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100">
                {["All", ...categories].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as TemplateCategory | "All")}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                            activeCategory === cat
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredTemplates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => setTemplate(template.id)}
                        className={cn(
                            "group relative aspect-[210/297] rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-xl bg-white",
                            resumeData.templateId === template.id
                                ? "border-slate-900 ring-4 ring-slate-900/10"
                                : "border-gray-100 hover:border-violet-300"
                        )}
                    >
                        {/* Live Preview Container */}
                        <div className="absolute inset-0 bg-white pointer-events-none select-none">
                            <FitPreview>
                                <template.component data={{ ...dummyData, themeColor: resumeData.themeColor, templateId: template.id }} />
                            </FitPreview>
                        </div>

                        {/* Overlay with Name */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                            <span className="text-white font-bold text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                {template.name}
                            </span>
                            <span className="text-white/80 text-xs mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                {template.category}
                            </span>
                        </div>

                        {/* Selected Indicator */}
                        {resumeData.templateId === template.id && (
                            <div className="absolute top-2 right-2 bg-slate-900 text-white rounded-full p-1.5 shadow-lg z-10">
                                <Check className="w-4 h-4" />
                            </div>
                        )}

                        {/* Helper label for active selection without hover */}
                        <div className={cn(
                            "absolute bottom-0 inset-x-0 p-2 text-center text-xs font-medium backdrop-blur-md transition-opacity duration-300",
                            resumeData.templateId === template.id ? "bg-slate-900/90 text-white" : "bg-white/80 text-slate-900 opacity-0 group-hover:opacity-100"
                        )}>
                            {template.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
