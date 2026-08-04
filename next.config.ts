import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version ?? "0.1.0",
    NEXT_PUBLIC_BUILD_TIMESTAMP: process.env.NEXT_PUBLIC_BUILD_TIMESTAMP ?? new Date().toISOString(),
  },
};

export default nextConfig;
