'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from '@/features/contact/actions';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const initialState: ContactState = {
    success: false,
    message: '',
};

export default function ContactPage() {
    const [state, action, isPending] = useActionState(submitContact, initialState);
    const t = useTranslations('contactPage');

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="flex item-center justify-center">
                    {/* Contact Form */}
                    <div className="bg-card rounded-2xl p-8 shadow-sm border border-border border-slate-200">
                        <h2 className="text-2xl font-semibold mb-6">{t('formTitle')}</h2>

                        {state.success ? (
                            <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-6 rounded-lg text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-green-500 rounded-full text-white">
                                        <Send className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('successTitle')}</h3>
                                <p>{state.message}</p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    variant="outline"
                                    className="mt-6"
                                >
                                    {t('sendAnother')}
                                </Button>
                            </div>
                        ) : (
                            <form action={action} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            {t('name')}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={t('namePlaceholder')}
                                        />
                                        {state.errors?.name && (
                                            <p className="text-sm text-destructive">{state.errors.name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            {t('email')}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={t('emailPlaceholder')}
                                        />
                                        {state.errors?.email && (
                                            <p className="text-sm text-destructive">{state.errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        {t('subject')}
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={t('subjectPlaceholder')}
                                    />
                                    {state.errors?.subject && (
                                        <p className="text-sm text-destructive">{state.errors.subject}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        {t('message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="flex w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={t('messagePlaceholder')}
                                    />
                                    {state.errors?.message && (
                                        <p className="text-sm text-destructive">{state.errors.message}</p>
                                    )}
                                </div>

                                {state.message && !state.success && (
                                    <p className="text-sm text-destructive text-center">{state.message}</p>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('sending')}
                                        </>
                                    ) : (
                                        t('sendMessage')
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
