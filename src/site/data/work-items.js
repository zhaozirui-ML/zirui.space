// 作品数据继续集中在这里，首页、/work 和详情页都从同一个数据源读取。
// 首页只拿“精选项目”，Work 页再按 Figma 版式做分组渲染，避免后面维护两份 slug。
export const workItems = [
  {
    slug: "drawing-ledger-2-0",
    title: "Drawing Register 2.0",
    homeTitle: "图纸台账 2.0",
    category: "Web + App",
    homeCategory: "App & Web",
    year: "2025",
    summary:
      "Redesigning the end to end workflow for drawing registration, parsing, and collaboration",
    homeSummary:
      "围绕施工业务里的图纸流转、确认与下发流程，重构核心信息结构与操作链路。",
    detailSummary:
      "A detailed case study will be connected here next, including the workflow redesign, parsing logic, and collaboration decisions.",
    showOnHome: true,
    homeCardVariant: "featured",
    homeMediaPosition: "end",
    homeImageSrc: "/site/home/work-drawing-ledger.png",
    homeImageAlt: "图纸台账 2.0 项目预览图",
    workCardVariant: "feature",
    workTags: ["2025", "Web + App", "UI/UX Design"],
    workPreview: {
      type: "plain",
      alt: "Drawing Register 2.0 preview",
      ratio: "782 / 440",
      src: "/site/work/index/drawing-register-2-0.png",
    },
  },
  {
    slug: "axzo-design-system",
    title: "Axzo Design Portal",
    homeTitle: "AXZO Design System",
    category: "Web",
    year: "2025",
    summary:
      "Designing how a design system is understood, accessed, and adopted",
    homeSummary:
      "整理组件规则、视觉语义与交付协作方式，降低复杂业务中的设计和开发沟通成本。",
    detailSummary:
      "A detailed case study will be connected here next, including the portal structure, adoption strategy, and design system rollout.",
    showOnHome: true,
    homeCardVariant: "standard",
    homeMediaPosition: "start",
    homeImageSrc: "/site/home/work-axzo.png",
    homeImageAlt: "AXZO Design System 项目预览图",
    workCardVariant: "compact",
    workTags: ["2025", "Web", "Visual Design"],
    workPreview: {
      type: "framed",
      alt: "Axzo Design Portal preview",
      backgroundSrc: "/site/work/index/axzo-design-portal-bg.png",
      foregroundSrc: "/site/work/index/axzo-design-portal-main.png",
      foregroundAspectRatio: "302 / 180",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "none",
    },
  },
  {
    slug: "data-visualization-screen",
    title: "Data Visualization System",
    homeTitle: "大屏数据可视化",
    category: "Large Screen",
    homeCategory: "Web",
    year: "2025",
    summary:
      "Designing a portal for how a design system spreads",
    homeSummary:
      "为大屏展示场景建立更稳定的信息层级、图表节奏与阅读顺序，提升可理解性。",
    detailSummary:
      "A detailed case study will be connected here next, covering large-screen information hierarchy and chart system decisions.",
    showOnHome: true,
    homeCardVariant: "standard",
    homeMediaPosition: "end",
    homeImageSrc: "/site/home/work-data-viz.png",
    homeImageAlt: "大屏数据可视化项目预览图",
    workCardVariant: "compact",
    workTags: ["2025", "Large Screen", "UI/UX Design"],
    workPreview: {
      type: "framed",
      alt: "Data Visualization System preview",
      backgroundSrc: "/site/work/index/data-visualization-system-bg.png",
      foregroundSrc: "/site/work/index/data-visualization-system-main.png",
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
    showOnHome: false,
    workCardVariant: "featureTall",
    workTags: ["2023-2024", "Web", "Design System"],
    workPreview: {
      type: "plain",
      alt: "CloudTower Design System preview",
      ratio: "782 / 505",
      src: "/site/work/index/cloudtower-design-system.png",
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
    showOnHome: false,
    workCardVariant: "compact",
    workTags: ["2023", "Web", "UI/UX Design"],
    workPreview: {
      type: "plain",
      alt: "SMTX ELF Virtualization preview",
      ratio: "354 / 240",
      src: "/site/work/index/smtx-elf-virtualization.png",
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
    showOnHome: false,
    workCardVariant: "compact",
    workTags: ["2023", "Web", "Interaction Design"],
    workPreview: {
      type: "plain",
      alt: "VM Features Optimization preview",
      ratio: "354 / 240",
      src: "/site/work/index/vm-features-optimization.png",
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
