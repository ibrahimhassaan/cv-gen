import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export function ExperienceForm() {
    const { resumeData, addExperience, updateExperience, removeExperience } = useResume();

    return (
        <div className="space-y-6 animate-[fade-in_0.3s]">
            {resumeData.experience.map((exp) => (
                <Card key={exp.id} className="bg-secondary/5 border-secondary/20">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Company</Label>
                                    <Input
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Input
                                        value={exp.role}
                                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                                        placeholder="Job Title"
                                    />
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeExperience(exp.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                    placeholder="MMM YYYY"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        value={exp.endDate}
                                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                        placeholder="MMM YYYY"
                                        disabled={exp.current}
                                    />
                                    {/* Checkbox for 'Current' could go here */}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                placeholder="• Achievements..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button onClick={addExperience} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
        </div>
    );
}
