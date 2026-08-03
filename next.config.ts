import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  allowedDevOrigins: ["192.168.0.31", "localhost", "127.0.0.1"],
};

export default nextConfig;
