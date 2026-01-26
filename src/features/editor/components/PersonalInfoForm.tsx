import { useResume } from "@/features/editor/ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

export function PersonalInfoForm() {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo } = resumeData;

    const handleChange = (field: string, value: string) => {
        updatePersonalInfo(field, value);
    };

    return (
        <div className="space-y-4 animate-[fade-in_0.3s]">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                        id="title"
                        value={personalInfo.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Software Engineer"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={personalInfo.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 234 567 890"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="link">Portfolio / LinkedIn</Label>
                <Input
                    id="link"
                    value={personalInfo.link}
                    onChange={(e) => handleChange("link", e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                    placeholder="Briefly describe your professional background and goals..."
                    className="min-h-[120px]"
                />
            </div>
        </div>
    );
}
