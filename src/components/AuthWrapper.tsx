"use client";

import { AuthProvider } from "@/features/auth";
import { ReactNode } from "react";

export function AuthWrapper({ children }: { children: ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
