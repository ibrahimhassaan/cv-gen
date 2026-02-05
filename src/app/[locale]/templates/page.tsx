import { getTranslations } from "next-intl/server";
import TemplatesClient from "./TemplatesClient";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'templates' });

    return {
        title: `${t('pageTitle')} - cvGenfy`,
        description: t('subtitle'),
        alternates: {
            canonical: `/${locale}/templates`,
        }
    };
}

import { useLocale } from "next-intl";
export default function TemplatesPage() {
    const locale = useLocale();
    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    'itemListElement': [
                        {
                            '@type': 'ListItem',
                            'position': 1,
                            'name': 'Home',
                            'item': `https://cvgenfy.com/${locale}`
                        },
                        {
                            '@type': 'ListItem',
                            'position': 2,
                            'name': 'Templates',
                            'item': `https://cvgenfy.com/${locale}/templates`
                        }
                    ]
                }}
            />
            <TemplatesClient />
        </>
    );
}
