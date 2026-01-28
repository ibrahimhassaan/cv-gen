import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateModernProps {
    data: ResumeData;
    featureThemeBg?: boolean;
}

export const TemplateModern = ({ data, featureThemeBg = false }: TemplateModernProps) => {
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

    const headerBgClass = featureThemeBg ? undefined : "bg-slate-900";
    const headerStyle = featureThemeBg ? { backgroundColor: themeColor } : {};
    const titleColor = featureThemeBg ? "text-white/90" : undefined;
    const titleStyle = featureThemeBg ? {} : { color: themeColor };
    const blurColor = featureThemeBg ? "white" : themeColor;
    const fontClass = data.font === "serif" ? "font-serif" : data.font === "mono" ? "font-mono" : "font-sans";

    return (
        <div className={cn("w-[210mm] min-h-[297mm] bg-white text-slate-600 shadow-2xl overflow-hidden flex flex-col relative print:shadow-none print:w-full", fontClass)}>
            {/* Header */}
            <header
                className={cn("text-white p-10 pb-16 relative overflow-hidden", headerBgClass)}
                style={headerStyle}
            >
                <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 transform translate-x-1/2 -translate-y-1/2"
                    style={{ backgroundColor: blurColor }}
                />

                <div className="flex items-center gap-8 relative z-10">
                    {personalInfo.photoUrl && (
                        <div className={cn("w-32 h-32 rounded-full border-4 shadow-xl overflow-hidden shrink-0", featureThemeBg ? "border-white/30" : "border-white/20")}>
                            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase break-words">{personalInfo.fullName || "Your Name"}</h1>
                        <p
                            className={cn("text-lg font-medium tracking-wide mb-6", titleColor)}
                            style={titleStyle}
                        >
                            {personalInfo.title || "Professional Title"}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                            {personalInfo.email && (
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.link && (
                                <div className="flex items-center gap-1.5">
                                    <Globe className="w-3.5 h-3.5" />
                                    <span>{personalInfo.link}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Main Column */}
                <div className="w-2/3 p-10 pr-6 space-y-8">

                    {personalInfo.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 border-b-2 border-slate-100 pb-1" style={{ color: themeColor }}>{l.profile}</h2>
                            <p className="text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 border-b-2 border-slate-100 pb-1" style={{ color: themeColor }}>{l.experience}</h2>
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-600">{exp.role}</h3>
                                            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                                                {exp.startDate} - {exp.current ? l.present : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium mb-2" >{exp.company}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 border-b-2 border-slate-100 pb-1" style={{ color: themeColor }}>{l.projects}</h2>
                            <div className="space-y-4">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-slate-600">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-xs hover:underline">Link</a>}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed mt-1">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="w-1/3 bg-slate-50 p-10 pl-6 border-l border-slate-100 space-y-8">

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-1" style={{ color: themeColor }}>{l.skills}</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="inline-block bg-white border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-1" style={{ color: themeColor }}>{l.education}</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-600 text-sm">{edu.institution}</h3>
                                        <div className="text-xs font-medium mt-0.5">{edu.degree}</div>
                                        {edu.field && <div className="text-xs text-slate-500">{edu.field}</div>}
                                        <div className="text-xs text-slate-400 mt-1">{edu.year}</div>
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
