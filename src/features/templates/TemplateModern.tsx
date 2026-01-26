import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

export const TemplateModern = ({ data }: { data: ResumeData }) => {
    const { personalInfo, experience, education, skills, projects } = data;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 font-sans shadow-2xl overflow-hidden flex flex-col relative print:shadow-none print:w-full">
            {/* Header */}
            <header className="bg-slate-900 text-white p-10 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full blur-[80px] opacity-20 transform translate-x-1/2 -translate-y-1/2" />

                <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase break-words relative z-10">{personalInfo.fullName || "Your Name"}</h1>
                <p className="text-violet-300 text-lg font-medium tracking-wide mb-6 relative z-10">{personalInfo.title || "Professional Title"}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-300 relative z-10">
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

            <div className="flex flex-1">
                {/* Main Column */}
                <div className="w-2/3 p-10 pr-6 space-y-8">

                    {personalInfo.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 border-b-2 border-slate-100 pb-1">Profile</h2>
                            <p className="text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 border-b-2 border-slate-100 pb-1">Experience</h2>
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-800">{exp.role}</h3>
                                            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-violet-700 font-medium mb-2">{exp.company}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 border-b-2 border-slate-100 pb-1">Projects</h2>
                            <div className="space-y-4">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-slate-800">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} className="text-xs text-violet-600 hover:underline">Link</a>}
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
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-1">Skills</h2>
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
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-1">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                                        <div className="text-xs text-violet-700 font-medium mt-0.5">{edu.degree}</div>
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
