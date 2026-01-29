import React from "react";
import { ResumeData } from "@/features/editor/types";

import { cn } from "@/lib/utils";

export const TemplateRibbon = ({ data }: { data: ResumeData }) => {
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
        <div className={cn("w-[210mm] min-h-[297mm] bg-white text-slate-600 shadow-2xl overflow-hidden flex flex-col print:shadow-none print:w-full", fontClass)}>

            {/* Header Ribbon - CSS Clip Path for Arrow Shape */}
            <header className="relative w-full pt-12 pb-24 px-16 text-center text-white flex flex-col items-center"
                style={{
                    backgroundColor: themeColor,
                    clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)"
                }}>

                {personalInfo.photoUrl && (
                    <div className="w-28 h-28 rounded-full border-4 border-white/30 shadow-lg overflow-hidden mb-6">
                        <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}

                <h1 className="text-5xl font-bold mb-4 tracking-tight drop-shadow-sm">
                    {personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-xl font-medium tracking-widest uppercase opacity-90 mb-8">
                    {personalInfo.title || "Professional Title"}
                </p>

                {personalInfo.summary && (
                    <p className="text-sm max-w-2xl mx-auto leading-relaxed opacity-95">
                        {personalInfo.summary}
                    </p>
                )}
            </header>

            <main className="flex-1 px-16 py-8 grid grid-cols-12 gap-10">

                {/* Left Side (Contact & Skills) */}
                <aside className="col-span-4 space-y-12 pt-4">

                    <section className="text-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-3 mb-6">{l.contact}</h3>
                        <div className="space-y-4 text-sm text-slate-600">
                            {personalInfo.email && (
                                <div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-1" style={{ color: themeColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <div className="break-all">{personalInfo.email}</div>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-1" style={{ color: themeColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </div>
                                    <div>{personalInfo.phone}</div>
                                </div>
                            )}
                        </div>
                    </section>

                    {skills.length > 0 && (
                        <section className="text-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-3 mb-6">{l.skills}</h3>
                            <div className="space-y-4 text-left">
                                {skills.map((skill, index) => (
                                    <div key={`${skill.id}-${index}`} className="space-y-1">
                                        <div className="flex justify-between text-xs font-medium text-slate-600">
                                            <span>{skill.name}</span>
                                            <span className="opacity-70">{skill.level}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
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
                        <section className="text-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-3 mb-6">{labels?.languages || "Languages"}</h3>
                            <div className="space-y-4 text-left">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="space-y-1">
                                        <div className="flex justify-between text-xs font-medium text-slate-600">
                                            <span>{lang.name}</span>
                                            <span className="opacity-70">{lang.level}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
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

                    {education.length > 0 && (
                        <section className="text-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-3 mb-6">{l.education}</h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                                        <div className="text-xs text-slate-600 mb-1">{edu.institution}</div>
                                        <div className="text-xs text-slate-400 italic">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </aside>

                {/* Right Side (Experience & Projects) */}
                <div className="col-span-8 space-y-12">
                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-serif italic text-slate-400 mb-8 border-b-2 border-slate-100 pb-2">{l.experience}</h2>
                            <div className="space-y-10 pl-4 border-l-2 border-slate-100">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        {/* Time Dot */}
                                        <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: themeColor }}></div>

                                        <div className="text-sm italic text-slate-400 mb-1">
                                            {exp.startDate} - {exp.current ? l.present : exp.endDate}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-0.5">{exp.role}</h3>
                                        <div className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>{exp.company}</div>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-serif italic text-slate-400 mb-8 border-b-2 border-slate-100 pb-2">{l.projects}</h2>
                            <div className="space-y-6">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>
        </div>
    );
};
