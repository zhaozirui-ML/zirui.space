// 先把案例长页内容整理成单独数据对象，第二阶段继续补后半段时不需要把文案散落在组件里。
export const dataVisualizationScreenDetail = Object.freeze({
  hero: Object.freeze({
    title: "大屏数据可视化",
    subtitle: "从工作台中的图表探索，延展到更复杂的大屏场景",
    backgroundImageSrc:
      "/site/work/data-visualization-screen/hero-background.png",
    coverImageSrc: "/site/work/data-visualization-screen/hero-dashboard.png",
    coverImageAlt: "广东省建筑工人管理服务信息平台的大屏主视觉预览图",
  }),
  background: Object.freeze({
    title: "项目背景",
    paragraphs: Object.freeze([
      "过往的项目中，安心筑曾先后服务过广东省、市、区三级行政单位的建筑大屏的项目。本次项目希望将这三级的设计方案统合成一套视觉方案，减少设计债务，方便后续业务的进一步拓展。",
    ]),
    leadIn:
      "对我来说，此次省、市、区三级可视化大屏的整合，主要包含两层设计任务：",
    bullets: Object.freeze([
      "在紧周期和多人协作下，完成三级方案的统一设计",
      "将先前在 CMS 首页工作台中探索并定义的图表视觉语言，扩展到更大范围的场景中",
    ]),
  }),
  problems: Object.freeze({
    title: "问题定义",
    intro: "在这个项目里，设计挑战主要来源以下 4 个方面：",
    items: Object.freeze([
      {
        iconSrc: "/site/work/data-visualization-screen/problem-1.png",
        iconAlt: "问题定义卡片图标 1",
        label: "收敛历史上逐渐分化的视觉方案",
      },
      {
        iconSrc: "/site/work/data-visualization-screen/problem-2.png",
        iconAlt: "问题定义卡片图标 2",
        label: "让省、市、区三级页面保持统一气质",
      },
      {
        iconSrc: "/site/work/data-visualization-screen/problem-3.png",
        iconAlt: "问题定义卡片图标 3",
        label: "在多人协作下减少图表视觉的样式漂移",
      },
      {
        iconSrc: "/site/work/data-visualization-screen/problem-4.png",
        iconAlt: "问题定义卡片图标 4",
        label: "将新的图表视觉语言扩展到所有大屏",
      },
    ]),
    summary:
      "所以我关注的，不只是局部模块完成度，而是整套可视化语言能否稳定落地。",
  }),
  goals: Object.freeze({
    title: "设计目标",
    intro: "此次项目主要围绕以下三个层面建立设计价值：",
    items: Object.freeze([
      {
        title: "视觉层",
        description:
          "让图表在大屏场景中具备更强的识别度与视觉表现力，形成统一的可视化气质",
      },
      {
        title: "协作层",
        description:
          "通过规则与组件沉淀，降低多人协作下的样式漂移和沟通成本，提升整体交付一致性",
      },
      {
        title: "系统层",
        description:
          "将图表和指标类模块从单次页面设计提升为可复用资产，使视觉语言能够跨项目延续",
      },
    ]),
  }),
  practice: Object.freeze({
    title: "设计实践",
    subtitle: "From visual exploration to scalable application",
    visualLanguage: Object.freeze({
      eyebrow: "定义新的图表视觉语言",
      paragraphs: Object.freeze([
        "这套项目中图表的「果冻效果」，来自我在 CMS 首页工作台视觉优化项目中的探索。当时老板认为原有图表样式过于扁平，视觉存在感不足，难以在首页形成足够突出的数据焦点，希望团队尝试一种更有张力、视觉效果更强烈的表达方向。",
        "围绕这个目标，我负责了图表视觉方案的探索与打磨，尝试从体积感、光泽感、色彩层次与重点数据强调方式入手，最终形成了后来被持续沿用的果冻视觉效果。该方案经 Leader 确认并向上汇报后获得认可，随后被推行到后续项目中，逐渐成为团队可视化设计中的核心视觉语言之一。",
      ]),
      gallery: Object.freeze({
        caption: "CMS Dashboard Charts",
        mainImageSrc: "/site/work/data-visualization-screen/practice-main-chart.png",
        mainImageAlt: "CMS Dashboard Charts 主图",
        thumbnails: Object.freeze([
          {
            imageSrc:
              "/site/work/data-visualization-screen/practice-thumb-1.png",
            imageAlt: "CMS Dashboard Charts 缩略图 1",
          },
          {
            imageSrc:
              "/site/work/data-visualization-screen/practice-thumb-2.png",
            imageAlt: "CMS Dashboard Charts 缩略图 2",
          },
          {
            imageSrc:
              "/site/work/data-visualization-screen/practice-thumb-3.png",
            imageAlt: "CMS Dashboard Charts 缩略图 3",
          },
          {
            imageSrc:
              "/site/work/data-visualization-screen/practice-thumb-4.png",
            imageAlt: "CMS Dashboard Charts 缩略图 4",
          },
        ]),
      }),
    }),
    systemization: Object.freeze({
      eyebrow: "将视觉风格转化为可复用组件能力",
      paragraphs: Object.freeze([
        "如果一套视觉风格只能停留在单个页面里，它的价值其实很有限。进入多人协作和多场景应用后，真正关键的是，它是否能被稳定复用。",
        "因此，在负责部分模块设计之外，我也协助推动这套视觉语言的组件化沉淀，例如异形数据指标卡、响应式图表等组件样式。",
      ]),
      demos: Object.freeze([
        {
          type: "indicator-card",
          caption: "异形数据指标卡",
        },
        {
          type: "responsive-chart",
          caption: "响应式图表",
        },
      ]),
    }),
  }),
  outcomes: Object.freeze({
    title: "设计成果",
    intro: "下面汇总了我负责的项目首页与质安监管模块的完整页面设计。",
    imageSrc: "/site/work/data-visualization-screen/outcomes-overview.png",
    imageAlt: "大屏数据可视化项目全部页面概览",
    caption: "全部页面概览",
  }),
  retrospective: Object.freeze({
    title: "项目复盘",
    intro: "除了完成署名模块的具体设计，我在这个项目里的价值主要体现在四个方面：",
    cards: Object.freeze([
      {
        title: "延续视觉语言",
        description: "将先前定义的图表风格扩展到本次三级大屏项目中",
        imageSrc: "/site/work/data-visualization-screen/retrospective-1.png",
        imageAlt: "延续视觉语言缩略图",
      },
      {
        title: "协助组件沉淀",
        description: "把高频图表和指标模块沉淀为可复用设计资产",
        imageSrc: "/site/work/data-visualization-screen/retrospective-2.png",
        imageAlt: "协助组件沉淀缩略图",
      },
      {
        title: "推动整体统一",
        description: "帮助三级页面在更大范围内形成一致的视觉表达",
        imageSrc: "/site/work/data-visualization-screen/retrospective-3.png",
        imageAlt: "推动整体统一缩略图",
      },
      {
        title: "支持多人协作",
        description: "通过规则和复用降低样式偏差，提升团队推进效率",
        imageSrc: "/site/work/data-visualization-screen/retrospective-4.png",
        imageAlt: "支持多人协作缩略图",
      },
    ]),
    summary:
      "这个项目让我意识到，数据可视化设计的价值，不只在于单页是否足够吸引人，更在于是否能建立一套稳定、可延续的视觉表达方式。对我来说，最重要的成长有两点：",
    bullets: Object.freeze([
      "从图表优化走向视觉语言定义",
      "从页面交付转向系统化落地",
    ]),
  }),
});
