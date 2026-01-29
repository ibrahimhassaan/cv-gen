import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

const isApiRoute = createRouteMatcher(['/api(.*)']);
const isPublicFile = createRouteMatcher(['/sitemap.xml', '/robots.txt']);

export default clerkMiddleware(async (auth, req) => {
    const { pathname } = req.nextUrl;
    console.log(`[Middleware] Request path: ${pathname}`);

    // If it is an API route or a public static file (sitemap, robots), do not run intlMiddleware
    if (isApiRoute(req) || isPublicFile(req)) {
        console.log(`[Proxy] Skipping intl for: ${pathname}`);
        return NextResponse.next();
    }
    console.log(`[Middleware] Running intl for: ${pathname}`);
    return intlMiddleware(req);
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|xml|txt)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
