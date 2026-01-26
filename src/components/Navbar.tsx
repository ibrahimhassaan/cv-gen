"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileText, Home } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold font-display bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        CV Gen
                    </span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </Button>
                    </Link>
                    <Link href="/create/manual">
                        <Button variant="default" size="sm">
                            Create CV
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
