import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /* config options here */
  reactCompiler: true,
  // Performance optimizations for large static generation (1000+ posts)
  compress: true, // Enable gzip compression
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'stackpenguin.local',
      },
      {
        protocol: 'https',
        hostname: 'stackpenguin.com',
      },
    ],
  },
};

export default nextConfig;
