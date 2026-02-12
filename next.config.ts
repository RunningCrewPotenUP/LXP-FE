import type { NextConfig } from "next";

const r2AccountId = process.env.R2_ACCOUNT_ID;
const r2PublicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

const getHostnameFromUrl = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value).hostname;
  } catch {
    return undefined;
  }
};

const imageHostnames = [
  r2AccountId ? `${r2AccountId}.r2.cloudflarestorage.com` : undefined,
  getHostnameFromUrl(r2PublicBaseUrl),
].filter((hostname): hostname is string => Boolean(hostname));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      ...imageHostnames.map((hostname) => ({
        protocol: "https",
        hostname,
      })),
    ],
  },
};

export default nextConfig;
