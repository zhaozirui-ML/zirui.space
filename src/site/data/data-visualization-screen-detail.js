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
});
