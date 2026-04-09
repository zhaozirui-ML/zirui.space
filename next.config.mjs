import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // 允许加载 Supabase Storage 和 Framer 旧站的公开资源。
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zikhatpucpynawwxbrun.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/portfolio-assets/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
    ],
  },
  turbopack: {
    root: currentDirectory,
  },
};

export default nextConfig;
