import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

interface AccordionItemProps {
    title: string;
    icon: React.ElementType;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
    children: React.ReactNode;
    isLast?: boolean;
    stepNumber?: number;
}

const StepIndicator = ({ isActive, isCompleted, stepNumber, icon: Icon, onClick, className }: any) => (
    <div
        onClick={onClick}
        className={cn(
            "w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 cursor-pointer flex-shrink-0",
            isActive
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                : isCompleted
                    ? "border-transparent bg-green-500 text-white"
                    : "border-gray-200 bg-white text-gray-300 hover:border-primary/50 hover:text-primary/50",
            className
        )}
    >
        {isCompleted ? (
            <Check className="w-4 h-4 md:w-5 md:h-5" />
        ) : isActive && stepNumber ? (
            <span className="text-sm font-bold">{stepNumber}</span>
        ) : (
            <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
        )}
    </div>
);

export function AccordionItem({
    title,
    icon: Icon,
    isActive,
    isCompleted,
    onClick,
    children,
    isLast,
    stepNumber
}: AccordionItemProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | string>(0);

    useEffect(() => {
        if (isActive && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isActive, children]);

    return (
        <div className="flex group relative pb-2 md:pb-4 last:pb-0">
            {/* Desktop: Left Indicator Column (Outside Card) */}
            <div className="hidden md:flex flex-col items-center mr-6 pt-2">
                <StepIndicator
                    isActive={isActive}
                    isCompleted={isCompleted}
                    stepNumber={stepNumber}
                    icon={Icon}
                    onClick={onClick}
                />

                {/* Vertical Line - connects to next step */}
                {!isLast && (
                    <div className={cn(
                        "w-0.5 flex-grow my-2 transition-colors duration-500 min-h-[20px]",
                        isCompleted ? "bg-green-500/50" : "bg-gray-200"
                    )} />
                )}
            </div>

            {/* Content Card */}
            <div className={cn(
                "flex-1 bg-white rounded-xl md:rounded-2xl border transition-all duration-300",
                isActive
                    ? "border-primary/30 shadow-lg shadow-primary/10"
                    : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200",
                "p-3 md:p-6",
                // Mobile optimizations
                "mb-2 md:mb-0"
            )}>
                {/* Header */}
                <div
                    onClick={onClick}
                    className="flex items-center justify-between cursor-pointer mb-2"
                >
                    <div className="flex items-center gap-3">
                        {/* Mobile: Indicator Inline */}
                        <div className="md:hidden">
                            <StepIndicator
                                isActive={isActive}
                                isCompleted={isCompleted}
                                stepNumber={stepNumber}
                                icon={Icon}
                                className="w-7 h-7 text-[10px]"
                            />
                        </div>

                        <h3 className={cn(
                            "font-semibold text-sm md:text-lg transition-colors select-none",
                            isActive ? "text-primary" : "text-gray-600 group-hover:text-primary/80"
                        )}>
                            {title}
                        </h3>
                    </div>

                    {/* Hide chevron when expanded */}
                    {!isActive && (
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0" />
                    )}
                </div>

                {/* Collapsible Content */}
                <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ height: isActive ? "auto" : 0 }}
                >
                    <div ref={contentRef} className="pt-2 md:pt-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Accordion({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full md:max-w-2xl mx-auto">
            {children}
        </div>
    );
}
