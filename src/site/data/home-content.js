const t = (zh, en) => ({ zh, en });

export const homeIntro = {
  avatarAlt: t("赵子锐的首页头像插图", "Portrait illustration of Zirui Zhao on the homepage"),
  avatarSrc: "/site/home/ascii-art-static.png",
  title: t(
    "你好，我是赵子锐。一名拥有 4 年经验的产品设计师，专注于为复杂业务流程、系统与界面设计真正能够落地的企业级产品。",
    "Hey, I'm Zirui Zhao! A Product Designer with 4 years of experience. I design enterprise products across workflows, systems, and interfaces that teams can actually ship.",
  ),
};

export const homeSkills = [
  {
    active: true,
    caption: t("我把复杂业务关系整理成清晰一致的系统。", "I turn complex business structures into coherent systems."),
    iconAlt: t("系统化思维图标", "Systematic Thinking icon"),
    iconName: "network",
    label: t("系统化思维", "Systematic Thinking"),
    palette: [
      [66 / 255, 108 / 255, 201 / 255],
      [33 / 255, 70 / 255, 119 / 255],
      [92 / 255, 138 / 255, 1],
    ],
  },
  {
    active: false,
    caption: t("我会用原型验证关键交互决策。", "I validate key interaction decisions through prototypes."),
    iconAlt: t("原型逻辑图标", "Prototype Logic icon"),
    iconName: "blocks",
    label: t("原型逻辑", "Prototype Logic"),
    palette: [
      [93 / 255, 82 / 255, 215 / 255],
      [56 / 255, 51 / 255, 161 / 255],
      [133 / 255, 123 / 255, 1],
    ],
  },
  {
    active: false,
    caption: t("交互应该帮助用户理解，而不是制造噪音。", "Interaction should clarify logic, not add noise."),
    iconAlt: t("交互设计图标", "Interaction Design icon"),
    iconName: "pointer",
    label: t("交互设计", "Interaction Design"),
    palette: [
      [42 / 255, 170 / 255, 209 / 255],
      [26 / 255, 107 / 255, 146 / 255],
      [104 / 255, 237 / 255, 1],
    ],
  },
  {
    active: false,
    caption: t("我把有表现力的设计连接到真正可交付的前端实现。", "I bridge expressive design and production frontend."),
    iconAlt: t("创意工程图标", "Creative Engineering icon"),
    iconName: "sparkles",
    label: t("创意工程", "Creative Engineering"),
    palette: [
      [96 / 255, 47 / 255, 208 / 255],
      [57 / 255, 38 / 255, 143 / 255],
      [136 / 255, 94 / 255, 1],
    ],
  },
  {
    active: false,
    caption: t("最终标准是可交付、可维护、也能持续迭代。", "The final bar is deliverable, maintainable, and iterative."),
    iconAlt: t("交付严谨性图标", "Delivery Rigor icon"),
    iconName: "badgeCheck",
    label: t("交付严谨性", "Delivery Rigor"),
    palette: [
      [42 / 255, 170 / 255, 209 / 255],
      [26 / 255, 107 / 255, 146 / 255],
      [104 / 255, 237 / 255, 1],
    ],
  },
];

export const homeSkillHighlight = {
  caption: t("我用系统化思维处理复杂业务关系", "I use systematic thinking to structure complex business relationships."),
  iconAlt: t("技能中心图标", "Skill centerpiece icon"),
  iconName: "orbit",
  imageAlt: t("技能亮点抽象插图", "Abstract illustration for the skills highlight"),
  imageSrc: "/site/home/skill-orb.png",
};
