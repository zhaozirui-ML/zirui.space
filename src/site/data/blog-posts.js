import { getBlogAssetUrl } from "../lib/get-blog-asset-url";

const t = (zh, en) => ({ zh, en });

// Blog 内容继续集中在数据层管理。
// 这一版把 V1 站点上的真实文章内容迁入当前项目，页面只负责渲染，不在组件里散写正文。
export const blogPosts = [
  {
    slug: "smartx-design-workflow",
    section: "featured",
    title: t("SmartX 设计工作流", "The SmartX Design Workflow"),
    summary: t(
      "梳理我在 SmartX 的主线设计任务、支线协作与设计系统沉淀工作。",
      "An overview of core design work, supporting tracks, and design system responsibilities at SmartX.",
    ),
    detailSummary: t(
      "在 SmartX 内，设计师接到的需求大致可分为主线任务和支线任务，而设计系统部分又能继续细分出不同类型的沉淀工作。",
      "At SmartX, design work could roughly be split into core tasks and supporting tasks, and the design system work could be broken down into several different kinds of follow-up effort.",
    ),
    date: "2023年6月28日",
    category: t("设计", "DESIGN"),
    imageSrc: getBlogAssetUrl("smartx-design-workflow", "cover.jpg"),
    imageAlt: t(
      "SmartX 设计工作流文章封面",
      "Cover image for The SmartX Design Workflow",
    ),
    heroImageSrc: getBlogAssetUrl("smartx-design-workflow", "cover.jpg"),
    heroImageAlt: t(
      "SmartX 设计工作流文章 banner",
      "Banner image for The SmartX Design Workflow",
    ),
    tone: "dark",
    layout: "imageStart",
    supportsEnglishDetail: true,
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: t("SmartX 的设计工作范围", "The Scope of Design Work at SmartX"),
      },
      {
        type: "paragraph",
        text: t(
          "在 SmartX 内，设计师接到的需求大致可分为 2 类",
          "At SmartX, the requests designers receive can be roughly grouped into two categories.",
        ),
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: t(
              "主线任务：业务导向的需求，这是日常工作中的核心需求",
              "Core tasks: business-driven needs, which are the main focus of everyday work.",
            ),
            nested: [],
          },
          {
            text: t(
              "支线任务：包括「已有功能的体验优化」和「设计系统的搭建与维护」",
              "Supporting tasks: including experience improvements to existing features, and the building and maintenance of the design system.",
            ),
            nested: [],
          },
        ],
      },
      {
        type: "paragraph",
        text: t(
          "其中，设计系统部分又能细分出 3 类",
          "Within that, the design system work could be further broken down into three categories.",
        ),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("完善 CloudTower 组件库", "Improve the CloudTower component library."),
            nested: [],
          },
          {
            text: t(
              "沉淀 Design Pattern：无法操作的界面处理、关联集群的通用行为",
              "Document design patterns: handling non-interactive screens and common behaviors for related clusters.",
            ),
            nested: [],
          },
          {
            text: t(
              "梳理 UI Map：移除集群 modal、创建虚拟机、编辑虚拟机",
              "Organize the UI map: removing cluster modals, creating virtual machines, and editing virtual machines.",
            ),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: t("设计流程", "The Design Process"),
      },
      {
        type: "paragraph",
        text: t(
          "Onboarding 阶段时，SMTX 设计手册中提供了一个整体设计流程框架。根据实际的业务需求与场景，设计师在经手一个完整项目期间通常需要经历 Discover、Ideate、Test、Deliver 四个阶段。虽然每个阶段的目标不同，所涉及的任务和能力也各不相同，但「学习、沟通、体系化思维、设计决策」确是需要一以贯之到设计的前中后期的，如此才算是执行了一个完整且高质量的设计流程。",
          "During onboarding, the SMTX design handbook provided an overall framework for the design process. Based on real business needs and scenarios, a designer usually needed to go through four stages during a full project: Discover, Ideate, Test, and Deliver. Each stage had different goals, tasks, and skills, but learning, communication, systematic thinking, and design decision-making had to stay consistent from start to finish in order to count as a complete and high-quality process.",
        ),
      },
      {
        type: "image",
        src: getBlogAssetUrl("smartx-design-workflow", "body-1.png"),
        alt: t(
          "SmartX 设计流程框架图",
          "Diagram of the SmartX design process framework",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "实际项目上手后，我根据个人经验又将原有的流程进一步细化为以下 6 步骤。具体细节",
          "After getting hands-on with real projects, I further refined the original process into the following six steps based on my own experience. The details are shown below.",
        ),
      },
      {
        type: "image",
        src: getBlogAssetUrl("smartx-design-workflow", "body-2.png"),
        alt: t(
          "SmartX 设计流程细化步骤图",
          "Diagram of the refined SmartX design workflow steps",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "以上 6 步骤是每个项目的通用流程标准化的结果。",
          "These six steps are the standardized result of a common process shared by every project.",
        ),
      },
    ],
  },
  {
    slug: "communication-at-work",
    section: "featured",
    title: t("沟通的方法", "The Method of Communication"),
    summary: t(
      "从倾听、识别沟通模式到积极回应，整理一份更有效协作的实践笔记。",
      "From listening and recognizing communication patterns to responding proactively, a practical guide to more effective collaboration at work.",
    ),
    detailSummary: t(
      "这篇文章来自于我在 23 年年中的一次组会分享，主要记录《沟通的方法》一书里对远程沟通、倾听和积极回应的阅读感悟。",
      "This article comes from a team sharing session in mid-2023 and records my takeaways from The Method of Communication about remote communication, listening, and proactive responses.",
    ),
    date: "2023年2月10日",
    category: t("指南", "GUIDE"),
    imageSrc: getBlogAssetUrl("communication-at-work", "cover.jpg"),
    imageAlt: t(
      "沟通的方法文章封面",
      "Cover image for The Method of Communication",
    ),
    heroImageSrc: getBlogAssetUrl("communication-at-work", "cover.jpg"),
    heroImageAlt: t(
      "沟通的方法文章 banner",
      "Banner image for The Method of Communication",
    ),
    tone: "light",
    layout: "imageEnd",
    supportsEnglishDetail: true,
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: t("背景", "Background"),
      },
      {
        type: "paragraph",
        text: t(
          "这篇文章来自于我在23 年年中的一次组会分享。对于入职场工作（不算实习）的我来说，培养自己远程沟通（就是每天打字~）的软实力对日后的职业发展来说非常有价值。（可能现在不太能看出来，但正如 Flomo 的 Slogan 说的这样，持续不断记录，意义自然浮现）👇🏻以下是准备的正式内容：",
          "This article comes from a team sharing session in mid-2023. For someone just starting a full-time job, building remote communication skills, basically typing every day, felt very valuable for my future career growth. It may not be obvious right away, but as Flomo says, keep recording and the meaning will emerge. Below is the prepared talk:",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "在去年的年终总结时有提到过希望在 2023 年能提高自己的沟通能力与分享欲，选定了《沟通的方法》一书来学习，今天简单和大家分享一下自己的阅读感悟。",
          "In last year's year-end review, I said I wanted to improve my communication skills and willingness to share in 2023. I chose The Method of Communication as my reading material, and today I want to share some of my reflections.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "👀 书中讲的一些技巧我相信大家或多或少都了解，有些技巧在工作中也都用过，只是很少有人完整总结过这些微小的经验。",
          "👀 I believe most of the techniques in the book are already familiar to people to some extent. Many of them are used at work too, but few people have fully summarized these small experiences.",
        ),
      },
      {
        type: "heading",
        level: "h2",
        text: t("Part 1 从倾听开始", "Part 1: Start with Listening"),
      },
      {
        type: "paragraph",
        text: t("“沟通最大的问题在于，人们想当然地认为已经沟通了.”——萧伯纳", "\"The biggest problem with communication is the illusion that it has taken place.\" — George Bernard Shaw"),
      },
      {
        type: "heading",
        level: "h4",
        text: t("如何在倾听他人说话时抓住重点？", "How do you catch the key points when listening to someone?"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t(
              "情绪：情绪很容易可以从他人的说话语气中感知。如果是文字对话，也可以从文字表达中窥探出一二。",
              "Emotion: you can often sense emotion from someone's tone of voice. In text conversations, you can also infer it from how they write.",
            ),
            nested: [],
          },
          {
            text: t("事实：4W 还原实际场景（who、when、where、what）", "Facts: use the 4Ws to reconstruct the situation (who, when, where, what)."),
            nested: [],
          },
          {
            text: t("期待：找出对方内心真正想要的东西。", "Expectation: identify what the other person actually wants."),
            nested: [],
          },
        ],
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("响应情绪：点破与接纳对方的情绪", "Respond to emotion: name it and accept it"),
            nested: [],
          },
          {
            text: t("确认事实", "Confirm the facts"),
            nested: [],
          },
          {
            text: t("明确行动", "Clarify the next action"),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: t("Part 2 听话听音", "Part 2: Listen Between the Lines"),
      },
      {
        type: "paragraph",
        text: t(
          "💡 倾听也是双向的。自己听懂很重要；把自己听懂的信号传递给对方，给对方掌控感，让双方的沟通达成共识，也很重要。",
          "💡 Listening goes both ways. It is important to understand what the other person means, and it is also important to show them that you understood, so they feel in control and both sides can reach a shared understanding.",
        ),
      },
      {
        type: "heading",
        level: "h4",
        text: t("沟通模式", "Communication Styles"),
      },
      {
        type: "image",
        src: getBlogAssetUrl("communication-at-work", "body-1.png"),
        alt: t("沟通模式图 1", "Communication styles diagram 1"),
      },
      {
        type: "heading",
        level: "h4",
        text: t("识别策略", "How to identify them"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t(
              "不同沟通风格的人是均衡分布的。在一个沟通环境里，我们有可能遇到各种类型的人",
              "Different communication styles are evenly distributed. In any communication setting, we may meet all kinds of people.",
            ),
            nested: [],
          },
          {
            text: t("不同沟通风格的人之间会“不可避免”地产生矛盾。", "Conflicts between different communication styles are \"inevitable\"."),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: t("如何与不同沟通模式的人沟通", "How to communicate with different styles"),
      },
      {
        type: "image",
        src: getBlogAssetUrl("communication-at-work", "body-2.png"),
        alt: t("沟通模式图 2", "Communication styles diagram 2"),
      },
      {
        type: "heading",
        level: "h4",
        text: t("如何与复合型人沟通", "How to communicate with hybrid types"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("孔雀+老虎：同时给予对方掌控感和自我表现的机会", "Peacock + Tiger: give the other person both a sense of control and a chance to express themselves."),
            nested: [],
          },
          {
            text: t("孔雀+考拉：赞美对方并给予秩序感", "Peacock + Koala: praise them and give them a sense of order."),
            nested: [],
          },
          {
            text: t("老虎+猫头鹰：既要目标又要过程，严格按照计划行事，不要出纰漏", "Tiger + Owl: care about both goals and process, follow the plan closely, and avoid mistakes."),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: t(
          "💡 当我们可以为了某个沟通任务，扮演一个与自己截然不同的角色时，我们的沟通能力就会得到显著提升。Part 3 积极回应",
          "💡 When we can play a role very different from ourselves for a communication task, our communication ability improves significantly. Part 3: Proactive Responses",
        ),
      },
      {
        type: "heading",
        level: "h4",
        text: t("倾听过程闭环", "A closed loop for listening"),
      },
      {
        type: "paragraph",
        text: t(
          "建立信息处理框架，能听懂对方的意思（结构化倾听），听出隐藏剧情（听话听音），并且通过有效确认，让对方知道我们确实听懂了（反向叙述）。",
          "Build an information-processing framework: understand what the other person means (structured listening), hear the hidden story (reading between the lines), and confirm effectively so they know we truly understood (reverse narration).",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "前提：沟通中对方是友好且善意的，自己具备处理问题的能力，而且双方是一起奔着解决问题去的。",
          "Assumption: the other person is friendly and well-intentioned, you are capable of handling the issue, and both sides are working toward solving the problem together.",
        ),
      },
      {
        type: "heading",
        level: "h4",
        text: t("生活与工作场景", "Life and work scenarios"),
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: t("对方不一定是带着善意的态度来沟通的", "The other person may not be communicating with good intentions."),
            nested: [],
          },
          {
            text: t("对方提出了一个我并不想答应的需求", "The other person brings up a request I do not want to agree to."),
            nested: [],
          },
          {
            text: t("对方问了一个我不会的问题或很多不想回答的问题", "The other person asks a question I do not know how to answer, or a question I do not want to answer."),
            nested: [],
          },
        ],
      },
      {
        type: "paragraph",
        text: t(
          "任何问题都需要尽量给积极善意的回应，但如何在不友好的沟通氛围中给予积极回应呢？",
          "We should try to respond positively and kindly to any question, but how do we do that in an unfriendly communication climate?",
        ),
      },
      {
        type: "heading",
        level: "h4",
        text: t("如何在不友好的沟通氛围中给予积极回应？ ——置换法", "How to respond positively in an unfriendly communication climate? — the substitution method"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("换口径", "Change the framing"),
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: t("对方态度不友好，说话阴阳怪气", "The other person is unfriendly and speaks in a sarcastic or passive-aggressive way."),
                    nested: [],
                  },
                  {
                    text: t("想快速结束话题 。", "You want to end the conversation quickly."),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("换时间：", "Change the timing:"),
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: t("需要改变沟通节奏，通过暂停来获得一定的 break", "You need to change the pace of the conversation and pause to get some breathing room."),
                    nested: [],
                  },
                  {
                    text: t("当场沟通，不能很好的理解对方的意图 。", "In the moment, it is hard to fully understand the other person's intent."),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("换场合：", "Change the setting:"),
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: t("线下会议时需要给领导泼凉水的场景（降级）", "A case where you need to push back on a leader in an in-person meeting (de-escalation)."),
                    nested: [],
                  },
                  {
                    text: t("协调多部门资源向上汇报（升级）", "Coordinate cross-team resources and report upward (escalation)."),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("换角色：", "Change the role:"),
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: t("遇到自己无法判断的事", "When you encounter something you cannot judge yourself."),
                    nested: [],
                  },
                  {
                    text: t("不方便、不愿意回答的问题", "When the question is inconvenient or you do not want to answer it."),
                    nested: [],
                  },
                  {
                    text: t("销售领域的团队合作（传球）", "Team collaboration in sales (passing the ball)."),
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
        text: t(
          "⚠️ 每个技巧都有其自身的限制与使用边界。谨慎使用，有些分寸很难拿捏，容易被看成抖机灵，显得不真诚。",
          "⚠️ Every technique has its own limits and boundaries. Use them carefully. Some are hard to calibrate and can easily look like cheap tricks or insincere behavior.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "💡 真话不全说，假话绝不说。无论用什么技巧，沟通中的这条底线不能破。",
          "💡 Do not say everything, but never tell a lie. No matter which technique you use, this boundary in communication cannot be crossed.",
        ),
      },
      {
        type: "heading",
        level: "h4",
        text: t("一定要积极回应吗？", "Do we always need to respond positively?"),
      },
      {
        type: "paragraph",
        text: t(
          "“职场沟通中为自己“种下”一个意识，一旦进入多人沟通场合，我就是主持人，我就是球场上的“中场发动机”一所有的球都送到我这儿来，我得把球再发岀去。我们都需要找到这个角色的信念感。” 我们的能力会在一次次的主动训练中得到提升。",
          "\"In workplace communication, plant a mindset for yourself: once you enter a group discussion, you are the host, the midfield engine on the field. Every ball comes to you, and you need to pass it on again. We all need to find belief in that role.\" Our ability improves through repeated active practice.",
        ),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t(
              "面对那些我们不想回答、很尴尬、处理不了,甚至对方可能带有恶意的沟通场景，我们依然要积极回应。回应的时候，还是先处理情绪，再处理事实和期待，但最终都要指向解决问题。",
              "Even in situations we do not want to answer, that feel awkward, that we cannot handle, or that may even be hostile, we still need to respond positively. When responding, handle emotion first, then facts and expectations, but always aim toward solving the problem.",
            ),
            nested: [],
          },
          {
            text: t(
              "面对艰难的回应的四个技巧：换口径、换时间、换场合、换角色。这四招能够拿回沟通的主动权。",
              "There are four techniques for difficult responses: change the framing, change the timing, change the setting, and change the role. These four moves help you regain control of the conversation.",
            ),
            nested: [],
          },
          {
            text: t(
              "修炼自己的“肯定反射”，让积极回应成为自己的本能，也成为别人对我们的印象标签。",
              "Train your own \"affirmative reflex\" so that positive responses become your instinct and also the impression others have of you.",
            ),
            nested: [],
          },
        ],
      },
    ],
  },
  {
    slug: "goals-activities-tasks-and-actions",
    section: "featured",
    title: t(
      "设计中的目标、活动、任务、行为",
      "Goals, Activities, Tasks, and Actions in Design",
    ),
    summary: t(
      "从目标、活动、任务、动作的层级关系出发，重新看产品设计应该围绕什么展开。",
      "A look at how goals, activities, tasks, and actions shape what product design should center on.",
    ),
    detailSummary: t(
      "理解目标在设计中的指导意义。目标、活动、任务、动作，以不同层级为中心进行设计会产生完全不同的结果。",
      "A look at why goals matter in design. Designing around goals, activities, tasks, and actions at different levels produces very different results.",
    ),
    date: "2023年8月8日",
    category: t("指南", "GUIDE"),
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
      "Banner image for Goals, Activities, Tasks, and Actions in Design",
    ),
    tone: "light",
    layout: "imageStart",
    supportsEnglishDetail: true,
    contentBlocks: [
      {
        type: "paragraph",
        text: t(
          "理解目标在设计中的指导意义，目标-活动-任务-动作，以不同的层级为中心进行设计会产生不同的结果。关注目标而非活动或任务，能够最终让产品获得更好的体验。",
          "Understand the guiding role of goals in design. Designing around goals, activities, tasks, and actions at different levels leads to different results. Focusing on goals rather than activities or tasks ultimately creates a better product experience.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "许多产品设计的失败在于以活动甚至任务为中心进行设计。",
          "Many product design failures come from centering the design on activities or even tasks.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "比如一些软件项目管理工具，不断地优化创建和组织任务卡片的方式，添加更丰富的字段，引入更高级的配置，却忽略了产品的目标应该是辅助软件快速开发，这些功能为使用者带来的操作成本甚至超过了使用它来管理项目所提高的效率收益，自然会失败。",
          "For example, some software project management tools keep optimizing how task cards are created and organized, adding richer fields and more advanced settings, but they forget that the product's goal should be to help software teams ship faster. The interaction cost can end up outweighing the efficiency gains, so the product naturally fails.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "尽管活动和任务是用户的关注点，但产品设计者更应该关注目标。明确产品最重要的用户是谁，他们的目标是什么，以及为什么是这个目标。团队中不同的角色会存在不同的目标，而且这些目标不仅仅是表面的，而是深层次的。",
          "Although activities and tasks are what users notice, product designers should care more about goals. Be clear about who the most important users are, what their goals are, and why those goals matter. Different roles on a team have different goals, and those goals are not just surface-level; they run deeper.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "比如员工的目标不是更好地完成任务，而是让老板更频繁地看到自己的工作努力从而快速升职。有些不好用的产品之所以受到部分人欢迎，也是由于他们的目标能够通过这类产品满足，尽管这种目标与公司产品的目标冲突。",
          "For example, an employee's goal may not be to finish tasks better, but to make their boss see their effort more often so they can get promoted faster. Some unpleasant products are popular because they happen to satisfy those goals, even when those goals conflict with the company's own product goals.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "在团队中为建立一个机制来让所有人的目标都能对做出更好的产品产生正面的效果才是有意义的，否则可能产生的内部冲突会严重影响产品的质量。激励机制不一致的团队合作最终会走向灭亡。",
          "It only makes sense to create a mechanism in the team that lets everyone's goals contribute positively to building a better product. Otherwise, internal conflicts can seriously damage product quality. Team collaboration with misaligned incentives will eventually fail.",
        ),
      },
    ],
  },
  {
    slug: "hammer-and-nails",
    section: "browse",
    title: t("锤子与钉子", "Hammer and Nail"),
    summary: t(
      "从产品创新和需求识别的角度，讨论如何先找到问题，再让方案与问题真正对焦。",
      "A note on product innovation and need discovery: find the problem first, then align the solution to it.",
    ),
    detailSummary: t(
      "这篇文章围绕产品创新的五要素、问题与解决方案的对焦过程，以及如何分辨真实用户需求展开整理。",
      "This article walks through the five elements of product innovation, how problems and solutions get matched, and how to distinguish real user needs.",
    ),
    date: "2022年4月20日",
    category: t("指南", "GUIDE"),
    imageSrc: getBlogAssetUrl("hammer-and-nails", "cover.jpg"),
    imageAlt: t("锤子与钉子文章缩略图", "Thumbnail for Hammer and Nail"),
    heroImageSrc: getBlogAssetUrl("hammer-and-nails", "cover.jpg"),
    heroImageAlt: t("锤子与钉子文章 banner", "Banner image for Hammer and Nail"),
    supportsEnglishDetail: true,
    contentBlocks: [
      {
        type: "image",
        src: getBlogAssetUrl("hammer-and-nails", "body-1.png"),
        alt: t("锤子与钉子文章内容图 1", "Content image 1 for Hammer and Nail"),
      },
      {
        type: "heading",
        level: "h2",
        text: t("产品创新五要素", "Five Elements of Product Innovation"),
      },
      {
        type: "heading",
        level: "h4",
        text: t("问题", "Problems"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("谁的问题（典型用户）", "Whose problem is it? (Typical user)"),
            nested: [],
          },
          {
            text: t("什么情况下遇到的问题 （典型场景）", "In what situation does the problem appear? (Typical scenario)"),
            nested: [],
          },
          {
            text: t("需求本身（刚性需求）", "The need itself (a must-have need)"),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: t("解决方案", "Solutions"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("产品概念（从用户角度出发的一句话）", "Product concept (a one-sentence statement from the user's perspective)"),
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: t("得到是一个能让你二三十分钟内了解一本书的软件", "Dedao is an app that lets you understand a book in 20 to 30 minutes."),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("竞争优势（相比目前竞品的优势）", "Competitive advantage (compared with current competitors)"),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: t("产品创新流程", "Product Innovation Process"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t(
              "产品创新就是一个问题和解决方案互相对焦的过程（matchmaking）",
              "Product innovation is the process of matching a problem with a solution.",
            ),
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: t(
                      "既可以从用户痛点出发，也可以从技术角度出发（但落点还是在具体用户和场景上）；",
                      "You can start from user pain points or from technology, but the end point still has to be a specific user and scenario.",
                    ),
                    nested: [],
                  },
                  {
                    text: t(
                      "目的就是找到 PMF，可以调整技术也可以调整市场/用户 or both",
                      "The goal is to find PMF. You can adjust the technology, the market/users, or both.",
                    ),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("从技术出发，调整市场", "Start from technology, then adjust the market"),
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: t(
                      "阿里推出的“来往”本是对标微信的产品，但是没有立即成功占有市场份额，所以调整了市场，用相同的底层技术和架构做了钉钉面向中小型企业办公场景，并取得了成功",
                      "Ali's \"Laiwang\" was initially positioned against WeChat, but it did not gain market share quickly. The market was then adjusted, and the same underlying technology and architecture became DingTalk for small and medium business office scenarios, which succeeded.",
                    ),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("拿锤子找钉子也有方法（e.g. find use case for AR technology）：", "There is also a method for finding a nail with a hammer (for example, finding use cases for AR technology):"),
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: t("列举生活中一天从早到晚的应用场景 （brainstorm）", "List the scenarios in a day from morning to night (brainstorm)."),
                    nested: [],
                  },
                  {
                    text: t("研究每个场景的「市场大小」和「用户痛点」", "Study the market size and user pain points for each scenario."),
                    nested: [],
                  },
                  {
                    text: t(
                      "用低成本的方式做 demo，得到 feedback，不停 iterate直到找到正确的钉子（prototype, test, learn, iterate)",
                      "Build a low-cost demo, get feedback, and keep iterating until you find the right nail (prototype, test, learn, iterate).",
                    ),
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
        text: t("如何分辨用户需求", "How to Identify User Needs"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("电视机（以为会用结果并不）vs. 洗碗机（没考虑过结果真香）", "Television (you think you'll use it, but you don't) vs. dishwasher (you never expected it, but it turns out to be great)"),
            nested: [],
          },
          {
            text: t("用户不擅长提出 solution（很可能不知道没想过）,但可以提出需求（如果你认真问的话）", "Users are not good at proposing solutions (they may not even know what they haven't thought of), but they can state needs if you ask carefully."),
            nested: [],
          },
          {
            text: t("用户很可能不能直接说出痛点 or 大部分痛点已经被解决了", "Users may not be able to directly articulate pain points, or many pain points may already be solved."),
            nested: [],
          },
          {
            text: t(
              "proposal：用高密度低成本的方式做 user research，持续了解用户的心智模型而不是为了测试某个 task 来做突击式的 user research",
              "Proposal: use high-density, low-cost user research to keep learning the user's mental model, instead of doing one-off research just to test a task.",
            ),
            nested: [],
          },
          {
            text: t(
              "example：给淘宝老板打工一周，发现作为 new parent 不能很好 balance response time（相当于 contextual inquiry or walk-a-mile-immersion）",
              "Example: work for a Taobao boss for a week and discover that, as a new parent, you cannot balance response time very well (similar to contextual inquiry or walk-a-mile immersion).",
            ),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h2",
        text: t("竞品分析的全维度", "The Full Dimensions of Competitive Analysis"),
      },
      {
        type: "paragraph",
        text: t(
          "主要还是研究直接竞品和间接竞品（substitute），另外两个象限可以提供新思路",
          "The main focus is still on direct and indirect competitors (substitutes); the other two quadrants can provide new ideas.",
        ),
      },
      {
        type: "image",
        src: getBlogAssetUrl("hammer-and-nails", "body-2.png"),
        alt: t("锤子与钉子文章内容图 2", "Content image 2 for Hammer and Nail"),
      },
      {
        type: "heading",
        level: "h2",
        text: t("5MVVP", "5MVVP"),
      },
      {
        type: "paragraph",
        text: t("viable（技术上）and valuable（市场上）", "Viable on the technology side and valuable on the market side."),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t("Paperwork (概念筛选）", "Paperwork (concept screening)"),
            nested: [],
          },
          {
            text: t("Prototype (原型测试）", "Prototype (prototype testing)"),
            nested: [],
          },
          {
            text: t("Product（产品化）", "Product (productization)"),
            nested: [],
          },
          {
            text: t("Promotion（量化推广）", "Promotion (scaled promotion)"),
            nested: [],
          },
          {
            text: t("Portfolio（单个产品变成产品组合 提高竞争力）", "Portfolio (turn a single product into a product portfolio to improve competitiveness)"),
            nested: [],
          },
        ],
      },
    ],
  },
  {
    slug: "obsidian-from-honeymoon-to-wakeup",
    section: "browse",
    title: t(
      "Obsidian：从满心欢喜到梦醒时分",
      "Obsidian: From Honeymoon to Wake-Up Call",
    ),
    summary: t(
      "记录从最初被 Obsidian 吸引，到逐渐看清它与自己真实需求之间差距的过程。",
      "A reflection on being drawn to Obsidian, then gradually seeing the gap between the tool and my real needs.",
    ),
    detailSummary: t(
      "这是一篇关于笔记工具期待、蜜月期、使用痛点和后续取舍的复盘，重点不在工具神话，而在自己需求的变化。",
      "A reflection on the expectations, honeymoon phase, pain points, and tradeoffs of using a note-taking tool, with the focus on how my own needs changed rather than on the myth of the tool itself.",
    ),
    date: "2024年1月15日",
    category: t("工具", "TOOLS"),
    imageSrc: getBlogAssetUrl("obsidian-from-honeymoon-to-wakeup", "cover.jpg"),
    imageAlt: t(
      "Obsidian：从满心欢喜到梦醒时分文章缩略图",
      "Thumbnail for Obsidian: From Honeymoon to Wake-Up Call",
    ),
    heroImageSrc: getBlogAssetUrl("obsidian-from-honeymoon-to-wakeup", "cover.jpg"),
    heroImageAlt: t(
      "Obsidian：从满心欢喜到梦醒时分文章 banner",
      "Banner image for Obsidian: From Honeymoon to Wake-Up Call",
    ),
    supportsEnglishDetail: true,
    contentBlocks: [
      {
        type: "heading",
        level: "h2",
        text: t("产品初见", "First Impressions"),
      },
      {
        type: "paragraph",
        text: t(
          "Obsidian，这个名字在我初次听闻时，就如同神秘的宝石般吸引着我。 我一直是个热衷于尝试新鲜事物的人，最早听到 Obsidian 的名字是在群聊之中。“黑曜石”，光是这个独特的名字就足以引发我的好奇心。群友们接二连三地安利，更是让我对它充满了期待。后来入职新公司， leader 也向我们大力推荐，再加上我本身就喜欢在各种新软件中折腾，所有的这些因素叠加在一起，使我彻底心动，毫不犹豫地跳进了 Obsidian 的“坑”。",
          "When I first heard the name Obsidian, it felt as mysterious and magnetic as a gemstone. I have always been someone who enjoys trying new things, and the first time I heard about Obsidian was in a group chat. The name alone was enough to spark my curiosity. Friends kept recommending it one after another, which made me even more eager to try it. Later, after I joined a new company, my team lead also strongly recommended it to us. On top of that, I already liked tinkering with new software. All of those factors together made me fully curious, and I jumped into the Obsidian rabbit hole without hesitation.",
        ),
      },
      {
        type: "heading",
        level: "h2",
        text: t("蜜月期", "The Honeymoon Phase"),
      },
      {
        type: "paragraph",
        text: t(
          "在最初使用 Obsidian 的那段时间，我仿佛置身于一个充满惊喜的世界。",
          "During the first stretch of using Obsidian, it felt like I had entered a world full of surprises.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "本地存储模式简直太酷了！我用它建立了好多个工作区，随时切换，还不用担心云端服务可能出现的数据泄露、服务中断或者是隐私被侵犯等问题。这让我对自己的笔记内容有了绝对的掌控感与安全感。然后就是它丰富的插件生态。",
          "The local storage model felt amazing. I created several workspaces with it and could switch between them anytime, without worrying about data leaks, service outages, or privacy issues from the cloud. That gave me a strong sense of control and safety over my notes. Then there was the rich plugin ecosystem.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "Obsidian 的插件市场也是类型齐全，应有尽有。无论是用来提升编辑体验，还是优化界面布局，亦或是增强搜索功能，都能找到对应的插件。在所有的笔记类软件中， Obsidian 的定制化能力可谓一骑绝尘，每一个细微需求似乎都可以进行个性化的塑造。",
          "Obsidian's plugin marketplace had almost everything I could think of. Whether I wanted a better editing experience, a cleaner layout, or stronger search features, there was always a plugin for it. Among note-taking apps, Obsidian's customization power felt unmatched. It seemed like almost every tiny need could be shaped into something personal.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "最后是深色主题。我可太爱深色主题了，在这上面我折腾的时间仅次于功能类插件。每当我打开 Obsidian 开始写作，那种沉浸感就如同置身于一个静谧的创作空间，让我能够心无旁骛地将思绪转化为文字，完全陶醉其中。",
          "And then there was the dark theme. I absolutely loved dark themes, and I spent almost as much time tweaking that as I did on functional plugins. Every time I opened Obsidian to write, it felt like stepping into a quiet creative space, where I could turn thoughts into words without distraction and become completely absorbed.",
        ),
      },
      {
        type: "heading",
        level: "h2",
        text: t("使用痛点", "Pain Points"),
      },
      {
        type: "paragraph",
        text: t(
          "然而，随着使用的深入，问题也逐渐浮现。",
          "But as I used it more deeply, the problems slowly started to surface.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "首先是图片管理和编辑功能，实在是鸡肋得让人无奈。与其他类笔记软件相比，Obsidian 使用起来是真难受。比如，想要对插入的图片进行简单的裁剪、调整大小或者添加标注，都难以实现，这给我的笔记创作带来了很大的不便。",
          "First, the image management and editing tools were frustratingly limited. Compared with other note apps, Obsidian was genuinely inconvenient to use here. Simple things like cropping an inserted image, resizing it, or adding annotations were difficult to do, and that made note-making much less smooth.",
        ),
      },
      {
        type: "paragraph",
        text: t(
          "再者，虽然插件众多，我一下子搞了十几个，但是真正能熟练运用并发挥作用的却寥寥无几。很多插件在安装后，由于复杂的设置和使用流程，最后只能闲置在那里，白白浪费了时间和精力去尝试和摸索。 后来我反思了一下，自定义功能强大有时候未必是一件好事。就如同Iphone 和安卓，苹果手机相对封闭和简洁，用户操作简单直观；而安卓手机虽然提供了极高的自定义权限，但也正因如此，容易导致系统的复杂性和不稳定性增加。最新的 WWDC 的上，除了 AI 功能外的最大看点居然是客制化桌面，而且还那么丑，诶苹果也是堕落已久了…Obsidian 同样如此，过度的自定义选项让我在设置和调整时常常感到困惑和迷茫，感觉自己偏离了记笔记的初心（更好地思考与写作），反而影响了使用的效率和体验。",
          "Second, even though there were tons of plugins, and I installed more than ten at once, only a few of them actually became tools I could use confidently. Many plugins ended up sitting there unused because the setup and workflow were too complicated, and I spent time and energy just trying to figure them out. Looking back, I realized that powerful customization is not always a good thing. It is a bit like iPhone versus Android: Apple is relatively closed and simple, so the user experience is straightforward and direct; Android offers far more customization, but that also tends to increase complexity and instability. Even at the latest WWDC, one of the biggest highlights besides AI was desktop customization, and it looked so ugly. Apple has probably been drifting for a long time now. Obsidian felt similar. Too many customization options made me confused during setup and adjustment, and I started to feel that I was drifting away from the original purpose of note-taking: thinking and writing better. In the end, it hurt my efficiency and experience instead of helping them.",
        ),
      },
      {
        type: "heading",
        level: "h2",
        text: t("迷茫与影响", "Confusion and Impact"),
      },
      {
        type: "paragraph",
        text: t(
          "在经历了对 Obsidian 的期待与兴奋之后，我也陷入了一些困扰之中。 为了找到最适合自己的笔记软件，我在多个不同的产品之间来回切换。但这种频繁的尝试不仅耗费了大量的时间和精力，还使得我的知识管理逐渐失控。不同软件之间的格式差异、存储方式以及操作习惯的不同，导致我的笔记分散在各个地方，难以形成一个统一、有序的知识体系。 而且，实际使用中发现，Obsidian 的打开频率并没有我最初预期的那么高。或许是因为在使用过程中遇到的种种问题降低了我的积极性，又或许是它并没有真正完美地契合我的日常工作和学习需求。 另外，当我想要放弃 Obsidian 转向其他软件时，内容迁移的困难又成为了一座难以跨越的大山。插件市场上没有太好的迁移工具可以使用，手动迁移又过于繁琐且容易出错，这让我在是否彻底放弃 Obsidian 的抉择上犹豫不决。",
          "After the initial excitement and expectations around Obsidian, I also found myself getting stuck. In search of the note app that fit me best, I kept switching between different products. But that constant experimenting consumed a huge amount of time and energy, and my knowledge management gradually became harder to control. Differences in format, storage, and interaction style across apps scattered my notes everywhere, making it difficult to build a unified and orderly system of knowledge. In practice, I also found that I did not open Obsidian nearly as often as I expected. Maybe the problems I ran into reduced my enthusiasm, or maybe it simply did not fully match my daily work and study needs. On top of that, when I wanted to move away from Obsidian, the difficulty of migrating content became another mountain I had to climb. There were no especially good migration tools in the plugin marketplace, and manual migration was too tedious and error-prone. That left me hesitating over whether I should abandon Obsidian completely.",
        ),
      },
      {
        type: "heading",
        level: "h2",
        text: t("现在", "Now"),
      },
      {
        type: "paragraph",
        text: t(
          "时间回到 2024 的当下，我对待笔记工具的态度与看法进一步有了变化。 我明白了“弱水三千，只取一瓢饮”的道理。不再盲目追求功能繁多、看似强大的工具，而是更加注重软件与自身需求的契合度、使用的便捷性以及长期的稳定性。就像我现在在用的 Craft——主打工作记录，语雀——专业学习记录，Notion——日常经验沉淀。此外我的电脑里还沉睡着一众笔记产品，现在更多的是产品试用，体验其中的设计细节。后面我估计应该不会再轻易迁移到其他笔记类工具了…",
          "Fast forward to 2024, and my view of note-taking tools had changed again. I came to understand the idea of 'out of all the waters, I only take one cup.' I no longer blindly chased tools that looked powerful because they had more and more features. Instead, I paid more attention to how well the software matched my own needs, how easy it was to use, and whether it would stay stable over time. That is why I now use Craft for work notes, Yuque for more structured learning notes, and Notion for everyday knowledge capture. I still have a whole collection of note apps sitting quietly on my laptop, but now I mostly treat them as things to try out and study for their design details. I probably will not migrate to another note-taking tool so easily again.",
        ),
      },
      {
        type: "image",
        src: getBlogAssetUrl("obsidian-from-honeymoon-to-wakeup", "body-1.png"),
        alt: t(
          "Obsidian 笔记工具的相关配图",
          "Illustration related to the Obsidian note-taking app",
        ),
      },
    ],
  },
  {
    slug: "minimal-todos",
    section: "browse",
    title: t("简约 Todos", "Minimal Todos"),
    summary: t(
      "从传统待办事项列表的问题出发，重新理解 Burner List 这种更专注的待办方式。",
      "A look at why traditional todo lists break down, and how the Burner List model helps focus attention.",
    ),
    detailSummary: t(
      "这篇文章围绕传统 Todos 的问题、Burner List 系统的做法，以及它为什么能帮助人们重新聚焦最重要的任务。",
      "This article looks at the problems with traditional todos, how the Burner List system works, and why it helps people refocus on the most important tasks.",
    ),
    date: "2025年10月23日",
    category: t("指南", "GUIDE"),
    imageSrc: getBlogAssetUrl("minimal-todos", "cover.jpg"),
    imageAlt: t("简约 Todos 文章缩略图", "Thumbnail for Minimal Todos"),
    heroImageSrc: getBlogAssetUrl("minimal-todos", "cover.jpg"),
    heroImageAlt: t("简约 Todos 文章 banner", "Banner image for Minimal Todos"),
    supportsEnglishDetail: true,
    contentBlocks: [
      {
        type: "heading",
        level: "h4",
        text: t("传统 Todos 的问题", "The Problem with Traditional Todos"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t(
              "传统的待办事项列表大多是对他人优先级的反应，而不是自己的优先级。",
              "Traditional todo lists mostly react to other people's priorities, not my own.",
            ),
            nested: [],
          },
          {
            text: t(
              "完成任务后虽然会感到短暂的成就感，但更多的任务总是会接踵而来，让人感觉永远做不完。",
              "Even after finishing tasks, more tasks keep arriving, which makes it feel like the list never ends.",
            ),
            nested: [],
          },
          {
            text: t(
              "待办事项列表会加剧生活中“未完成感”。",
              "Todo lists amplify the feeling of unfinished business in daily life.",
            ),
            nested: [],
          },
        ],
      },
      {
        type: "paragraph",
        text: t("相应的，它的好处是", "The upside is:"),
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            text: t(
              "帮助人们将事情记录下来，避免所有事情都堆积在大脑中，从而减轻压力。",
              "They help people write things down so everything doesn't stay in their head, which reduces stress.",
            ),
            nested: [],
          },
          {
            text: t(
              "它可以将所有任务集中在一个地方，方便查看。",
              "They keep tasks in one place, making them easy to review.",
            ),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: t("Burner List 系统", "Burner List System"),
      },
      {
        type: "paragraph",
        text: t(
          "这是一个极其简单的纸质待办事项列表，强迫自己优先处理最重要的任务。它不是完美的，不会跟踪每一个细节，也无法同时处理多个项目。但正是这种局限性使得它更加专注。",
          "This is an extremely simple paper todo list that forces you to prioritize the most important task first. It is not perfect, does not track every detail, and cannot handle multiple projects at once. That limitation is exactly what makes it more focused.",
        ),
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: t("材料：", "Materials:"),
            nested: [
              {
                ordered: false,
                items: [
                  {
                    text: t("一张白纸", "A blank sheet of paper"),
                    nested: [],
                  },
                  {
                    text: t("一支笔", "A pen"),
                    nested: [],
                  },
                ],
              },
            ],
          },
          {
            text: t("步骤：", "Steps:"),
            nested: [
              {
                ordered: true,
                items: [
                  {
                    text: t("制作两列：", "Make two columns:"),
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: t(
                              "可以折叠纸张、画一条竖线或将纸张分成两部分，精确性并不重要。",
                              "You can fold the paper, draw a vertical line, or split the page in two. Precision does not matter.",
                            ),
                            nested: [],
                          },
                          {
                            text: t(
                              "重要的是创建了一个隐喻：左边 = 前置任务（front burner），右边 = 后置任务（back burner）。",
                              "What matters is the metaphor: left = front burner, right = back burner.",
                            ),
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: t("前置任务：", "Front burner:"),
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: t(
                              "在左上角写下最重要的项目名称并划线。",
                              "Write the name of the most important project in the upper-left corner and underline it.",
                            ),
                            nested: [],
                          },
                          {
                            text: t(
                              "然后列出与该项目相关的待办事项，这些任务是在未来几天内可以完成的，以推动项目进展。",
                              "Then list the tasks related to that project. These are tasks you can finish in the next few days to move the project forward.",
                            ),
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: t("留出空白：", "Leave space:"),
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: t(
                              "保持第一列的其余部分空白。Burner List 的目的不是高效利用纸张面积，而是高效利用时间和精力。",
                              "Leave the rest of the first column blank. The goal of Burner List is not to use paper efficiently, but to use time and energy efficiently.",
                            ),
                            nested: [],
                          },
                          {
                            text: t(
                              "空白空间可以让用户为最重要的项目添加更多任务，同时也有助于集中注意力。",
                              "The empty space helps users add more tasks to the most important project and also keeps attention focused.",
                            ),
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: t("后置任务：", "Back burner:"),
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: t(
                              "在右上角写下第二重要的项目名称并划线，然后在其下方写下相关待办事项。",
                              "Write the name of the second most important project in the upper-right corner, underline it, and list the related tasks below.",
                            ),
                            nested: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: t("厨房水槽（Kitchen Sink）：", "Kitchen sink:"),
                    nested: [
                      {
                        ordered: false,
                        items: [
                          {
                            text: t(
                              "在右列的中间位置，列出任何不属于项目1或项目2的杂项任务。",
                              "In the middle of the right column, list any miscellaneous tasks that do not belong to project 1 or project 2.",
                            ),
                            nested: [],
                          },
                          {
                            text: t(
                              "这些任务可以属于项目3、4或其他任何项目，但它们都被归入“厨房水槽”中。",
                              "These tasks could belong to project 3, 4, or any other project, but they all go into the \"kitchen sink\".",
                            ),
                            nested: [],
                          },
                          {
                            text: t(
                              "这种做法虽然与所有组织和生产力建议相悖，但通过限制空间和注意力，可以更好地利用时间。",
                              "Although this goes against most organization and productivity advice, limiting space and attention can help you use time better.",
                            ),
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
        text: t(
          "想象在页面左侧有一位厨师，他会将大部分注意力集中在前置任务上。虽然他也会偶尔关注后置任务，但前置任务才是主要的行动区域。",
          "Imagine a chef on the left side of the page. Most of their attention goes to the front burner tasks. They may glance at the back burner from time to time, but the front burner is the main action area.",
        ),
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            text: t(
              "Burner List 是有限的，无法容纳所有任务，因此需要放弃一些不那么重要的事情。",
              "Burner List is limited and cannot hold every task, so you need to let go of less important things.",
            ),
            nested: [],
          },
          {
            text: t(
              "Burner List 是可丢弃的，随着任务的完成，它会很快变得过时。",
              "Burner List is disposable. As tasks are completed, the list becomes outdated quickly.",
            ),
            nested: [],
          },
          {
            text: t(
              "重新创建列表的过程很重要，因为需要丢弃一些不再重要的未完成任务，并重新考虑当前最重要的任务是什么。",
              "Recreating the list matters because you need to discard unfinished tasks that are no longer important and reconsider what matters most right now.",
            ),
            nested: [],
          },
          {
            text: t(
              "最重要的是一次只能有一个最重要的项目。",
              "The most important thing is to have only one most important project at a time.",
            ),
            nested: [],
          },
        ],
      },
      {
        type: "heading",
        level: "h4",
        text: t("总结", "Summary"),
      },
      {
        type: "paragraph",
        text: t(
          "Burner List 系统的目的让自己专注于最重要的任务，而不是试图处理所有任务。它是一个简单、专注的系统，适合希望减少待办事项列表复杂性的人。最后，最重要的是根据自己的实际需要灵活调整。毕竟，规则存在的本身就是用来打破的，前提是你需要先熟悉规则。",
          "The point of Burner List is to keep yourself focused on the most important tasks instead of trying to handle everything. It is a simple, focused system for people who want to reduce todo-list complexity. In the end, the key is to adapt it to your own needs. After all, rules exist to be broken, but only after you understand them.",
        ),
      },
    ],
  },
];

function getBlogDateTimestamp(date) {
  const match = date.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);

  if (!match) {
    return 0;
  }

  const [, year, month, day] = match;

  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

export const featuredBlogPosts = blogPosts.filter((post) => post.section === "featured");

// Browse all 需要把 featured 文章也包含进来，并且按发布时间倒序显示。
export const blogIndexPosts = [...blogPosts].sort(
  (left, right) => getBlogDateTimestamp(right.date) - getBlogDateTimestamp(left.date)
);
