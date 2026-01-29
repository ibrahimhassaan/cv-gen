"use client";

import { ResumeData } from "@/features/editor/types";
import { getTemplate } from "@/features/templates/registry";
import { formatDistanceToNow } from "date-fns";
import {
    Share2,
    Download,
    MoreVertical,
    FileText,
    Copy,
    Trash2,
    Edit3,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { useTranslations } from "next-intl";

interface CVCardProps {
    resume: ResumeData;
    onDownload: (resume: ResumeData) => void;
    onShare: (resume: ResumeData) => void;
    onDelete: (resumeId: string) => void;
    onDuplicate: (resumeId: string) => void;
    onRename: (resume: ResumeData) => void;
}

export function CVCard({
    resume,
    onDownload,
    onShare,
    onDelete,
    onDuplicate,
    onRename,
}: CVCardProps) {
    const TemplatePreview = getTemplate(resume.templateId).component;
    const t = useTranslations('dashboardPage');

    return (
        <div className="flex flex-col gap-4">
            {/* CV Preview Card */}
            <div className="group relative h-[300px] w-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 shadow-sm transition-all hover:shadow-md">
                <div className="absolute inset-0 flex items-start justify-center pt-6 origin-top transform scale-[0.4]">
                    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl pointer-events-none origin-top">
                        <TemplatePreview data={resume} />
                    </div>
                </div>

                {/* Hover Overlay for Edit */}
                <Link
                    href={`/create/manual?id=${resume.id}`}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100"
                >
                    <Button size="lg" className="rounded-full shadow-xl font-semibold bg-white text-gray-900 hover:bg-gray-50">
                        <Edit3 className="mr-2 h-4 w-4" />
                        {t('editResume')}
                    </Button>
                </Link>
            </div>

            {/* Info & Actions */}
            <div className="flex flex-col gap-3 px-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3
                            className="truncate text-lg font-bold text-gray-900"
                            title={resume.title || resume.personalInfo.fullName}
                        >
                            {resume.title || t('untitled')}
                        </h3>
                        <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            {t('edited')} {formatDistanceToNow(resume.lastModified, { addSuffix: true })}
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-gray-400 hover:text-gray-900"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => onRename(resume)}>
                                <FileText className="mr-2 h-4 w-4" />
                                {t('rename')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDuplicate(resume.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                {t('duplicate')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(resume.id)}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t('delete')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    <Button
                        variant="outline"
                        className="w-full justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 h-10 rounded-xl"
                        onClick={() => onDownload(resume)}
                    >
                        <Download className="h-4 w-4" />
                        {t('download')}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 h-10 rounded-xl"
                        onClick={() => onShare(resume)}
                    >
                        <Share2 className="h-4 w-4" />
                        {t('share')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
