export interface SectionLabels {
    profile?: string;
    experience?: string;
    education?: string;
    skills?: string;
    languages?: string;
    projects?: string;
    present?: string; // "Present" for current jobs
}

export interface ResumeData {
    id: string; // Unique identifier
    title?: string; // User-friendly name
    lastModified: number; // Timestamp
    templateId: string;
    themeColor: string; // Hex code or tailwind color name
    font?: string; // "sans", "serif", "mono"
    labels?: SectionLabels; // Section heading translations
    shareConfig?: {
        enabled: boolean;
        expiresAt: number; // Timestamp
    };
    personalInfo: {
        fullName: string;
        title: string;
        email: string;
        phone: string;
        link: string; // Portfolio / LinkedIn
        summary: string;
        photoUrl?: string; // Base64 or URL
    };
    experience: ExperienceItem[];
    education: EducationItem[];
    languages?: LanguageItem[];
    skills: SkillItem[];
    projects: ProjectItem[];
}

export interface SkillItem {
    id: string;
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface LanguageItem {
    id: string;
    name: string;
    level: "Beginner" | "Moderate" | "Advanced" | "Fluent";
}

export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    field: string;
    year: string;
}

export interface ProjectItem {
    id: string;
    name: string;
    description: string;
    link: string;
}

export const initialResumeState: ResumeData = {
    id: "default",
    title: "",
    lastModified: Date.now(),
    templateId: "modern",
    themeColor: "#7c3aed", // Default Violet
    font: "sans",
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        link: "",
        title: "",
        summary: "",
    },
    experience: [],
    education: [],
    languages: [],
    skills: [],
    projects: [],
};

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: (data: ResumeData) => void;
    setTemplate: (id: string) => void;
    // ... existing methods
    updatePersonalInfo: (field: string, value: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, field: string, value: any) => void;
    removeExperience: (id: string) => void;
    addEducation: () => void;
    updateEducation: (id: string, field: string, value: any) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: Omit<SkillItem, "id">) => void;
    removeSkill: (id: string) => void;
    addLanguage: (lang: Omit<LanguageItem, "id">) => void;
    removeLanguage: (id: string) => void;
}
