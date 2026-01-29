"use client";

import { FitPreview } from "@/components/FitPreview";
// import { templates } from "@/features/templates/registry"; // Removed to avoid bundling ALL templates
import { getDummyData } from "@/lib/dummyData";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TemplateModern } from "@/features/templates/TemplateModern";
import { TemplateSidebar } from "@/features/templates/TemplateSidebar";
import { TemplateClassic } from "@/features/templates/TemplateClassic";
import { TemplateConfig, TemplateProps } from "@/features/templates/registry";

export const HeroResumes = () => {
    const t = useTranslations('templatePreview');
    const dummyData = getDummyData(t);
    const [activeIndex, setActiveIndex] = useState(0);

    // Manually define only the featured templates to safe bundle size
    const featuredTemplates: (Partial<TemplateConfig> & { component: React.ComponentType<TemplateProps>, id: string, props?: Record<string, unknown> })[] = [
        {
            id: "modern-standard",
            component: TemplateModern,
            props: { featureThemeBg: true }
        },
        {
            id: "sidebar-dark",
            component: TemplateSidebar,
            props: {
                sidebarSide: "left", sidebarBg: "bg-slate-900", sidebarText: "text-white", font: "sans", accentColor: "text-slate-900", featureThemeBg: true
            }
        },
        {
            id: "classic-standard",
            component: TemplateClassic,
            props: { color: "black" }
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % featuredTemplates.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [featuredTemplates.length]);

    return (
        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[1000px] z-10 pointer-events-none select-none">
            {featuredTemplates.map((template, index) => {
                // Calculate position relative to active index
                // We want a carousel effect or a stack effect
                // Let's go with a stacked fan effect where the active one is in front

                const isActive = index === activeIndex;
                const isNext = index === (activeIndex + 1) % featuredTemplates.length;
                const isPrev = index === (activeIndex - 1 + featuredTemplates.length) % featuredTemplates.length;

                let transformClass = "";
                let zIndex = 0;
                let opacity = 0;

                if (isActive) {
                    transformClass = "translate-x-0 translate-y-0 scale-100 rotate-0";
                    zIndex = 30;
                    opacity = 1;
                } else if (isNext) {
                    transformClass = "translate-x-12 translate-y-4 scale-95 rotate-3";
                    zIndex = 20;
                    opacity = 0.6;
                } else if (isPrev) {
                    transformClass = "-translate-x-12 translate-y-4 scale-95 -rotate-3";
                    zIndex = 10;
                    opacity = 0.6;
                } else {
                    // For more than 3 items, hide them
                    opacity = 0;
                }

                return (
                    <div
                        key={template.id}
                        className={cn(
                            "absolute w-[300px] md:w-[380px] aspect-[210/297] bg-white rounded-lg shadow-2xl transition-all duration-700 ease-in-out border border-slate-200/50",
                            transformClass
                        )}
                        style={{
                            zIndex,
                            opacity,
                            // Add a subtle reflection/glass effect
                            boxShadow: isActive
                                ? "0 20px 50px -12px rgba(0, 0, 0, 0.25)"
                                : "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        {/* Header/Browser bar simulation for modern feel */}
                        <div className="h-4 bg-slate-50 border-b border-slate-100 rounded-t-lg flex items-center gap-1 px-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/60"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60"></div>
                        </div>

                        <div className="w-full h-[calc(100%-16px)] relative overflow-hidden bg-white rounded-b-lg">
                            <FitPreview targetWidthPx={794}>
                                <template.component
                                    data={{
                                        ...dummyData,
                                        templateId: template.id,
                                        // Ensure theme consistency if needed, or let template decide
                                        themeColor: template.props?.themeColor as string || "#0f172a"
                                    }}
                                />
                            </FitPreview>

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                );
            })}

            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow" />
        </div>
    );
};
