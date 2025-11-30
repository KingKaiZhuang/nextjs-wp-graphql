import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /* config options here */
  reactCompiler: true,
  // Performance optimizations for large static generation (1000+ posts)
  compress: true, // Enable gzip compression
};

export default nextConfig;
