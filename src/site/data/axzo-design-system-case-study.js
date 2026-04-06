import { getStorageAssetUrl } from "../lib/get-storage-asset-url";

// 先把 AXZO 详情页资源集中到一个入口，后面如果改 bucket 结构，只需要改这里。
const getAxzoAssetUrl = (fileName) =>
  getStorageAssetUrl(`work/axzo-design-system/${fileName}`);

export const axzoDesignSystemCaseStudy = {
  cover: {
    backdropSrc: getAxzoAssetUrl("cover-card.png"),
    panelSrc: getAxzoAssetUrl("cover-background.png"),
    panelAlt: "Axzo Design System 官网封面主视觉",
  },
  projectBackground: {
    title: "项目背景",
    description:
      "2025 年团队将「组件化」设为关键 OKR，希望推动设计与开发组件同步率达到 100%。在此背景下，团队需要一个统一入口，承接组件化建设成果，并服务于内部协同与对上展示。",
    imageSrc: getAxzoAssetUrl("okr-screenshot.png"),
    imageAlt: "组件化 OKR 截图",
    imagePosition: "50% 56%",
    caption: "组件化 OKR",
    ratio: "832 / 172",
  },
  problemDefinition: {
    title: "问题定义",
    description:
      "团队已经在 Figma 中沉淀了一部分设计系统资产，开发侧也有些现成内容。随着产品持续迭代，这些资源逐渐分散在不同位置，导致设计系统的使用体验并不顺畅。问题的本质不是「有没有资源」，而是「这些资源如何被快速查找、理解和使用」。",
    items: [
      {
        title: "设计资产有沉淀，但入口分散",
        imageSrc: getAxzoAssetUrl("problem-entry.svg"),
        imageAlt: "统一入口问题图标",
      },
      {
        title: "数据可视化规范建设不足",
        imageSrc: getAxzoAssetUrl("problem-dataviz.svg"),
        imageAlt: "数据可视化问题图标",
      },
      {
        title: "UI 实现存在局部不一致",
        imageSrc: getAxzoAssetUrl("problem-ui.svg"),
        imageAlt: "界面不一致问题图标",
      },
      {
        title: "设计开发协作效率低",
        imageSrc: getAxzoAssetUrl("problem-collab.svg"),
        imageAlt: "协作效率问题图标",
      },
    ],
  },
  insight: {
    title: "设计洞察 Insights",
    description: "A design system needs to be designed twice",
    leftOrbit: {
      centerLines: ["Design", "System"],
      top: "Tokens",
      left: "Components",
      right: "Guidelines",
      bottom: "Docs",
      caption: "第一次设计：设计组件、规范、资产和协作流程",
    },
    rightOrbit: {
      centerLines: ["Portal"],
      top: "Scaling",
      left: "Understanding",
      right: "Collaboration",
      bottom: "Adoption",
      caption: "第二次设计：内容如何被组织、理解、访问和传播",
    },
    message:
      "随着设计系统越来越复杂，后者会直接影响团队对它的理解成本、协作效率和落地深度",
    conclusion: "设计系统需要做成一个能被团队长期消费的产品",
  },
  portalPositioning: {
    title: "官网定位",
    description:
      "我将 Axzo Design 定义为一个 Design System Portal。它承担的不只是文档展示功能，还承担四个更重要的角色",
    cards: [
      {
        title: "统一入口",
        description:
          "把设计、开发、数据可视化和协作内容收拢到同一阵地",
        imageSrc: getAxzoAssetUrl("role-entry.png"),
        imageAlt: "统一入口意象图",
      },
      {
        title: "使用说明",
        description:
          "帮助团队成员快速理解系统的结构、边界和进入方式",
        imageSrc: getAxzoAssetUrl("role-guide.png"),
        imageAlt: "使用说明意象图",
      },
      {
        title: "协作桥梁",
        description: "连接设计师、开发与业务协作中的关键流程",
        imageSrc: getAxzoAssetUrl("role-collab.png"),
        imageAlt: "协作桥梁意象图",
      },
      {
        title: "展示窗口",
        description:
          "向管理层和团队展示组件化建设成果及系统成熟度",
        imageSrc: getAxzoAssetUrl("role-showcase.png"),
        imageAlt: "展示窗口意象图",
      },
    ],
  },
  designGoal: {
    title: "设计目标",
    description:
      "1.0 的版本的设计系统官网主要目标是从 0-1 搭建体系化的设计系统展示与协作入口，服务于对内协作与向上展示。",
  },
  exploration: {
    title: "设计探索",
    description: "Designing how the system is understood",
    sections: [
      {
        theme: "规划设计系统的消费链路",
        paragraphs: [
          "在信息架构设计上，我从「团队成员如何理解和使用设计系统」的视角出发，规划了官网的整体结构。",
          "1.0 官网被拆解为四个一级模块：设计、开发、数据可视化、团队协同。它们分别对应了团队使用设计系统时最核心的四类任务。",
        ],
        frameRatio: "832 / 265.569",
        imageSrc: getAxzoAssetUrl("exploration-structure.png"),
        imageAlt: "设计系统消费链路结构图",
        ratio: "2090 / 580",
      },
      {
        theme: "信息架构作为一种传播策略",
        paragraphs: ["在结构设计中，我做了三个关键决策："],
        decisions: [
          "按使用场景组织内容，而非按资源来源组织，这样更符合设计师和开发的检索路径。",
          "把数据可视化独立成一级模块，因为它在 B 端产品中复杂度高、规范建设未完成、需要单独被理解。",
          "把团队协同纳入门户，因为设计系统的落地不只靠组件和规范，还靠协作机制。",
        ],
      },
    ],
  },
  practice: {
    title: "设计实践",
    description: "Design system as a product",
    pages: [
      {
        theme: "首页设计",
        description:
          "首页承担的职责，不只是“看起来完整”，而是先建立设计系统认知，再展示系统能力，最后引导进入具体模块。首页通过 Hero、组件能力预览、快速开始等内容，把抽象的设计系统转化成一个团队可理解、易访问的产品入口。",
        imageSrc: getAxzoAssetUrl("practice-homepage.png"),
        imageAlt: "Axzo Design System 首页设计截图",
        ratio: "832 / 2227",
      },
      {
        theme: "设计与开发详情",
        description:
          "设计与开发模块的价值，不只是承载已有内容，而是把已有资产重新组织成更清晰的阅读与接入路径。页面中包含快速上手、安装方式、组件引入、组件规范等内容，使设计系统从「知道有」变成「知道怎么用」。",
        imageSrc: getAxzoAssetUrl("practice-design-dev.png"),
        imageAlt: "设计与开发详情页截图",
        ratio: "832 / 787",
      },
      {
        theme: "数据可视化",
        description:
          "数据可视化模块是整个官网中的关键增量。它承接了团队中尚未完全成熟的图表规范，通过模块化结构把图表基础、图表类型、案例与资源组织起来，为后续持续建设提供落点。页面中已展示多种图表类型和相关案例方向。",
        imageSrc: getAxzoAssetUrl("practice-data-viz.png"),
        imageAlt: "数据可视化模块截图",
        ratio: "832 / 3059",
      },
      {
        theme: "团队协同",
        description:
          "团队协同模块主要服务于产品、设计与开发的协同工作流。1.0 版本中，我先整合了 Figma 文件管理规范、PRD Figma 模板以及设计评审与反馈机制 3 部分内容。将设计系统由单纯的设计资产沉淀，扩展为团队运作的基础设施。",
        imageSrc: getAxzoAssetUrl("practice-collaboration.png"),
        imageAlt: "团队协同模块截图",
        ratio: "832 / 1011",
      },
    ],
  },
  reflection: {
    title: "成果与复盘",
    intro: "1.0 版本的设计系统官网主要解决了以下 3 个问题：",
    bullets: [
      "从 0-1 建立统一的设计系统入口，团队第一次拥有了设计系统门户",
      "提升设计系统的可访问性，将设计、开发、可视化与协作内容纳入同一平台",
      "支撑组件化战略表达，官网成为 OKR 背景下组件化成果的展示载体",
    ],
    conclusion:
      "这个项目让我更加明确地意识到，设计系统的难点不只在于组件本身，而在于它如何被团队真正找到、理解、使用和迭代。对我而言，这个项目最重要的价值，是我不只设计了一个系统，也设计了这个系统如何在组织中被传播。",
    quote:
      "A design system becomes valuable only when people can actually find it, understand it, and use it.",
  },
};
