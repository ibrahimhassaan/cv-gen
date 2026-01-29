import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { NotFoundContent } from "./NotFoundClient";


export default async function NotFound() {
    const messages = await getMessages();

    // Component to use hooks inside the provider
    // The content has been moved to NotFoundClient.tsx

    return (
        <NextIntlClientProvider messages={messages}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <NotFoundContent />
                </main>
                <FooterWrapper />
            </div>
        </NextIntlClientProvider>
    );
}
