"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

// Routes where the footer should be hidden
const HIDDEN_FOOTER_ROUTES = ["/resume-builder"];

export function FooterWrapper() {
    const pathname = usePathname();

    // Check if current path matches any hidden route (accounting for locale prefix)
    const shouldHide = HIDDEN_FOOTER_ROUTES.some((route) =>
        pathname.endsWith(route) || pathname.includes(`${route}?`)
    );

    if (shouldHide) {
        return null;
    }

    return <Footer />;
}
