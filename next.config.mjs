import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // 允许加载 Supabase Storage 的公开资源，先只放开当前项目域名做小范围验证。
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zikhatpucpynawwxbrun.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  turbopack: {
    root: currentDirectory,
  },
};

export default nextConfig;
