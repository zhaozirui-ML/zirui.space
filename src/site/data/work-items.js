import { getStorageAssetUrl } from "../lib/get-storage-asset-url";

// 作品数据继续集中在这里，首页、/work 和详情页都从同一个数据源读取。
// 首页只拿“精选项目”，Work 页再按 Figma 版式做分组渲染，避免后面维护两份 slug。
export const workItems = [
  {
    slug: "drawing-ledger-2-0",
    title: "Drawing Register 2.0",
    homeTitle: "Drawing Register 2.0",
    category: "Web + App",
    homeCategory: "App & Web",
    year: "2025",
    summary:
      "Redesigning the end to end workflow for drawing registration, parsing, and collaboration",
    homeSummary:
      "Redesigned a complex drawing workflow across upload, parsing, registration, and collaboration.",
    detailSummary:
      "A detailed case study will be connected here next, including the workflow redesign, parsing logic, and collaboration decisions.",
    showOnHome: true,
    homeCardVariant: "featured",
    homeMediaPosition: "end",
    homeMediaFrame: {
      backgroundSrc: getStorageAssetUrl(
        "work/drawing-ledger-2-0/home-background.png"
      ),
      foregroundAspectRatio: "360 / 225",
      foregroundHeight: "66.96%",
      foregroundImageHeight: "119.56%",
      foregroundLeft: "10.22%",
      foregroundImageLeft: "-6.11%",
      foregroundImageMaxWidth: "none",
      foregroundRadius: "0",
      foregroundShadow: "none",
      foregroundSrc: getStorageAssetUrl(
        "work/drawing-ledger-2-0/home-foreground.png"
      ),
      foregroundImageTop: "-5.33%",
      foregroundImageWidth: "112.22%",
      foregroundTop: "16.67%",
      foregroundWidth: "80%",
    },
    detailTheme: Object.freeze({
      headingAccentColor: "var(--portfolio-color-accent-brand)",
    }),
    homeImageSrc: "/site/home/work-drawing-ledger.png",
    homeImageAlt: "图纸台账 2.0 项目预览图",
    workCardVariant: "feature",
    workTags: ["2025", "Web + App", "UI/UX Design"],
    workPreview: {
      type: "plain",
      alt: "Drawing Register 2.0 preview",
      ratio: "782 / 440",
      src: getStorageAssetUrl("work/drawing-ledger-2-0/work-preview.png"),
    },
  },
  {
    slug: "axzo-design-system",
    title: "Axzo Design Portal",
    homeTitle: "Axzo Design System Portal",
    category: "Web",
    year: "2025",
    summary:
      "Designing how a design system is understood, accessed, and adopted",
    homeSummary:
      "Designing how a design system is understood, accessed, and adopted",
    detailSummary:
      "A detailed case study will be connected here next, including the portal structure, adoption strategy, and design system rollout.",
    showOnHome: true,
    homeCardVariant: "standard",
    homeMediaPosition: "start",
    homeMediaFrame: {
      backgroundSrc: getStorageAssetUrl(
        "work/axzo-design-system/home-background.png"
      ),
      foregroundAspectRatio: "312 / 190.694",
      foregroundHeight: "61.12%",
      foregroundLeft: "50%",
      foregroundRadius: "0.25rem",
      foregroundShadow: "none",
      foregroundSrc: getStorageAssetUrl(
        "work/axzo-design-system/home-foreground.png"
      ),
      foregroundTop: "50%",
      foregroundTransform: "translate(-50%, -50%)",
      foregroundWidth: "85.01%",
    },
    detailTheme: Object.freeze({
      headingAccentColor: "#647654",
    }),
    homeImageSrc: "/site/home/work-axzo.png",
    homeImageAlt: "AXZO Design System 项目预览图",
    workCardVariant: "compact",
    workTags: ["2025", "Web", "Visual Design"],
    workPreview: {
      type: "framed",
      alt: "Axzo Design Portal preview",
      backgroundSrc: getStorageAssetUrl(
        "work/axzo-design-system/work-background.png"
      ),
      foregroundSrc: getStorageAssetUrl(
        "work/axzo-design-system/work-foreground.png"
      ),
      foregroundAspectRatio: "302 / 180",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "none",
    },
  },
  {
    slug: "data-visualization-screen",
    title: "Data Visualization System",
    homeTitle: "Data Visualization System",
    category: "Large Screen",
    homeCategory: "Data Visualization",
    year: "2025",
    summary:
      "Designing a portal for how a design system spreads",
    homeSummary:
      "Defined a reusable visual language for dashboards and large-screen data experiences.",
    detailSummary:
      "将省、市、区三级建筑大屏设计整合为统一视觉语言，并把图表探索扩展到更复杂的大屏场景。",
    showOnHome: true,
    homeCardVariant: "standard",
    homeMediaPosition: "end",
    homeMediaFrame: {
      backgroundSrc: getStorageAssetUrl(
        "work/data-visualization/home-background.png"
      ),
      foregroundAspectRatio: "302.4 / 170.1",
      foregroundHeight: "54.52%",
      foregroundLeft: "50%",
      foregroundRadius: "0.25rem",
      foregroundShadow: "0 3.2px 6.4px -2.4px rgba(14, 18, 27, 0.1)",
      foregroundSrc: getStorageAssetUrl(
        "work/data-visualization/home-foreground.png"
      ),
      foregroundTop: "50%",
      foregroundTransform: "translate(-50%, -50%)",
      foregroundWidth: "82.40%",
    },
    detailTheme: Object.freeze({
      headingAccentColor: "#5684AE",
    }),
    homeImageSrc: "/site/home/work-data-viz.png",
    homeImageAlt: "大屏数据可视化项目预览图",
    workCardVariant: "compact",
    workTags: ["2025", "Large Screen", "UI/UX Design"],
    workPreview: {
      type: "framed",
      alt: "Data Visualization System preview",
      backgroundSrc: getStorageAssetUrl(
        "work/data-visualization/work-background.png"
      ),
      foregroundSrc: getStorageAssetUrl(
        "work/data-visualization/work-foreground.png"
      ),
      foregroundAspectRatio: "302 / 170",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "0 3.2px 6.4px -2.4px rgba(14, 18, 27, 0.1)",
    },
  },
  {
    slug: "cloudtower-design-system",
    title: "CloudTower Design System",
    category: "Web",
    year: "2023-2024",
    summary:
      "Systematically evolving an existing design system through component refinement, reusable patterns, and UI map documentation",
    detailSummary:
      "A detailed case study will be connected here next, covering component refinement, reusable patterns, and system mapping.",
    legacyUrl: "https://zirui.framer.website/design-system",
    showOnHome: false,
    workCardVariant: "featureTall",
    workTags: ["2023-2024", "Web", "Design System"],
    workPreview: {
      type: "plain",
      alt: "CloudTower Design System preview",
      ratio: "782 / 505",
      src: getStorageAssetUrl("work/cloudtower-design-system/work-preview.png"),
    },
  },
  {
    slug: "smtx-elf-virtualization",
    title: "SMTX ELF Virtualization",
    category: "Web",
    year: "2023",
    summary:
      "Designing a standalone virtualization product for flexible resource expansion",
    detailSummary:
      "A detailed case study will be connected here next, including the virtualization product framing and resource management decisions.",
    legacyUrl: "https://zirui.framer.website/smtx-elf",
    showOnHome: false,
    workCardVariant: "compact",
    workTags: ["2023", "Web", "UI/UX Design"],
    workPreview: {
      type: "plain",
      alt: "SMTX ELF Virtualization preview",
      ratio: "354 / 240",
      src: getStorageAssetUrl("work/smtx-elf-virtualization/work-preview.png"),
    },
  },
  {
    slug: "vm-features-optimization",
    title: "VM Features Optimization",
    category: "Web",
    year: "2023",
    summary:
      "Improving batch VM creation with clearer logic, lower error rates, and better efficiency",
    detailSummary:
      "A detailed case study will be connected here next, focusing on interaction logic and operational efficiency improvements.",
    legacyUrl: "https://zirui.framer.website/vm-optimization",
    showOnHome: false,
    workCardVariant: "compact",
    workTags: ["2023", "Web", "Interaction Design"],
    workPreview: {
      type: "plain",
      alt: "VM Features Optimization preview",
      ratio: "354 / 240",
      src: getStorageAssetUrl("work/vm-features-optimization/work-preview.png"),
    },
  },
];

