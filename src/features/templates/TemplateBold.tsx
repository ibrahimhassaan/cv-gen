import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe, MapPin, Briefcase, GraduationCap, Code } from "lucide-react";

import { cn } from "@/lib/utils";

export const TemplateBold = ({ data }: { data: ResumeData }) => {
    const { personalInfo, experience, education, skills, projects, themeColor, labels } = data;

    // Default labels fallback
    const l = {
        profile: labels?.profile || "Profile",
        experience: labels?.experience || "Experience",
        education: labels?.education || "Education",
        skills: labels?.skills || "Skills",
        projects: labels?.projects || "Projects",
        present: labels?.present || "Present"
    };

    const fontClass = data.font === "serif" ? "font-serif" : data.font === "mono" ? "font-mono" : "font-sans";

    return (
        <div className={cn("w-[210mm] min-h-[297mm] bg-white text-slate-600 shadow-2xl overflow-hidden flex flex-col print:shadow-none print:w-full", fontClass)}>

            {/* Header Bar */}
            <div className="h-4 w-full" style={{ backgroundColor: themeColor }}></div>

            <header className="px-12 pt-12 pb-8 flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-[3.5rem] font-black uppercase tracking-tighter leading-none text-slate-900 mb-2">
                        {personalInfo.fullName || "Your Name"}
                    </h1>
                    <p className="text-xl font-medium tracking-wide uppercase text-slate-400 mb-8">
                        {personalInfo.title || "Professional Title"}
                    </p>

                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-slate-500 border-t-2 border-slate-100 pt-6">
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" style={{ color: themeColor }} />
                                <span>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" style={{ color: themeColor }} />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.link && (
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" style={{ color: themeColor }} />
                                <span>{personalInfo.link}</span>
                            </div>
                        )}
                    </div>
                </div>

                {personalInfo.photoUrl && (
                    <div className="w-40 h-40 shadow-2xl skew-y-3 border-4 border-white ml-8 shrink-0 bg-slate-200">
                        <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
            </header>

            <main className="flex flex-1 px-12 pb-12 gap-12">

                {/* Left Column (Main) */}
                <div className="w-2/3 space-y-10">

                    {personalInfo.summary && (
                        <section>
                            <p className="text-lg leading-relaxed text-slate-600 font-light">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
                                <Briefcase className="w-5 h-5" />
                                {l.experience}
                            </h2>

                            <div className="border-l-2 border-slate-100 ml-2.5 pl-8 space-y-8 pb-2">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: themeColor }}></div>

                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 text-lg uppercase">{exp.role}</h3>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span className="font-bold text-slate-700">{exp.company}</span>
                                            <span className="text-slate-400 font-mono text-xs bg-slate-50 px-2 py-1 rounded">
                                                {exp.startDate} - {exp.current ? l.present : exp.endDate}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
                                <Code className="w-5 h-5" />
                                {l.projects}
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-xs font-bold hover:underline" style={{ color: themeColor }}>View &rarr;</a>}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Right Column (Sidebar) */}
                <div className="w-1/3 space-y-10">

                    {skills.length > 0 && (
                        <section>
                            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
                                {l.skills}
                            </h2>
                            <div className="flex flex-col gap-3">
                                {skills.map((skill) => (
                                    <div key={skill.id} className="p-3 bg-white border-2 rounded shadow-sm" style={{ borderColor: themeColor }}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-bold text-slate-700">{skill.name}</span>
                                            <span className="text-xs font-medium text-slate-400">{skill.level}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
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
                            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
                                <Globe className="w-5 h-5" />
                                {labels?.languages || "Languages"}
                            </h2>
                            <div className="flex flex-col gap-3">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="p-3 bg-white border-2 rounded shadow-sm" style={{ borderColor: themeColor }}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-bold text-slate-700">{lang.name}</span>
                                            <span className="text-xs font-medium text-slate-400">{lang.level}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
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
                        <section>
                            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
                                <GraduationCap className="w-5 h-5" />
                                {l.education}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-slate-900">{edu.institution}</div>
                                        <div className="text-sm font-medium" style={{ color: themeColor }}>{edu.degree}</div>
                                        <div className="text-xs text-slate-500 mt-1">{edu.field}</div>
                                        <div className="text-xs text-slate-400 mt-2 p-1 bg-slate-50 inline-block rounded">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>

            {/* Footer Bar */}
            <div className="h-4 w-full mt-auto" style={{ backgroundColor: themeColor }}></div>
        </div>
    );
};
