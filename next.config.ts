import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

// Temporarily disable PWA for build to work
const isDev = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev || isProduction, // Disable PWA for now
});

export default pwaConfig(nextConfig);
