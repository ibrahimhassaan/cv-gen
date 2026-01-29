import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cvgenfy.com';

    // Core pages that should be indexed
    const routes = [
        '',
        '/templates',
        '/login',
        '/about' // Added this since we plan to add it
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach(route => {
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
