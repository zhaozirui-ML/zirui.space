import localFont from "next/font/local";

// 站点正式使用项目内托管字体，避免继续依赖“本机刚好装了这个字体”。
export const satoshi = localFont({
  display: "swap",
  src: [
    {
      path: "./files/Satoshi-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./files/Satoshi-Medium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./files/Satoshi-Bold.otf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-satoshi",
});

export const ivyPresto = localFont({
  display: "swap",
  src: [
    {
      path: "./files/IvyPrestoHeadline-Light.otf",
      style: "normal",
      weight: "300",
    },
    {
      path: "./files/IvyPrestoHeadline-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./files/IvyPrestoHeadline-Semibold.otf",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-ivy-presto",
});

export const fzQingKeBenYueSong = localFont({
  display: "swap",
  src: [
    {
      path: "./files/FZQKBYSJW.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-fz-qingke-benyuesong",
});
