"use client";

import { FitPreview } from "@/components/FitPreview";
import { Button } from "@/components/ui/button";
import { templates } from "@/features/templates/registry";
import { getDummyData } from "@/lib/dummyData";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const TemplateSlider = () => {
    const t = useTranslations();
    const tp = useTranslations('templatePreview');
    const dummyData = getDummyData(tp);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const getScrollAmount = () => {
        if (!scrollContainerRef.current) return 0;
        const container = scrollContainerRef.current;
        const firstCard = container.firstElementChild as HTMLElement;
        if (!firstCard) return 0;
        // card width + gap (gap-8 is 2rem = 32px)
        return firstCard.offsetWidth + 32;
    };

    // Auto-slide effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                // Allow a small buffer for float precision
                const isEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10;

                if (isEnd) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    const amount = getScrollAmount();
                    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const amount = getScrollAmount();
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="relative z-10 w-full overflow-hidden py-10 group/section">
            <div
                className="relative container mx-auto"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Arrow Controls */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover/section:opacity-100 disabled:opacity-50"
                    aria-label="Previous template"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover/section:opacity-100 disabled:opacity-50"
                    aria-label="Next template"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto px-6 pb-12 snap-x snap-mandatory scroll-smooth no-scrollbar"
                    style={{
                        scrollPaddingLeft: '50%',
                        scrollPaddingRight: '50%',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="relative flex-none snap-center group"
                            onMouseEnter={() => setHoveredId(template.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className={cn(
                                "relative w-[280px] md:w-[320px] aspect-[210/297] bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden border border-slate-200",
                                hoveredId === template.id ? "scale-105 shadow-2xl ring-4 ring-primary/10" : "hover:scale-102 hover:shadow-xl"
                            )}>
                                {/* Browser bar decoration */}
                                <div className="h-6 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 px-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                </div>

                                {/* Preview */}
                                <div className="w-full h-[calc(100%-24px)] relative bg-slate-50">
                                    <FitPreview targetWidthPx={794}>
                                        <template.component
                                            data={{
                                                ...dummyData,
                                                templateId: template.id,
                                                themeColor: template.props?.themeColor as string || "#0f172a"
                                            }}
                                        />
                                    </FitPreview>

                                    {/* Overlay on hover */}
                                    <div className={cn(
                                        "absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col items-center justify-center gap-4 opacity-0",
                                        hoveredId === template.id ? "opacity-100" : "group-hover:opacity-100 lg:opacity-0"
                                    )}>
                                        <h3 className="text-white font-bold text-xl translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                            {template.name}
                                        </h3>
                                        <Link href={`/create?template=${template.id}`}>
                                            <Button className="rounded-full translate-y-4 transition-transform duration-300 group-hover:translate-y-0 delay-75 shadow-xl">
                                                {t('home.chooseTemplate.useTemplate')} <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fade Gradients for visual cue of scrolling */}
            <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
            <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />

            {/* Inline styles for hiding scrollbar as utility class backup */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};
