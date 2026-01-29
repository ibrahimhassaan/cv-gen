import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

export const TemplateSerif = ({ data }: { data: ResumeData }) => {
    const { personalInfo, experience, education, skills, projects, themeColor, labels } = data;

    // Default labels fallback
    const l = {
        profile: labels?.profile || "Profile",
        experience: labels?.experience || "Experience",
        education: labels?.education || "Education",
        skills: labels?.skills || "Skills",
        projects: labels?.projects || "Projects",
        present: labels?.present || "Present",
        contact: "Contact"
    };

    const fontClass = data.font === "serif" ? "font-serif" : data.font === "mono" ? "font-mono" : "font-sans";

    return (
        <div className={cn("w-[210mm] min-h-[297mm] bg-white text-gray-800 shadow-2xl overflow-hidden p-16 relative flex flex-col print:shadow-none print:w-full print:p-12", fontClass)}>

            {/* Header / Name */}
            <header className="mb-12 flex justify-between items-start">
                <div>
                    <h1 className="text-5xl text-gray-900 tracking-tight mb-2 uppercase" style={{ color: themeColor }}>
                        {personalInfo.fullName || "Your Name"}
                    </h1>
                    <p className="text-xl italic text-gray-500 font-light mb-6">
                        {personalInfo.title || "Professional Title"}
                    </p>
                </div>
                {personalInfo.photoUrl && (
                    <div className="w-32 h-32 ml-8 shrink-0 overflow-hidden border border-gray-200 p-1 bg-white shadow-sm rotate-3">
                        <div className="w-full h-full bg-gray-50 overflow-hidden">
                            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-full h-full object-cover grayscale opacity-90" />
                        </div>
                    </div>
                )}
            </header>

            <div className="flex gap-12">

                {/* Main Content */}
                <div className="flex-1 space-y-10">

                    {personalInfo.summary && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{l.profile}</h3>
                            <p className="text-sm leading-7 text-gray-600">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{l.experience}</h3>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100" style={{ borderColor: themeColor }}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900 text-lg">{exp.role}</h4>
                                            <span className="text-xs text-gray-400 font-sans tracking-wider">
                                                {exp.startDate} — {exp.current ? l.present : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium mb-2 opacity-80" style={{ color: themeColor }}>{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-gray-600">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{l.projects}</h3>
                            <div className="grid grid-cols-1 gap-6">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900">{proj.name}</h4>
                                            {proj.link && <span className="text-xs underline opacity-50">{proj.link}</span>}
                                        </div>
                                        <p className="text-xs leading-relaxed text-gray-600">
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right/Meta Column */}
                <div className="w-48 space-y-10 pt-2">

                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{l.contact}</h3>
                        <div className="space-y-3 text-sm text-gray-600 font-sans">
                            {personalInfo.email && (
                                <div className="break-all">
                                    <span className="block text-xs text-gray-400 mb-0.5">Email</span>
                                    {personalInfo.email}
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div>
                                    <span className="block text-xs text-gray-400 mb-0.5">Phone</span>
                                    {personalInfo.phone}
                                </div>
                            )}
                            {personalInfo.link && (
                                <div className="break-all">
                                    <span className="block text-xs text-gray-400 mb-0.5">Link</span>
                                    {personalInfo.link}
                                </div>
                            )}
                        </div>
                    </section>

                    {education.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{l.education}</h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-gray-900 leading-tight mb-1">{edu.institution}</div>
                                        <div className="text-xs text-gray-500 italic mb-1">{edu.degree}</div>
                                        <div className="text-xs text-gray-400 font-sans">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{l.skills}</h3>
                            <div className="space-y-4">
                                {skills.map((skill, index) => (
                                    <div key={`${skill.id}-${index}`} className="space-y-1">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div className="text-sm font-medium text-gray-700">{skill.name}</div>
                                            <div className="text-xs text-gray-400 italic">{skill.level}</div>
                                        </div>
                                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
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
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{labels?.languages || "Languages"}</h3>
                            <div className="space-y-4">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="space-y-1">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div className="text-sm font-medium text-gray-700">{lang.name}</div>
                                            <div className="text-xs text-gray-400 italic">{lang.level}</div>
                                        </div>
                                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
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
        </div>
    );
};
