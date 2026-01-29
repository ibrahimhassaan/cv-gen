import React from "react";
import Image from "next/image";
import { ResumeData } from "@/features/editor/types";
import { cn } from "@/lib/utils";

export const TemplateClassic = ({ data }: { data: ResumeData }) => {
    const { personalInfo, experience, education, skills, projects, labels, themeColor } = data;

    // Default labels fallback
    const l = {
        profile: labels?.profile || "Professional Profile",
        experience: labels?.experience || "Experience",
        education: labels?.education || "Education",
        skills: labels?.skills || "Skills",
        projects: labels?.projects || "Projects",
        present: labels?.present || "Present"
    };

    const fontClass = data.font === "serif" ? "font-serif" : data.font === "mono" ? "font-mono" : "font-sans";

    return (
        <div className={cn("w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-2xl overflow-hidden p-16 print:shadow-none print:w-full print:p-12", fontClass)}>
            {/* Header */}
            <header className="border-b-2 pb-6 mb-8 text-center" style={{ borderColor: themeColor }}>

                {personalInfo.photoUrl && (
                    <div className="mb-6 flex justify-center">
                        <div className="w-32 h-32 overflow-hidden border-2 border-gray-200 shadow-sm relative">
                            <Image
                                src={personalInfo.photoUrl}
                                alt={personalInfo.fullName || "Profile Photo"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100px, 128px"
                                priority
                            />
                        </div>
                    </div>
                )}
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: themeColor }}>{personalInfo.fullName || "Your Name"}</h1>
                <p className="text-xl italic text-gray-600 mb-4">{personalInfo.title || "Professional Title"}</p>

                <div className="flex justify-center gap-6 text-sm text-gray-600 font-sans">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.link && <span>• {personalInfo.link}</span>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b mb-4 font-sans tracking-wide" style={{ color: themeColor, borderColor: themeColor }}>{l.profile}</h2>
                    <p className="leading-relaxed text-gray-800">{personalInfo.summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b mb-4 font-sans tracking-wide" style={{ color: themeColor, borderColor: themeColor }}>{l.experience}</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1 font-sans">
                                    <h3 className="font-bold text-lg">{exp.company}</h3>
                                    <span className="text-sm text-gray-600">{exp.startDate} – {exp.current ? l.present : exp.endDate}</span>
                                </div>
                                <div className="italic text-gray-700 mb-2">{exp.role}</div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b mb-4 font-sans tracking-wide" style={{ color: themeColor, borderColor: themeColor }}>{l.projects}</h2>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className="text-sm underline" style={{ color: themeColor }}>Link</a>}
                                </div>
                                <p className="text-sm leading-relaxed text-gray-800">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-8">
                {education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b mb-4 font-sans tracking-wide" style={{ color: themeColor, borderColor: themeColor }}>{l.education}</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold">{edu.institution}</h3>
                                    <div className="italic text-gray-700">{edu.degree}</div>
                                    {edu.field && <div className="text-sm text-gray-600">{edu.field}</div>}
                                    <div className="text-sm text-gray-500">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b mb-4 font-sans tracking-wide" style={{ color: themeColor, borderColor: themeColor }}>{l.skills}</h2>
                        <div className="space-y-3">
                            {skills.map((skill) => (
                                <div key={skill.id} className="space-y-1">
                                    <div className="flex justify-between items-baseline font-sans">
                                        <span className="font-bold text-gray-800">{skill.name}</span>
                                        <span className="text-sm text-gray-500 italic">{skill.level}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: skill.level === "Beginner" ? "25%" : skill.level === "Intermediate" ? "50%" : skill.level === "Advanced" ? "75%" : "100%",
                                                backgroundColor: themeColor
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.languages && data.languages.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-lg font-bold uppercase border-b mb-4 font-sans tracking-wide" style={{ color: themeColor, borderColor: themeColor }}>{labels?.languages || "Languages"}</h2>
                        <div className="space-y-3">
                            {data.languages.map((lang) => (
                                <div key={lang.id} className="space-y-1">
                                    <div className="flex justify-between items-baseline font-sans">
                                        <span className="font-bold text-gray-800">{lang.name}</span>
                                        <span className="text-sm text-gray-500 italic">{lang.level}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: lang.level === "Beginner" ? "25%" : lang.level === "Moderate" ? "50%" : lang.level === "Advanced" ? "75%" : "100%",
                                                backgroundColor: themeColor
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
