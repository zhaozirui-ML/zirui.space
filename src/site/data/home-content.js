const t = (zh, en) => ({ zh, en });

export const homeSectionVisibility = {
  // 想临时隐藏首页 Skills 模块时，把这里改成 false 即可。
  skills: true,
};

export const homeIntro = {
  avatarMediaType: /** @type {"image" | "video"} */ ("image"),
  // 当前首页使用透明背景的静态头像图；原来的 mp4 动画资源和之前的 png 版本都继续保留，后续如果要恢复只改回这里即可。
  avatarSrc: "/site/home/avatar/home-avatar-cutout.png",
  avatarAlt: t("赵子瑞的首页头像插图", "Portrait illustration of Zirui Zhao on the homepage"),
  title: t(
    "你好，我是赵子瑞。一名拥有 4 年多经验的产品设计师，专注于为复杂业务流程、系统与界面设计真正能够落地的企业级产品。",
    "Hey, I'm Zirui Zhao, a product designer with 4+ years of experience. I design enterprise products across workflows, systems, and interfaces that teams can actually ship.",
  ),
};

export const homeSkills = [
  {
    label: t("复杂系统设计", "Complex System Design"),
    iconName: "network",
    iconAlt: t("复杂系统设计图标", "Complex System Design icon"),
    caption: t(
      "梳理跨角色、状态、权限与多端协作的企业级工作流",
      "I design enterprise workflows across roles, states, permissions, and multi-platform collaboration",
    ),
    palette: [
      [66 / 255, 108 / 255, 201 / 255],
      [33 / 255, 70 / 255, 119 / 255],
      [92 / 255, 138 / 255, 1],
    ],
    active: true,
  },
  {
    label: t("方法驱动推进", "Method-driven Progress"),
    iconName: "pointer",
    iconAlt: t("方法驱动推进图标", "Method-driven Progress icon"),
    caption: t(
      "通过结构化拆解、原型验证，把模糊问题推进为清晰决策",
      "I use structure, prototyping, and validation to move ambiguous problems toward clear decisions",
    ),
    palette: [
      [202 / 255, 139 / 255, 67 / 255],
      [132 / 255, 86 / 255, 43 / 255],
      [238 / 255, 182 / 255, 112 / 255],
    ],
    active: false,
  },
  {
    label: t("系统化交付", "Systemized Delivery"),
    iconName: "badgeCheck",
    iconAlt: t("系统化交付图标", "Systemized Delivery icon"),
    caption: t(
      "将设计决策沉淀为可复用模式、组件与可交付系统",
      "I turn design decisions into reusable patterns, components, and delivery-ready systems",
    ),
    palette: [
      [42 / 255, 170 / 255, 209 / 255],
      [26 / 255, 107 / 255, 146 / 255],
      [104 / 255, 237 / 255, 1],
    ],
    active: false,
  },
  {
    label: t("AI 设计工程", "AI Design Engineering"),
    iconName: "aiSparkles",
    iconAlt: t("AI 设计工程图标", "AI Design Engineering icon"),
    caption: t(
      "借助 AI 代理与编码工具，连接设计、前端实现与可运行原型",
      "I use AI agents and coding tools to bridge design with frontend implementation and working prototypes",
    ),
    palette: [
      [96 / 255, 47 / 255, 208 / 255],
      [57 / 255, 38 / 255, 143 / 255],
      [136 / 255, 94 / 255, 1],
    ],
    active: false,
  },
];

export const homeSkillHighlight = {
  imageSrc: "/site/home/skill-orb.png",
  imageAlt: t("能力亮点抽象插图", "Abstract illustration for the skills highlight"),
  iconName: "orbit",
  iconAlt: t("能力中心图标", "Skill centerpiece icon"),
  caption: t(
    "把复杂问题转化为能够落地的产品系统",
    "I turn complexity into shippable product systems",
  ),
};
