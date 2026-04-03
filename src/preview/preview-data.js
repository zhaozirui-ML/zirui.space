import { colors, spacing, typography } from "../../design-system";

/** @type {Array<{
 *   description: string,
 *   eyebrow?: string,
 *   image: string,
 *   imageAlt: string,
 *   meta: string,
 *   title: string,
 *   tone: "light" | "dark",
 *   variant: "feature" | "featureReverse"
 * }>} */
export const featureCards = [
  {
    description:
      "We’re rolling out Instruct 2.5, which brings a cleaner task loop, stronger context handling, and a calmer visual rhythm.",
    image: "/images/feature-ai-2-5.png",
    imageAlt: "Instruct 2.5 feature preview",
    meta: "By Matt Falconer",
    title: "Instruct 2.5: AI That Gets Things Done",
    tone: "dark",
    variant: "feature",
  },
  {
    description:
      "Manually creating videos is tedious. Here’s how the reversed feature card keeps the same typography, but flips the composition for editorial variety.",
    eyebrow: "Reversed feature",
    image: "/images/article-video.png",
    imageAlt: "Auto-generated videos article preview",
    meta: "By Romie Kos",
    title: "Auto-generated videos that actually say something",
    tone: "light",
    variant: "featureReverse",
  },
];

export const articleCards = [
  {
    image: "/images/article-video.png",
    imageAlt: "Auto-generated videos preview",
    meta: "By Romie Kos",
    title: "Auto-generated videos that actually say something",
  },
  {
    image: "/images/article-longevity.png",
    imageAlt: "Longevity research preview",
    meta: "By Matt Falconer",
    title: "Staying on Top of Longevity Research with Instruct",
  },
  {
    image: "/images/article-clean-slate.png",
    imageAlt: "Keeping the slate clean preview",
    meta: "By Frank Yates",
    title: "Keeping the Slate Clean",
  },
  {
    image: "/images/feature-ai-2-5.png",
    imageAlt: "Instruct 2.5 editorial preview",
    meta: "By Matt Falconer",
    title: "Instruct 2.5: AI That Gets Things Done",
  },
];

export const filterButtons = ["Featured", "Productivity", "Creative", "Lifestyle"];

export const colorEntries = [
  ["Canvas", colors.canvas],
  ["Surface", colors.surface],
  ["Muted Surface", colors.surfaceMuted],
  ["Ink", colors.ink],
  ["Support Text", colors.textSupport],
  ["Muted Text", colors.textMuted],
  ["Border", colors.border],
  ["Accent Sky", colors.accentSky],
  ["Accent Blush", colors.accentBlush],
];

export const spacingEntries = [
  ["XS", spacing.xs],
  ["SM", spacing.sm],
  ["MD", spacing.md],
  ["LG", spacing.lg],
  ["XL", spacing.xl],
  ["Section", spacing.section],
];

export const typeEntries = [
  {
    label: "Display",
    sample: "AI that works for your design system",
    style: {
      fontFamily: typography.families.display,
      fontSize: typography.scales.display.size,
      fontWeight: typography.scales.display.weight,
      lineHeight: typography.scales.display.lineHeight,
    },
  },
  {
    label: "Heading",
    sample: "Integrated everywhere.",
    style: {
      fontFamily: typography.families.display,
      fontSize: typography.scales.headingLg.size,
      fontWeight: typography.scales.headingLg.weight,
      lineHeight: typography.scales.headingLg.lineHeight,
    },
  },
  {
    label: "Body",
    sample:
      "Use the same scale for descriptive copy, documentation, and educational UI that needs to stay calm and readable.",
    style: {
      fontFamily: typography.families.body,
      fontSize: typography.scales.bodyLg.size,
      fontWeight: typography.scales.bodyLg.weight,
      lineHeight: typography.scales.bodyLg.lineHeight,
    },
  },
];
