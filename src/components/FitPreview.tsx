"use client";

import React, { useEffect, useRef, useState } from "react";

interface FitPreviewProps {
    children: React.ReactNode;
    targetWidthPx?: number; // Default 794px approx for 210mm
}

export const FitPreview = ({ children, targetWidthPx = 794 }: FitPreviewProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.2); // Start small to avoid flash

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) {
                    setScale(width / targetWidthPx);
                }
            }
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [targetWidthPx]);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden">
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    width: `${targetWidthPx}px`,
                    // We don't restrict height, letting normal flow happen, 
                    // but since parent usually has fixed aspect ratio matching child, it should fit.
                }}
            >
                {children}
            </div>
        </div>
    );
};
