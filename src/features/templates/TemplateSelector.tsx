import { useResume } from "@/features/editor/ResumeContext";
import { templates } from "@/features/templates/registry";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function TemplateSelector() {
    const { resumeData, setTemplate } = useResume();

    return (
        <div className="grid grid-cols-2 gap-4 animate-[fade-in_0.3s]">
            {templates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => setTemplate(template.id)}
                    className={cn(
                        "group relative aspect-[210/297] rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02]",
                        resumeData.templateId === template.id
                            ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-[#0a0a0a]"
                            : "border-transparent opacity-70 hover:opacity-100"
                    )}
                >
                    {/* Thumbnail Preview (Using placeholder colors/gradients for now) */}
                    <div className={cn("w-full h-full", template.thumbnail)}>
                        {/* Mini Mockup Structure */}
                        <div className="p-2 opacity-50">
                            <div className="w-1/2 h-2 bg-current rounded mb-2" />
                            <div className="w-full h-1 bg-current rounded mb-1" />
                            <div className="w-full h-1 bg-current rounded mb-1" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">{template.name}</span>
                    </div>

                    {resumeData.templateId === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-lg">
                            <Check className="w-3 h-3" />
                        </div>
                    )}

                    <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-center text-xs text-white backdrop-blur-sm">
                        {template.name}
                    </div>
                </button>
            ))}
        </div>
    );
}
