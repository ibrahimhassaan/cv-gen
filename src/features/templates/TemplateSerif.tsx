import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

export const TemplateSerif = ({ data }: { data: ResumeData }) => {
    const { personalInfo, experience, education, skills, projects, themeColor } = data;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-gray-800 font-serif shadow-2xl overflow-hidden p-16 relative flex flex-col justify-between print:shadow-none print:w-full print:p-12">

            {/* Header / Name */}
            <header className="mb-12">
                <h1 className="text-5xl text-gray-900 tracking-tight mb-2 uppercase" style={{ color: themeColor }}>
                    {personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-xl italic text-gray-500 font-light mb-6">
                    {personalInfo.title || "Professional Title"}
                </p>

                {/* Contact Sidebar (Actually rendered inline for this layout based on Image 1, looks like a left column or top block) 
                   Wait, Image 1 (Chloe Anderson) has a left sidebar for meta and main content on right? 
                   Actually looking at "Chloe Anderson" typical designs, one is top header, one is side. 
                   Let's stick to the "Serif/Minimal" description. 
                   I'll implement a clean Classical Serif layout with modern touch.
                */}
            </header>

            <div className="flex gap-12">

                {/* Main Content */}
                <div className="flex-1 space-y-10">

                    {personalInfo.summary && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Profile</h3>
                            <p className="text-sm leading-7 text-gray-600">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Experience</h3>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100" style={{ borderColor: themeColor }}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900 text-lg">{exp.role}</h4>
                                            <span className="text-xs text-gray-400 font-sans tracking-wider">
                                                {exp.startDate} — {exp.current ? "Present" : exp.endDate}
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
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Projects</h3>
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
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Contact</h3>
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
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Education</h3>
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
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Skills</h3>
                            <div className="space-y-2">
                                {skills.map((skill, i) => (
                                    <div key={i} className="text-sm text-gray-600 border-b border-gray-100 pb-1">
                                        {skill}
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
