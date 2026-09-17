import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "attilmulticuisinerestaurant.com",
      },
    ],
  },
};

export default nextConfig;