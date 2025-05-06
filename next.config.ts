import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Tell Vercel to ignore ESLint errors during build
  },
  images: {
    domains: ['qtgvoykkgtmvolyhpaxv.supabase.co'],
  },
};

export default nextConfig;
