import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            cvGenfy
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                            Create professional, ATS-friendly resumes in minutes. Choose from our premium templates and land your dream job.
                        </p>
                        {/* <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div> */}
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-foreground">Product</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            <li>
                                <Link href="/templates" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Create Resume
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-foreground">Legal & Support</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            <li>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-border border-t-gray-200 pt-8">
                <p className="text-xs text-muted-foreground text-center">
                    &copy; {new Date().getFullYear()} cvGenfy. All rights reserved.
                </p>
            </div>
        </footer>

    );
}
