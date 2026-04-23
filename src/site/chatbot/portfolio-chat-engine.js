import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  getLocalizedChatValue,
  portfolioChatKnowledge,
} from "./portfolio-chat-knowledge";

const TOPIC_KEYWORDS = {
  contact: [
    "contact",
    "email",
    "mail",
    "reach",
    "hire",
    "联系方式",
    "联系",
    "邮箱",
    "邮件",
    "招聘",
  ],
  experience: [
    "experience",
    "career",
    "work history",
    "resume",
    "cv",
    "经历",
    "工作经历",
    "履历",
    "简历",
    "公司",
  ],
  methods: [
    "approach",
    "process",
    "method",
    "how do you design",
    "workflow",
    "设计方法",
    "方法",
    "流程",
    "怎么设计",
    "如何设计",
  ],
  profile: [
    "who are you",
    "introduce yourself",
    "about you",
    "about yourself",
    "profile",
    "你是谁",
    "介绍一下你自己",
    "自我介绍",
    "关于你",
  ],
  projects: [
    "project",
    "projects",
    "case study",
    "portfolio",
    "work",
    "作品",
    "项目",
    "案例",
    "作品集",
  ],
  skills: [
    "skill",
    "skills",
    "strength",
    "strengths",
    "tool",
    "tools",
    "技能",
    "能力",
    "擅长",
    "工具",
  ],
};

const OUT_OF_SCOPE_KEYWORDS = [
  "weather",
  "stock",
  "bitcoin",
  "crypto",
  "medical",
  "diagnosis",
  "president",
  "movie",
  "nba",
  "recipe",
  "天气",
  "股票",
  "比特币",
  "医学",
  "诊断",
  "电影",
  "篮球",
  "食谱",
];

function normalizeQuestion(question) {
  return question.trim().toLowerCase();
}

function normalizePathname(pathname) {
  return typeof pathname === "string" && pathname ? pathname : "/";
}

function detectProject(projects, normalizedQuestion) {
  return projects.find((project) =>
    project.aliases.some((alias) => normalizedQuestion.includes(alias.toLowerCase()))
  );
}

function detectProjectByPathname(projects, pathname) {
  const normalizedPathname = normalizePathname(pathname);
  const isProjectDetailPage = normalizedPathname.startsWith("/work/");

  if (!isProjectDetailPage) {
    return null;
  }

  return projects.find((project) => project.relatedPages.includes(normalizedPathname));
}

function detectTopic(normalizedQuestion) {
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some((keyword) => normalizedQuestion.includes(keyword))) {
      return topic;
    }
  }

  return null;
}

function isOutOfScope(normalizedQuestion) {
  return OUT_OF_SCOPE_KEYWORDS.some((keyword) =>
    normalizedQuestion.includes(keyword)
  );
}

function buildProjectOverview(projects, language) {
  if (language === "zh") {
    return [
      "我目前最希望你先看的重点项目有：",
      ...projects.slice(0, 4).map((project) => `- ${project.title}：${project.oneLiner}`),
      "",
      "如果你愿意，我可以继续展开其中任意一个项目的背景、我的角色、关键决策或结果。",
    ].join("\n");
  }

  return [
    "The featured projects I would start with are:",
    ...projects
      .slice(0, 4)
      .map((project) => `- ${project.title}: ${project.oneLiner}`),
    "",
    "If you want, I can go deeper into the background, my role, key decisions, or outcomes for any one of them.",
  ].join("\n");
}

function buildProjectAnswer(project, language) {
  if (language === "zh") {
    return [
      `${project.title}：${project.oneLiner}`,
      "",
      `项目背景：${project.background}`,
      `我的角色：${project.myRole}`,
      `设计问题：${project.problem}`,
      `我是怎么做的：${project.process}`,
      `关键决策：${project.keyDecisions}`,
      `结果：${project.outcome}`,
    ].join("\n");
  }

  return [
    `${project.title}: ${project.oneLiner}`,
    "",
    `Background: ${project.background}`,
    `My role: ${project.myRole}`,
    `Design problem: ${project.problem}`,
    `What I did: ${project.process}`,
    `Key decisions: ${project.keyDecisions}`,
    `Outcome: ${project.outcome}`,
  ].join("\n");
}

function buildProjectChallengeAnswer(project, language) {
  if (language === "zh") {
    return [
      `${project.title} 里最难的设计挑战，核心通常在这里：`,
      "",
      project.problem,
      "",
      `我当时的处理方式是：${project.process}`,
    ].join("\n");
  }

  return [
    `The hardest design challenge in ${project.title} was mainly this:`,
    "",
    project.problem,
    "",
    `My way of handling it was: ${project.process}`,
  ].join("\n");
}

