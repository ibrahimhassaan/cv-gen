"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, XCircle, CheckCircle } from "lucide-react";

export function AuthFeedback() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const err = searchParams.get("error");
        const msg = searchParams.get("message");

        requestAnimationFrame(() => {
            if (err === "auth_failed") {
                const authFailedMsg = "Authentication failed. Please make sure you have configured your environment variables and enabled social login in Supabase.";
                setError(prev => prev !== authFailedMsg ? authFailedMsg : prev);
            } else if (err) {
                setError(prev => prev !== err ? err : prev);
            }

            if (msg) {
                setMessage(prev => prev !== msg ? msg : prev);
            }
        });
    }, [searchParams]);

    if (!error && !message) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6 animate-[slide-up_0.3s_ease-out]">
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl shadow-xl backdrop-blur-md">
                    <XCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="ml-auto p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                        <AlertCircle className="w-4 h-4" />
                    </button>
                </div>
            )}
            {message && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl shadow-xl backdrop-blur-md">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{message}</p>
                    <button
                        onClick={() => setMessage(null)}
                        className="ml-auto p-1 hover:bg-green-100 rounded-full transition-colors"
                    >
                        <AlertCircle className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
