import React from "react";
import { ResumeData } from "@/features/editor/types";

export const TemplateClassic = ({ data }: { data: ResumeData }) => {
    const { personalInfo, experience, education, skills, projects } = data;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-serif shadow-2xl overflow-hidden p-16 print:shadow-none print:w-full print:p-12">
            {/* Header */}
            <header className="border-b-2 border-gray-900 pb-6 mb-8 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{personalInfo.fullName || "Your Name"}</h1>
                <p className="text-xl italic text-gray-600 mb-4">{personalInfo.title || "Professional Title"}</p>

                <div className="flex justify-center gap-6 text-sm text-gray-600 font-sans">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.link && <span>• {personalInfo.link}</span>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 font-sans tracking-wide">Professional Profile</h2>
                    <p className="leading-relaxed text-gray-800">{personalInfo.summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 font-sans tracking-wide">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1 font-sans">
                                    <h3 className="font-bold text-lg">{exp.company}</h3>
                                    <span className="text-sm text-gray-600">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
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
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 font-sans tracking-wide">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className="text-sm text-blue-800 underline">Link</a>}
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
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 font-sans tracking-wide">Education</h2>
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
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 font-sans tracking-wide">Skills</h2>
                        <ul className="list-disc list-inside text-sm leading-relaxed text-gray-800 columns-1">
                            {skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
