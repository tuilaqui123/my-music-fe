import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/thumbnails/**", // cho phép toàn bộ ảnh trong thư mục thumbnails
      },
    ],
  },
};

module.exports = nextConfig;
