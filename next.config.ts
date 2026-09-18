import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/seed/**",
      },
      {
        protocol: "https",
        hostname: "placeholdr.dev",
      },
    ],
  },
};

export default nextConfig;
