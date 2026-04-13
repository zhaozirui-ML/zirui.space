const t = (zh, en) => ({ zh, en });

// Blog 内容继续集中在数据层管理。
// 这一版把 V1 站点上的真实文章内容迁入当前项目，页面只负责渲染，不在组件里散写正文。
export const blogPosts = [
  {
    slug: "smartx-design-workflow",
    section: "featured",
    title: t("SmartX 的设计工作流程", "SmartX Design Workflow"),
    summary: t(
      "整理 SmartX 内设计工作的主线、支线和设计系统相关任务的工作范围。",
      "A breakdown of SmartX design work across core product tracks, side tasks, and design system responsibilities.",
    ),
    detailSummary: t(
      "在 SmartX 内，设计师接到的需求大致可分为主线任务和支线任务，而设计系统部分又能继续细分出不同类型的沉淀工作。",
      "At SmartX, design work usually splits into core product tracks and side tasks, while design system work can be divided into several different types of long-term contributions.",
    ),
    date: "2023年6月28日",
    category: t("设计", "DESIGN"),
    imageSrc:
      "https://framerusercontent.com/images/UMX9BcVLmN4nyEMeGXkiDrbtZIo.jpg?width=5184&height=3456",
    imageAlt: t("SmartX 的设计工作流程文章封面", "Cover image for SmartX Design Workflow"),
    heroImageSrc:
      "https://framerusercontent.com/images/UMX9BcVLmN4nyEMeGXkiDrbtZIo.jpg?width=5184&height=3456",
    heroImageAlt: t("SmartX 的设计工作流程文章 banner", "Hero banner for SmartX Design Workflow"),
    tone: "dark",
    layout: "imageStart",
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: "SmartX 的设计工作范围",
      },
      {
        type: "paragraph",
        text: "在 SmartX 内，设计师接到的需求大致可分为 2 类",
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: "主线任务：业务导向的需求，这是日常工作中的核心需求",
            nested: [],
          },
          {
            text: "支线任务：包括「已有功能的体验优化」和「设计系统的搭建与维护」",
            nested: [],
          },
        ],
      },
      {
        type: "paragraph",
        text: "其中，设计系统部分又能细分出 3 类",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "完善 CloudTower 组件库",
            nested: [],
          },
          {
            text: "沉淀 Design Pattern：无法操作的界面处理、关联集群的通用行为",
            nested: [],
          },
          {
            text: "梳理 UI Map：移除集群 modal、创建虚拟机、编辑虚拟机",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: "设计流程",
      },
      {
        type: "paragraph",
        text: "Onboarding 阶段时，SMTX 设计手册中提供了一个整体设计流程框架。根据实际的业务需求与场景，设计师在经手一个完整项目期间通常需要经历 Discover、Ideate、Test、Deliver 四个阶段。虽然每个阶段的目标不同，所涉及的任务和能力也各不相同，但「学习、沟通、体系化思维、设计决策」确是需要一以贯之到设计的前中后期的，如此才算是执行了一个完整且高质量的设计流程。",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/MvFFlJMzGt8fbgcfdanf1fak.png",
        alt: "",
      },
      {
        type: "paragraph",
        text: "实际项目上手后，我根据个人经验又将原有的流程进一步细化为以下 6 步骤。具体细节",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/705vSeQNnFnIiysClk2XClEZ1bE.png",
        alt: "",
      },
      {
        type: "paragraph",
        text: "以上 6 步骤是每个项目的通用流程标准化的结果。",
      },
    ],
  },
  {
    slug: "communication-at-work",
    section: "featured",
    title: t("沟通的方法", "On Better Communication"),
    summary: t(
      "从倾听、识别沟通模式到积极回应，整理一套在工作中更有效沟通的方法。",
      "Notes on listening, reading communication patterns, and responding with more clarity at work.",
    ),
    detailSummary: t(
      "这篇文章来自于我在 23 年年中的一次组会分享，主要记录《沟通的方法》一书里对远程沟通、倾听和积极回应的阅读感悟。",
      "This post comes from an internal sharing session in 2023 and captures what I learned from the book The Method of Communication about remote communication, listening, and constructive responses.",
    ),
    date: "2023年2月10日",
    category: t("方法", "GUIDE"),
    imageSrc:
      "https://framerusercontent.com/images/VXVd6VwBBpsY0PBNf9ACGuwlo.jpg?width=5345&height=3563",
    imageAlt: t("沟通的方法文章封面", "Cover image for On Better Communication"),
    heroImageSrc:
      "https://framerusercontent.com/images/VXVd6VwBBpsY0PBNf9ACGuwlo.jpg?width=5345&height=3563",
    heroImageAlt: t("沟通的方法文章 banner", "Hero banner for On Better Communication"),
    tone: "light",
    layout: "imageEnd",
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: "背景",
      },
      {
        type: "paragraph",
        text: "这篇文章来自于我在23 年年中的一次组会分享。对于入职场工作（不算实习）的我来说，培养自己远程沟通（就是每天打字~）的软实力对日后的职业发展来说非常有价值。（可能现在不太能看出来，但正如 Flomo 的 Slogan 说的这样，持续不断记录，意义自然浮现）👇🏻以下是准备的正式内容：",
      },
      {
        type: "paragraph",
        text: "在去年的年终总结时有提到过希望在 2023 年能提高自己的沟通能力与分享欲，选定了《沟通的方法》一书来学习，今天简单和大家分享一下自己的阅读感悟。",
      },
      {
        type: "paragraph",
        text: "👀 书中讲的一些技巧我相信大家或多或少都了解，有些技巧在工作中也都用过，只是很少有人完整总结过这些微小的经验。",
      },
      {
        type: "heading",
        level: "h2",
        text: "Part 1 从倾听开始",
      },
      {
        type: "paragraph",
        text: "“沟通最大的问题在于，人们想当然地认为已经沟通了.”——萧伯纳",
      },
      {
        type: "heading",
        level: "h4",
        text: "如何在倾听他人说话时抓住重点？",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "情绪：情绪很容易可以从他人的说话语气中感知。如果是文字对话，也可以从文字表达中窥探出一二。",
            nested: [],
          },
          {
            text: "事实：4W 还原实际场景（who、when、where、what）",
            nested: [],
          },
          {
            text: "期待：找出对方内心真正想要的东西。",
            nested: [],
          },
        ],
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "响应情绪：点破与接纳对方的情绪",
            nested: [],
          },
          {
            text: "确认事实",
            nested: [],
          },
          {
            text: "明确行动",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: "Part 2 听话听音",
      },
      {
        type: "paragraph",
        text: "💡 倾听也是双向的。自己听懂很重要；把自己听懂的信号传递给对方，给对方掌控感，让双方的沟通达成共识，也很重要。",
      },
      {
        type: "heading",
        level: "h4",
        text: "沟通模式",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/McXlPU2xUz2W6c7ln6i9PoOZTk.png",
        alt: "",
      },
      {
        type: "heading",
        level: "h4",
        text: "识别策略",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "不同沟通风格的人是均衡分布的。在一个沟通环境里，我们有可能遇到各种类型的人",
            nested: [],
          },
          {
            text: "不同沟通风格的人之间会“不可避免”地产生矛盾。",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: "如何与不同沟通模式的人沟通",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/avOxeYiSufhiErCE17n15F1Ico.png",
        alt: "",
      },
      {
        type: "heading",
        level: "h4",
        text: "如何与复合型人沟通",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "孔雀+老虎：同时给予对方掌控感和自我表现的机会",
            nested: [],
          },
          {
            text: "孔雀+考拉：赞美对方并给予秩序感",
            nested: [],
          },
          {
            text: "老虎+猫头鹰：既要目标又要过程，严格按照计划行事，不要出纰漏",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: "💡 当我们可以为了某个沟通任务，扮演一个与自己截然不同的角色时，我们的沟通能力就会得到显著提升。Part 3 积极回应",
      },
      {
        type: "heading",
        level: "h4",
        text: "倾听过程闭环",
      },
      {
        type: "paragraph",
        text: "建立信息处理框架，能听懂对方的意思（结构化倾听），听出隐藏剧情（听话听音），并且通过有效确认，让对方知道我们确实听懂了（反向叙述）。",
      },
      {
        type: "paragraph",
        text: "前提：沟通中对方是友好且善意的，自己具备处理问题的能力，而且双方是一起奔着解决问题去的。",
      },
      {
        type: "heading",
        level: "h4",
        text: "生活与工作场景",
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: "对方不一定是带着善意的态度来沟通的",
            nested: [],
          },
          {
            text: "对方提出了一个我并不想答应的需求",
            nested: [],
          },
          {
            text: "对方问了一个我不会的问题或很多不想回答的问题",
            nested: [],
          },
        ],
      },
      {
        type: "paragraph",
        text: "任何问题都需要尽量给积极善意的回应，但如何在不友好的沟通氛围中给予积极回应呢？",
      },
      {
        type: "heading",
        level: "h4",
        text: "如何在不友好的沟通氛围中给予积极回应？ ——置换法",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "换口径",
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: "对方态度不友好，说话阴阳怪气",
                    nested: [],
                  },
                  {
                    text: "想快速结束话题 。",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "换时间：",
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: "需要改变沟通节奏，通过暂停来获得一定的 break",
                    nested: [],
                  },
                  {
                    text: "当场沟通，不能很好的理解对方的意图 。",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "换场合：",
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: "线下会议时需要给领导泼凉水的场景（降级）",
                    nested: [],
                  },
                  {
                    text: "协调多部门资源向上汇报（升级）",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "换角色：",
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: "遇到自己无法判断的事",
                    nested: [],
                  },
                  {
                    text: "不方便、不愿意回答的问题",
                    nested: [],
                  },
                  {
                    text: "销售领域的团队合作（传球）",
                    nested: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "⚠️ 每个技巧都有其自身的限制与使用边界。谨慎使用，有些分寸很难拿捏，容易被看成抖机灵，显得不真诚。",
      },
      {
        type: "paragraph",
        text: "💡 真话不全说，假话绝不说。无论用什么技巧，沟通中的这条底线不能破。",
      },
      {
        type: "heading",
        level: "h4",
        text: "一定要积极回应吗？",
      },
      {
        type: "paragraph",
        text: "“职场沟通中为自己“种下”一个意识，一旦进入多人沟通场合，我就是主持人，我就是球场上的“中场发动机”一所有的球都送到我这儿来，我得把球再发岀去。我们都需要找到这个角色的信念感。” 我们的能力会在一次次的主动训练中得到提升。",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "面对那些我们不想回答、很尴尬、处理不了,甚至对方可能带有恶意的沟通场景，我们依然要积极回应。回应的时候，还是先处理情绪，再处理事实和期待，但最终都要指向解决问题。",
            nested: [],
          },
          {
            text: "面对艰难的回应的四个技巧：换口径、换时间、换场合、换角色。这四招能够拿回沟通的主动权。",
            nested: [],
          },
          {
            text: "修炼自己的“肯定反射”，让积极回应成为自己的本能，也成为别人对我们的印象标签。",
            nested: [],
          },
        ],
      },
    ],
  },
  {
    slug: "goals-activities-tasks-and-actions",
    section: "featured",
    title: t("设计中的目标、活动、任务、行为", "Goals, Activities, Tasks, and Actions in Design"),
    summary: t(
      "从目标、活动、任务、动作的层级关系出发，重新看产品设计应该围绕什么展开。",
      "A look at how product design changes when you center goals instead of activities, tasks, or actions.",
    ),
    detailSummary: t(
      "理解目标在设计中的指导意义。目标、活动、任务、动作，以不同层级为中心进行设计会产生完全不同的结果。",
      "An exploration of why goals matter in design, and how centering different layers such as goals, activities, tasks, or actions leads to very different results.",
    ),
    date: "2023年8月8日",
    category: t("方法", "GUIDE"),
    imageSrc:
      "https://framerusercontent.com/images/InuNHIQ0GzOduJG7DthhRGJV8fY.jpg?width=1000&height=1334",
    imageAlt: t(
      "设计中的目标、活动、任务、行为文章封面",
      "Cover image for Goals, Activities, Tasks, and Actions in Design",
    ),
    heroImageSrc:
      "https://framerusercontent.com/images/InuNHIQ0GzOduJG7DthhRGJV8fY.jpg?width=1000&height=1334",
    heroImageAlt: t(
      "设计中的目标、活动、任务、行为文章 banner",
      "Hero banner for Goals, Activities, Tasks, and Actions in Design",
    ),
    tone: "light",
    layout: "imageStart",
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "paragraph",
        text: "理解目标在设计中的指导意义，目标-活动-任务-动作，以不同的层级为中心进行设计会产生不同的结果。关注目标而非活动或任务，能够最终让产品获得更好的体验。",
      },
      {
        type: "paragraph",
        text: "许多产品设计的失败在于以活动甚至任务为中心进行设计。",
      },
      {
        type: "paragraph",
        text: "比如一些软件项目管理工具，不断地优化创建和组织任务卡片的方式，添加更丰富的字段，引入更高级的配置，却忽略了产品的目标应该是辅助软件快速开发，这些功能为使用者带来的操作成本甚至超过了使用它来管理项目所提高的效率收益，自然会失败。",
      },
      {
        type: "paragraph",
        text: "尽管活动和任务是用户的关注点，但产品设计者更应该关注目标。明确产品最重要的用户是谁，他们的目标是什么，以及为什么是这个目标。团队中不同的角色会存在不同的目标，而且这些目标不仅仅是表面的，而是深层次的。",
      },
      {
        type: "paragraph",
        text: "比如员工的目标不是更好地完成任务，而是让老板更频繁地看到自己的工作努力从而快速升职。有些不好用的产品之所以受到部分人欢迎，也是由于他们的目标能够通过这类产品满足，尽管这种目标与公司产品的目标冲突。",
      },
      {
        type: "paragraph",
        text: "在团队中为建立一个机制来让所有人的目标都能对做出更好的产品产生正面的效果才是有意义的，否则可能产生的内部冲突会严重影响产品的质量。激励机制不一致的团队合作最终会走向灭亡。",
      },
    ],
  },
  {
    slug: "hammer-and-nails",
    section: "browse",
    title: t("锤子与钉子", "Hammers and Nails"),
    summary: t(
      "从产品创新和需求识别的角度，讨论如何先找到问题，再让方案与问题真正对焦。",
      "A note on product innovation and demand discovery: find the right problem first, then make sure the solution actually fits.",
    ),
    detailSummary: t(
      "这篇文章围绕产品创新的五要素、问题与解决方案的对焦过程，以及如何分辨真实用户需求展开整理。",
      "This post walks through the five elements of product innovation, how problems and solutions align with each other, and how to identify real user needs.",
    ),
    date: "2022年4月20日",
    category: t("方法", "GUIDE"),
    imageSrc:
      "https://framerusercontent.com/images/VxphzLRXgblM8jZJnzPZ6Bhw5pI.jpg?width=2800&height=2800",
    imageAlt: t("锤子与钉子文章缩略图", "Thumbnail image for Hammers and Nails"),
    heroImageSrc:
      "https://framerusercontent.com/images/VxphzLRXgblM8jZJnzPZ6Bhw5pI.jpg?width=2800&height=2800",
    heroImageAlt: t("锤子与钉子文章 banner", "Hero banner for Hammers and Nails"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/eM3cmB3K5QoefSTiczzjul4hbaU.png?width=2000&height=1038",
        alt: "",
      },
      {
        type: "heading",
        level: "h2",
        text: "产品创新五要素",
      },
      {
        type: "heading",
        level: "h4",
        text: "Problems",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "谁的问题（典型用户）",
            nested: [],
          },
          {
            text: "什么情况下遇到的问题 （典型场景）",
            nested: [],
          },
          {
            text: "需求本身（刚性需求）",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: "Solutions",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "产品概念（从用户角度出发的一句话）",
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: "得到是一个能让你二三十分钟内了解一本书的软件",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "竞争优势（相比目前竞品的优势）",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: "产品创新流程",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "产品创新就是一个问题和解决方案互相对焦的过程（matchmaking）",
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: "既可以从用户痛点出发，也可以从技术角度出发（但落点还是在具体用户和场景上）；",
                    nested: [],
                  },
                  {
                    text: "目的就是找到 PMF，可以调整技术也可以调整市场/用户 or both",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "从技术出发，调整市场",
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: "阿里推出的“来往”本是对标微信的产品，但是没有立即成功占有市场份额，所以调整了市场，用相同的底层技术和架构做了钉钉面向中小型企业办公场景，并取得了成功",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "拿锤子找钉子也有方法（e.g. find use case for AR technology）：",
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: "列举生活中一天从早到晚的应用场景 （brainstorm）",
                    nested: [],
                  },
                  {
                    text: "研究每个场景的「市场大小」和「用户痛点」",
                    nested: [],
                  },
                  {
                    text: "用低成本的方式做 demo，得到 feedback，不停 iterate直到找到正确的钉子（prototype, test, learn, iterate)",
                    nested: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: "如何分辨用户需求",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "电视机（以为会用结果并不）vs. 洗碗机（没考虑过结果真香）",
            nested: [],
          },
          {
            text: "用户不擅长提出 solution（很可能不知道没想过）,但可以提出需求（如果你认真问的话）",
            nested: [],
          },
          {
            text: "用户很可能不能直接说出痛点 or 大部分痛点已经被解决了",
            nested: [],
          },
          {
            text: "proposal：用高密度低成本的方式做 user research，持续了解用户的心智模型而不是为了测试某个 task 来做突击式的 user research",
            nested: [],
          },
          {
            text: "example：给淘宝老板打工一周，发现作为 new parent 不能很好 balance response time（相当于 contextual inquiry or walk-a-mile-immersion）",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: "竞品分析的全维度",
      },
      {
        type: "paragraph",
        text: "主要还是研究直接竞品和间接竞品（substitute），另外两个象限可以提供新思路",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/Dwg05ecesEOyLXENTrcq7wtu0o.png?width=2000&height=1688",
        alt: "",
      },
      {
        type: "heading",
        level: "h2",
        text: "5MVVP",
      },
      {
        type: "paragraph",
        text: "viable（技术上）and valuable（市场上）",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "Paperwork (概念筛选）",
            nested: [],
          },
          {
            text: "Prototype (原型测试）",
            nested: [],
          },
          {
            text: "Product（产品化）",
            nested: [],
          },
          {
            text: "Promotion（量化推广）",
            nested: [],
          },
          {
            text: "Portfolio（单个产品变成产品组合 提高竞争力）",
            nested: [],
          },
        ],
      },
    ],
  },
  {
    slug: "obsidian-from-honeymoon-to-wakeup",
    section: "browse",
    title: t("Obsidian：从满心欢喜到梦醒时分", "Obsidian: From Honeymoon to Wake-Up Call"),
    summary: t(
      "记录从最初被 Obsidian 吸引，到逐渐看清它与自己真实需求之间差距的过程。",
      "A reflection on being drawn to Obsidian first, then gradually seeing the gap between its promise and what I actually needed.",
    ),
    detailSummary: t(
      "这是一篇关于笔记工具期待、蜜月期、使用痛点和后续取舍的复盘，重点不在工具神话，而在自己需求的变化。",
      "A retrospective on expectations, honeymoon-phase excitement, real pain points, and the later tradeoffs of using a note-taking tool.",
    ),
    date: "2024年1月15日",
    category: t("工具", "TOOLS"),
    imageSrc:
      "https://framerusercontent.com/images/P7cQ0XB7oysajZb45i30Sqh3Q.jpg?width=3600&height=2400",
    imageAlt: t(
      "Obsidian：从满心欢喜到梦醒时分文章缩略图",
      "Thumbnail image for Obsidian: From Honeymoon to Wake-Up Call",
    ),
    heroImageSrc:
      "https://framerusercontent.com/images/P7cQ0XB7oysajZb45i30Sqh3Q.jpg?width=3600&height=2400",
    heroImageAlt: t(
      "Obsidian：从满心欢喜到梦醒时分文章 banner",
      "Hero banner for Obsidian: From Honeymoon to Wake-Up Call",
    ),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: "产品初见",
      },
      {
        type: "paragraph",
        text: "Obsidian，这个名字在我初次听闻时，就如同神秘的宝石般吸引着我。 我一直是个热衷于尝试新鲜事物的人，最早听到 Obsidian 的名字是在群聊之中。“黑曜石”，光是这个独特的名字就足以引发我的好奇心。群友们接二连三地安利，更是让我对它充满了期待。后来入职新公司， leader 也向我们大力推荐，再加上我本身就喜欢在各种新软件中折腾，所有的这些因素叠加在一起，使我彻底心动，毫不犹豫地跳进了 Obsidian 的“坑”。",
      },
      {
        type: "heading",
        level: "h2",
        text: "蜜月期",
      },
      {
        type: "paragraph",
        text: "在最初使用 Obsidian 的那段时间，我仿佛置身于一个充满惊喜的世界。",
      },
      {
        type: "paragraph",
        text: "本地存储模式简直太酷了！我用它建立了好多个工作区，随时切换，还不用担心云端服务可能出现的数据泄露、服务中断或者是隐私被侵犯等问题。这让我对自己的笔记内容有了绝对的掌控感与安全感。然后就是它丰富的插件生态。",
      },
      {
        type: "paragraph",
        text: "Obsidian 的插件市场也是类型齐全，应有尽有。无论是用来提升编辑体验，还是优化界面布局，亦或是增强搜索功能，都能找到对应的插件。在所有的笔记类软件中， Obsidian 的定制化能力可谓一骑绝尘，每一个细微需求似乎都可以进行个性化的塑造。",
      },
      {
        type: "paragraph",
        text: "最后是深色主题。我可太爱深色主题了，在这上面我折腾的时间仅次于功能类插件。每当我打开 Obsidian 开始写作，那种沉浸感就如同置身于一个静谧的创作空间，让我能够心无旁骛地将思绪转化为文字，完全陶醉其中。",
      },
      {
        type: "heading",
        level: "h2",
        text: "使用痛点",
      },
      {
        type: "paragraph",
        text: "然而，随着使用的深入，问题也逐渐浮现。",
      },
      {
        type: "paragraph",
        text: "首先是图片管理和编辑功能，实在是鸡肋得让人无奈。与其他类笔记软件相比，Obsidian 使用起来是真难受。比如，想要对插入的图片进行简单的裁剪、调整大小或者添加标注，都难以实现，这给我的笔记创作带来了很大的不便。",
      },
      {
        type: "paragraph",
        text: "再者，虽然插件众多，我一下子搞了十几个，但是真正能熟练运用并发挥作用的却寥寥无几。很多插件在安装后，由于复杂的设置和使用流程，最后只能闲置在那里，白白浪费了时间和精力去尝试和摸索。 后来我反思了一下，自定义功能强大有时候未必是一件好事。就如同Iphone 和安卓，苹果手机相对封闭和简洁，用户操作简单直观；而安卓手机虽然提供了极高的自定义权限，但也正因如此，容易导致系统的复杂性和不稳定性增加。最新的 WWDC 的上，除了 AI 功能外的最大看点居然是客制化桌面，而且还那么丑，诶苹果也是堕落已久了…Obsidian 同样如此，过度的自定义选项让我在设置和调整时常常感到困惑和迷茫，感觉自己偏离了记笔记的初心（更好地思考与写作），反而影响了使用的效率和体验。",
      },
      {
        type: "heading",
        level: "h2",
        text: "迷茫与影响",
      },
      {
        type: "paragraph",
        text: "在经历了对 Obsidian 的期待与兴奋之后，我也陷入了一些困扰之中。 为了找到最适合自己的笔记软件，我在多个不同的产品之间来回切换。但这种频繁的尝试不仅耗费了大量的时间和精力，还使得我的知识管理逐渐失控。不同软件之间的格式差异、存储方式以及操作习惯的不同，导致我的笔记分散在各个地方，难以形成一个统一、有序的知识体系。 而且，实际使用中发现，Obsidian 的打开频率并没有我最初预期的那么高。或许是因为在使用过程中遇到的种种问题降低了我的积极性，又或许是它并没有真正完美地契合我的日常工作和学习需求。 另外，当我想要放弃 Obsidian 转向其他软件时，内容迁移的困难又成为了一座难以跨越的大山。插件市场上没有太好的迁移工具可以使用，手动迁移又过于繁琐且容易出错，这让我在是否彻底放弃 Obsidian 的抉择上犹豫不决。",
      },
      {
        type: "heading",
        level: "h2",
        text: "Now",
      },
      {
        type: "paragraph",
        text: "时间回到 2024 的当下，我对待笔记工具的态度与看法进一步有了变化。 我明白了“弱水三千，只取一瓢饮”的道理。不再盲目追求功能繁多、看似强大的工具，而是更加注重软件与自身需求的契合度、使用的便捷性以及长期的稳定性。就像我现在在用的 Craft——主打工作记录，语雀——专业学习记录，Notion——日常经验沉淀。此外我的电脑里还沉睡着一众笔记产品，现在更多的是产品试用，体验其中的设计细节。后面我估计应该不会再轻易迁移到其他笔记类工具了…",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/2Nq0Lj1m2tnM5DrvZGLVCI0tHOU.png?width=3056&height=1218",
        alt: "",
      },
    ],
  },
  {
    slug: "minimal-todos",
    section: "browse",
    title: t("简约 Todos", "Minimal Todos"),
    summary: t(
      "从传统待办事项列表的问题出发，重新理解 Burner List 这种更专注的待办方式。",
      "A reflection on the problems of traditional todo lists and why Burner List offers a more focused way to work.",
    ),
    detailSummary: t(
      "这篇文章围绕传统 Todos 的问题、Burner List 系统的做法，以及它为什么能帮助人们重新聚焦最重要的任务。",
      "This post looks at what breaks in traditional todo systems, how Burner List works, and why it helps people refocus on the most important task.",
    ),
    date: "2025年10月23日",
    category: t("方法", "GUIDE"),
    imageSrc:
      "https://framerusercontent.com/images/IWuwwbDt6mxzPCujCX92dn9138g.jpg?width=6000&height=4000",
    imageAlt: t("简约 Todos 文章缩略图", "Thumbnail image for Minimal Todos"),
    heroImageSrc:
      "https://framerusercontent.com/images/IWuwwbDt6mxzPCujCX92dn9138g.jpg?width=6000&height=4000",
    heroImageAlt: t("简约 Todos 文章 banner", "Hero banner for Minimal Todos"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "heading",
        level: "h4",
        text: "传统 Todos 的问题",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "传统的待办事项列表大多是对他人优先级的反应，而不是自己的优先级。",
            nested: [],
          },
          {
            text: "完成任务后虽然会感到短暂的成就感，但更多的任务总是会接踵而来，让人感觉永远做不完。",
            nested: [],
          },
          {
            text: "待办事项列表会加剧生活中“未完成感”。",
            nested: [],
          },
        ],
      },
      {
        type: "paragraph",
        text: "相应的，它的好处是",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: "帮助人们将事情记录下来，避免所有事情都堆积在大脑中，从而减轻压力。",
            nested: [],
          },
          {
            text: "它可以将所有任务集中在一个地方，方便查看。",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: "Burner List 系统",
      },
      {
        type: "paragraph",
        text: "这是一个极其简单的纸质待办事项列表，强迫自己优先处理最重要的任务。它不是完美的，不会跟踪每一个细节，也无法同时处理多个项目。但正是这种局限性使得它更加专注。",
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: "材料：",
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: "一张白纸",
                    nested: [],
                  },
                  {
                    text: "一支笔",
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: "步骤：",
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: "制作两列：",
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: "可以折叠纸张、画一条竖线或将纸张分成两部分，精确性并不重要。",
                            nested: [],
                          },
                          {
                            text: "重要的是创建了一个隐喻：左边 = 前置任务（front burner），右边 = 后置任务（back burner）。",
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: "前置任务：",
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: "在左上角写下最重要的项目名称并划线。",
                            nested: [],
                          },
                          {
                            text: "然后列出与该项目相关的待办事项，这些任务是在未来几天内可以完成的，以推动项目进展。",
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: "留出空白：",
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: "保持第一列的其余部分空白。Burner List 的目的不是高效利用纸张面积，而是高效利用时间和精力。",
                            nested: [],
                          },
                          {
                            text: "空白空间可以让用户为最重要的项目添加更多任务，同时也有助于集中注意力。",
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: "后置任务：",
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: "在右上角写下第二重要的项目名称并划线，然后在其下方写下相关待办事项。",
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: "厨房水槽（Kitchen Sink）：",
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: "在右列的中间位置，列出任何不属于项目1或项目2的杂项任务。",
                            nested: [],
                          },
                          {
                            text: "这些任务可以属于项目3、4或其他任何项目，但它们都被归入“厨房水槽”中。",
                            nested: [],
                          },
                          {
                            text: "这种做法虽然与所有组织和生产力建议相悖，但通过限制空间和注意力，可以更好地利用时间。",
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "想象在页面左侧有一位厨师，他会将大部分注意力集中在前置任务上。虽然他也会偶尔关注后置任务，但前置任务才是主要的行动区域。",
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: "Burner List 是有限的，无法容纳所有任务，因此需要放弃一些不那么重要的事情。",
            nested: [],
          },
          {
            text: "Burner List 是可丢弃的，随着任务的完成，它会很快变得过时。",
            nested: [],
          },
          {
            text: "重新创建列表的过程很重要，因为需要丢弃一些不再重要的未完成任务，并重新考虑当前最重要的任务是什么。",
            nested: [],
          },
          {
            text: "最重要的是一次只能有一个最重要的项目。",
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: "总结",
      },
      {
        type: "paragraph",
        text: "Burner List 系统的目的让自己专注于最重要的任务，而不是试图处理所有任务。它是一个简单、专注的系统，适合希望减少待办事项列表复杂性的人。最后，最重要的是根据自己的实际需要灵活调整。毕竟，规则存在的本身就是用来打破的，前提是你需要先熟悉规则。",
      },
    ],
  },
  {
    slug: "to-be-continue",
    section: "browse",
    title: t("敬请期待", "To Be Continued"),
    summary: t(
      "一篇保留中的文章页面，目前只留下了最直接的更新提示。",
      "A reserved article page that currently only keeps the most direct update note.",
    ),
    detailSummary: t(
      "这篇文章在 V1 站点中暂时只有一个非常简短的占位内容：敬请期待。",
      "This article only had a very short placeholder in the V1 site: coming soon.",
    ),
    date: "2024年6月22日",
    category: t("方法", "GUIDE"),
    imageSrc:
      "https://framerusercontent.com/images/WlRldDSjtDSdVsovz4sBYi8xr0.png?width=1280&height=800",
    imageAlt: t("To be Continue 文章缩略图", "Thumbnail image for To Be Continued"),
    heroImageSrc:
      "https://framerusercontent.com/images/WlRldDSjtDSdVsovz4sBYi8xr0.png?width=1280&height=800",
    heroImageAlt: t("To be Continue 文章 banner", "Hero banner for To Be Continued"),
    translationStatus: {
      en: "placeholder",
      zh: "translated",
    },
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: "敬请期待！！",
      },
    ],
  },
];

export const featuredBlogPosts = blogPosts.filter((post) => post.section === "featured");

export const browseBlogPosts = blogPosts.filter((post) => post.section === "browse");
