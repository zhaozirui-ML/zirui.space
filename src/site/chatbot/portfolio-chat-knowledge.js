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
const phoneContactItem = aboutContactItems.find(
  (item) => typeof item.value === "string" && !item.href && /\d/.test(item.value)
);
const emailContactItem = aboutContactItems.find((item) => item.href?.startsWith("mailto:"));
const socialContactItem = aboutContactItems.find((item) => Array.isArray(item.value));

export const portfolioChatKnowledge = Object.freeze({
  voice: Object.freeze({
    principles: Object.freeze([
      t("先给判断，再补原因，不绕弯子。", "Lead with the judgment, then explain why."),
      t("讲项目时更像带人浏览作品集，不像在背简历。", "When talking about projects, sound like a portfolio walkthrough, not a resume recital."),
      t("优先讲清楚挑战、取舍、结果和反思，而不是堆抽象形容词。", "Prioritize challenge, tradeoffs, outcomes, and reflection over abstract adjectives."),
      t("少用空泛总结，多用第一人称说明我为什么这么做。", "Use first-person reasoning instead of generic summary language."),
    ]),
  }),
  profile: Object.freeze({
    name: "Zirui Zhao",
    title: t("产品设计师", "Product Designer"),
    publicMetadata: Object.freeze([
      Object.freeze({
        id: "name",
        label: t("名字", "Name"),
        value: t("赵子瑞", "Zirui Zhao"),
        detail: t("英文页头和英文语境里会写作 Zirui Zhao。", "In English contexts, the portfolio uses Zirui Zhao."),
        aliases: Object.freeze([
          "名字",
          "姓名",
          "中文名",
          "英文名",
          "叫什么",
          "你叫什么",
          "作者名字",
          "作者姓名",
          "作者是谁",
          "这个网站是谁做的",
          "这个站是谁做的",
          "这个网站作者是谁",
          "这个作品集是谁做的",
          "这个作品集作者是谁",
          "name",
          "full name",
          "english name",
          "chinese name",
          "your name",
          "what's your name",
          "what is your name",
          "author",
          "author name",
          "site owner",
          "website author",
          "who made this portfolio",
          "who created this portfolio",
          "portfolio author",
        ]),
      }),
      Object.freeze({
        id: "english-name",
        label: t("英文名", "English name"),
        value: "Zirui Zhao",
        detail: t("中文语境里会写作赵子瑞。", "In Chinese contexts, the portfolio uses 赵子瑞."),
        aliases: Object.freeze([
          "英文名",
          "英文名字",
          "english name",
          "name in english",
        ]),
      }),
      Object.freeze({
        id: "title",
        label: t("当前身份", "Current role"),
        value: t("产品设计师", "Product Designer"),
        detail: t(
          "首页公开写到的是一名拥有 4 年多经验的产品设计师。",
          "The homepage describes this as a product designer with 4+ years of experience."
        ),
        aliases: Object.freeze([
          "职位",
          "身份",
          "现在做什么",
          "当前身份",
          "你的工作是什么",
          "title",
          "role",
          "current role",
          "job title",
          "what do you do",
        ]),
      }),
      Object.freeze({
        id: "experience-years",
        label: t("经验年限", "Years of experience"),
        value: t("4 年多经验", "4+ years of experience"),
        detail: t(
          "首页公开写到的是，主要长期关注复杂业务流程、设计系统和可落地体验。",
          "The homepage frames the work around complex workflows, design systems, and shippable product experiences."
        ),
        aliases: Object.freeze([
          "几年经验",
          "经验几年",
          "工作几年",
          "经验年限",
          "多少年经验",
          "years of experience",
          "how many years",
          "experience level",
        ]),
      }),
      Object.freeze({
        id: "email",
        label: t("邮箱", "Email"),
        value: emailContactItem?.value || "Zhaozirui721@gmail.com",
        href: emailContactItem?.href || "mailto:Zhaozirui721@gmail.com",
        aliases: Object.freeze([
          "邮箱",
          "邮件",
          "电子邮箱",
          "email",
          "mail",
          "email address",
        ]),
      }),
      Object.freeze({
        id: "phone",
        label: t("电话", "Phone"),
        value: phoneContactItem?.value || "13260951210",
        href: `tel:${phoneContactItem?.value || "13260951210"}`,
        aliases: Object.freeze([
          "电话",
          "手机号",
          "电话号码",
          "手机",
          "phone",
          "phone number",
          "mobile",
        ]),
      }),
      Object.freeze({
        id: "social",
        label: t("社交平台", "Social platforms"),
        value: socialContactItem?.value || [],
        detail: t(
          "这些平台都已经公开挂在作品集里。",
          "These platforms are already publicly linked from the portfolio."
        ),
        aliases: Object.freeze([
          "社交平台",
          "社交账号",
          "社交媒体",
          "sns",
          "social",
          "social links",
          "social media",
          "x",
          "instagram",
          "notion",
          "spotify",
        ]),
      }),
    ]),
    summary: t(
      "我是赵子瑞，一名产品设计师，长期在复杂业务流程、设计系统和可落地体验之间做连接。",
      "I'm Zirui Zhao, a product designer who works at the intersection of complex workflows, design systems, and experiences that can actually ship.",
    ),
    focus: t(
      "我比较擅长的方向，是把复杂业务流程讲清楚，把系统体验做顺，并且从一开始就考虑设计怎么落地。近几年的项目也主要集中在企业级产品、设计系统和复杂工作流。",
      "What I do best is making complex workflows understandable, turning system-level experiences into something usable, and thinking about implementation from the start. Most of my recent work has been in enterprise products, design systems, and complex workflows.",
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
        "这是一个面向建筑业务的图纸生命周期项目。图纸台账记录图纸从上传完成后到废弃的状态流转，主要涉及上传人、确认人、下发人和多权限管理员 4 类角色。",
        "This was a drawing-lifecycle project for the construction domain. The register records how drawings move from upload completion to deprecation, involving four main roles: uploader, confirmer, releaser, and multi-permission administrator.",
      ),
      myRole: t(
        "我负责 Web 与 App 端图纸模块的端到端设计，重点覆盖问题定位、用户任务梳理、设计分析框架、核心设计策略、关键交互规则和跨端体验补全。",
        "I led the end-to-end design of the drawing module across web and app, covering problem definition, user-task analysis, design-analysis framework, core design strategies, key interaction rules, and cross-platform experience completion.",
      ),
      problem: t(
        "项目目标是构建基于角色的图纸管理体系，解决多角色交叉操作带来的效率瓶颈，并提升图纸流转效率。问题收敛到三点：核心任务缺乏视觉优先级、视图与角色错位、交互状态与操作边界模糊。",
        "The goal was to build a role-based drawing-management system that reduced the efficiency bottlenecks caused by cross-role operations and improved drawing circulation. The problem converged into three points: core tasks lacked visual priority, views were misaligned with roles, and interaction states and operation boundaries were unclear.",
      ),
      process: t(
        "我先从用户吐槽和系统现状切入：用户面对满屏数据不知道今天急需确认哪张图，系统底层校验松散、状态流转缺乏权限隔离。然后把问题收敛为三类设计策略：视觉层级重塑、场景化设计和统一交互规范。策略不是停留在概念层，而是分别落到任务代办区、表格视图、角色视图、状态机与权限映射、边界场景防错、状态驱动的操作限制上。",
        "I started from user pain points and system conditions: users faced a screen full of data and could not quickly tell which drawing needed urgent confirmation, while the system had loose underlying validation and weak permission separation in state transitions. I then converged the problem into three design strategies: reshaping visual hierarchy, role-based scenario design, and unified interaction rules. These strategies were translated into concrete mechanisms such as the task area, table view, role-based views, state-machine and permission mapping, boundary-scenario prevention, and state-driven operation restrictions.",
      ),
      keyDecisions: t(
        "最关键的判断是把「角色、任务、状态」绑定在一起设计。视觉层级上，用任务代办区承载不同权限角色的高优先级待处理任务，用表格视图承载底图纸的全生命周期数据和高频筛选检索；场景化上，根据登录角色动态过滤冗余信息，让上传人关注解析中 / 待确认图纸、确认人关注待确认图纸、下发人关注待下发图纸、多权限管理员关注所有状态；规范上，用状态机与角色权限映射明确唯一责任人，并通过隐藏无权限操作、前置阻断、权限降维和按钮组合控制来减少越权修改和错误流转。",
        "The key judgment was to design roles, tasks, and states together. In visual hierarchy, the task area carries high-priority pending work for different permission roles, while the table view carries the full drawing lifecycle and high-frequency filtering and retrieval. In role-based scenarios, redundant information is dynamically filtered by login role: uploaders focus on parsing / to-be-confirmed drawings, confirmers focus on to-be-confirmed drawings, releasers focus on to-be-released drawings, and multi-permission administrators can monitor all states. In interaction rules, the state machine and role-permission mapping define the sole responsible role, while hidden unauthorized actions, upfront blocking, permission downgrade, and button-combination control reduce unauthorized edits and incorrect transitions.",
      ),
      outcome: t(
        "落地方案覆盖了图纸台账的关键操作场景，包括角色化任务代办区、全生命周期表格检索、图纸收发记录、评论协作、下发范围选择、组织与人员选择，以及图纸在线查看等。最终验证结果也体现在线索识别和流转效率上：核心状态识别耗时降低 25%，待确认和待下发节点处理时长分别降低 15% 和 12%，任务流转效率提高 8%。",
        "The shipped solution covered key drawing-register scenarios, including the role-based task area, full-lifecycle table retrieval, drawing send / receive records, comment collaboration, release-scope selection, organization and member selection, and online drawing viewing. Validation also showed improvements in state recognition and transition efficiency: core state-recognition time dropped by 25%, processing time for confirmation and release nodes dropped by 15% and 12%, and task-transition efficiency increased by 8%.",
      ),
      reflection: t(
        "这个项目让我更明确地意识到，复杂 B 端设计的关键不是把所有信息重新包装一遍，而是先建立清晰的分析框架，再把角色、任务和状态规则翻译成用户能直接理解、系统也能稳定约束的界面结构。现在回头看，我会继续强化这类分析框架在案例叙事里的表达，因为它比单纯展示最终页面更能说明设计判断。",
        "This project made it clearer to me that the key in complex B2B design is not repackaging all information, but first building a clear analysis framework and then translating roles, tasks, and state rules into an interface structure that users can understand directly and the system can constrain reliably. Looking back, I would keep strengthening how that analysis framework is presented in the case study, because it explains the design judgment better than only showing final screens.",
      ),
      tools: ["Figma", "Prototype", "Web", "App"],
      tags: ["Workflow", "Enterprise", "Cross-platform"],
      relatedProjectSlugs: ["axzo-design-system", "data-visualization-screen"],
      relatedPages: ["/work/drawing-ledger-2-0", "/work"],
      continuePrompt: t(
        "继续展开讲这个项目里的分析框架和关键策略",
        "Keep going on the analysis framework and key strategies in this project"
      ),
      recommendedQuestions: [
        t("这个项目里最难的设计挑战到底是什么？", "What was the hardest design challenge in this project, really?"),
        t("你当时做过哪些关键设计判断？", "What were the key design judgments you made at the time?"),
        t("如果只讲一个最重要的结果，你会讲什么？", "If you had to highlight one outcome, what would it be?"),
        t("你现在回头看，会怎么重新做这个项目？", "Looking back, what would you do differently on this project now?"),
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
      reflection: t(
        "这个项目让我更明确地意识到，设计系统不是把资源堆在一起就够了，它更像是在设计团队怎么理解系统、怎么找到入口、怎么愿意持续使用它。回头看，我会把“采用路径”看得和页面结构同样重要。",
        "This project made it clearer to me that a design system is not just a place where assets are collected. It is also about how a team understands the system, finds the right entry point, and chooses to keep using it. Looking back, I would treat the adoption path as equally important as the page structure itself.",
      ),
      tools: ["Figma", "Design System", "Information Architecture"],
      tags: ["Design System", "Portal", "Adoption"],
      relatedProjectSlugs: ["cloudtower-design-system", "drawing-ledger-2-0"],
      relatedPages: ["/work/axzo-design-system", "/work"],
      continuePrompt: t(
        "继续讲这个项目里最关键的信息架构和采用判断",
        "Keep going on the most important IA and adoption decisions in this project"
      ),
      recommendedQuestions: [
        t("为什么你会把它定义成 Design System Portal，而不只是官网？", "Why did you define it as a Design System Portal instead of just a website?"),
        t("这里最关键的信息架构判断是什么？", "What was the most important information architecture decision here?"),
        t("这个项目怎么帮助团队更容易采用设计系统？", "How did this project help the team adopt the design system more easily?"),
        t("如果现在重做，你最想优化哪一部分？", "If you rebuilt it now, what would you most want to improve?"),
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
      reflection: t(
        "这个项目让我越来越在意视觉系统的“协作成本”。如果一种视觉语言只能靠单个设计师维持，它就不算真正稳定。后来我更关注怎么把表现力转成可复用的规则，而不是只做一次性的好看页面。",
        "This project made me pay much more attention to the collaboration cost of a visual system. If a language can only be maintained by one designer, it is not really stable. Since then I have cared more about turning expressiveness into reusable rules instead of making a one-off beautiful screen.",
      ),
      tools: ["Figma", "Visualization", "Component Thinking"],
      tags: ["Large Screen", "Visualization", "System Thinking"],
      relatedProjectSlugs: ["axzo-design-system", "drawing-ledger-2-0"],
      relatedPages: ["/work/data-visualization-screen", "/work"],
      continuePrompt: t(
        "继续讲这个项目里视觉语言是怎么被系统化的",
        "Keep unpacking how the visual language became systematic and scalable"
      ),
      recommendedQuestions: [
        t("这个项目里你最看重的设计价值是什么？", "What design value mattered most to you in this project?"),
        t("为什么你会这么强调视觉语言的可复用性？", "Why did you care so much about making the visual language reusable?"),
        t("这个项目最能体现你系统化思维的地方是什么？", "What part of this project best shows your systematic thinking?"),
        t("如果现在回头看，这个项目还有什么可以再往前推一步？", "Looking back now, what still could have been pushed further?"),
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
      reflection: t(
        "这个项目让我意识到，设计系统文档真正的价值不在于“写得多完整”，而在于它能不能帮团队减少重复解释和沟通损耗。回头看，我会更早把行为说明和场景边界一起放进文档结构里。",
        "This project made me realize that the value of design-system documentation is not how complete it looks, but whether it reduces repeated explanation and collaboration overhead. Looking back, I would bring behavior notes and scenario boundaries into the structure much earlier.",
      ),
      tools: ["Figma", "Design Documentation", "Pattern Library"],
      tags: ["Design System", "Documentation", "Pattern"],
      relatedProjectSlugs: ["axzo-design-system", "drawing-ledger-2-0"],
      relatedPages: ["/work/cloudtower-design-system", "/work"],
      continuePrompt: t(
        "继续讲这个项目怎么影响团队对设计系统的协作方式",
        "Keep going on how this project changed the team's collaboration around the design system"
      ),
      recommendedQuestions: [
        t("这个项目更偏组件建设，还是更偏系统方法？", "Was this project more about component building or system thinking?"),
        t("UI Map 真正帮助团队解决了什么问题？", "What problem did UI Map actually help the team solve?"),
        t("你在设计系统文档里最看重什么？", "What do you care about most in design-system documentation?"),
        t("如果现在回头看，这个项目最值得补强的地方是什么？", "Looking back now, what part of this project is most worth strengthening?"),
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
      "如果你想继续聊项目细节、工作机会，或者只是想进一步交流我的设计方法，最直接的方式还是发邮件给我。我通常会优先回复和作品集、岗位机会、项目讨论相关的信息。",
      "If you want to go deeper on a project, talk about a role, or continue the conversation around my design approach, email is still the most direct way to reach me. I usually prioritize messages related to portfolio conversations, opportunities, and project discussions.",
    ),
    items: aboutContactItems,
  }),
  faq: Object.freeze([
    Object.freeze({
      question: t("你是谁？", "Who are you?"),
      answer: t(
        "我是赵子瑞，一名产品设计师。我的项目长期集中在复杂业务流程、设计系统和企业级产品这些场景。我比较在意的不是把页面单独做漂亮，而是把复杂事情讲清楚，并且让方案真的能落地。",
        "I'm Zirui Zhao, a product designer. Most of my work has been around complex workflows, design systems, and enterprise products. What I care about is not just making a single screen look polished, but making complexity understandable and making sure the work can actually ship.",
      ),
    }),
    Object.freeze({
      question: t("你最近在做什么类型的项目？", "What kind of projects have you worked on recently?"),
      answer: t(
        "最近几年的项目，主要集中在三类：企业级工作流、设计系统相关项目，以及数据可视化系统。它们看起来题材不同，但共同点都是结构复杂、协作链路长，需要设计把业务逻辑讲清楚。",
        "In the last few years, my work has mostly fallen into three buckets: enterprise workflows, design-system-related projects, and data visualization systems. They look different on the surface, but they all share the same challenge: complexity, long collaboration chains, and the need for design to make the underlying logic understandable.",
      ),
    }),
    Object.freeze({
      question: t("你怎么定义自己的设计方法？", "How would you describe your design approach?"),
      answer: t(
        "如果要用一句话说，我会先把业务结构和信息关系理顺，再决定交互和视觉怎么解释复杂性，最后从一开始就考虑这个方案怎么落地、怎么协作、怎么持续演进。",
        "If I had to put it simply, I start by getting the business structure and information relationships clear, then decide how interaction and visual design should explain that complexity, and from the start I think about how the solution will ship, how teams will collaborate around it, and how it can evolve over time.",
      ),
    }),
    Object.freeze({
      question: t("你的重点项目有哪些？", "What are your featured projects?"),
      answer: t(
        "如果想快速理解我在做什么，我通常会先讲四个项目：图纸台账 2.0、Axzo 设计系统门户、数据可视化系统，以及 CloudTower 设计系统。它们分别能代表我在复杂工作流、设计系统 adoption、系统化视觉语言和设计文档协作上的思考。",
        "If you want the fastest read on the kind of work I do, I would usually start with four projects: Drawing Register 2.0, the Axzo Design System Portal, the Data Visualization System, and the CloudTower Design System. Together they show how I think about complex workflows, design system adoption, scalable visual language, and documentation-driven collaboration.",
      ),
    }),
    Object.freeze({
      question: t("你和一般的视觉设计师有什么不同？", "What makes your work different from a purely visual designer?"),
      answer: t(
        "我当然会在意界面的视觉质量，但我更稳定的优势是在复杂场景里做结构化判断。比如业务流程怎么拆、角色之间怎么协作、设计系统怎么被团队真正采用。这也是为什么我的项目里会经常出现工作流、门户、文档和系统化语言这些主题。",
        "Visual quality absolutely matters to me, but my more consistent strength is making structural decisions in complex situations. That includes how workflows are broken down, how roles collaborate, and how a design system actually gets adopted by a team. That is why my projects often revolve around workflows, portals, documentation, and systematic design language.",
      ),
    }),
    Object.freeze({
      question: t("如果我是招聘方，应该先看哪几个项目？", "If I were hiring you, which projects should I start with?"),
      answer: t(
        "如果你想看我处理复杂业务的能力，先看图纸台账 2.0；如果你更关注设计系统和信息架构，先看 Axzo 设计系统门户；如果你想看我怎么把视觉语言做成系统，可以看数据可视化系统。CloudTower 设计系统则更能补充我在文档、Pattern 和协作资产上的思考。",
        "If you want to see how I handle complex product workflows, start with Drawing Register 2.0. If you care more about design systems and information architecture, start with the Axzo Design System Portal. If you want to see how I turn visual language into a system, look at the Data Visualization System. CloudTower adds another layer around documentation, patterns, and collaboration assets.",
      ),
    }),
    Object.freeze({
      question: t("怎么联系你？", "How can I contact you?"),
      answer: t(
        "最直接的方式是邮件联系。我比较欢迎和项目交流、岗位机会、作品集反馈相关的来信。如果你是基于某个具体项目联系我，直接在邮件里提项目名会更高效。",
        "The most direct way is by email. I'm especially open to messages about projects, opportunities, and portfolio feedback. If you are reaching out about a specific case study, mentioning the project name in the email usually makes the conversation easier to pick up.",
      ),
    }),
  ]),
  quickReplies: Object.freeze([
    Object.freeze({
      id: "intro",
      label: t("先介绍一下你自己", "Introduce yourself"),
      prompt: t("先用你的方式介绍一下你自己", "Can you introduce yourself in your own words first?"),
    }),
    Object.freeze({
      id: "featured-projects",
      label: t("你的重点项目有哪些？", "What are your featured projects?"),
      prompt: t("如果我想快速了解你，应该先看哪几个重点项目？", "If I want the quickest read on your work, which featured projects should I start with?"),
    }),
    Object.freeze({
      id: "drawing-ledger",
      label: t("讲讲图纸台账 2.0", "Tell me about Drawing Register 2.0"),
      prompt: t("讲讲图纸台账 2.0，尤其是它最复杂的挑战和你的关键判断", "Tell me about Drawing Register 2.0, especially the hardest challenge and your key decisions."),
    }),
    Object.freeze({
      id: "design-method",
      label: t("你的设计方法是什么？", "What is your design approach?"),
      prompt: t("你会怎么描述你自己的设计方法？", "How would you describe your design approach in your own words?"),
    }),
    Object.freeze({
      id: "experience",
      label: t("你的工作经历是什么？", "What is your work experience?"),
      prompt: t("按时间顺序讲讲你的工作经历，以及每段经历分别在做什么", "Can you walk me through your work experience in order and what you focused on in each role?"),
    }),
    Object.freeze({
      id: "skills",
      label: t("你的技能结构是什么？", "What does your skill set look like?"),
      prompt: t("如果把你的技能拆开看，你最稳定的能力结构是什么？", "If you break down your skill set, what are your most consistent strengths?"),
    }),
    Object.freeze({
      id: "contact",
      label: t("怎么联系你？", "How can I contact you?"),
      prompt: t("如果我想继续聊项目或工作机会，应该怎么联系你？", "If I want to continue the conversation about a project or a role, what's the best way to reach you?"),
    }),
  ]),
  guardrails: Object.freeze({
    allowedTopics: Object.freeze([
      t("个人介绍", "Profile"),
      t("公开作者信息", "Public author metadata"),
      t("项目介绍", "Projects"),
      t("工作经历", "Experience"),
      t("设计方法", "Design approach"),
      t("技能", "Skills"),
      t("联系方式", "Contact"),
    ]),
    refusalMessage: t(
      "我目前只回答这个作品集里公开相关的信息，例如作者信息、项目、经历、技能、设计方法、联系方式或文章内容。如果你愿意，可以换一个和作品集公开内容更相关的问题继续问我。",
      "I only answer questions about public information from this portfolio, such as author metadata, projects, experience, skills, design approach, contact details, or portfolio articles. If you'd like, ask another question that stays within the public portfolio content.",
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
