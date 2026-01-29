"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResumeData, initialResumeState, ExperienceItem, EducationItem, ProjectItem } from "./types";

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    setTemplate: (id: string) => void;
    setThemeColor: (color: string) => void;
    setFont: (font: string) => void;
    updatePersonalInfo: (field: string, value: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, field: string, value: string | boolean) => void;
    removeExperience: (id: string) => void;
    addEducation: () => void;
    updateEducation: (id: string, field: string, value: string) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill?: { name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }) => string;
    updateSkill: (id: string, field: string, value: string) => void;
    removeSkill: (id: string) => void;
    addLanguage: () => string;
    updateLanguage: (id: string, field: string, value: string) => void;
    removeLanguage: (id: string) => void;
    isLoaded: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [resumeData, setResumeData] = useState<ResumeData>(() => JSON.parse(JSON.stringify(initialResumeState)));
    const [isLoaded, setIsLoaded] = useState(false);

    // Hydrate from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("cv-gen-data");
        console.log("[ResumeContext] Hydrating...", { saved: !!saved });
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                console.log("[ResumeContext] Parsed saved data:", parsed);
                // Merge with initial state to ensure all fields exist
                // URL params will override these in the next effect if present
                setResumeData(prev => ({ ...initialResumeState, ...parsed }));
            } catch (e) {
                console.error("Failed to parse resume data", e);
            }
        }
        setIsLoaded(true);
        console.log("[ResumeContext] Hydration complete, isLoaded set to true");
    }, []);

    // Sync from URL params
    useEffect(() => {
        if (!isLoaded) return;

        const templateParam = searchParams.get("template");
        const colorParam = searchParams.get("color");
        const fontParam = searchParams.get("font");

        setResumeData(prev => {
            // Only update if changes are needed to avoid infinite loops
            if (
                (templateParam && prev.templateId !== templateParam) ||
                (colorParam && prev.themeColor !== colorParam) ||
                (fontParam && prev.font !== fontParam)
            ) {
                return {
                    ...prev,
                    ...(templateParam && { templateId: templateParam }),
                    ...(colorParam && { themeColor: colorParam }),
                    ...(fontParam && { font: fontParam })
                };
            }
            return prev;
        });
    }, [searchParams, isLoaded]);

    // Autosave to local storage (excluding template, color, font)
    useEffect(() => {
        if (isLoaded) {
            const { templateId, themeColor, font, ...dataToSave } = resumeData;
            localStorage.setItem("cv-gen-data", JSON.stringify(dataToSave));
        }
    }, [resumeData, isLoaded]);

    const updateUrlParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const setTemplate = (id: string) => {
        setResumeData(prev => ({ ...prev, templateId: id }));
        updateUrlParams({ template: id });
    };

    const setThemeColor = (color: string) => {
        console.log("[ResumeContext] Setting theme color:", color);
        setResumeData(prev => ({ ...prev, themeColor: color }));
        // Encode color manually if needed, but URLSearchParams handles basic encoding
        updateUrlParams({ color });
    };

    const setFont = (font: string) => {
        setResumeData(prev => ({ ...prev, font }));
        updateUrlParams({ font });
    };

    const updatePersonalInfo = (field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value },
        }));
    };

    const addExperience = () => {
        const newExp: ExperienceItem = {
            id: crypto.randomUUID(),
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        };
        setResumeData((prev) => ({
            ...prev,
            experience: [...prev.experience, newExp],
        }));
    };

    const updateExperience = (id: string, field: string, value: string | boolean) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.filter((item) => item.id !== id),
        }));
    };

    const addEducation = () => {
        const newEdu: EducationItem = {
            id: crypto.randomUUID(),
            institution: "",
            degree: "",
            field: "",
            year: "",
        };
        setResumeData((prev) => ({
            ...prev,
            education: [...prev.education, newEdu],
        }));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const removeEducation = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((item) => item.id !== id),
        }));
    };

    const addSkill = (skill?: { name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }) => {
        const id = crypto.randomUUID();
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, {
                id,
                name: skill?.name || "",
                level: skill?.level || "Intermediate"
            }]
        }));
        return id;
    };

    const updateSkill = (id: string, field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const removeSkill = (id: string) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
    };

    const addLanguage = () => {
        const id = crypto.randomUUID();
        setResumeData(prev => ({
            ...prev,
            languages: [...(prev.languages || []), { id, name: "", level: "Moderate" }]
        }));
        return id;
    };

    const updateLanguage = (id: string, field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            languages: (prev.languages || []).map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const removeLanguage = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            languages: (prev.languages || []).filter(s => s.id !== id)
        }));
    };

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                setResumeData,
                updatePersonalInfo,
                addExperience,
                updateExperience,
                removeExperience,
                addEducation,
                updateEducation,
                removeEducation,
                addSkill,
                updateSkill,
                removeSkill,
                addLanguage,
                updateLanguage,
                removeLanguage,
                setTemplate,
                setThemeColor,
                setFont,
                isLoaded,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
}
