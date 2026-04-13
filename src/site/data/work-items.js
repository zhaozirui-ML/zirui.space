const t = (zh, en) => ({ zh, en });

// 作品数据继续集中在这里，首页、/work 和详情页都从同一个数据源读取。
// 首页只拿“精选项目”，Work 页再按 Figma 版式做分组渲染，避免后面维护两份 slug。
export const workItems = [
  {
    category: t("网页与 App", "Web + App"),
    detailSummary: t(
      "详细案例页会在这里继续接入，补齐流程重构、解析逻辑和协作决策。",
      "A detailed case study will be connected here next, including the workflow redesign, parsing logic, and collaboration decisions.",
    ),
    detailTheme: Object.freeze({
      headingAccentColor: "var(--portfolio-color-accent-brand)",
    }),
    homeCardVariant: "featured",
    homeCategory: t("App 与网页", "App & Web"),
    homeImageAlt: t("图纸台账 2.0 项目预览图", "Drawing Register 2.0 project preview"),
    homeImageSrc: "/site/home/work-drawing-ledger.png",
    homeMediaFrame: {
      backgroundSrc: "/site/home/figma-home/work-drawing-background.png",
      foregroundAspectRatio: "360 / 225",
      foregroundHeight: "74.5%",
      foregroundLeft: "10.2%",
      foregroundRadius: "0",
      foregroundShadow: "none",
      foregroundSrc: "/site/home/figma-home/work-drawing-foreground.png",
      foregroundTop: "14.5%",
      foregroundWidth: "79.6%",
    },
    homeMediaPosition: "end",
    homeSummary: t(
      "重构了覆盖上传、解析、登记与协作的复杂图纸流程。",
      "Redesigned a complex drawing workflow across upload, parsing, registration, and collaboration.",
    ),
    homeTitle: t("图纸台账 2.0", "Drawing Register 2.0"),
    showOnHome: true,
    slug: "drawing-ledger-2-0",
    summary: t(
      "重构图纸登记、解析与协作的端到端流程。",
      "Redesigning the end to end workflow for drawing registration, parsing, and collaboration.",
    ),
    title: t("图纸台账 2.0", "Drawing Register 2.0"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    workCardVariant: "feature",
    workPreview: {
      alt: t("图纸台账 2.0 预览图", "Drawing Register 2.0 preview"),
      ratio: "782 / 440",
      src: "/site/work/index/drawing-register-2-0.png",
      type: "plain",
    },
    workTags: t(
      ["2025", "网页与 App", "UI/UX 设计"],
      ["2025", "Web + App", "UI/UX Design"],
    ),
    year: "2025",
  },
  {
    category: t("网页", "Web"),
    detailSummary: t(
      "详细案例页会在这里继续接入，补齐门户结构、推广策略和设计系统落地过程。",
      "A detailed case study will be connected here next, including the portal structure, adoption strategy, and design system rollout.",
    ),
    detailTheme: Object.freeze({
      headingAccentColor: "#647654",
    }),
    homeCardVariant: "standard",
    homeImageAlt: t("AXZO Design System 项目预览图", "Axzo Design Portal project preview"),
    homeImageSrc: "/site/home/work-axzo.png",
    homeMediaFrame: {
      backgroundSrc: "/site/home/figma-home/work-axzo-background.png",
      foregroundAspectRatio: "312 / 190.694",
      foregroundHeight: "78.5%",
      foregroundLeft: "50%",
      foregroundRadius: "0.25rem",
      foregroundShadow: "none",
      foregroundSrc: "/site/home/figma-home/work-axzo-foreground.png",
      foregroundTop: "50%",
      foregroundTransform: "translate(-50%, -50%)",
      foregroundWidth: "74.3%",
    },
    homeMediaPosition: "start",
    homeSummary: t(
      "设计一个让设计系统被理解、访问与采用的门户。",
      "Designing how a design system is understood, accessed, and adopted.",
    ),
    homeTitle: t("Axzo Design System 门户", "Axzo Design System Portal"),
    showOnHome: true,
    slug: "axzo-design-system",
    summary: t(
      "设计一个让设计系统被理解、访问与采用的门户。",
      "Designing how a design system is understood, accessed, and adopted.",
    ),
    title: t("Axzo 设计门户", "Axzo Design Portal"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    workCardVariant: "compact",
    workPreview: {
      alt: t("Axzo 设计门户预览图", "Axzo Design Portal preview"),
      backgroundSrc: "/site/work/index/axzo-design-portal-bg.png",
      foregroundAspectRatio: "302 / 180",
      foregroundSrc: "/site/work/index/axzo-design-portal-main.png",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "none",
      type: "framed",
    },
    workTags: t(
      ["2025", "网页", "视觉设计"],
      ["2025", "Web", "Visual Design"],
    ),
    year: "2025",
  },
  {
    category: t("大屏", "Large Screen"),
    detailSummary: t(
      "将省、市、区三级建筑大屏设计整合为统一视觉语言，并把图表探索扩展到更复杂的大屏场景。",
      "Unified the visual language across provincial, city, and district dashboards, then extended the chart explorations into more complex large-screen scenarios.",
    ),
    detailTheme: Object.freeze({
      headingAccentColor: "#5684AE",
    }),
    homeCardVariant: "standard",
    homeCategory: t("数据可视化", "Data Visualization"),
    homeImageAlt: t("大屏数据可视化项目预览图", "Large-screen data visualization project preview"),
    homeImageSrc: "/site/home/work-data-viz.png",
    homeMediaFrame: {
      backgroundSrc: "/site/home/figma-home/work-data-background.png",
      foregroundAspectRatio: "302.4 / 170.1",
      foregroundHeight: "70.1%",
      foregroundLeft: "50%",
      foregroundRadius: "0.25rem",
      foregroundShadow: "0 3.2px 6.4px -2.4px rgba(14, 18, 27, 0.1)",
      foregroundSrc: "/site/home/figma-home/work-data-foreground.png",
      foregroundTop: "50%",
      foregroundTransform: "translate(-50%, -50%)",
      foregroundWidth: "72%",
    },
    homeMediaPosition: "end",
    homeSummary: t(
      "定义了一套可复用的图表视觉语言，用于大屏与数据场景。",
      "Defined a reusable visual language for dashboards and large-screen data experiences.",
    ),
    homeTitle: t("大屏数据可视化系统", "Data Visualization System"),
    showOnHome: true,
    slug: "data-visualization-screen",
    summary: t(
      "把图表探索扩展为覆盖多层级大屏场景的统一视觉语言。",
      "Extending chart exploration into a scalable visual language for multi-level large-screen systems.",
    ),
    title: t("大屏数据可视化系统", "Data Visualization System"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    workCardVariant: "compact",
    workPreview: {
      alt: t("大屏数据可视化系统预览图", "Data Visualization System preview"),
      backgroundSrc: "/site/work/index/data-visualization-system-bg.png",
      foregroundAspectRatio: "302 / 170",
      foregroundSrc: "/site/work/index/data-visualization-system-main.png",
      foregroundWidth: "85.31%",
      ratio: "354 / 240",
      shadow: "0 3.2px 6.4px -2.4px rgba(14, 18, 27, 0.1)",
      type: "framed",
    },
    workTags: t(
      ["2025", "大屏", "UI/UX 设计"],
      ["2025", "Large Screen", "UI/UX Design"],
    ),
    year: "2025",
  },
  {
    category: t("网页", "Web"),
    detailSummary: t(
      "详细案例页会在这里继续接入，补齐组件打磨、通用模式和系统映射过程。",
      "A detailed case study will be connected here next, covering component refinement, reusable patterns, and system mapping.",
    ),
    legacyUrl: "https://zirui.framer.website/design-system",
    showOnHome: false,
    slug: "cloudtower-design-system",
    summary: t(
      "通过组件打磨、可复用模式和 UI Map 文档，系统性推进已有设计系统的演进。",
      "Systematically evolving an existing design system through component refinement, reusable patterns, and UI map documentation.",
    ),
    title: t("CloudTower 设计系统", "CloudTower Design System"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    workCardVariant: "featureTall",
    workPreview: {
      alt: t("CloudTower 设计系统预览图", "CloudTower Design System preview"),
      ratio: "782 / 505",
      src: "/site/work/index/cloudtower-design-system.png",
      type: "plain",
    },
    workTags: t(
      ["2023-2024", "网页", "设计系统"],
      ["2023-2024", "Web", "Design System"],
    ),
    year: "2023-2024",
  },
  {
    category: t("网页", "Web"),
    detailSummary: t(
      "详细案例页会在这里继续接入，补齐产品 framing 与资源管理决策。",
      "A detailed case study will be connected here next, including the virtualization product framing and resource management decisions.",
    ),
    legacyUrl: "https://zirui.framer.website/smtx-elf",
    showOnHome: false,
    slug: "smtx-elf-virtualization",
    summary: t(
      "为资源弹性扩展场景设计一款独立的虚拟化产品。",
      "Designing a standalone virtualization product for flexible resource expansion.",
    ),
    title: t("SMTX ELF 虚拟化产品", "SMTX ELF Virtualization"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    workCardVariant: "compact",
    workPreview: {
      alt: t("SMTX ELF 虚拟化产品预览图", "SMTX ELF Virtualization preview"),
      ratio: "354 / 240",
      src: "/site/work/index/smtx-elf-virtualization.png",
      type: "plain",
    },
    workTags: t(
      ["2023", "网页", "UI/UX 设计"],
      ["2023", "Web", "UI/UX Design"],
    ),
    year: "2023",
  },
  {
    category: t("网页", "Web"),
    detailSummary: t(
      "详细案例页会在这里继续接入，重点补齐交互逻辑和操作效率优化。",
      "A detailed case study will be connected here next, focusing on interaction logic and operational efficiency improvements.",
    ),
    legacyUrl: "https://zirui.framer.website/vm-optimization",
    showOnHome: false,
    slug: "vm-features-optimization",
    summary: t(
      "通过更清晰的逻辑、更低的错误率与更高效率来优化批量创建虚拟机体验。",
      "Improving batch VM creation with clearer logic, lower error rates, and better efficiency.",
    ),
    title: t("虚拟机功能优化", "VM Features Optimization"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    workCardVariant: "compact",
    workPreview: {
      alt: t("虚拟机功能优化预览图", "VM Features Optimization preview"),
      ratio: "354 / 240",
      src: "/site/work/index/vm-features-optimization.png",
      type: "plain",
    },
    workTags: t(
      ["2023", "网页", "交互设计"],
      ["2023", "Web", "Interaction Design"],
    ),
    year: "2023",
  },
];

export const homeWorkItems = workItems.filter((item) => item.showOnHome !== false);

export const workTabs = [
  {
    iconName: "layoutGrid",
    id: "professional-work",
    label: t("专业项目", "Professional Work"),
  },
  {
    iconName: "layoutDashboard",
    id: "explorations",
    label: t("探索实验", "Explorations"),
  },
  {
    iconName: "heart",
    id: "side-projects",
    label: t("侧项目", "Side Projects"),
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
      alt: t("一张设备风格的探索图，展示夕阳场景和紧凑指标。", "A device-style exploration showing a sunset scene and compact metrics."),
      id: "device-card",
      kind: "device-image",
      src: "/site/work/explorations/exploration-hero-device.png",
    },
  ],
  [
    {
      alt: t("一个蓝色渐变的 App 图标探索，中心是白色云朵符号。", "A blue gradient app icon exploration with a white cloud symbol."),
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
      alt: t("深色背景上的霓虹洋红灯光实验。", "A neon magenta light study on a dark background."),
      id: "gradient-magenta-card",
      kind: "full-image",
      src: "/site/work/explorations/exploration-gradient-magenta.png",
    },
    {
      alt: t("深色背景上的霓虹青色灯光实验。", "A neon teal light study on a dark background."),
      id: "gradient-teal-card",
      kind: "full-image",
      src: "/site/work/explorations/exploration-gradient-teal.png",
    },
  ],
  [
    {
      alt: t("冷蓝色调的登机牌风格探索。", "A boarding-pass style ticket exploration in cool blue tones."),
      id: "ticket-card",
      kind: "ticket-image",
      src: "/site/work/explorations/exploration-ticket.png",
    },
  ],
  [
    {
      alt: t("带柔和紫色辉光的竖线纹理实验。", "A vertical line texture study with a soft purple glow."),
      id: "lines-card",
      kind: "immersive-image",
      src: "/site/work/explorations/exploration-lines-purple.png",
    },
  ],
  [
    {
      alt: t("融合紫色、奶油色与粉色的抽象模糊色彩实验。", "An abstract blurred color study blending purple, cream, and pink."),
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
    subtitle: t("每周恋爱日志", "Weekly Love Log"),
    title: t("Lovers-weekly", "Lovers-weekly"),
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
