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

export default function TemplatesPage() {
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
                            'item': 'https://cvgenfy.com'
                        },
                        {
                            '@type': 'ListItem',
                            'position': 2,
                            'name': 'Templates',
                            'item': 'https://cvgenfy.com/templates'
                        }
                    ]
                }}
            />
            <TemplatesClient />
        </>
    );
}
