import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Tell Vercel to ignore ESLint errors during build
  },
};

export default nextConfig;
