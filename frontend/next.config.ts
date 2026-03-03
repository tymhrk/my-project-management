import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // ブラウザからの "/api/v1/..." というリクエストを
        source: "/api/v1/:path*",
        // Docker ネットワーク内の Rails "/api/v1/..." へ転送
        destination: "http://backend:3000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
