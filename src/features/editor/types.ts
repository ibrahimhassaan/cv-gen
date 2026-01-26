export interface ResumeData {
    templateId: string;
    themeColor: string; // Hex code or tailwind color name
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        link: string; // Portfolio/LinkedIn
        title: string;
        summary: string;
    };
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[]; // Simple string array for MVP
    projects: ProjectItem[];
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
    templateId: "modern",
    themeColor: "#7c3aed", // Default Violet
    personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        link: "linkedin.com/in/johndoe",
        title: "Software Engineer",
        summary: "Passionate developer with expertise in building scalable web applications.",
    },
    experience: [
        {
            id: "1",
            company: "Tech Corp",
            role: "Senior Developer",
            startDate: "Jan 2020",
            endDate: "Present",
            current: true,
            description: "Leading frontend development..."
        }
    ],
    education: [],
    skills: ["React", "TypeScript", "Node.js"],
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
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
}
