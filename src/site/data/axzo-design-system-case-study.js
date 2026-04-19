const t = (zh, en) => ({ zh, en });

// 这页当前全部是公开展示型图片资源，先统一切回本地静态目录。
// 这样可以优先减少案例长页里的图片流量，后续如果要重新托管到远程，
// 只需要改这里一层映射，不用改页面组件。
const getAxzoAssetUrl = (fileName) => `/site/work/axzo-design-system/${fileName}`;

export const axzoDesignSystemCaseStudy = {
  cover: {
    backdropSrc: getAxzoAssetUrl("cover-card.png"),
    panelSrc: getAxzoAssetUrl("cover-background.png"),
    panelAlt: t("Axzo Design System 官网封面主视觉", "Axzo Design System cover visual"),
  },
  projectBackground: {
    title: t("项目背景", "Project background"),
    description: t(
      "2025 年团队将「组件化」设为关键 OKR，希望推动设计与开发组件同步率达到 100%。在此背景下，团队需要一个统一入口，承接组件化建设成果，并服务于内部协同与对上展示。",
      "In 2025, the team made componentization a key OKR and aimed to reach 100% synchronization between design and development components. Against that backdrop, the team needed a single entry point to surface the outcomes of the componentization effort and support both internal collaboration and executive reporting.",
    ),
    imageSrc: getAxzoAssetUrl("okr-screenshot.png"),
    imageAlt: t("组件化 OKR 截图", "Componentization OKR screenshot"),
    imageCrop: {
      height: "330.04%",
      intrinsicHeight: 848,
      intrinsicWidth: 1243,
      left: "0.12%",
      top: "-129.26%",
      width: "100.01%",
    },
    caption: t("组件化 OKR", "Componentization OKR"),
    ratio: "832 / 172",
  },
  problemDefinition: {
    title: t("问题定义", "Problem definition"),
    description: t(
      "团队已经在 Figma 中沉淀了一部分设计系统资产，开发侧也有些现成内容。随着产品持续迭代，这些资源逐渐分散在不同位置，导致设计系统的使用体验并不顺畅。问题的本质不是「有没有资源」，而是「这些资源如何被快速查找、理解和使用」。",
      "The team had already accumulated design system assets in Figma, and the development side also had some ready-made materials. As the product kept iterating, those resources became scattered across different places, making the design system experience feel fragmented. The real problem was not whether resources existed, but how quickly they could be found, understood, and used.",
    ),
    items: [
      {
        title: t("设计资产有沉淀，但入口分散", "Design assets existed, but the entry points were scattered"),
        imageSrc: getAxzoAssetUrl("problem-entry.svg"),
        imageAlt: t("统一入口问题图标", "Unified entry problem icon"),
      },
      {
        title: t("数据可视化规范建设不足", "Data visualization standards were incomplete"),
        imageSrc: getAxzoAssetUrl("problem-dataviz.svg"),
        imageAlt: t("数据可视化问题图标", "Data visualization problem icon"),
      },
      {
        title: t("UI 实现存在局部不一致", "UI implementation had local inconsistencies"),
        imageSrc: getAxzoAssetUrl("problem-ui.svg"),
        imageAlt: t("界面不一致问题图标", "UI inconsistency problem icon"),
      },
      {
        title: t("设计开发协作效率低", "Design-development collaboration was inefficient"),
        imageSrc: getAxzoAssetUrl("problem-collab.svg"),
        imageAlt: t("协作效率问题图标", "Collaboration efficiency problem icon"),
      },
    ],
  },
  insight: {
    title: t("设计洞察", "Design insight"),
    description: t("A design system needs to be designed twice", "A design system needs to be designed twice"),
    leftOrbit: {
      centerLines: ["Design", "System"],
      top: t("Tokens", "Tokens"),
      left: t("Components", "Components"),
      right: t("Guidelines", "Guidelines"),
      bottom: t("Docs", "Docs"),
      caption: t("第一次设计：设计组件、规范、资产和协作流程", "First design: shaping components, guidelines, assets, and collaboration flows"),
    },
    rightOrbit: {
      centerLines: ["Portal"],
      top: t("Scaling", "Scaling"),
      left: t("Understanding", "Understanding"),
      right: t("Collaboration", "Collaboration"),
      bottom: t("Adoption", "Adoption"),
      caption: t("第二次设计：内容如何被组织、理解、访问和传播", "Second design: how content is organized, understood, accessed, and shared"),
    },
    message: t(
      "随着设计系统越来越复杂，后者会直接影响团队对它的理解成本、协作效率和落地深度",
      "As a design system grows more complex, the latter directly affects how costly it is to understand, how efficiently teams collaborate around it, and how deeply it gets adopted.",
    ),
    conclusion: t("设计系统需要做成一个能被团队长期消费的产品", "A design system needs to be built as a product the team can keep consuming over time"),
  },
  portalPositioning: {
    title: t("官网定位", "Portal positioning"),
    description: t(
      "我将 Axzo Design 定义为一个 Design System Portal。它承担的不只是文档展示功能，还承担四个更重要的角色",
      "I defined Axzo Design as a Design System Portal. It was not just a place for showing documentation, but also served four more important roles:",
    ),
    cards: [
      {
        title: t("统一入口", "Unified entry"),
        description: t(
          "把设计、开发、数据可视化和协作内容收拢到同一阵地",
          "Bring design, development, data visualization, and collaboration content into one place",
        ),
        imageSrc: getAxzoAssetUrl("role-entry.png"),
        imageAlt: t("统一入口意象图", "Unified entry concept image"),
      },
      {
        title: t("使用说明", "Usage guide"),
        description: t(
          "帮助团队成员快速理解系统的结构、边界和进入方式",
          "Help team members quickly understand the system structure, boundaries, and entry paths",
        ),
        imageSrc: getAxzoAssetUrl("role-guide.png"),
        imageAlt: t("使用说明意象图", "Usage guide concept image"),
      },
      {
        title: t("协作桥梁", "Collaboration bridge"),
        description: t("连接设计师、开发与业务协作中的关键流程", "Connect the key workflows between designers, developers, and business partners"),
        imageSrc: getAxzoAssetUrl("role-collab.png"),
        imageAlt: t("协作桥梁意象图", "Collaboration bridge concept image"),
      },
      {
        title: t("展示窗口", "Showcase window"),
        description: t(
          "向管理层和团队展示组件化建设成果及系统成熟度",
          "Show the management team and the wider organization the progress of componentization and the maturity of the system",
        ),
        imageSrc: getAxzoAssetUrl("role-showcase.png"),
        imageAlt: t("展示窗口意象图", "Showcase concept image"),
      },
    ],
  },
  designGoal: {
    title: t("设计目标", "Design goal"),
    description: t(
      "1.0 的版本的设计系统官网主要目标是从 0-1 搭建体系化的设计系统展示与协作入口，服务于对内协作与向上展示。",
      "The main goal of version 1.0 of the design system portal was to build a systematic entry point for showcasing and collaborating around the design system from scratch, serving both internal collaboration and upward reporting.",
    ),
  },
  exploration: {
    title: t("设计探索", "Design exploration"),
    description: t("Designing how the system is understood", "Designing how the system is understood"),
    sections: [
      {
        theme: t("规划设计系统的消费链路", "Planning the consumption journey"),
        paragraphs: [
          t(
            "在信息架构设计上，我从「团队成员如何理解和使用设计系统」的视角出发，规划了官网的整体结构。",
            "For the information architecture, I planned the overall structure of the portal from the perspective of how team members understand and use the design system.",
          ),
          t(
            "1.0 官网被拆解为四个一级模块：设计、开发、数据可视化、团队协同。它们分别对应了团队使用设计系统时最核心的四类任务。",
            "Version 1.0 was split into four top-level modules: design, development, data visualization, and team collaboration. Each one maps to a core task the team performs when working with the design system.",
          ),
        ],
        imageSrc: getAxzoAssetUrl("exploration-structure.png"),
        imageAlt: t("设计系统消费链路结构图", "Design system consumption journey diagram"),
        ratio: "2090 / 580",
      },
      {
        theme: t("信息架构作为一种传播策略", "Information architecture as a communication strategy"),
        paragraphs: [t("在结构设计中，我做了三个关键决策：", "I made three key decisions in the structure design:")],
        decisions: [
          t("按使用场景组织内容，而非按资源来源组织，这样更符合设计师和开发的检索路径。", "Organize content by usage scenario instead of source, because that better matches how designers and developers search for things."),
          t("把数据可视化独立成一级模块，因为它在 B 端产品中复杂度高、规范建设未完成、需要单独被理解。", "Separate data visualization into its own top-level module because it is highly complex in B2B products, its standards were still immature, and it needed to be understood on its own."),
          t("把团队协同纳入门户，因为设计系统的落地不只靠组件和规范，还靠协作机制。", "Include team collaboration in the portal, because a design system is adopted not just through components and guidelines, but also through collaboration mechanisms."),
        ],
      },
    ],
  },
  practice: {
    title: t("设计实践", "Design practice"),
    description: t("Design system as a product", "Design system as a product"),
    pages: [
      {
        theme: t("首页设计", "Homepage design"),
        description: t(
          "首页承担的职责，不只是“看起来完整”，而是先建立设计系统认知，再展示系统能力，最后引导进入具体模块。首页通过 Hero、组件能力预览、快速开始等内容，把抽象的设计系统转化成一个团队可理解、易访问的产品入口。",
          "The homepage did more than just look complete. It first built understanding of the design system, then showcased the system's capabilities, and finally guided users into the specific modules. Through the hero area, component previews, and quick-start content, the homepage turned an abstract design system into a product entry point that the team could understand and access easily.",
        ),
        imageSrc: getAxzoAssetUrl("practice-homepage.png"),
        imageAlt: t("Axzo Design System 首页设计截图", "Axzo Design System homepage screenshot"),
        ratio: "832 / 2227",
      },
      {
        theme: t("设计与开发详情", "Design and development details"),
        description: t(
          "设计与开发模块的价值，不只是承载已有内容，而是把已有资产重新组织成更清晰的阅读与接入路径。页面中包含快速上手、安装方式、组件引入、组件规范等内容，使设计系统从「知道有」变成「知道怎么用」。",
          "The value of the design and development module was not only in hosting existing content, but in reorganizing assets into clearer reading and onboarding paths. It included quick start, installation, component import, and component guidelines content, helping the design system move from 'knowing it exists' to 'knowing how to use it.'",
        ),
        imageSrc: getAxzoAssetUrl("practice-design-dev.png"),
        imageAlt: t("设计与开发详情页截图", "Design and development details page screenshot"),
        ratio: "832 / 787",
      },
      {
        theme: t("数据可视化", "Data visualization"),
        description: t(
          "数据可视化模块是整个官网中的关键增量。它承接了团队中尚未完全成熟的图表规范，通过模块化结构把图表基础、图表类型、案例与资源组织起来，为后续持续建设提供落点。页面中已展示多种图表类型和相关案例方向。",
          "The data visualization module was a key addition to the entire portal. It carried the team's still-emerging chart standards and used a modular structure to organize chart foundations, chart types, examples, and resources, creating a landing point for future iteration. The page already showcased several chart types and related example directions.",
        ),
        imageSrc: getAxzoAssetUrl("practice-data-viz.png"),
        imageAlt: t("数据可视化模块截图", "Data visualization module screenshot"),
        ratio: "832 / 3059",
      },
      {
        theme: t("团队协同", "Team collaboration"),
        description: t(
          "团队协同模块主要服务于产品、设计与开发的协同工作流。1.0 版本中，我先整合了 Figma 文件管理规范、PRD Figma 模板以及设计评审与反馈机制 3 部分内容。将设计系统由单纯的设计资产沉淀，扩展为团队运作的基础设施。",
          "The team collaboration module mainly served the collaborative workflow between product, design, and development. In version 1.0, I first brought together three parts: Figma file management guidelines, PRD Figma templates, and the design review and feedback process. This expanded the design system from a simple repository of design assets into an infrastructure for team operations.",
        ),
        imageSrc: getAxzoAssetUrl("practice-collaboration.png"),
        imageAlt: t("团队协同模块截图", "Team collaboration module screenshot"),
        ratio: "832 / 1011",
      },
    ],
  },
  reflection: {
    title: t("成果与复盘", "Results and reflection"),
    intro: t("1.0 版本的设计系统官网主要解决了以下 3 个问题：", "Version 1.0 of the design system portal mainly solved three problems:"),
    bullets: [
      t("从 0-1 建立统一的设计系统入口，团队第一次拥有了设计系统门户", "Created a unified design system entry point from scratch, giving the team its first design system portal"),
      t("提升设计系统的可访问性，将设计、开发、可视化与协作内容纳入同一平台", "Improved the accessibility of the design system by bringing design, development, visualization, and collaboration content into one platform"),
      t("支撑组件化战略表达，官网成为 OKR 背景下组件化成果的展示载体", "Supported the strategic narrative for componentization, making the portal a showcase for componentization outcomes in the context of the OKR"),
    ],
    conclusion: t(
      "这个项目让我更加明确地意识到，设计系统的难点不只在于组件本身，而在于它如何被团队真正找到、理解、使用和迭代。对我而言，这个项目最重要的价值，是我不只设计了一个系统，也设计了这个系统如何在组织中被传播。",
      "This project made it even clearer to me that the hard part of a design system is not the components themselves, but how the team actually finds, understands, uses, and iterates on them. The most important value of this project, to me, was that I did not only design a system, I also designed how that system would spread through the organization.",
    ),
    quote: t(
      "A design system becomes valuable only when people can actually find it, understand it, and use it.",
      "A design system becomes valuable only when people can actually find it, understand it, and use it.",
    ),
  },
};
