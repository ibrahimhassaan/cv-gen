import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // experimental: {
  //   optimizeCss: true, // Disabled to fix MS Clarity screen recording CSS errors
  // },
};

export default withNextIntl(nextConfig);
