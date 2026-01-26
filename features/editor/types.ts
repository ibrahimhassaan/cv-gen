export interface ResumeData {
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
    skills: [],
    projects: [],
};
