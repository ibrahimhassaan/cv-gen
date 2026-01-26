import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export function EducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResume();

    return (
        <div className="space-y-6 animate-[fade-in_0.3s]">
            {resumeData.education.map((edu) => (
                <Card key={edu.id} className="bg-secondary/5 border-secondary/20">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="w-full space-y-2">
                                <Label>Institution</Label>
                                <Input
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                    placeholder="University / School"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 mt-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeEducation(edu.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                    placeholder="Bachelor's, Master's"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Field of Study</Label>
                                <Input
                                    value={edu.field}
                                    onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                    placeholder="Computer Science"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Year</Label>
                            <Input
                                value={edu.year}
                                onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                                placeholder="2020 - 2024"
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button onClick={addEducation} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Education
            </Button>
        </div>
    );
}
