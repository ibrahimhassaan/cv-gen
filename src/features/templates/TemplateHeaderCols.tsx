import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateHeaderColsProps {
    data: ResumeData;
    headerBg?: string; // Hex or Tailwind class
    headerText?: string;
    columnLayout?: "two-equal" | "main-left" | "main-right";
    accentColor?: string;
    font?: "sans" | "serif";
}

export const TemplateHeaderCols = ({
    data,
    headerBg = "bg-white",
    headerText = "text-slate-900",
    columnLayout = "main-left",
    accentColor = "text-blue-600",
    font = "sans"
}: TemplateHeaderColsProps) => {
    const { personalInfo, experience, education, skills, projects } = data;

    return (
        <div className={cn("w-[210mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden flex flex-col relative print:shadow-none print:w-full", font === "serif" ? "font-serif" : "font-sans")}>
            {/* Header */}
            <header className={cn("p-10 pb-8", headerBg, headerText)}>
                <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{personalInfo.fullName || "Your Name"}</h1>
                <p className="text-lg opacity-80 mb-6 font-medium">{personalInfo.title || "Professional Title"}</p>

                <div className="flex flex-wrap gap-6 text-sm opacity-75">
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
            </header>

            <div className="flex flex-1 p-10 pt-8 gap-8">
                {/* Left Column */}
                <div className={cn("space-y-8", columnLayout === "two-equal" ? "w-1/2" : columnLayout === "main-left" ? "w-2/3" : "w-1/3")}>
                    {/* If main content is left */}
                    {columnLayout !== "main-right" && (
                        <>
                            {personalInfo.summary && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-3 border-b pb-1", accentColor)}>Profile</h2>
                                    <p className="text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
                                </section>
                            )}

                            {experience.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Experience</h2>
                                    <div className="space-y-6">
                                        {experience.map((exp) => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="font-bold text-slate-800">{exp.role}</h3>
                                                    <span className="text-xs text-slate-500 font-medium">
                                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                    </span>
                                                </div>
                                                <div className={cn("text-sm font-medium mb-1", accentColor)}>{exp.company}</div>
                                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {columnLayout === "two-equal" && education.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Education</h2>
                                    <div className="space-y-4">
                                        {education.map((edu) => (
                                            <div key={edu.id}>
                                                <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                                                <div className="text-xs text-slate-600">{edu.degree}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{edu.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {/* If sidebar is left (main-right) */}
                    {columnLayout === "main-right" && (
                        <>
                            {skills.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Skills</h2>
                                    <div className="flex flex-col gap-2">
                                        {skills.map((skill, i) => (
                                            <span key={i} className="text-sm text-slate-700">• {skill}</span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {education.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Education</h2>
                                    <div className="space-y-4">
                                        {education.map((edu) => (
                                            <div key={edu.id}>
                                                <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                                                <div className="text-xs text-slate-600">{edu.degree}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{edu.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>

                {/* Right Column */}
                <div className={cn("space-y-8", columnLayout === "two-equal" ? "w-1/2" : columnLayout === "main-left" ? "w-1/3" : "w-2/3")}>
                    {/* If main content is right */}
                    {columnLayout === "main-right" && (
                        <>
                            {personalInfo.summary && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-3 border-b pb-1", accentColor)}>Profile</h2>
                                    <p className="text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
                                </section>
                            )}
                            {experience.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Experience</h2>
                                    <div className="space-y-6">
                                        {experience.map((exp) => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="font-bold text-slate-800">{exp.role}</h3>
                                                    <span className="text-xs text-slate-500 font-medium">
                                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                    </span>
                                                </div>
                                                <div className={cn("text-sm font-medium mb-1", accentColor)}>{exp.company}</div>
                                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {/* If sidebar is right (main-left or two-equal) */}
                    {columnLayout !== "main-right" && (
                        <>
                            {skills.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Skills</h2>
                                    <div className="flex flex-col gap-2">
                                        {skills.map((skill, i) => (
                                            <span key={i} className="text-sm text-slate-700">• {skill}</span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {columnLayout !== "two-equal" && education.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Education</h2>
                                    <div className="space-y-4">
                                        {education.map((edu) => (
                                            <div key={edu.id}>
                                                <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                                                <div className="text-xs text-slate-600">{edu.degree}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{edu.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {projects.length > 0 && (
                                <section>
                                    <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1", accentColor)}>Projects</h2>
                                    <div className="space-y-4">
                                        {projects.map((proj) => (
                                            <div key={proj.id}>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-sm text-slate-800">{proj.name}</h3>
                                                    {proj.link && <a href={proj.link} className={cn("text-xs hover:underline", accentColor)}>Link</a>}
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mt-1">{proj.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
