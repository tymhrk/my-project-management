import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.INTERNAL_API_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: (process.env.IMAGE_PROTOCOL as "http" | "https") || "http",
        hostname: process.env.IMAGE_HOSTNAME || "localhost",
        pathname: "/rails/active_storage/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
