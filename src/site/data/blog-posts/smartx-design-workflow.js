export const smartxDesignWorkflow = {
  slug: "smartx-design-workflow",
  section: "featured",
  title: {
    zh: "SmartX 设计工作流",
    en: "The SmartX Design Workflow"
  },
  summary: {
    zh: "梳理我在 SmartX 的主线设计任务、支线协作与设计系统沉淀工作。",
    en: "An overview of core design work, supporting tracks, and design system responsibilities at SmartX."
  },
  detailSummary: {
    zh: "在 SmartX 内，设计师接到的需求大致可分为主线任务和支线任务，而设计系统部分又能继续细分出不同类型的沉淀工作。",
    en: "At SmartX, design work could roughly be split into core tasks and supporting tasks, and the design system work could be broken down into several different kinds of follow-up effort."
  },
  date: "2023年6月28日",
  category: {
    zh: "设计",
    en: "DESIGN"
  },
  imageSrc: "/site/blog/smartx-design-workflow/cover.jpg",
  imageAlt: {
    zh: "SmartX 设计工作流文章封面",
    en: "Cover image for The SmartX Design Workflow"
  },
  heroImageSrc: "/site/blog/smartx-design-workflow/cover.jpg",
  heroImageAlt: {
    zh: "SmartX 设计工作流文章 banner",
    en: "Banner image for The SmartX Design Workflow"
  },
  tone: "dark",
  layout: "imageStart",
  supportsEnglishDetail: true,
  contentBlocks: [
    {
      type: "heading",
      level: "h2",
      text: {
        zh: "SmartX 的设计工作范围",
        en: "The Scope of Design Work at SmartX"
      }
    },
    {
      type: "paragraph",
      text: {
        zh: "在 SmartX 内，设计师接到的需求大致可分为 2 类",
        en: "At SmartX, the requests designers receive can be roughly grouped into two categories."
      }
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: {
            zh: "主线任务：业务导向的需求，这是日常工作中的核心需求",
            en: "Core tasks: business-driven needs, which are the main focus of everyday work."
          },
          nested: []
        },
        {
          text: {
            zh: "支线任务：包括「已有功能的体验优化」和「设计系统的搭建与维护」",
            en: "Supporting tasks: including experience improvements to existing features, and the building and maintenance of the design system."
          },
          nested: []
        }
      ]
    },
    {
      type: "paragraph",
      text: {
        zh: "其中，设计系统部分又能细分出 3 类",
        en: "Within that, the design system work could be further broken down into three categories."
      }
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          text: {
            zh: "完善 CloudTower 组件库",
            en: "Improve the CloudTower component library."
          },
          nested: []
        },
        {
          text: {
            zh: "沉淀 Design Pattern：无法操作的界面处理、关联集群的通用行为",
            en: "Document design patterns: handling non-interactive screens and common behaviors for related clusters."
          },
          nested: []
        },
        {
          text: {
            zh: "梳理 UI Map：移除集群 modal、创建虚拟机、编辑虚拟机",
            en: "Organize the UI map: removing cluster modals, creating virtual machines, and editing virtual machines."
          },
          nested: []
        }
      ]
    },
    {
      type: "heading",
      level: "h2",
      text: {
        zh: "设计流程",
        en: "The Design Process"
      }
    },
    {
      type: "paragraph",
      text: {
        zh: "Onboarding 阶段时，SMTX 设计手册中提供了一个整体设计流程框架。根据实际的业务需求与场景，设计师在经手一个完整项目期间通常需要经历 Discover、Ideate、Test、Deliver 四个阶段。虽然每个阶段的目标不同，所涉及的任务和能力也各不相同，但「学习、沟通、体系化思维、设计决策」确是需要一以贯之到设计的前中后期的，如此才算是执行了一个完整且高质量的设计流程。",
        en: "During onboarding, the SMTX design handbook provided an overall framework for the design process. Based on real business needs and scenarios, a designer usually needed to go through four stages during a full project: Discover, Ideate, Test, and Deliver. Each stage had different goals, tasks, and skills, but learning, communication, systematic thinking, and design decision-making had to stay consistent from start to finish in order to count as a complete and high-quality process."
      }
    },
    {
      type: "image",
      src: "/site/blog/smartx-design-workflow/body-1.png",
      alt: {
        zh: "SmartX 设计流程框架图",
        en: "Diagram of the SmartX design process framework"
      }
    },
    {
      type: "paragraph",
      text: {
        zh: "实际项目上手后，我根据个人经验又将原有的流程进一步细化为以下 6 步骤。具体细节",
        en: "After getting hands-on with real projects, I further refined the original process into the following six steps based on my own experience. The details are shown below."
      }
    },
    {
      type: "image",
      src: "/site/blog/smartx-design-workflow/body-2.png",
      alt: {
        zh: "SmartX 设计流程细化步骤图",
        en: "Diagram of the refined SmartX design workflow steps"
      }
    },
    {
      type: "paragraph",
      text: {
        zh: "以上 6 步骤是每个项目的通用流程标准化的结果。",
        en: "These six steps are the standardized result of a common process shared by every project."
      }
    }
  ]
};
