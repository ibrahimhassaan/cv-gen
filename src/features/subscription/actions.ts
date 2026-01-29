"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const subscribeSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    source: z.string().optional(),
});

export type SubscribeState = {
    success?: boolean;
    error?: string;
    message?: string;
};

export async function subscribeToFeature(prevState: SubscribeState, formData: FormData): Promise<SubscribeState> {
    const rawFormData = {
        email: formData.get("email"),
        source: formData.get("source"),
    };

    const validatedFields = subscribeSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid email",
        };
    }

    const { email, source } = validatedFields.data;
    const supabase = createClient();

    try {
        const { error } = await supabase
            .from("subscriptions")
            .insert({ email, source });

        if (error) {
            // Handle unique constraint violation (code 23505 is common for unique violation in Postgres)
            if (error.code === '23505') {
                return {
                    success: true,
                    message: "You are already subscribed! We'll keep you posted.",
                };
            }
            console.error("Subscription error:", error);
            throw new Error("Failed to subscribe");
        }

        return {
            success: true,
            message: "Thanks for subscribing! We'll notify you when this feature is ready.",
        };

    } catch (error) {
        return {
            success: false,
            error: "Something went wrong. Please try again later.",
        };
    }
}
