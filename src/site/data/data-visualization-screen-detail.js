const t = (zh, en) => ({ zh, en });

function resolveAssetSource(localSrc) {
  // 这页当前引用到的公开展示图片和视频都已经补齐到本地目录，
  // 所以这里直接返回本地静态路径，避免继续保留无效的远程切换逻辑。
  return localSrc;
}

// 先把案例长页内容整理成单独数据对象，第二阶段继续补后半段时不需要把文案散落在组件里。
export const dataVisualizationScreenDetail = Object.freeze({
  hero: Object.freeze({
    title: t("大屏数据可视化", "Large-Screen Data Visualization"),
    subtitle: t(
      "从工作台中的图表探索，延展到更复杂的大屏场景",
      "Expanding chart explorations from dashboard work into more complex large-screen scenarios",
    ),
    backgroundImageSrc: resolveAssetSource(
      "/site/work/data-visualization/hero-background.png"
    ),
    coverImageSrc: resolveAssetSource(
      "/site/work/data-visualization/hero-dashboard.png"
    ),
    coverImageAlt: t(
      "广东省建筑工人管理服务信息平台的大屏主视觉预览图",
      "Cover preview of the Guangdong construction worker management platform",
    ),
  }),
  background: Object.freeze({
    title: t("项目背景", "Project Background"),
    paragraphs: Object.freeze([
      t(
        "过往的项目中，安心筑曾先后服务过广东省、市、区三级行政单位的建筑大屏的项目。本次项目希望将这三级的设计方案统合成一套视觉方案，减少设计债务，方便后续业务的进一步拓展。",
        "In earlier projects, AnxinZhu had supported construction dashboards for provincial, city, and district-level government units in Guangdong. This project aimed to unify those three design directions into one visual system, reduce design debt, and make future business expansion easier.",
      ),
    ]),
    leadIn: t(
      "对我来说，此次省、市、区三级可视化大屏的整合，主要包含两层设计任务：",
      "For me, integrating the provincial, city, and district dashboards involved two main design tasks:",
    ),
    bullets: Object.freeze([
      t(
        "在紧周期和多人协作下，完成三级方案的统一设计",
        "Unify the three dashboard versions under a tight timeline and through cross-functional collaboration",
      ),
      t(
        "将先前在 CMS 首页工作台中探索并定义的图表视觉语言，扩展到更大范围的场景中",
        "Extend the chart visual language previously explored in the CMS home dashboard to a broader set of scenarios",
      ),
    ]),
  }),
  problems: Object.freeze({
    title: t("问题定义", "Problem Definition"),
    intro: t(
      "在这个项目里，设计挑战主要来源以下 4 个方面：",
      "The design challenge in this project came mainly from four areas:",
    ),
    items: Object.freeze([
      {
        iconSrc: resolveAssetSource(
          "/site/work/data-visualization/problem-1.png"
        ),
        iconAlt: t("问题定义卡片图标 1", "Problem definition card icon 1"),
        label: t(
          "收敛历史上逐渐分化的视觉方案",
          "Consolidate visual directions that had gradually diverged over time",
        ),
      },
      {
        iconSrc: resolveAssetSource(
          "/site/work/data-visualization/problem-2.png"
        ),
        iconAlt: t("问题定义卡片图标 2", "Problem definition card icon 2"),
        label: t(
          "让省、市、区三级页面保持统一气质",
          "Keep the provincial, city, and district pages visually consistent",
        ),
      },
      {
        iconSrc: resolveAssetSource(
          "/site/work/data-visualization/problem-3.png"
        ),
        iconAlt: t("问题定义卡片图标 3", "Problem definition card icon 3"),
        label: t(
          "在多人协作下减少图表视觉的样式漂移",
          "Reduce visual drift in charts during multi-person collaboration",
        ),
      },
      {
        iconSrc: resolveAssetSource(
          "/site/work/data-visualization/problem-4.png"
        ),
        iconAlt: t("问题定义卡片图标 4", "Problem definition card icon 4"),
        label: t(
          "将新的图表视觉语言扩展到所有大屏",
          "Extend the new chart visual language across all large screens",
        ),
      },
    ]),
    summary: t(
      "所以我关注的，不只是局部模块完成度，而是整套可视化语言能否稳定落地。",
      "So I was paying attention not only to the completeness of individual modules, but also to whether the full visual language could land consistently.",
    ),
  }),
  goals: Object.freeze({
    title: t("设计目标", "Design Goals"),
    intro: t(
      "此次项目主要围绕以下三个层面建立设计价值：",
      "This project created design value across three layers:",
    ),
    items: Object.freeze([
      {
        title: t("视觉层", "Visual Layer"),
        description: t(
          "让图表在大屏场景中具备更强的识别度与视觉表现力，形成统一的可视化气质",
          "Make charts more recognizable and expressive in large-screen contexts, creating a cohesive visual tone",
        ),
      },
      {
        title: t("协作层", "Collaboration Layer"),
        description: t(
          "通过规则与组件沉淀，降低多人协作下的样式漂移和沟通成本，提升整体交付一致性",
          "Reduce style drift and communication overhead through rules and reusable components, improving delivery consistency across the team",
        ),
      },
      {
        title: t("系统层", "System Layer"),
        description: t(
          "将图表和指标类模块从单次页面设计提升为可复用资产，使视觉语言能够跨项目延续",
          "Elevate charts and metric modules from one-off page design into reusable assets so the visual language can carry across projects",
        ),
      },
    ]),
  }),
  practice: Object.freeze({
    title: t("设计实践", "Design Practice"),
    subtitle: t(
      "从视觉探索到可扩展应用",
      "From visual exploration to scalable application",
    ),
    visualLanguage: Object.freeze({
      eyebrow: t("定义新的图表视觉语言", "Defining a new chart visual language"),
      paragraphs: Object.freeze([
        t(
          "这套项目中图表的「果冻效果」，来自我在 CMS 首页工作台视觉优化项目中的探索。当时老板认为原有图表样式过于扁平，视觉存在感不足，难以在首页形成足够突出的数据焦点，希望团队尝试一种更有张力、视觉效果更强烈的表达方向。",
          "The chart's “jelly-like” effect in this project came from an earlier visual exploration in the CMS home dashboard optimization project. At the time, the original chart style felt too flat, lacked presence, and could not create a strong enough data focus on the homepage, so the team was asked to explore a more expressive direction.",
        ),
        t(
          "围绕这个目标，我负责了图表视觉方案的探索与打磨，尝试从体积感、光泽感、色彩层次与重点数据强调方式入手，最终形成了后来被持续沿用的果冻视觉效果。该方案经 Leader 确认并向上汇报后获得认可，随后被推行到后续项目中，逐渐成为团队可视化设计中的核心视觉语言之一。",
          "I led the exploration and refinement of the chart visual direction, working through volume, gloss, color layering, and ways to emphasize key data. That effort eventually produced the jelly-like visual language that kept being reused later. After being reviewed by the lead and presented upward, the approach was approved, rolled out to later projects, and gradually became one of the team's core visualization languages.",
        ),
      ]),
      gallery: Object.freeze({
        caption: t("CMS Dashboard Charts", "CMS Dashboard Charts"),
        mainImageSrc: resolveAssetSource(
          "/site/work/data-visualization/practice-main-chart.png"
        ),
        mainImageAlt: t("CMS Dashboard Charts 主图", "Main CMS dashboard chart image"),
        thumbnails: Object.freeze([
          {
            imageSrc: resolveAssetSource(
              "/site/work/data-visualization/practice-thumb-4.png"
            ),
            imageAlt: t("果冻效果应用缩略图 1", "Jelly-style exploration thumbnail 1"),
          },
          {
            imageSrc: resolveAssetSource(
              "/site/work/data-visualization/practice-thumb-1.png"
            ),
            imageAlt: t("果冻效果应用缩略图 2", "Jelly-style exploration thumbnail 2"),
          },
          {
            imageSrc: resolveAssetSource(
              "/site/work/data-visualization/practice-thumb-2.png"
            ),
            imageAlt: t("果冻效果应用缩略图 3", "Jelly-style exploration thumbnail 3"),
          },
          {
            imageSrc: resolveAssetSource(
              "/site/work/data-visualization/practice-thumb-3.png"
            ),
            imageAlt: t("果冻效果应用缩略图 4", "Jelly-style exploration thumbnail 4"),
            presentation: "wide-bleed",
          },
        ]),
      }),
    }),
    visualExpansion: Object.freeze({
      eyebrow: t("视觉语言扩展", "Visual Language Expansion"),
      paragraphs: Object.freeze([
        t(
          "在这次省、市、区三级大屏整合中，所有涉及图表的页面，基本都延续使用了这套「果冻效果」视觉语言。这让整套大屏在观感上更统一性与视觉识别度。",
          "In this provincial, city, and district dashboard integration, nearly every page with charts continued to use the same jelly-like visual language, which made the full system feel more unified and recognizable.",
        ),
      ]),
      gallery: Object.freeze({
        caption: t("果冻效果应用效果", "Jelly-style application result"),
        mainImageSrc: resolveAssetSource(
          "/site/work/data-visualization/expansion-main.png"
        ),
        mainImageAlt: t("视觉语言扩展主图", "Main image for visual language expansion"),
        leftImageSrc: resolveAssetSource(
          "/site/work/data-visualization/expansion-thumb-left.png"
        ),
        leftImageAlt: t("视觉语言扩展左侧缩略图", "Left thumbnail for visual language expansion"),
        rightImageSrc: resolveAssetSource(
          "/site/work/data-visualization/expansion-thumb-right.png"
        ),
        rightImageAlt: t("视觉语言扩展右侧缩略图", "Right thumbnail for visual language expansion"),
      }),
    }),
    systemization: Object.freeze({
      eyebrow: t("将视觉风格转化为可复用组件能力", "Turning a visual style into reusable component capabilities"),
      paragraphs: Object.freeze([
        t(
          "如果一套视觉风格只能停留在单个页面里，它的价值其实很有限。进入多人协作和多场景应用后，真正关键的是，它是否能被稳定复用。",
          "If a visual style only lives on a single page, its value is limited. Once it enters multi-person collaboration and multi-scenario use, the real question becomes whether it can be reused consistently.",
        ),
        t(
          "因此，在负责部分模块设计之外，我也协助推动这套视觉语言的组件化沉淀，例如异形数据指标卡、响应式图表等组件样式。",
          "So beyond designing some of the modules, I also helped push this visual language into reusable components, such as irregular metric cards and responsive chart styles.",
        ),
      ]),
      demos: Object.freeze([
        {
          caption: t("异形数据指标卡", "Irregular metric card"),
          title: t("异形数据指标卡演示视频", "Irregular metric card demo video"),
          videoSrc: resolveAssetSource(
            "/site/work/data-visualization/metric-card.mp4"
          ),
        },
        {
          caption: t("响应式图表", "Responsive charts"),
          title: t("响应式图表演示视频", "Responsive charts demo video"),
          videoSrc: resolveAssetSource(
            "/site/work/data-visualization/charts.mp4"
          ),
        },
      ]),
    }),
  }),
  outcomes: Object.freeze({
    title: t("设计成果", "Design Outcomes"),
    intro: t(
      "下面汇总了我负责的项目首页与质安监管模块的完整页面设计。",
      "The following section summarizes the full-page designs I was responsible for on the project homepage and quality/safety supervision module.",
    ),
    imageSrc: resolveAssetSource(
      "/site/work/data-visualization/outcomes-overview.png"
    ),
    imageAlt: t("大屏数据可视化项目全部页面概览", "Overview of all pages in the large-screen data visualization project"),
    caption: t("全部页面概览", "All pages overview"),
  }),
  retrospective: Object.freeze({
    title: t("项目复盘", "Project Retrospective"),
    intro: t(
      "除了完成署名模块的具体设计，我在这个项目里的价值主要体现在四个方面：",
      "Beyond completing the specific modules I was assigned, my value in this project was mainly reflected in four areas:",
    ),
    cards: Object.freeze([
      {
        title: t("延续视觉语言", "Extending the visual language"),
        description: t(
          "将先前定义的图表风格扩展到本次三级大屏项目中",
          "Extended the chart style defined earlier into this provincial, city, and district dashboard project",
        ),
        imageSrc: resolveAssetSource(
          "/site/work/data-visualization/retrospective-1.png"
        ),
        imageAlt: t("延续视觉语言缩略图", "Thumbnail for extending the visual language"),
      },
      {
        title: t("协助组件沉淀", "Supporting componentization"),
        description: t(
          "把高频图表和指标模块沉淀为可复用设计资产",
          "Turned frequently used chart and metric modules into reusable design assets",
        ),
        imageSrc: resolveAssetSource(
          "/site/work/data-visualization/retrospective-2.png"
        ),
        imageAlt: t("协助组件沉淀缩略图", "Thumbnail for supporting componentization"),
      },
      {
        title: t("推动整体统一", "Improving overall consistency"),
        description: t(
          "帮助三级页面在更大范围内形成一致的视觉表达",
          "Helped the three dashboard levels achieve a more consistent visual expression at a larger scale",
        ),
        imageSrc: resolveAssetSource(
          "/site/work/data-visualization/retrospective-3.png"
        ),
        imageAlt: t("推动整体统一缩略图", "Thumbnail for improving overall consistency"),
      },
      {
        title: t("支持多人协作", "Supporting team collaboration"),
        description: t(
          "通过规则和复用降低样式偏差，提升团队推进效率",
          "Reduced style drift through rules and reuse, improving team execution efficiency",
        ),
        imageSrc: resolveAssetSource(
          "/site/work/data-visualization/retrospective-4.png"
        ),
        imageAlt: t("支持多人协作缩略图", "Thumbnail for supporting team collaboration"),
      },
    ]),
    summary: t(
      "这个项目让我意识到，数据可视化设计的价值，不只在于单页是否足够吸引人，更在于是否能建立一套稳定、可延续的视觉表达方式。对我来说，最重要的成长有两点：",
      "This project made me realize that the value of data visualization design is not just about whether a single page is visually compelling, but whether it can establish a stable and extensible visual language. For me, the two most important takeaways were:",
    ),
    bullets: Object.freeze([
      t("从图表优化走向视觉语言定义", "From chart optimization to defining a visual language"),
      t("从页面交付转向系统化落地", "From page delivery to systematic implementation"),
    ]),
  }),
});
