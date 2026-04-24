import { Inter } from "next/font/google";

// 公开仓库不分发商业/授权字体文件，所以这里只保留可公开加载的 Inter。
// 原设计字体请查看 README 的授权说明，并在私有环境中自行接入。
export const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
