'use server';

import { createClient } from '@/lib/supabaseServer';

export type ContactState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
    };
};

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const errors: ContactState['errors'] = {};

    if (!name || name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!subject || subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters.';
    }
    if (!message || message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, message: 'Please fix the errors below.', errors };
    }

    const supabase = await createClient();

    // Check if user is logged in to associate submission (optional)
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
        .from('contact_submissions')
        .insert({
            name,
            email,
            subject,
            message,
            user_id: user?.id || null,
        });

    if (error) {
        console.error('Contact submission error:', error);
        return { success: false, message: 'Failed to submit message. Please try again.' };
    }

    return { success: true, message: 'Message sent successfully! We will get back to you soon.' };
}
