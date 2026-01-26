import { useState } from "react";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { ExperienceForm } from "./components/ExperienceForm";
import { EducationForm } from "./components/EducationForm";
import { SkillsForm } from "./components/SkillsForm";
import { cn } from "@/lib/utils";
import { User, Briefcase, GraduationCap, Code, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Section = "personal" | "experience" | "education" | "skills";

export function EditorForm() {
    const [activeSection, setActiveSection] = useState<Section>("personal");

    const sections: { id: Section; label: string; icon: any }[] = [
        { id: "personal", label: "Personal", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "skills", label: "Skills", icon: Code },
    ];

    const activeIndex = sections.findIndex((s) => s.id === activeSection);

    const handleNext = () => {
        if (activeIndex < sections.length - 1) {
            setActiveSection(sections[activeIndex + 1].id);
        }
    };

    const handleBack = () => {
        if (activeIndex > 0) {
            setActiveSection(sections[activeIndex - 1].id);
        }
    };

    return (
        <div className="space-y-8 flex flex-col h-full">
            {/* Stepper Navigation */}
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 transform -translate-y-1/2" />
                <div className="flex justify-between items-center px-2">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        const isActive = index === activeIndex;
                        const isCompleted = index < activeIndex;

                        return (
                            <div key={section.id} className="flex flex-col items-center space-y-2 cursor-pointer group" onClick={() => setActiveSection(section.id)}>
                                <div
                                    className={cn(
                                        "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background",
                                        isActive
                                            ? "border-primary text-primary shadow-lg shadow-primary/20 scale-110"
                                            : isCompleted
                                                ? "border-primary bg-primary text-white"
                                                : "border-white/20 text-muted-foreground group-hover:border-white/40"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                </div>
                                <span className={cn(
                                    "text-sm font-medium transition-colors duration-300 absolute -bottom-8 w-24 text-center",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}>
                                    {section.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Active Form Area */}
            <div className="flex-1 mt-8 min-h-[400px] overflow-y-auto pt-4 pb-20">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeSection === "personal" && <PersonalInfoForm />}
                    {activeSection === "experience" && <ExperienceForm />}
                    {activeSection === "education" && <EducationForm />}
                    {activeSection === "skills" && <SkillsForm />}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0 z-10 py-4">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={activeIndex === 0}
                    className={cn(activeIndex === 0 && "opacity-0 pointer-events-none", "h-12 text-lg px-6")}
                >
                    <ChevronLeft className="w-5 h-5 mr-2" /> Back
                </Button>

                {activeIndex === sections.length - 1 ? (
                    <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white h-12 text-lg px-8">
                        Finish <Check className="w-5 h-5 ml-2" />
                    </Button>
                ) : (
                    <Button onClick={handleNext} className="h-12 text-lg px-8">
                        Next <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
}
