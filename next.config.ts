import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three-globe"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
