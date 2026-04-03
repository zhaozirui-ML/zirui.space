// 这份 token 专门服务作品集页面，不直接替换现有通用设计系统。
// 先把方向稳定下来，后续页面可以按需接入，而不是一次性全局替换。
export const portfolio = Object.freeze({
  colors: Object.freeze({
    canvas: "#fcfbf8",
    surface: "#ffffff",
    surfaceWarm: "#f0ede8",
    textTitle: "#2d2f30",
    textBody: "#4a4d4e",
    textMuted: "#7a7e80",
    borderLight: "#ece9e4",
    borderStrong: "#dcd9d1",
    accentBrand: "#b36a5e",
  }),
  typography: Object.freeze({
    families: Object.freeze({
      // 字体文件现在已经进入项目，站点层通过 next/font/local 提供稳定变量。
      title: 'var(--font-ivy-presto), "Times New Roman", serif',
      body:
        'var(--font-satoshi), "Inter", "Noto Sans SC", "Noto Sans JP", sans-serif',
      label:
        'var(--font-satoshi), "Inter", "Noto Sans SC", "Noto Sans JP", sans-serif',
    }),
    scales: Object.freeze({
      hero: Object.freeze({
        size: "3rem",
        lineHeight: "3rem",
        weight: 400,
        letterSpacing: "0",
      }),
      sectionTitle: Object.freeze({
        size: "1.5rem",
        lineHeight: "normal",
        weight: 400,
        letterSpacing: "0",
      }),
      body: Object.freeze({
        size: "1rem",
        lineHeight: "1.5rem",
        weight: 400,
        letterSpacing: "-0.011rem",
      }),
      label: Object.freeze({
        size: "1rem",
        lineHeight: "1.5rem",
        weight: 500,
        letterSpacing: "-0.011rem",
      }),
      bodySm: Object.freeze({
        size: "0.875rem",
        lineHeight: "1.25rem",
        weight: 400,
        letterSpacing: "-0.00525rem",
      }),
      caption: Object.freeze({
        size: "0.75rem",
        lineHeight: "1rem",
        weight: 400,
        letterSpacing: "0",
      }),
    }),
  }),
  spacing: Object.freeze({
    "2xs": "0.375rem",
    xs: "0.75rem",
    sm: "1.5rem",
    md: "3rem",
    lg: "6rem",
    sectionPaddingY: "8.25rem",
  }),
  radius: Object.freeze({
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    hero: "4rem",
  }),
  shadows: Object.freeze({
    card: "0 16px 32px -12px rgba(14, 18, 27, 0.1)",
  }),
  layout: Object.freeze({
    pageGutter: "34rem",
    contentWidth: "52rem",
    heroWidth: "90rem",
  }),
  semantics: Object.freeze({
    sectionBackground: "var(--portfolio-color-surface, #ffffff)",
    mediaFrameBackground: "var(--portfolio-color-surface-warm, #f0ede8)",
    mediaFrameBorder: "var(--portfolio-color-border-light, #ece9e4)",
    eyebrowColor: "var(--portfolio-color-accent-brand, #b36a5e)",
    captionColor: "var(--portfolio-color-text-muted, #7a7e80)",
    bodyColor: "var(--portfolio-color-text-body, #4a4d4e)",
    titleColor: "var(--portfolio-color-text-title, #2d2f30)",
  }),
});
