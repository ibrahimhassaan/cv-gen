# SEO Strategies & Implementation Documentation

This document outlines the Search Engine Optimization (SEO) strategies implemented in the **cvGenfy** project (`cv-gen`). These strategies are designed to improve visibility, indexing, user experience, and performance across search engines.

## 1. Metadata Management

We use Next.js's Metadata API to manage document heads dynamically and efficiently.

### Global Configuration
- **File**: `src/app/layout.tsx`
- **Base URL**: `metadataBase` is set to `https://cvgenfy.com` (or `process.env.NEXT_PUBLIC_APP_URL`) to ensure all relative URLs in metadata are resolved correctly.
- **Default Metadata**: Provides fallback title and description.
- **Viewport**: Configured for mobile responsiveness (`width=device-width`, `initialScale=1`).

### Localized & Dynamic Metadata
- **File**: `src/app/[locale]/layout.tsx`
- **Function**: `generateMetadata`
- **Features**:
    - **Localization**: Fetches localized `title`, `description`, and `keywords` using `next-intl`.
    - **Open Graph (OG)**: Dynamic OG tags for social sharing (Facebook, LinkedIn, etc.), including locale-specific details.
    - **Twitter Cards**: Configured as `summary_large_image` with localized content.
    - **Alternates**: Implements `hreflang` logic via `alternates.languages` to tell search engines about localized versions of the page (`/en`, `/de`, `/id`, `/hi`).

### Page-Specific Metadata
Specific pages override global metadata for better targeting:
- **Home Page** (`src/app/[locale]/page.tsx`): Sets site-specific title/description and canonical URL.
- **Templates Page** (`src/app/[locale]/templates/page.tsx`): Custom title (`... - cvGenfy`), description, and canonical URL.

---

## 2. Structured Data (JSON-LD)

We implement **Schema.org** structured data using JSON-LD to help search engines understand the content and context of our pages.

### Implementation
- **Component**: `src/components/JsonLd.tsx` (Reusable component to inject script tags).
- **Global Schema** (`src/app/[locale]/layout.tsx`):
    - **Type**: `SoftwareApplication`
    - **Details**: Name ("cvGenfy"), Category ("BusinessApplication"), Operating System ("Web"), Offers (Free/USD), Social Links (`sameAs`).
- **Page-Specific Schema**:
    - **Templates Page** (`src/app/[locale]/templates/page.tsx`):
        - **Type**: `BreadcrumbList`
        - **Details**: Defines the path hierarchy (Home > Templates) to enhance search result snippets.

---

## 3. Crawling and Indexing Control

We explicitly guide search engine bots on how to crawl the site.

### Robots.txt
- **File**: `src/app/robots.ts`
- **Configuration**:
    - **Allowed**: `userAgent: *` (All bots), path `/`.
    - **Disallowed**: Private/Authenticated areas like `/dashboard/` and `/api/` to prevent wasting crawl budget on non-public pages.
    - **Sitemap**: Links to the dynamic sitemap.

### Sitemap
- **File**: `src/app/sitemap.ts`
- **Features**:
    - Generates a dynamic XML sitemap.
    - Includes core routes: `/`, `/templates`, `/login`, `/about`.
    - **Localization**: Generates entries for all supported locales (`en`, `de`, `id`, `hi`).
    - **Prioritization**:
        - Home (`/`): Priority `1.0`
        - Other pages: Priority `0.8`
    - **Change Frequency**: Set to `weekly`.

---

## 4. Internationalization (i18n) SEO

The application is built from the ground up to support global audiences.

- **URL Structure**: Uses sub-path routing (`/[locale]/...`) which is Google's recommended structure for multi-regional sites.
- **Hreflang Tags**: Implemented via `metadata.alternates` in the layout, linking all language variants of a page together.
- **Localized Content**: All visible text and metadata are served in the user's requested language via `next-intl`.

---

## 5. Analytics & Monitoring

- **Google Analytics**: Integrated via `src/components/GoogleAnalytics.tsx` in `src/app/[locale]/layout.tsx` to track user behavior, traffic sources, and conversion events.

---

## 6. Technical SEO & Performance (Core Web Vitals)

- **Semantic HTML**: Extensive use of semantic tags (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<h1>`-`<h6>`) to improve accessibility and structure for crawlers.
- **Font Optimization**: Uses `next/font/google` (Inter, Outfit) to prevent layout shifts (CLS) and improve load times.
- **Image Optimization**: (Implicit via Next.js `Image` component where applicable) and use of SVG assets (`public/file.svg`, etc.) for scalability and performance.
- **Mobile Friendliness**: Responsive design using Tailwind CSS ensures the site passes Google's Mobile-Friendly tests.

## 7. Future Considerations
- **Dynamic Blogs/Articles**: When adding a blog, ensure individual posts generate `Article` schema.
- **Performance Monitoring**: Regularly check Core Web Vitals in Search Console.
- **Backlinks**: Continue building domain authority.
