import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export function SkillsForm() {
    const { resumeData, addSkill, removeSkill } = useResume();
    const [newSkill, setNewSkill] = useState("");

    const handleAdd = () => {
        if (newSkill.trim()) {
            addSkill(newSkill.trim());
            setNewSkill("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="space-y-6 animate-[fade-in_0.3s]">
            <div className="space-y-4">
                <Label>Add Skills</Label>
                <div className="flex gap-2">
                    <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. JavaScript, React, System Design"
                    />
                    <Button onClick={handleAdd} size="icon">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm animate-in zoom-in-50 duration-200"
                    >
                        <span>{skill}</span>
                        <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-destructive focus:outline-none"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                {resumeData.skills.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No skills added yet.</p>
                )}
            </div>
        </div>
    );
}
