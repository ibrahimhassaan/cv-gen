"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ResumeData, initialResumeState, ExperienceItem, EducationItem, ProjectItem } from "./types";

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: (data: ResumeData) => void;
    setTemplate: (id: string) => void;
    setThemeColor: (color: string) => void;
    setFont: (font: string) => void;
    updatePersonalInfo: (field: string, value: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, field: string, value: any) => void;
    removeExperience: (id: string) => void;
    addEducation: () => void;
    updateEducation: (id: string, field: string, value: any) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
    // State is managed by the consumer (BuilderPage) via initial load or effects
    // We just provide the state container


    const setTemplate = (id: string) => {
        setResumeData(prev => ({ ...prev, templateId: id }));
    };

    const setThemeColor = (color: string) => {
        setResumeData(prev => ({ ...prev, themeColor: color }));
    };

    const setFont = (font: string) => {
        setResumeData(prev => ({ ...prev, font }));
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

    const updateExperience = (id: string, field: string, value: any) => {
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

    // ... Similar handlers for Education and Projects (omitted for brevity, can generate on demand)

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

    const updateEducation = (id: string, field: string, value: any) => {
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

    const addSkill = (skill: string) => {
        if (!skill.trim()) return;
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    };
    const removeSkill = (skill: string) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
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
                removeSkill,
                setTemplate,
                setThemeColor,
                setFont,
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
