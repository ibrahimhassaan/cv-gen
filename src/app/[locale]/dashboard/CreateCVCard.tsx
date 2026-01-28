"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export function CreateCVCard() {
    return (
        <Link href="/create/manual" className="group h-full">
            <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 p-8 transition-all hover:bg-primary/5 hover:border-primary/50">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                    <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Create new CV</h3>
                <p className="text-center text-sm text-muted-foreground">
                    Start from scratch with one of our professional templates
                </p>
            </div>
        </Link>
    );
}
