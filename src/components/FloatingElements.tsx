"use client";

import { Check, Download, Star } from "lucide-react";

export function FloatingElements() {
    return (
        <>
            {/* Trust signal - Resume downloaded */}
            <div
                className="floating-card absolute top-32 right-8 md:right-16 lg:right-32 flex items-center gap-2 z-20"
                style={{ animationDelay: '0s' }}
            >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">Resume downloaded</span>
            </div>

            {/* ATS Score badge */}
            <div
                className="floating-card absolute top-56 right-4 md:right-8 lg:right-20 flex items-center gap-2 z-20"
                style={{ animationDelay: '-1.5s' }}
            >
                <span className="text-lg">🏆</span>
                <span className="text-gray-700">ATS Score: <span className="font-bold text-primary">92/100</span></span>
            </div>

            {/* User activity indicator */}
            <div
                className="floating-card absolute bottom-40 left-4 md:left-16 lg:left-32 flex items-center gap-2 z-20"
                style={{ animationDelay: '-3s' }}
            >
                <Download className="w-4 h-4 text-cyan-500" />
                <span className="text-gray-600 text-sm">3 resumes generated today</span>
            </div>

            {/* Rating badge */}
            <div
                className="floating-card absolute bottom-64 right-8 md:right-24 lg:right-48 flex items-center gap-1 z-20 hidden md:flex"
                style={{ animationDelay: '-2s' }}
            >
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-gray-600 text-sm">4.9/5</span>
            </div>
        </>
    );
}
