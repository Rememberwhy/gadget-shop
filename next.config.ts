import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Tell Vercel to ignore ESLint errors during build
  },
  images: {
    domains: ['qtgvoykkgtmvolyhpaxv.supabase.co'],
  },

    i18n: {
     locales: ['en', 'ka'], // 'ka' is the language code for Georgian
    defaultLocale: 'en',
  },
};

export default nextConfig;
