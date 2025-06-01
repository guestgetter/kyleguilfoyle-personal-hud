import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    domains: ['localhost', 'kyleguilfoyle.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyleguilfoyle.com',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // SEO optimizations
  poweredByHeader: false,
  compress: true,
  // Enable trailing slash for consistency
  trailingSlash: true,
};

export default nextConfig;
