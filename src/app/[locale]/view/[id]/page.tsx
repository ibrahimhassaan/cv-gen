import { getPublicResume } from "@/lib/resumeService";
import { getTemplate } from "@/features/templates/registry";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PageProps {
    params: Promise<{ id: string; locale: string }>;
}

export default async function ViewResumePage({ params }: PageProps) {
    const { id } = await params;
    const resume = await getPublicResume(id);

    if (!resume) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Resume Not Found</h1>
                <p className="mb-6 text-muted-foreground">The resume you are looking for does not exist or is not available.</p>
                <Link href="/">
                    <Button>Create Your Own Resume</Button>
                </Link>
            </div>
        );
    }

    const TemplateComponent = getTemplate(resume.templateId).component;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10">
            {/* Top Bar for CTA */}
            <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 px-4 md:px-0">
                <Link href="/" className="font-display font-bold text-xl">
                    CVGen
                </Link>
                <Link href="/">
                    <Button variant="default" className="shadow-lg shadow-primary/20 rounded-full">
                        Create Your Own Resume
                    </Button>
                </Link>
            </div>

            {/* Resume Viewer */}
            <div className="shadow-2xl bg-white w-[210mm] min-h-[297mm]">
                <TemplateComponent data={resume} />
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
                Built with <Link href="/" className="underline hover:text-primary">CVGen</Link>
            </div>
        </div>
    );
}
