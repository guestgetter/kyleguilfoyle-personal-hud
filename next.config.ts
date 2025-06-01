import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    domains: ['localhost'],
    unoptimized: true, // For static deployment
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Enable static export for subdomain deployment
  trailingSlash: true,
  // Optimize for production
  poweredByHeader: false,
};

export default nextConfig;
