const t = (zh, en) => ({ zh, en });

export const homeIntro = {
  avatarMediaType: "video",
  // 首页头像属于高频公开展示资源，优先走本地静态文件，避免继续消耗 Storage 出口流量。
  avatarSrc: "/site/home/avatar/home-avatar.mp4",
  avatarAlt: t("赵子瑞的首页头像插图", "Portrait illustration of Zirui Zhao on the homepage"),
  title: t(
    "你好，我是赵子瑞。一名拥有 4 年经验的产品设计师，专注于为复杂业务流程、系统与界面设计真正能够落地的企业级产品。",
    "Hey, I'm Zirui Zhao! A Product Designer with 4 years of experience. I design enterprise products across workflows, systems, and interfaces that teams can actually ship.",
  ),
};

export const homeSkills = [
  {
    label: t("系统化思维", "Systematic Thinking"),
    iconName: "network",
    iconAlt: t("系统化思维图标", "Systematic Thinking icon"),
    caption: t("我把复杂业务关系整理成清晰一致的系统", "I turn complex business structures into coherent systems"),
    palette: [
      [66 / 255, 108 / 255, 201 / 255],
      [33 / 255, 70 / 255, 119 / 255],
      [92 / 255, 138 / 255, 1],
    ],
    active: true,
  },
  {
    label: t("原型逻辑", "Prototype Logic"),
    iconName: "blocks",
    iconAlt: t("原型逻辑图标", "Prototype Logic icon"),
    caption: t("我会用原型验证关键交互决策", "I validate key interaction decisions through prototypes"),
    palette: [
      [93 / 255, 82 / 255, 215 / 255],
      [56 / 255, 51 / 255, 161 / 255],
      [133 / 255, 123 / 255, 1],
    ],
    active: false,
  },
  {
    label: t("交互设计", "Interaction Design"),
    iconName: "pointer",
    iconAlt: t("交互设计图标", "Interaction Design icon"),
    caption: t("交互应该帮助用户理解，而不是制造噪音", "Interaction should clarify logic, not add noise"),
    palette: [
      [42 / 255, 170 / 255, 209 / 255],
      [26 / 255, 107 / 255, 146 / 255],
      [104 / 255, 237 / 255, 1],
    ],
    active: false,
  },
  {
    label: t("创意工程", "Creative Engineering"),
    iconName: "sparkles",
    iconAlt: t("创意工程图标", "Creative Engineering icon"),
    caption: t("我把有表现力的设计连接到真正可交付的前端实现", "I bridge expressive design and production frontend"),
    palette: [
      [96 / 255, 47 / 255, 208 / 255],
      [57 / 255, 38 / 255, 143 / 255],
      [136 / 255, 94 / 255, 1],
    ],
    active: false,
  },
  {
    label: t("交付严谨性", "Delivery Rigor"),
    iconName: "badgeCheck",
    iconAlt: t("交付严谨性图标", "Delivery Rigor icon"),
    caption: t("最终标准是可交付、可维护、也能持续迭代", "The final bar is deliverable, maintainable, and iterative"),
    palette: [
      [42 / 255, 170 / 255, 209 / 255],
      [26 / 255, 107 / 255, 146 / 255],
      [104 / 255, 237 / 255, 1],
    ],
    active: false,
  },
];

export const homeSkillHighlight = {
  imageSrc: "/site/home/skill-orb.png",
  imageAlt: t("技能亮点抽象插图", "Abstract illustration for the skills highlight"),
  iconName: "orbit",
  iconAlt: t("技能中心图标", "Skill centerpiece icon"),
  caption: t("我用系统化思维处理复杂业务关系", "I use systematic thinking to structure complex business relationships."),
};
