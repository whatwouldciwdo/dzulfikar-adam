import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  devIndicators:false,
  experimental: {
    optimizeCss: true,
  },
};
export default nextConfig;
