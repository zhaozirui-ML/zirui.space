const t = (zh, en) => ({ zh, en });

// 作品数据继续集中在这里，首页、/work 和详情页都从同一个数据源读取。
// 首页只拿“精选项目”，Work 页再按 Figma 版式做分组渲染，避免后面维护两份 slug。
export const workItems = [
  {
    slug: "drawing-ledger-2-0",
    title: t("图纸台账 2.0", "Drawing Register 2.0"),
    homeTitle: t("图纸台账 2.0", "Drawing Register 2.0"),
    category: t("Web + App", "Web + App"),
    homeCategory: t("工作流", "Workflow"),
    homeIconName: "network",
    year: "2025",
    summary: t(
      "重设计图纸登记、解析与协作的端到端流程",
      "Redesigning the end to end workflow for drawing registration, parsing, and collaboration",
    ),
    homeSummary: t(
      "重设计从上传、解析、登记到协作的复杂图纸工作流。",
      "Redesigned a complex drawing workflow across upload, parsing, registration, and collaboration.",
    ),
    detailSummary: t(
      "后续会在这里接入完整案例，包括流程重构、解析逻辑和协作决策。",
      "A detailed case study will be connected here next, including the workflow redesign, parsing logic, and collaboration decisions.",
    ),
    supportsEnglishDetail: true,
    showOnHome: true,
    homeCardVariant: "featured",
    homeMediaPosition: "end",
    // 首页卡片已经改成单张合成图，避免响应式阶段继续维护前景/背景双图定位。
    detailTheme: Object.freeze({
      headingAccentColor: "var(--portfolio-color-accent-brand)",
    }),
    // 首页卡片属于高频公开展示资源，正式单图已同步到本地，优先走静态资源。
    homeImageSrc: "/site/home/work-drawing-ledger.png",
    homeImageAlt: "图纸台账 2.0 项目预览图",
    workCardVariant: "feature",
    workTags: ["2025", "Web + App", "UI/UX Design"],
    workPreview: {
      type: "plain",
      alt: "Drawing Register 2.0 preview",
      ratio: "782 / 440",
      // 这里改成新的资源路径，强制浏览器放弃旧缓存，避免继续命中之前误接入的占位图。
      src: "/site/work/drawing-ledger-2-0/work-preview-ledger.png",
    },
  },
  {
    slug: "axzo-design-system",
    title: t("Axzo 设计系统门户", "Axzo Design Portal"),
    homeTitle: t("Axzo 设计系统门户", "Axzo Design System Portal"),
    category: t("Web", "Web"),
    homeCategory: t("设计系统", "Design System"),
    homeIconName: "blocks",
    year: "2025",
    summary: t(
      "设计一个设计系统如何被理解、访问和采用",
      "Designing how a design system is understood, accessed, and adopted",
    ),
    homeSummary: t(
      "设计一个设计系统如何被理解、访问和采用。",
      "Designing how a design system is understood, accessed, and adopted",
    ),
    detailSummary: t(
      "后续会在这里接入完整案例，包括门户结构、采用策略与设计系统落地。",
      "A detailed case study will be connected here next, including the portal structure, adoption strategy, and design system rollout.",
    ),
    supportsEnglishDetail: true,
    showOnHome: true,
    homeCardVariant: "standard",
    homeMediaPosition: "start",
    // 首页卡片已经改成单张合成图，避免响应式阶段继续维护前景/背景双图定位。
    detailTheme: Object.freeze({
      headingAccentColor: "var(--portfolio-color-accent-moss)",
    }),
    // 首页卡片属于高频公开展示资源，正式单图已同步到本地，优先走静态资源。
    homeImageSrc: "/site/home/work-axzo.png",
    homeImageAlt: "AXZO Design System 项目预览图",
    homeMediaAdapt: {
      // Axzo 这张合成图本身留白更大；平板只做很轻的补偿，手机端避免继续放大前景。
      mobile: {
        positionY: "48%",
        scale: 1,
      },
      tablet: {
        positionY: "48%",
        scale: 1,
      },
    },
    workCardVariant: "compact",
    workTags: ["2025", "Web", "Visual Design"],
    workPreview: {
      type: "framed",
      alt: "Axzo Design Portal preview",
      backgroundSrc: "/site/work/axzo-design-system/cover-card.png",
      foregroundSrc: "/site/work/axzo-design-system/cover-background.png",
      foregroundAspectRatio: "2880 / 1760",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "none",
    },
  },
  {
    slug: "data-visualization-screen",
    title: t("数据可视化系统", "Data Visualization System"),
    homeTitle: t("数据可视化系统", "Data Visualization System"),
    category: t("大屏", "Large Screen"),
    homeCategory: t("数据体验", "Data Experience"),
    homeIconName: "layoutDashboard",
    year: "2025",
    summary: t(
      "为复杂大屏体验建立可复用的视觉语言",
      "Defining a reusable visual language for complex large-screen experiences",
    ),
    homeSummary: t(
      "为仪表盘和大屏数据体验定义可复用的视觉语言。",
      "Defined a reusable visual language for dashboards and large-screen data experiences.",
    ),
    detailSummary: t(
      "将省、市、区三级建筑大屏设计整合为统一视觉语言，并把图表探索扩展到更复杂的大屏场景。",
      "Consolidating provincial, city, and district construction dashboards into a unified visual language for more complex large-screen scenarios.",
    ),
    supportsEnglishDetail: true,
    showOnHome: true,
    homeCardVariant: "standard",
    homeMediaPosition: "end",
    // 首页卡片已经改成单张合成图，避免响应式阶段继续维护前景/背景双图定位。
    detailTheme: Object.freeze({
      headingAccentColor: "var(--portfolio-color-accent-blue)",
    }),
    // 首页卡片属于高频公开展示资源，正式单图已同步到本地，优先走静态资源。
    homeImageSrc: "/site/home/work-data-viz.png",
    homeImageAlt: "大屏数据可视化项目预览图",
    workCardVariant: "compact",
    workTags: ["2025", "Large Screen", "UI/UX Design"],
    workPreview: {
      type: "framed",
      alt: "Data Visualization System preview",
      backgroundSrc: "/site/work/data-visualization/work-background.png",
      foregroundSrc: "/site/work/data-visualization/work-foreground.png",
      foregroundAspectRatio: "302 / 170",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "var(--portfolio-shadow-card)",
    },
  },
  {
    slug: "cloudtower-design-system",
    title: t("CloudTower 设计系统", "CloudTower Design System"),
    category: t("Web", "Web"),
    year: "2023-2024",
    summary: t(
      "通过组件细化、可复用模式和 UI Map 文档系统化演进已有设计系统",
      "Systematically evolving an existing design system through component refinement, reusable patterns, and UI map documentation",
    ),
    detailSummary: t(
      "后续会在这里接入完整案例，包括组件细化、可复用模式和系统映射。",
      "A detailed case study will be connected here next, covering component refinement, reusable patterns, and system mapping.",
    ),
    supportsEnglishDetail: true,
    legacyUrl: "https://zirui.framer.website/design-system",
    showOnHome: false,
    workCardVariant: "featureTall",
    workTags: ["2023-2024", "Web", "Design System"],
    workPreview: {
      type: "plain",
      alt: "CloudTower Design System preview",
      ratio: "782 / 505",
      src: "/site/work/cloudtower-design-system/work-preview.png",
    },
  },
  {
    slug: "smtx-elf-virtualization",
    title: t("SMTX ELF 虚拟化", "SMTX ELF Virtualization"),
    category: t("Web", "Web"),
    year: "2023",
    summary: t(
      "为弹性资源扩展设计独立虚拟化产品",
      "Designing a standalone virtualization product for flexible resource expansion",
    ),
    detailSummary: t(
      "后续会在这里接入完整案例，包括虚拟化产品定位和资源管理决策。",
      "A detailed case study will be connected here next, including the virtualization product framing and resource management decisions.",
    ),
    supportsEnglishDetail: true,
    legacyUrl: "https://zirui.framer.website/smtx-elf",
    showOnHome: false,
    workCardVariant: "compact",
    workTags: ["2023", "Web", "UI/UX Design"],
    workPreview: {
      type: "plain",
      alt: "SMTX ELF Virtualization preview",
      ratio: "354 / 240",
      src: "/site/work/smtx-elf-virtualization/work-preview.png",
    },
  },
  {
    slug: "vm-features-optimization",
    title: t("虚拟机功能优化", "VM Features Optimization"),
    category: t("Web", "Web"),
    year: "2023",
    summary: t(
      "通过更清晰的逻辑、更低错误率和更高效率优化批量创建虚拟机",
      "Improving batch VM creation with clearer logic, lower error rates, and better efficiency",
    ),
    detailSummary: t(
      "后续会在这里接入完整案例，重点说明交互逻辑与操作效率优化。",
      "A detailed case study will be connected here next, focusing on interaction logic and operational efficiency improvements.",
    ),
    supportsEnglishDetail: true,
    legacyUrl: "https://zirui.framer.website/vm-optimization",
    showOnHome: false,
    workCardVariant: "compact",
    workTags: ["2023", "Web", "Interaction Design"],
    workPreview: {
      type: "plain",
      alt: "VM Features Optimization preview",
      ratio: "354 / 240",
      src: "/site/work/vm-features-optimization/work-preview.png",
    },
  },
];

export const homeWorkItems = workItems.filter((item) => item.showOnHome !== false);

export const workTabs = [
  {
    id: "professional-work",
    iconName: "layoutGrid",
    label: t("专业项目", "Professional Work"),
  },
  {
    id: "explorations",
    iconName: "layoutDashboard",
    label: t("探索", "Explorations"),
  },
  {
    id: "side-projects",
    iconName: "heart",
    label: t("个人项目", "Side Projects"),
  },
];

// Work 页不是平均网格，而是有主次节奏，所以这里显式保留各个 tab 的版式顺序。
// explorations 和 side projects 也先走页面层数据，不急着提升到全局组件层。
const explorationsRows = [
  [
    {
      alt: "An earnings exploration card with a dark gradient surface and a highlighted total.",
      id: "earnings-card",
      kind: "feature-image",
      src: "/site/work/explorations/exploration-earnings-card.png",
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
      kind: "compact-image",
      src: "/site/work/explorations/exploration-cloud-card.png",
    },
    {
      alt: "A list-card exploration with a glowing top and bottom shadow.",
      id: "list-icon-card",
      kind: "compact-image",
      src: "/site/work/explorations/exploration-list-card.png",
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
    subtitle: t("每周恋爱日志", "Weekly relationship journal"),
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
