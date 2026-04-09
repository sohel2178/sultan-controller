import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["ssh2"], // ✅ correct location
};

export default nextConfig;
