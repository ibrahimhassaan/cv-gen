"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "./AuthContext";
import { useState } from "react";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function SignInModal({ isOpen, onClose, onSuccess }: SignInModalProps) {
    const { signInWithGoogle, signInWithGitHub } = useAuth();
    const [loading, setLoading] = useState<"google" | "github" | null>(null);

    if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
        setLoading("google");
        try {
            await signInWithGoogle();
            onSuccess?.();
        } catch (error) {
            console.error("Google sign in error:", error);
            setLoading(null);
        }
    };

    const handleGitHubSignIn = async () => {
        setLoading("github");
        try {
            await signInWithGitHub();
            onSuccess?.();
        } catch (error) {
            console.error("GitHub sign in error:", error);
            setLoading(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md mx-4 glass-card rounded-3xl p-8 shadow-2xl border border-white/30 animate-[slide-up_0.3s_ease-out]">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold font-display mb-2">
                        Sign in to continue
                    </h2>
                    <p className="text-muted-foreground">
                        Sign in to download your resume and access your dashboard
                    </p>
                </div>

                {/* Social login buttons */}
                <div className="space-y-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-center gap-3 h-12 border-gray-200 hover:bg-gray-50"
                        onClick={handleGoogleSignIn}
                        disabled={loading !== null}
                    >
                        {loading === "google" ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        )}
                        Continue with Google
                    </Button>
                </div>

                {/* Footer */}
                <p className="text-xs text-center text-muted-foreground mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}