export const homeWorkItems = workItems.filter((item) => item.showOnHome !== false);

export const workTabs = [
  {
    id: "professional-work",
    iconName: "layoutGrid",
    label: "Professional Work",
  },
  {
    id: "explorations",
    iconName: "layoutDashboard",
    label: "Explorations",
  },
  {
    id: "side-projects",
    iconName: "heart",
    label: "Side Projects",
  },
];

// Work 页不是平均网格，而是有主次节奏，所以这里显式保留各个 tab 的版式顺序。
// explorations 和 side projects 也先走页面层数据，不急着提升到全局组件层。
const explorationsRows = [
  [
    {
      id: "earnings-card",
      kind: "earnings",
    },
  ],
  [
    {
      alt: "A device-style exploration showing a sunset scene and compact metrics.",
      id: "device-card",
      kind: "device-image",
      src: "/site/work/explorations/exploration-hero-device.png",
    },
  ],
  [
    {
      alt: "A blue gradient app icon exploration with a white cloud symbol.",
      id: "cloud-icon-card",
      kind: "cloud-image",
      src: "/site/work/explorations/exploration-cloud-app.svg",
    },
    {
      id: "list-icon-card",
      kind: "list-illustration",
    },
  ],
  [
    {
      alt: "A neon magenta light study on a dark background.",
      id: "gradient-magenta-card",
      kind: "full-image",
      src: "/site/work/explorations/exploration-gradient-magenta.png",
    },
    {
      alt: "A neon teal light study on a dark background.",
      id: "gradient-teal-card",
      kind: "full-image",
      src: "/site/work/explorations/exploration-gradient-teal.png",
    },
  ],
  [
    {
      alt: "A boarding-pass style ticket exploration in cool blue tones.",
      id: "ticket-card",
      kind: "ticket-image",
      src: "/site/work/explorations/exploration-ticket.png",
    },
  ],
  [
    {
      alt: "A vertical line texture study with a soft purple glow.",
      id: "lines-card",
      kind: "immersive-image",
      src: "/site/work/explorations/exploration-lines-purple.png",
    },
  ],
  [
    {
      alt: "An abstract blurred color study blending purple, cream, and pink.",
      id: "blur-card",
      kind: "immersive-image",
      src: "/site/work/explorations/exploration-blur-pink.png",
    },
  ],
];

const sideProjectItems = [
  {
    href: "https://github.com/zhaozirui-ML/Lovers-weekly",
    id: "lovers-weekly",
    path: "/tools/report",
    subtitle: "每周恋爱日志",
    title: "Lovers-weekly",
  },
];

export const workTabContent = {
  "professional-work": {
    rows: [
      ["drawing-ledger-2-0"],
      ["axzo-design-system", "data-visualization-screen"],
      ["cloudtower-design-system"],
      ["smtx-elf-virtualization", "vm-features-optimization"],
    ],
    type: "projects",
  },
  explorations: {
    rows: explorationsRows,
    type: "explorations",
  },
  "side-projects": {
    items: sideProjectItems,
    type: "side-projects",
  },
};
