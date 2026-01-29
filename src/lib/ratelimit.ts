import { NextResponse } from "next/server";

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store for rate limiting (consider Redis for production with multiple instances)
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
    windowMs: number;     // Time window in milliseconds
    maxRequests: number;  // Max requests per window
}

// Default config: 10 requests per minute
const defaultConfig: RateLimitConfig = {
    windowMs: 60 * 1000,  // 1 minute
    maxRequests: 10,
};

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (e.g., IP address or user ID)
 * @param config - Rate limit configuration
 * @returns Object with allowed boolean and remaining requests
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
        cleanupExpiredEntries();
    }

    if (!entry || now > entry.resetTime) {
        // First request or window expired - reset
        rateLimitStore.set(identifier, {
            count: 1,
            resetTime: now + config.windowMs,
        });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs,
        };
    }

    if (entry.count >= config.maxRequests) {
        // Rate limit exceeded
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetTime - now,
        };
    }

    // Increment count
    entry.count++;
    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: entry.resetTime - now,
    };
}

/**
 * Clean up expired entries from the store
 */
function cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

/**
 * Get client identifier from request (IP-based)
 */
export function getClientIdentifier(request: Request): string {
    // Try to get real IP from common headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp;
    }

    // Fallback to a generic identifier
    return "anonymous";
}

/**
 * Rate limit middleware helper for API routes
 * @returns null if allowed, NextResponse if rate limited
 */
export function withRateLimit(
    request: Request,
    config?: RateLimitConfig
): NextResponse | null {
    const identifier = getClientIdentifier(request);
    const result = checkRateLimit(`ai:${identifier}`, config);

    if (!result.allowed) {
        return NextResponse.json(
            {
                error: "Too many requests. Please try again later.",
                retryAfter: Math.ceil(result.resetIn / 1000),
            },
            {
                status: 429,
                headers: {
                    "Retry-After": String(Math.ceil(result.resetIn / 1000)),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": String(Math.ceil(result.resetIn / 1000)),
                },
            }
        );
    }

    return null;
}
