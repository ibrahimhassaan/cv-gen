"use client";

import dynamic from "next/dynamic";
import React from "react";

const TemplateSlider = dynamic(() => import("@/components/TemplateSlider").then(mod => mod.TemplateSlider), {
    ssr: false,
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-50" />
});

export const TemplateSliderLazy = () => {
    return <TemplateSlider />;
};
