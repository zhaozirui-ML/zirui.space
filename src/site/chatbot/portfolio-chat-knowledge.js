import {
  aboutContactItems,
  aboutExperienceItems,
  aboutSkillGroups,
} from "../data/about-content";
import { axzoDesignSystemCaseStudy } from "../data/axzo-design-system-case-study";
import { dataVisualizationScreenDetail } from "../data/data-visualization-screen-detail";
import { homeIntro, homeSkills } from "../data/home-content";
import { workItems } from "../data/work-items";
import { cloudtowerDesignSystemCaseStudy } from "../data/work-details/legacy-projects";

const t = (zh, en) => ({ zh, en });

function getLocalizedValue(value, language) {
  if (value && typeof value === "object" && "zh" in value && "en" in value) {
    return value[language];
  }

  return value;
}

function getProjectBySlug(slug) {
  return workItems.find((item) => item.slug === slug);
}

const drawingLedgerProject = getProjectBySlug("drawing-ledger-2-0");
const axzoProject = getProjectBySlug("axzo-design-system");
const dataVizProject = getProjectBySlug("data-visualization-screen");
const cloudTowerProject = getProjectBySlug("cloudtower-design-system");

export const portfolioChatKnowledge = Object.freeze({
  profile: Object.freeze({
    name: "Zirui Zhao",
    title: t("产品设计师", "Product Designer"),
    summary: homeIntro.title,
    focus: t(
      "我擅长把复杂业务流程、系统体验和可落地前端实现连接起来，尤其关注企业级产品、设计系统和复杂工作流。",
      "I specialize in connecting complex workflows, system-level product experiences, and shippable frontend implementation, with a focus on enterprise products, design systems, and complex workflows.",
    ),
    strengths: homeSkills.map((item) => item.label),
  }),
  projects: Object.freeze([
    Object.freeze({
      slug: "drawing-ledger-2-0",
      title: drawingLedgerProject.title,
      aliases: [
        "图纸台账 2.0",
        "图纸台账",
        "drawing register",
        "drawing ledger",
        "drawing register 2.0",
      ],
      oneLiner: drawingLedgerProject.summary,
      background: t(
        "这是一个面向建筑业务的复杂图纸工作流项目，核心目标是重构从上传、解析、登记到协作的端到端流程。",
        "This project focused on a complex drawing workflow for the construction domain, with the main goal of redesigning the end-to-end flow from upload and parsing to registration and collaboration.",
      ),
      myRole: t(
        "我负责 web 与 App 端绘图模块的端到端设计，覆盖流程重构、信息组织、关键交互决策和多角色协作体验。",
        "I led the end-to-end design of the drawing module across web and app, covering workflow restructuring, information architecture, key interaction decisions, and collaboration across multiple roles.",
      ),
      problem: t(
        "旧流程在解析、登记和多人协作上都比较割裂，用户很难在复杂状态流转里快速理解接下来该做什么。",
        "The old flow was fragmented across parsing, registration, and multi-role collaboration, which made it hard for users to understand what to do next in a complex state transition system.",
      ),
      process: t(
        "我先梳理图纸生命周期、用户任务和角色分工，再进行了两轮方案探索，最后把待办逻辑、响应式展示和移动端入口一起落到可交付方案中。",
        "I first mapped the drawing lifecycle, user tasks, and role responsibilities, then explored two rounds of solutions, and finally turned the to-do logic, responsive presentation, and mobile entry points into a shippable design.",
      ),
      keyDecisions: t(
        "关键决策包括重新组织待办区、把多角色状态流转讲清楚，以及让同一套逻辑在桌面端和移动端都能成立。",
        "Key decisions included restructuring the to-do area, clarifying the multi-role state transitions, and making the same logic work across both desktop and mobile.",
      ),
      outcome: t(
        "项目输出了完整的图纸台账 2.0 方案，重点提升了复杂业务流程的可理解性、协作效率和跨端一致性。",
        "The project produced a full Drawing Register 2.0 solution that improved the clarity of a complex workflow, collaboration efficiency, and consistency across platforms.",
      ),
      tools: ["Figma", "Prototype", "Web", "App"],
      tags: ["Workflow", "Enterprise", "Cross-platform"],
      relatedPages: ["/work/drawing-ledger-2-0", "/work"],
      recommendedQuestions: [
        t("这个项目最难的设计挑战是什么？", "What was the hardest design challenge in this project?"),
        t("你在这个项目里做了哪些关键决策？", "What key decisions did you make in this project?"),
        t("这个项目最终带来了什么结果？", "What outcome did this project lead to?"),
      ],
    }),
    Object.freeze({
      slug: "axzo-design-system",
      title: axzoProject.title,
      aliases: [
        "axzo",
        "axzo design",
        "axzo design portal",
        "axzo 设计系统",
        "axzo 设计系统门户",
      ],
      oneLiner: axzoProject.summary,
      background: axzoDesignSystemCaseStudy.projectBackground.description,
      myRole: t(
        "我把这个项目定义为一个 Design System Portal，负责官网定位、信息架构、核心页面设计，以及设计系统如何被团队理解和采用这件事。",
        "I framed the project as a Design System Portal and was responsible for its positioning, information architecture, key page design, and for designing how the team would understand and adopt the system.",
      ),
      problem: axzoDesignSystemCaseStudy.problemDefinition.description,
      process: t(
        "我先定义门户定位，再按使用场景组织内容结构，把设计、开发、数据可视化和团队协同整合成统一入口。",
        "I first defined the portal positioning, then organized the content by usage scenarios, and brought design, development, data visualization, and team collaboration into one unified entry point.",
      ),
      keyDecisions: t(
        "关键决策包括按使用场景而不是按资源来源组织内容、把数据可视化独立为一级模块，以及把团队协同纳入设计系统门户。",
        "Key decisions included organizing content by usage scenarios instead of asset source, making data visualization a top-level module, and bringing team collaboration into the portal.",
      ),
      outcome: axzoDesignSystemCaseStudy.reflection.conclusion,
      tools: ["Figma", "Design System", "Information Architecture"],
      tags: ["Design System", "Portal", "Adoption"],
      relatedPages: ["/work/axzo-design-system", "/work"],
      recommendedQuestions: [
        t("为什么你把它定义成 Design System Portal？", "Why did you define it as a Design System Portal?"),
        t("这个项目最重要的信息架构决策是什么？", "What was the most important IA decision in this project?"),
        t("这个项目对团队有什么价值？", "What value did this project create for the team?"),
      ],
    }),
    Object.freeze({
      slug: "data-visualization-screen",
      title: dataVizProject.title,
      aliases: [
        "数据可视化系统",
        "数据可视化大屏",
        "大屏数据可视化",
        "large-screen data visualization",
        "data visualization system",
      ],
      oneLiner: dataVizProject.summary,
      background: dataVisualizationScreenDetail.background.paragraphs[0],
      myRole: t(
        "我负责把省、市、区三级建筑大屏逐步整合成统一视觉方案，同时推进图表视觉语言和部分组件能力的沉淀。",
        "I helped unify the provincial, city, and district construction dashboards into one visual system while also pushing the chart visual language and some reusable component capabilities forward.",
      ),
      problem: dataVisualizationScreenDetail.problems.summary,
      process: t(
        "我先明确视觉层、协作层和系统层三个设计目标，再把之前探索出的图表视觉语言扩展到更大的大屏场景，并协助沉淀成可复用组件。",
        "I first clarified the project goals across the visual, collaboration, and system layers, then expanded the previously explored chart language into larger screen scenarios and helped turn it into reusable components.",
      ),
      keyDecisions: t(
        "关键决策是把图表表现力和系统一致性一起考虑，不只追求单页好看，而是让多人协作下的视觉语言也能稳定落地。",
        "A key decision was to balance chart expressiveness with system consistency, not just making a single page look good, but making the visual language reliable in multi-person collaboration.",
      ),
      outcome: t(
        "这个项目把图表视觉从局部探索扩展成更系统的大屏语言，也降低了后续项目的设计债务和样式漂移。",
        "The project expanded the chart style from a local exploration into a broader large-screen language, while also reducing future design debt and style drift.",
      ),
      tools: ["Figma", "Visualization", "Component Thinking"],
      tags: ["Large Screen", "Visualization", "System Thinking"],
      relatedPages: ["/work/data-visualization-screen", "/work"],
      recommendedQuestions: [
        t("这个项目里你最看重哪类设计价值？", "What kind of design value mattered most in this project?"),
        t("为什么你强调视觉语言要可复用？", "Why did you emphasize reusability for the visual language?"),
        t("这个项目如何体现你的系统化思维？", "How does this project show your systematic thinking?"),
      ],
    }),
    Object.freeze({
      slug: "cloudtower-design-system",
      title: cloudTowerProject.title,
      aliases: [
        "cloudtower",
        "cloudtower design system",
        "cloudtower 设计系统",
      ],
      oneLiner: cloudTowerProject.summary,
      background: t(
        "这个项目的起点是 CloudTower UI 的组件文档不完整，设计师和开发很难快速判断组件在真实业务里该怎么使用和交付。",
        "This project started from incomplete CloudTower UI component documentation, which made it hard for designers and developers to quickly understand how components should be used and delivered in real product scenarios.",
      ),
      myRole: t(
        "我参与完善组件文档，并把 Design Patterns 和 UI Map 一起整理成更完整的设计指南。",
        "I helped improve the component documentation and organized Design Patterns and UI Map together into a more complete design guide.",
      ),
      problem: t(
        "问题不只是组件有没有，而是它们缺少行为描述、参数说明和场景化使用指南。",
        "The issue was not only whether components existed, but whether they included behavior descriptions, parameters, and scenario-based usage guidance.",
      ),
      process: t(
        "我先拆分文档、收集场景、做调研，再推进组件优化与设计文档的撰写和交付。",
        "I started by splitting the documentation, collecting scenarios, and doing research, then moved into component refinement and documentation delivery.",
      ),
      keyDecisions: t(
        "关键是把组件、Pattern 和 UI Map 一起看作系统化资产，而不是只补一个零散组件文档。",
        "The key was treating components, patterns, and UI maps as one connected system asset instead of just patching isolated component docs.",
      ),
      outcome: t(
        "这个项目提升了设计系统文档的完整度，也帮助团队建立了更稳定的组件复用和设计追溯方式。",
        "The project improved the completeness of the design system documentation and helped the team build a more stable way to reuse components and trace design decisions.",
      ),
      tools: ["Figma", "Design Documentation", "Pattern Library"],
      tags: ["Design System", "Documentation", "Pattern"],
      relatedPages: ["/work/cloudtower-design-system", "/work"],
      recommendedQuestions: [
        t("这个项目更偏组件还是偏系统？", "Was this project more about components or systems?"),
        t("UI Map 对团队有什么帮助？", "How did UI Map help the team?"),
        t("你在设计系统里更关注什么？", "What do you care about most in design systems?"),
      ],
    }),
  ]),
  experience: Object.freeze(
    aboutExperienceItems.map((item) =>
      Object.freeze({
        company: item.company,
        companyHref: item.companyHref,
        dateRange: item.dateRange,
        role: item.role,
        responsibilities: item.responsibilities,
      })
    )
  ),
  skills: Object.freeze(
    aboutSkillGroups.map((group) =>
      Object.freeze({
        category: group.category,
        items: group.items,
      })
    )
  ),
  contact: Object.freeze({
    intro: t(
      "如果你想继续聊项目、工作机会或设计方法，最直接的方式是发邮件给我。",
      "If you want to continue the conversation about projects, roles, or design methods, the most direct way is to email me.",
    ),
    items: aboutContactItems,
  }),
  faq: Object.freeze([
    Object.freeze({
      question: t("你是谁？", "Who are you?"),
      answer: t(
        "我是赵子瑞，一名产品设计师，擅长复杂业务流程、设计系统和可落地的前端体验设计。",
        "I'm Zirui Zhao, a product designer who focuses on complex workflows, design systems, and frontend experiences that can actually ship.",
      ),
    }),
    Object.freeze({
      question: t("你最近在做什么类型的项目？", "What kind of projects have you worked on recently?"),
      answer: t(
        "近期项目主要集中在企业级工作流、设计系统门户和数据可视化系统这几类复杂场景。",
        "My recent work has focused on complex enterprise workflows, design system portals, and data visualization systems.",
      ),
    }),
    Object.freeze({
      question: t("你怎么定义自己的设计方法？", "How would you describe your design approach?"),
      answer: t(
        "我通常先厘清业务结构和信息关系，再用交互与视觉去解释复杂性，最后关注方案如何落地和持续演进。",
        "I usually start by clarifying the business structure and information relationships, then use interaction and visual design to explain complexity, and finally focus on how the solution can land and evolve.",
      ),
    }),
  ]),
  quickReplies: Object.freeze([
    Object.freeze({
      id: "intro",
      label: t("先介绍一下你自己", "Introduce yourself"),
      prompt: t("先介绍一下你自己", "Can you introduce yourself first?"),
    }),
    Object.freeze({
      id: "featured-projects",
      label: t("你的重点项目有哪些？", "What are your featured projects?"),
      prompt: t("你的重点项目有哪些？", "What are your featured projects?"),
    }),
    Object.freeze({
      id: "drawing-ledger",
      label: t("讲讲图纸台账 2.0", "Tell me about Drawing Register 2.0"),
      prompt: t("讲讲图纸台账 2.0", "Tell me about Drawing Register 2.0."),
    }),
    Object.freeze({
      id: "design-method",
      label: t("你的设计方法是什么？", "What is your design approach?"),
      prompt: t("你的设计方法是什么？", "What is your design approach?"),
    }),
    Object.freeze({
      id: "experience",
      label: t("你的工作经历是什么？", "What is your work experience?"),
      prompt: t("你的工作经历是什么？", "What is your work experience?"),
    }),
    Object.freeze({
      id: "skills",
      label: t("你的技能结构是什么？", "What does your skill set look like?"),
      prompt: t("你的技能结构是什么？", "What does your skill set look like?"),
    }),
    Object.freeze({
      id: "contact",
      label: t("怎么联系你？", "How can I contact you?"),
      prompt: t("怎么联系你？", "How can I contact you?"),
    }),
  ]),
  guardrails: Object.freeze({
    allowedTopics: Object.freeze([
      t("个人介绍", "Profile"),
      t("项目介绍", "Projects"),
      t("工作经历", "Experience"),
      t("设计方法", "Design approach"),
      t("技能", "Skills"),
      t("联系方式", "Contact"),
    ]),
    refusalMessage: t(
      "我目前只回答和这个作品集相关的问题，例如我的项目、经历、技能、设计方法或联系方式。如果你愿意，可以换一个和作品集更相关的问题继续问我。",
      "I only answer questions related to this portfolio, such as my projects, experience, skills, design approach, or contact information. If you'd like, ask another portfolio-related question and I'll continue from there.",
    ),
  }),
});

export function getLocalizedChatValue(value, language) {
  if (Array.isArray(value)) {
    return value.map((item) => getLocalizedChatValue(item, language));
  }

  if (value && typeof value === "object") {
    if ("zh" in value && "en" in value) {
      return value[language];
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        getLocalizedChatValue(nestedValue, language),
      ])
    );
  }

  return value;
}
