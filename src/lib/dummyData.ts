import { ResumeData } from "@/features/editor/types";

export const getDummyData = (t: (key: string) => string): ResumeData => {
    return {
        id: "dummy-id",
        lastModified: Date.now(),
        templateId: "",
        themeColor: "",
        labels: {
            profile: t('labelProfile'),
            experience: t('labelExperience'),
            education: t('labelEducation'),
            skills: t('labelSkills'),
            projects: t('labelProjects'),
            present: t('labelPresent')
        },
        personalInfo: {
            fullName: t('fullName'),
            title: t('title'),
            email: t('email'),
            phone: t('phone'),
            link: t('link'),
            summary: t('summary'),
            photoUrl: "/images/resume-photo.jpg"
        },
        experience: [
            { id: "1", role: t('exp1Role'), company: t('exp1Company'), startDate: t('exp1Start'), endDate: t('exp1End'), current: true, description: t('exp1Desc') },
            { id: "2", role: t('exp2Role'), company: t('exp2Company'), startDate: t('exp2Start'), endDate: t('exp2End'), current: false, description: t('exp2Desc') }
        ],
        education: [
            { id: "1", institution: t('eduInstitution'), degree: t('eduDegree'), field: t('eduField'), year: t('eduYear') }
        ],
        skills: [
            { id: "1", name: t('skill1'), level: "Expert" },
            { id: "2", name: t('skill2'), level: "Advanced" },
            { id: "3", name: t('skill3'), level: "Intermediate" },
            { id: "4", name: t('skill4'), level: "Beginner" }
        ],
        projects: [],
        languages: [
            { id: "1", name: "English", level: "Fluent" },
            { id: "2", name: "Bahasa Indonesia", level: "Advanced" }
        ]
    };
};