function buildProjectDecisionAnswer(project, language) {
  if (language === "zh") {
    return [
      `${project.title} 里我做的关键决策，最重要的一层是：`,
      "",
      project.keyDecisions,
      "",
      `这些决策最终想解决的问题是：${project.problem}`,
    ].join("\n");
  }

  return [
    `One of the most important decisions I made in ${project.title} was this:`,
    "",
    project.keyDecisions,
    "",
    `Those decisions were meant to solve this problem: ${project.problem}`,
  ].join("\n");
}

function buildProjectOutcomeAnswer(project, language) {
  if (language === "zh") {
    return [
      `${project.title} 的结果可以概括成这样：`,
      "",
      project.outcome,
      "",
      `如果你愿意，我也可以继续展开我在这个项目里的具体职责和过程。`,
    ].join("\n");
  }

  return [
    `The outcome of ${project.title} can be summarized like this:`,
    "",
    project.outcome,
    "",
    "If you'd like, I can also go deeper into my role and the design process behind it.",
  ].join("\n");
}

function detectProjectIntent(normalizedQuestion) {
  if (
    /最难|挑战|难点|challenge|hardest|difficult/.test(normalizedQuestion)
  ) {
    return "challenge";
  }

  if (
    /关键决策|决策|decision|decisions/.test(normalizedQuestion)
  ) {
    return "decision";
  }

  if (
    /结果|成果|outcome|result/.test(normalizedQuestion)
  ) {
    return "outcome";
  }

  return null;
}

function buildExperienceAnswer(knowledge, language) {
  if (language === "zh") {
    return [
      "我的相关工作经历可以先概括成三段：",
      ...knowledge.experience.map(
        (item) =>
          `- ${item.dateRange}｜${item.company}｜${item.role}：${item.responsibilities[0]}`
      ),
      "",
      "如果你愿意，我也可以继续展开某一段经历里我负责的项目类型和设计重点。",
    ].join("\n");
  }

  return [
    "My relevant work experience can be summarized in three parts:",
    ...knowledge.experience.map(
      (item) =>
        `- ${item.dateRange} | ${item.company} | ${item.role}: ${item.responsibilities[0]}`
    ),
    "",
    "If you'd like, I can also go deeper into the types of projects and design focus in any one of these roles.",
  ].join("\n");
}

function buildSkillsAnswer(knowledge, language) {
  if (language === "zh") {
    return [
      "我的技能大致分成三组：",
      ...knowledge.skills.map((group) => `- ${group.category}：${group.items.map((item) => item.label || item).join("、")}`),
      "",
      "如果你是在评估岗位匹配，我也可以进一步说明我最强的能力组合是什么。",
    ].join("\n");
  }

  return [
    "I usually describe my skills in three groups:",
    ...knowledge.skills.map((group) => `- ${group.category}: ${group.items.map((item) => item.label || item).join(", ")}`),
    "",
    "If you're evaluating fit for a role, I can also explain which combination of strengths is the most representative of me.",
  ].join("\n");
}

function buildContactAnswer(knowledge, language) {
  const emailItem = knowledge.contact.items.find((item) => item.href?.startsWith("mailto:"));
  const socialItem = knowledge.contact.items.find((item) => Array.isArray(item.value));

  if (language === "zh") {
    return [
      knowledge.contact.intro,
      "",
      `邮箱：${emailItem?.value || "Zhaozirui721@gmail.com"}`,
      `社交平台：${(socialItem?.value || []).map((item) => item.label).join("、")}`,
    ].join("\n");
  }

  return [
    knowledge.contact.intro,
    "",
    `Email: ${emailItem?.value || "Zhaozirui721@gmail.com"}`,
    `Social platforms: ${(socialItem?.value || []).map((item) => item.label).join(", ")}`,
  ].join("\n");
}

function buildProfileAnswer(knowledge, language) {
  if (language === "zh") {
    return [
      knowledge.profile.summary,
      "",
      knowledge.profile.focus,
      `我比较有代表性的能力关键词包括：${knowledge.profile.strengths.join("、")}。`,
    ].join("\n");
  }

  return [
    knowledge.profile.summary,
    "",
    knowledge.profile.focus,
    `A few strengths that represent me well are: ${knowledge.profile.strengths.join(", ")}.`,
  ].join("\n");
}

function buildMethodAnswer(language) {
  if (language === "zh") {
    return [
      "我的设计方法通常不是先从视觉开始，而是先把复杂问题讲清楚。",
      "",
      "一般来说我会先理解业务目标和信息结构，再梳理关键任务链路与角色关系，然后用交互和界面把复杂性变得更容易理解，最后再关注方案是否真的能被团队落地和持续迭代。",
      "",
      "这也是为什么我的很多项目会同时强调系统化思维、可交付性和设计决策的清晰表达。",
    ].join("\n");
  }

  return [
    "My design approach usually does not start from visuals. It starts from making the complexity understandable.",
    "",
    "In practice, I begin by understanding the business goal and information structure, then map the key task flows and role relationships, then use interaction and interface design to explain the complexity, and finally focus on whether the solution can actually ship and keep evolving with the team.",
    "",
    "That is why many of my projects emphasize systematic thinking, delivery rigor, and clear design decision-making at the same time.",
  ].join("\n");
}

