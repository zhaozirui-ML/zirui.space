const t = (zh, en) => ({ zh, en });

export const aboutContactItems = [
  {
    label: t("电话", "Phone"),
    value: "13260951210",
  },
  {
    label: t("邮箱", "Email"),
    href: "mailto:Zhaozirui721@gmail.com",
    value: "Zhaozirui721@gmail.com",
  },
  {
    label: t("社交链接", "SNS"),
    value: [
      {
        href: "https://x.com/atc12138",
        iconSrc: "/site/about/sns-x.svg",
        label: "X",
        platform: "x",
      },
      {
        href: "https://www.instagram.com/atc12138/",
        iconSrc: "/site/about/sns-instagram.svg",
        label: "Instagram",
        platform: "instagram",
      },
      {
        href: "https://www.notion.so/HI-ATC-8a125e8f64414017b830ac0f7d5d3810?pvs=4",
        iconSrc: "/site/about/sns-notion.svg",
        label: "Notion",
        platform: "notion",
      },
      {
        href: "https://open.spotify.com/collection/tracks",
        iconSrc: "/site/about/sns-spotify.svg",
        label: "Spotify",
        platform: "spotify",
      },
    ],
  },
];

export const aboutExperienceItems = [
  {
    company: "Yizhi Technology",
    companyHref: "https://www.axzsource.com/",
    dateRange: "Sep 2024 – Feb 2026",
    role: t("高级 UX 设计师", "Senior UX Designer"),
    responsibilities: [
      t(
        "负责 web 与 App 端绘图模块的端到端设计，重构了上传、解析与协作流程",
        "Led end to end design for the drawing module across web and app, redesigning upload, parsing, and collaboration workflows for the construction business line",
      ),
      t(
        "从零搭建图纸与文档关联流程，提升了核心业务场景下的协作效率",
        "Built the drawing to document association workflow from the ground up, improving collaboration efficiency in core business scenarios",
      ),
      t(
        "协助统一 AXZO 组件库与交互标准，减少设计与研发协作成本约 30%",
        "Helped unify the AXZO component library and interaction standards, reducing design development coordination costs by about 30 percent",
      ),
    ],
  },
  {
    company: "SmartX",
    companyHref: "https://www.smartx.com/",
    dateRange: "Jul 2022 – Mar 2024",
    role: t("产品设计师", "Product Designer"),
    responsibilities: [
      t(
        "负责虚拟化产品线核心企业流程的功能设计与体验优化",
        "Led functional design and optimization for the virtualization product line across key enterprise workflows",
      ),
      t(
        "设计 CloudTower 的内容库、集群迁移等核心功能，提升易用性与产品一致性",
        "Designed core features for CloudTower, including content library and cluster migration, to improve usability and product consistency",
      ),
      t(
        "搭建并持续完善设计系统，扩展关键业务场景下的组件覆盖，提升设计效率 20%",
        "Built and refined the design system, expanding component coverage for key business scenarios and improving design efficiency by 20 percent",
      ),
    ],
  },
  {
    company: "Yuwell",
    companyHref: "https://www.yuwell.com/",
    dateRange: "Apr 2021 – Aug 2021",
    role: t("UX 设计师", "UX Designer"),
    responsibilities: [
      t(
        "参与血压计、CGM 系统与家用呼吸机等医疗设备的 UX 设计",
        "Contributed to UX design for medical devices including blood pressure monitors, CGM systems, and home ventilators",
      ),
      t(
        "与工业设计师协作完成用户研究、交互设计、视觉设计与动效设计",
        "Collaborated with industrial designers on user research, interaction design, visual design, and motion design",
      ),
    ],
  },
];

export const aboutEducationItems = [
  t("产品信息设计 硕士 | 2019.09 – 2022.06", "Master of Arts in Product Information Design | Sep 2019 – Jun 2022"),
  t("信息交互设计 学士 | 2015.09 – 2019.06", "Bachelor of Arts in Information Interaction Design | Sep 2015 – Jun 2019"),
];

export const aboutSkillGroups = [
  {
    category: t("设计", "Design"),
    items: [
      t("信息架构", "Information Architecture"),
      t("系统级产品设计", "System-Level Product Design"),
      t("设计系统", "Design System"),
      t("交互设计", "Interaction Design"),
      t("可用性测试", "Usability Testing"),
    ],
  },
  {
    category: t("AI 辅助工作流", "AI-Assisted Workflow"),
    items: [
      t("研究综合", "Research Synthesis"),
      t("竞品分析", "Competitive Analysis"),
      t("Spec Coding", "Spec Coding"),
      t("AI 辅助原型", "AI-Assisted Prototyping"),
      t("设计迭代", "Design Iteration"),
    ],
  },
  {
    category: t("设计工程理解力", "Design Engineering Literacy"),
    items: [
      t("React / Next.js 结构", "React / Next.js Structure"),
      t("Tailwind CSS 样式", "Tailwind CSS Styling"),
      t("设计到代码审查", "Design-to-Code Review"),
      t("UI 实现走查", "UI Implementation Review"),
      t("前端协作", "Frontend Collaboration"),
    ],
  },
];
