import React from "react";
import { ResumeData } from "@/features/editor/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSidebarProps {
    data: ResumeData;
    sidebarSide?: "left" | "right";
    sidebarBg?: string; // Hex or Tailwind class
    sidebarText?: string;
    mainBg?: string;
    accentColor?: string;
    font?: "sans" | "serif";
    featureThemeBg?: boolean;
}

export const TemplateSidebar = ({
    data,
    sidebarSide = "left",
    sidebarBg = "bg-slate-100",
    sidebarText = "text-slate-700",
    mainBg = "bg-white",
    accentColor = "text-slate-900",
    font = "sans",
    featureThemeBg = false
}: TemplateSidebarProps) => {
    const { personalInfo, experience, education, skills, projects, labels, themeColor } = data;

    // Default labels fallback
    const l = {
        profile: labels?.profile || "Profile",
        experience: labels?.experience || "Experience",
        education: labels?.education || "Education",
        skills: labels?.skills || "Skills",
        projects: labels?.projects || "Projects",
        present: labels?.present || "Present"
    };

    // If featureThemeBg is true, we override the background with themeColor and force text white
    const activeSidebarBg = featureThemeBg ? undefined : sidebarBg;
    const activeSidebarStyle = featureThemeBg ? { backgroundColor: themeColor, color: "white" } : {};
    const sidebarTextClass = featureThemeBg ? "text-white" : sidebarText;
    const borderClass = featureThemeBg ? "border-white/20" : "border-current";

    const Sidebar = () => (
        <div
            className={cn("w-1/3 p-8 space-y-8 flex-shrink-0", activeSidebarBg, sidebarTextClass)}
            style={activeSidebarStyle}
        >
            {/* Contact Info (in sidebar for this layout) */}
            <div className="space-y-4 text-sm text-center">
                {personalInfo.photoUrl && (
                    <div className="mb-6 flex justify-center">
                        <div className={cn("w-32 h-32 rounded-full overflow-hidden border-4 shadow-md", featureThemeBg ? "border-white/30" : "border-white/20")}>
                            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                {personalInfo.email && (
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Mail className="w-4 h-4 opacity-70 shrink-0" />
                        <span className="break-all text-left">{personalInfo.email}</span>
                    </div>
                )}
                {personalInfo.phone && (
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Phone className="w-4 h-4 opacity-70 shrink-0" />
                        <span>{personalInfo.phone}</span>
                    </div>
                )}
                {personalInfo.link && (
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Globe className="w-4 h-4 opacity-70 shrink-0" />
                        <a href={personalInfo.link} className="break-all hover:underline text-left">{personalInfo.link}</a>
                    </div>
                )}
            </div>

            {skills.length > 0 && (
                <section>
                    <h3 className={cn("uppercase tracking-widest text-sm font-bold mb-4 border-b pb-1 opacity-80", borderClass)}>{l.skills}</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="text-sm block w-full">• {skill}</span>
                        ))}
                    </div>
                </section>
            )}

            {education.length > 0 && (
                <section>
                    <h3 className={cn("uppercase tracking-widest text-sm font-bold mb-4 border-b pb-1 opacity-80", borderClass)}>{l.education}</h3>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="font-bold text-sm">{edu.institution}</div>
                                <div className="text-xs opacity-90">{edu.degree}</div>
                                <div className="text-xs opacity-70 mt-0.5">{edu.year}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );

    const MainContent = () => (
        <div className={cn("flex-1 p-10 space-y-8", mainBg)}>
            <header className="mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: themeColor }}>{personalInfo.fullName || "Your Name"}</h1>
                <p className="text-xl opacity-75">{personalInfo.title || "Professional Title"}</p>
            </header>

            {personalInfo.summary && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b-2 pb-1 border-current" style={{ color: themeColor }}>{l.profile}</h2>
                    <p className="text-sm leading-relaxed opacity-90">{personalInfo.summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 border-current" style={{ color: themeColor }}>{l.experience}</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base">{exp.role}</h3>
                                    <span className="text-xs opacity-60 font-medium">
                                        {exp.startDate} - {exp.current ? l.present : exp.endDate}
                                    </span>
                                </div>
                                <div className={cn("text-sm font-medium mb-2 opacity-75")}>{exp.company}</div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap opacity-90">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {projects.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 border-current" style={{ color: themeColor }}>{l.projects}</h2>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-base">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className={cn("text-xs hover:underline opacity-70")}>Link</a>}
                                </div>
                                <p className="text-sm leading-relaxed mt-1 opacity-90">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );

    return (
        <div className={cn("w-[210mm] min-h-[297mm] shadow-2xl overflow-hidden flex relative print:shadow-none print:w-full", (data.font || font) === "serif" ? "font-serif" : (data.font || font) === "mono" ? "font-mono" : "font-sans")}>
            {sidebarSide === "left" && <Sidebar />}
            <MainContent />
            {sidebarSide === "right" && <Sidebar />}
        </div>
    );
};