function buildRefusalAnswer(knowledge) {
  return knowledge.guardrails.refusalMessage;
}

function buildRelatedPages(project) {
  return project?.relatedPages || ["/about", "/work"];
}

function buildSuggestedQuestions(project, knowledge, language, pathname) {
  if (project) {
    return project.recommendedQuestions;
  }

  const quickReplyById = new Map(
    knowledge.quickReplies.map((item) => [item.id, item.prompt])
  );

  if (pathname === "/work") {
    return [
      quickReplyById.get("featured-projects"),
      quickReplyById.get("drawing-ledger"),
      language === "zh"
        ? "讲讲 Axzo 设计系统门户"
        : "Tell me about the Axzo Design System Portal.",
    ].filter(Boolean);
  }

  if (pathname === "/about") {
    return [
      quickReplyById.get("intro"),
      quickReplyById.get("experience"),
      quickReplyById.get("contact"),
    ].filter(Boolean);
  }

  return knowledge.quickReplies.slice(0, 3).map((item) => item.prompt);
}

export function createPortfolioChatFallbackReply({ language, pathname, question }) {
  // fallback 的职责是“稳定保底”，不是无限模拟聊天机器人。
  // 这里优先保留正式版也一定需要的几类能力：固定信息、项目摘要、边界拒答和异常兜底。
  const localizedKnowledge = getLocalizedChatValue(portfolioChatKnowledge, language);
  const normalizedQuestion = normalizeQuestion(question);
  const normalizedPathname = normalizePathname(pathname);
  const explicitProject = detectProject(localizedKnowledge.projects, normalizedQuestion);
  const projectFromPathname = detectProjectByPathname(
    localizedKnowledge.projects,
    normalizedPathname
  );
  const project = explicitProject || projectFromPathname || null;
  const projectIntent = detectProjectIntent(normalizedQuestion);
  const topic = detectTopic(normalizedQuestion);

  if (!normalizedQuestion) {
    return {
      answer:
        language === "zh"
          ? "你可以问我关于项目、经历、技能、设计方法或联系方式的问题。"
          : "You can ask me about projects, experience, skills, design approach, or contact information.",
      relatedPages: projectFromPathname?.relatedPages || ["/work", "/about"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        projectFromPathname,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (isOutOfScope(normalizedQuestion)) {
    return {
      answer: buildRefusalAnswer(localizedKnowledge),
      relatedPages: projectFromPathname?.relatedPages || ["/work", "/about"],
      source: "guardrail",
      suggestedQuestions: buildSuggestedQuestions(
        projectFromPathname,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (project) {
    if (projectIntent === "challenge") {
      return {
        answer: buildProjectChallengeAnswer(project, language),
        relatedPages: buildRelatedPages(project),
        source: "fallback",
        suggestedQuestions: buildSuggestedQuestions(
          project,
          localizedKnowledge,
          language,
          normalizedPathname
        ),
      };
    }

    if (projectIntent === "decision") {
      return {
        answer: buildProjectDecisionAnswer(project, language),
        relatedPages: buildRelatedPages(project),
        source: "fallback",
        suggestedQuestions: buildSuggestedQuestions(
          project,
          localizedKnowledge,
          language,
          normalizedPathname
        ),
      };
    }

    if (projectIntent === "outcome") {
      return {
        answer: buildProjectOutcomeAnswer(project, language),
        relatedPages: buildRelatedPages(project),
        source: "fallback",
        suggestedQuestions: buildSuggestedQuestions(
          project,
          localizedKnowledge,
          language,
          normalizedPathname
        ),
      };
    }

    return {
      answer: buildProjectAnswer(project, language),
      relatedPages: buildRelatedPages(project),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        project,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (topic === "projects") {
    return {
      answer: buildProjectOverview(localizedKnowledge.projects, language),
      relatedPages: ["/work"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        projectFromPathname,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (topic === "experience") {
    return {
      answer: buildExperienceAnswer(localizedKnowledge, language),
      relatedPages: ["/about"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        null,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (topic === "skills") {
    return {
      answer: buildSkillsAnswer(localizedKnowledge, language),
      relatedPages: ["/about", "/"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        null,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (topic === "contact") {
    return {
      answer: buildContactAnswer(localizedKnowledge, language),
      relatedPages: ["/about"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        null,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (topic === "methods") {
    return {
      answer: buildMethodAnswer(language),
      relatedPages: ["/", "/work"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        projectFromPathname,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  if (topic === "profile") {
    return {
      answer: buildProfileAnswer(localizedKnowledge, language),
      relatedPages: ["/about", "/"],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestions(
        null,
        localizedKnowledge,
        language,
        normalizedPathname
      ),
    };
  }

  return {
    answer: buildRefusalAnswer(localizedKnowledge),
    relatedPages: projectFromPathname?.relatedPages || ["/work", "/about"],
    source: "guardrail",
    suggestedQuestions: buildSuggestedQuestions(
      projectFromPathname,
      localizedKnowledge,
      language,
      normalizedPathname
    ),
  };
}

function buildPromptKnowledge(localizedKnowledge) {
  return JSON.stringify(
    {
      contact: localizedKnowledge.contact,
      experience: localizedKnowledge.experience,
      faq: localizedKnowledge.faq,
      guardrails: localizedKnowledge.guardrails,
      profile: localizedKnowledge.profile,
      projects: localizedKnowledge.projects,
      skills: localizedKnowledge.skills,
    },
    null,
    2
  );
}

function shouldUseModel(question, fallbackReply) {
  return fallbackReply.source !== "guardrail" && Boolean(question.trim());
}

function isInsufficientQuotaError(error) {
  const errorText = String(error?.message || "");

  if (errorText.toLowerCase().includes("insufficient_quota")) {
    return true;
  }

  if (!Array.isArray(error?.errors)) {
    return false;
  }

  return error.errors.some((nestedError) =>
    String(nestedError?.responseBody || "").includes("insufficient_quota")
  );
}

export async function createPortfolioChatReply({ language, pathname, question }) {
  const fallbackReply = createPortfolioChatFallbackReply({
    language,
    pathname,
    question,
  });

  if (!shouldUseModel(question, fallbackReply)) {
    return fallbackReply;
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      ...fallbackReply,
      notice:
        process.env.NODE_ENV === "production"
          ? undefined
          : language === "zh"
            ? "当前未配置 OPENAI_API_KEY，聊天已使用站内知识库兜底回答。"
            : "OPENAI_API_KEY is not configured, so the chat is currently using the on-site knowledge fallback mode.",
    };
  }

  const localizedKnowledge = getLocalizedChatValue(portfolioChatKnowledge, language);

  try {
    const result = await generateText({
      model: openai.responses("gpt-5.4"),
      system:
        language === "zh"
          ? [
              "你是作品集网站里的 Portfolio Chatbot，只能回答这个作品集相关的问题。",
              "允许回答的话题只有：个人介绍、项目介绍、工作经历、设计方法、技能、联系方式。",
              "如果问题超出范围，必须礼貌拒答，并把话题引回作品集。",
              "只能基于提供的知识回答，不要编造没有给出的事实。",
              "如果知识里没有明确答案，要坦诚说明这个作品集里没有公开写到。",
              "回答语气要冷静、可信、简洁，像作品集里的本人分身，而不是客服。",
              "默认用 3 到 6 句完成回答；只有在列举经历或技能时才适度使用列表。",
            ].join("\n")
          : [
              "You are the Portfolio Chatbot inside a portfolio website and may only answer portfolio-related questions.",
              "Allowed topics are only: profile, projects, experience, design approach, skills, and contact.",
              "If the question is out of scope, politely refuse and steer the conversation back to the portfolio.",
              "Answer only from the provided knowledge and do not invent facts.",
              "If the answer is not clearly covered by the knowledge, say that it is not publicly specified in the portfolio.",
              "Keep the tone calm, credible, and concise, like the portfolio owner speaking directly, not a customer support bot.",
              "Default to 3 to 6 sentences unless a short list is genuinely clearer for experience or skills.",
            ].join("\n"),
      prompt:
        (language === "zh"
          ? `以下是作品集知识库：\n${buildPromptKnowledge(localizedKnowledge)}\n\n用户问题：${question}\n\n请直接给出最终回答。`
          : `Here is the portfolio knowledge base:\n${buildPromptKnowledge(localizedKnowledge)}\n\nUser question: ${question}\n\nReturn only the final answer.`),
    });

    return {
      ...fallbackReply,
      answer: result.text.trim() || fallbackReply.answer,
      source: "model",
    };
  } catch (error) {
    console.error("Portfolio chat generation failed, using fallback reply instead.", error);

    return {
      ...fallbackReply,
      notice:
        isInsufficientQuotaError(error)
          ? language === "zh"
            ? "当前 OPENAI API key 已接入，但账户额度不足，所以聊天已切换为站内知识库兜底回答。"
            : "The OPENAI API key is connected, but the account has insufficient quota, so the chat fell back to the on-site knowledge mode."
          : language === "zh"
            ? "当前回答已切换为站内知识兜底模式。"
            : "The reply fell back to the on-site knowledge mode.",
    };
  }
}
