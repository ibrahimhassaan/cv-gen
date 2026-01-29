import { getPublicResume } from "@/lib/resumeService";
import { getTemplate } from "@/features/templates/registry";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

interface PageProps {
    params: Promise<{ id: string; locale: string }>;
}

export default async function ViewResumePage({ params }: PageProps) {
    const { id } = await params;
    const resume = await getPublicResume(id);
    const t = await getTranslations('view');

    if (!resume) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">{t('notFoundTitle')}</h1>
                <p className="mb-6 text-muted-foreground">{t('notFoundMessage')}</p>
                <Link href="/">
                    <Button>{t('createYourOwn')}</Button>
                </Link>
            </div>
        );
    }

    // Check for expiration
    if (resume.shareConfig && resume.shareConfig.expiresAt < Date.now()) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">{t('expiredTitle')}</h1>
                <p className="mb-6 text-muted-foreground">{t('expiredMessage')}</p>
                <Link href="/">
                    <Button>{t('createYourOwn')}</Button>
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
                    ResumeGen
                </Link>
                <Link href="/">
                    <Button variant="default" className="shadow-lg shadow-primary/20 rounded-full">
                        {t('createYourOwn')}
                    </Button>
                </Link>
            </div>

            {/* Resume Viewer */}
            <div className="shadow-2xl bg-white w-[210mm] min-h-[297mm]">
                <TemplateComponent data={resume} />
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
                {t('builtWith')} <Link href="/" className="underline hover:text-primary">ResumeGen</Link>
            </div>
        </div>
    );
}
