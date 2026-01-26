import { useState } from "react";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { ExperienceForm } from "./components/ExperienceForm";
import { EducationForm } from "./components/EducationForm";
import { SkillsForm } from "./components/SkillsForm";
import { cn } from "@/lib/utils";
import { User, Briefcase, GraduationCap, Code } from "lucide-react";

type Section = "personal" | "experience" | "education" | "skills" | "projects";

export function EditorForm() {
    const [activeSection, setActiveSection] = useState<Section>("personal");

    const sections: { id: Section; label: string; icon: any }[] = [
        { id: "personal", label: "Personal", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "skills", label: "Skills", icon: Code },
    ];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                activeSection === section.id
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{section.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Active Form */}
            <div className="min-h-[400px]">
                {activeSection === "personal" && <PersonalInfoForm />}
                {activeSection === "experience" && <ExperienceForm />}
                {activeSection === "education" && <EducationForm />}
                {activeSection === "skills" && <SkillsForm />}
            </div>
        </div>
    );
}
