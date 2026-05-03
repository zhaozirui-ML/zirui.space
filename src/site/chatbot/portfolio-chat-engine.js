import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

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

function detectProjectFromMessages(projects, messages) {
  if (!Array.isArray(messages) || !messages.length) {
    return null;
  }

  const recentMessages = [...messages].slice(-8).reverse();

  for (const message of recentMessages) {
    if (!message || typeof message.content !== "string") {
      continue;
    }

    const normalizedContent = normalizeQuestion(message.content);
    let matchedProject = null;
    let bestIndex = Number.POSITIVE_INFINITY;

    for (const project of projects) {
      const aliasIndexes = project.aliases
        .map((alias) => normalizedContent.indexOf(alias.toLowerCase()))
        .filter((index) => index >= 0);

      if (!aliasIndexes.length) {
        continue;
      }

      const aliasIndex = Math.min(...aliasIndexes);

      if (aliasIndex < bestIndex) {
        bestIndex = aliasIndex;
        matchedProject = project;
      }
    }

    if (matchedProject) {
      return matchedProject;
    }
  }

  return null;
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
      "如果你想先快速理解我做的事，我通常会先带你看这几个重点项目：",
      ...projects.slice(0, 4).map((project) => `- ${project.title}：${project.oneLiner}`),
      "",
      "你如果想的话，我可以继续挑其中一个，往下讲挑战、关键决策、结果，或者我现在回头看的反思。",
    ].join("\n");
  }

  return [
    "If you want the quickest read on the kind of work I do, I would usually start with these projects:",
    ...projects
      .slice(0, 4)
      .map((project) => `- ${project.title}: ${project.oneLiner}`),
    "",
    "If you want, I can take any one of them further into the challenge, the key decisions, the outcome, or what I learned from it.",
  ].join("\n");
}

function buildProjectAnswer(project, language) {
  if (language === "zh") {
    return [
      `${project.title} 这个项目，我会先把它理解成：${project.oneLiner}`,
      "",
      `${project.background} 在这个项目里，${project.myRole}`,
      "",
      `当时最核心的问题是：${project.problem}`,
      `我的处理方式是：${project.process}`,
      "",
      `这里最关键的设计判断是：${project.keyDecisions}`,
      `最后产出的结果是：${project.outcome}`,
      "",
      `如果现在回头看，我对这个项目最明确的反思是：${project.reflection}`,
    ].join("\n");
  }

  return [
    `I would frame ${project.title} like this: ${project.oneLiner}`,
    "",
    `${project.background} In this project, ${project.myRole}`,
    "",
    `The core problem was: ${project.problem}`,
    `My approach was: ${project.process}`,
    "",
    `The most important design judgment here was: ${project.keyDecisions}`,
    `The final outcome was: ${project.outcome}`,
    "",
    `Looking back, my clearest reflection on this project is: ${project.reflection}`,
  ].join("\n");
}

function buildProjectChallengeAnswer(project, language) {
  if (language === "zh") {
    return [
      `如果只说 ${project.title} 里最难的一层，我会强调这里：`,
      "",
      project.problem,
      "",
      `我当时是这样拆这个问题的：${project.process}`,
    ].join("\n");
  }

  return [
    `If I had to isolate the hardest part of ${project.title}, I would describe it like this:`,
    "",
    project.problem,
    "",
    `This is how I approached it: ${project.process}`,
  ].join("\n");
}

function buildProjectDecisionAnswer(project, language) {
  if (language === "zh") {
    return [
      `在 ${project.title} 里，我做过几个关键判断，但最重要的一层是：`,
      "",
      project.keyDecisions,
      "",
      `这些判断本质上都是为了回应这个问题：${project.problem}`,
    ].join("\n");
  }

  return [
    `I made several important decisions in ${project.title}, but the one I would highlight first is this:`,
    "",
    project.keyDecisions,
    "",
    `Those decisions were fundamentally trying to solve this problem: ${project.problem}`,
  ].join("\n");
}

function buildProjectOutcomeAnswer(project, language) {
  if (language === "zh") {
    return [
      `如果只看 ${project.title} 的结果，我会这样概括：`,
      "",
      project.outcome,
      "",
      `如果你愿意，我也可以继续展开我在这个项目里的职责、取舍和反思。`,
    ].join("\n");
  }

  return [
    `If I had to summarize the outcome of ${project.title}, I would put it like this:`,
    "",
    project.outcome,
    "",
    "If you'd like, I can also go deeper into my role, the tradeoffs, and what I learned from it.",
  ].join("\n");
}

function buildProjectReflectionAnswer(project, language) {
  if (language === "zh") {
    return [
      `如果现在回头看 ${project.title}，我最明确的一层反思是：`,
      "",
      project.reflection,
      "",
      `这也和我当时面对的核心问题有关：${project.problem}`,
    ].join("\n");
  }

  return [
    `Looking back at ${project.title}, my clearest reflection is this:`,
    "",
    project.reflection,
    "",
    `That reflection is closely tied to the original problem: ${project.problem}`,
  ].join("\n");
}

function buildProjectRoleAnswer(project, language) {
  if (language === "zh") {
    return [
      `如果只聚焦我在 ${project.title} 里的职责，我会这样说：`,
      "",
      project.myRole,
      "",
      `这也是为什么我在这个项目里会重点处理：${project.problem}`,
    ].join("\n");
  }

  return [
    `If I focus only on my role in ${project.title}, I would put it like this:`,
    "",
    project.myRole,
    "",
    `That is also why I spent most of my effort on this problem: ${project.problem}`,
  ].join("\n");
}

function buildProjectBackgroundAnswer(project, language) {
  if (language === "zh") {
    return [
      `如果先讲 ${project.title} 的背景，我会这样展开：`,
      "",
      project.background,
      "",
      `我当时介入这个项目时，负责的是：${project.myRole}`,
    ].join("\n");
  }

  return [
    `If I start with the background of ${project.title}, I would explain it like this:`,
    "",
    project.background,
    "",
    `When I joined this work, my role was: ${project.myRole}`,
  ].join("\n");
}

function buildProjectTradeoffAnswer(project, language) {
  if (language === "zh") {
    return [
      `如果说 ${project.title} 里最关键的取舍，我会这样理解：`,
      "",
      project.keyDecisions,
      "",
      `这些取舍并不是单纯偏好问题，而是为了平衡这个核心矛盾：${project.problem}`,
    ].join("\n");
  }

  return [
    `If I had to explain the most important tradeoff in ${project.title}, I would frame it this way:`,
    "",
    project.keyDecisions,
    "",
    `Those tradeoffs were not just preferences. They were a way to balance this core tension: ${project.problem}`,
  ].join("\n");
}

function detectProjectIntent(normalizedQuestion) {
  if (
    /取舍|权衡|tradeoff|trade-off|trade off/.test(normalizedQuestion)
  ) {
    return "tradeoff";
  }

  if (
    /最难|挑战|难点|challenge|hardest|difficult/.test(normalizedQuestion)
  ) {
    return "challenge";
  }

  if (
    /关键决策|决策|判断|decision|decisions|judgment|judgments/.test(normalizedQuestion)
  ) {
    return "decision";
  }

  if (
    /结果|成果|outcome|result/.test(normalizedQuestion)
  ) {
    return "outcome";
  }

  if (
    /反思|复盘|回头看|learn|learning|reflection|looking back|takeaway/.test(
      normalizedQuestion
    )
  ) {
    return "reflection";
  }

  if (
    /职责|角色|负责|role|responsibility|responsibilities/.test(
      normalizedQuestion
    )
  ) {
    return "role";
  }

  if (
    /背景|为什么做|起点|background|context|why this project/.test(
      normalizedQuestion
    )
  ) {
    return "background";
  }

  return null;
}

function isImplicitProjectFollowup(normalizedQuestion) {
  return /继续|展开|细讲|详细说说|挑一个|选一个|this one|that one|go deeper|tell me more|keep going/.test(
    normalizedQuestion
  );
}

function detectIntentFromQuestion(question) {
  return detectProjectIntent(normalizeQuestion(question));
}

function buildExperienceAnswer(knowledge, language) {
  if (language === "zh") {
    return [
      "如果从经历看我做过什么，我通常会先这样概括：",
      ...knowledge.experience.map(
        (item) =>
          `- ${item.dateRange}｜${item.company}｜${item.role}：${item.responsibilities[0]}`
      ),
      "",
      "如果你愿意，我也可以继续展开其中一段经历里我负责的项目类型，以及我当时最关注的设计问题。",
    ].join("\n");
  }

  return [
    "If I were to summarize my experience quickly, I would frame it like this:",
    ...knowledge.experience.map(
      (item) =>
        `- ${item.dateRange} | ${item.company} | ${item.role}: ${item.responsibilities[0]}`
    ),
    "",
    "If you'd like, I can also go deeper into the project types and design focus inside any one of those roles.",
  ].join("\n");
}

function buildSkillsAnswer(knowledge, language) {
  if (language === "zh") {
    return [
      "如果把我的能力拆开来看，我一般会分成这几组：",
      ...knowledge.skills.map((group) => `- ${group.category}：${group.items.map((item) => item.label || item).join("、")}`),
      "",
      "如果你是在判断岗位匹配，我也可以继续讲哪一组能力最能代表我，以及它们在项目里是怎么组合起来的。",
    ].join("\n");
  }

  return [
    "If I break my strengths down, I usually describe them in these groups:",
    ...knowledge.skills.map((group) => `- ${group.category}: ${group.items.map((item) => item.label || item).join(", ")}`),
    "",
    "If you're evaluating fit for a role, I can also explain which combination of strengths represents me best in actual project work.",
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
      `如果只挑最能代表我的几个关键词，我会说是：${knowledge.profile.strengths.join("、")}。`,
    ].join("\n");
  }

  return [
    knowledge.profile.summary,
    "",
    knowledge.profile.focus,
    `If I had to pick the strengths that represent me best, I would say: ${knowledge.profile.strengths.join(", ")}.`,
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

function getProjectDetailPath(project) {
  return project?.relatedPages.find((page) => page.startsWith("/work/")) || "/work";
}

function isViewingProjectDetail(project, pathname) {
  return Boolean(project && pathname === getProjectDetailPath(project));
}

function buildRelatedProjectEntries(projects, targetSlugs, language) {
  return (targetSlugs || [])
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean)
    .map((project) => ({
      kind: "related-project",
      path: getProjectDetailPath(project),
      reason:
        language === "zh"
          ? project.oneLiner
          : project.oneLiner,
      slug: project.slug,
      title: project.title,
    }));
}

function getCurrentProjectEyebrow(projectIntent, language) {
  const labels = {
    background: {
      zh: "当前正在聊：项目背景",
      en: "Currently discussing: project background",
    },
    challenge: {
      zh: "当前正在聊：设计挑战",
      en: "Currently discussing: design challenge",
    },
    decision: {
      zh: "当前正在聊：关键决策",
      en: "Currently discussing: key decisions",
    },
    outcome: {
      zh: "当前正在聊：项目结果",
      en: "Currently discussing: project outcome",
    },
    reflection: {
      zh: "当前正在聊：项目反思",
      en: "Currently discussing: reflection",
    },
    role: {
      zh: "当前正在聊：我的职责",
      en: "Currently discussing: my role",
    },
    tradeoff: {
      zh: "当前正在聊：关键取舍",
      en: "Currently discussing: key tradeoffs",
    },
  };

  return (
    labels[projectIntent]?.[language] ||
    (language === "zh" ? "当前正在聊：这个项目" : "Currently discussing: this project")
  );
}

function getCurrentProjectReason(project, projectIntent, language) {
  const reasons = {
    background:
      language === "zh"
        ? "如果你想把这个项目的起点、业务背景和我介入的角色放回完整上下文，可以直接打开案例页继续看。"
        : "If you want to place the project origin, business context, and my role back into the full story, open the full case study.",
    challenge:
      language === "zh"
        ? "如果你想把这个挑战放回完整流程里理解，直接打开案例页会更清楚。"
        : "If you want to understand this challenge inside the full workflow, opening the case study will make it much clearer.",
    decision:
      language === "zh"
        ? "如果你想连同信息架构、流程和跨端约束一起看这些判断，直接打开完整案例页。"
        : "If you want to see those decisions alongside the IA, workflow, and cross-platform constraints, open the full case study.",
    outcome:
      language === "zh"
        ? "如果你想看这些结果是怎么一步步成立的，直接打开案例页继续往下看。"
        : "If you want to see how those outcomes were built step by step, open the case study and continue there.",
    reflection:
      language === "zh"
        ? "如果你想把我的反思和当时的方案、结果一起看，完整案例会更有说服力。"
        : "If you want to read my reflection together with the original solution and outcome, the full case study will be more convincing.",
    role:
      language === "zh"
        ? "如果你想更具体地看我在这个项目里负责的模块、判断和产出，直接打开完整案例页。"
        : "If you want to see more concretely what I owned, decided, and delivered in this project, open the full case study.",
    tradeoff:
      language === "zh"
        ? "如果你想把这些取舍放回真实业务约束里理解，直接打开完整案例页会更自然。"
        : "If you want to understand those tradeoffs inside the real business constraints, opening the full case study will feel more natural.",
  };

  return (
    reasons[projectIntent] ||
    (language === "zh"
      ? `如果你想继续看 ${project.title} 的完整案例，可以直接打开项目页。`
      : `If you want to continue with the full ${project.title} case study, open the project page.`)
  );
}

function buildCurrentProjectEntry(project, projectIntent, language) {
  if (!project) {
    return null;
  }

  return {
    eyebrow: getCurrentProjectEyebrow(projectIntent, language),
    kind: "current-project",
    path: getProjectDetailPath(project),
    reason: getCurrentProjectReason(project, projectIntent, language),
    slug: project.slug,
    title: project.title,
  };
}

function dedupeRelatedProjects(entries) {
  const seenSlugs = new Set();

  return entries.filter((entry) => {
    if (!entry?.slug || seenSlugs.has(entry.slug)) {
      return false;
    }

    seenSlugs.add(entry.slug);
    return true;
  });
}

function dedupeQuestions(questions) {
  const seen = new Set();

  return questions.filter((question) => {
    if (!question || seen.has(question)) {
      return false;
    }

    seen.add(question);
    return true;
  });
}

function isSimilarQuestion(question, previousQuestion) {
  const normalizedQuestion = normalizeQuestion(question);
  const normalizedPreviousQuestion = normalizeQuestion(previousQuestion);

  if (!normalizedQuestion || !normalizedPreviousQuestion) {
    return false;
  }

  return (
    normalizedQuestion === normalizedPreviousQuestion ||
    normalizedQuestion.includes(normalizedPreviousQuestion) ||
    normalizedPreviousQuestion.includes(normalizedQuestion)
  );
}

function getAskedQuestionSignals(messages) {
  const userMessages = Array.isArray(messages)
    ? messages.filter((message) => message?.role === "user" && message.content)
    : [];

  return {
    intents: new Set(
      userMessages
        .map((message) => detectIntentFromQuestion(message.content))
        .filter(Boolean)
    ),
    questions: userMessages.map((message) => message.content),
  };
}

function getProjectIntentTrail(messages, project) {
  if (!project || !Array.isArray(messages)) {
    return [];
  }

  const userMessages = messages.filter(
    (message) => message?.role === "user" && typeof message.content === "string"
  );
  const intentTrail = [];
  let projectLocked = false;

  for (const message of userMessages) {
    const normalizedContent = normalizeQuestion(message.content);
    const mentionsProject = project.aliases.some((alias) =>
      normalizedContent.includes(alias.toLowerCase())
    );

    if (mentionsProject) {
      projectLocked = true;
    }

    const intent = detectProjectIntent(normalizedContent);

    if (intent && (mentionsProject || projectLocked)) {
      intentTrail.push(intent);
    }
  }

  return intentTrail;
}

function createConversationState({
  localizedKnowledge,
  messages,
  pathname,
  question,
}) {
  const normalizedQuestion = normalizeQuestion(question);
  const normalizedPathname = normalizePathname(pathname);
  const explicitProject = detectProject(
    localizedKnowledge.projects,
    normalizedQuestion
  );
  const projectFromPathname = detectProjectByPathname(
    localizedKnowledge.projects,
    normalizedPathname
  );
  const projectFromMessages = detectProjectFromMessages(
    localizedKnowledge.projects,
    messages
  );
  const activeProject =
    explicitProject || projectFromMessages || projectFromPathname || null;
  const projectIntent = detectProjectIntent(normalizedQuestion);
  const topic = detectTopic(normalizedQuestion);
  const projectIntentTrail = getProjectIntentTrail(messages, activeProject);

  return {
    activeProject,
    askedQuestionSignals: getAskedQuestionSignals(messages),
    coveredProjectIntents: new Set(projectIntentTrail),
    isProjectFollowup: isImplicitProjectFollowup(normalizedQuestion),
    normalizedPathname,
    normalizedQuestion,
    previousProjectIntent: projectIntentTrail.at(-1) || null,
    projectFromPathname,
    projectIntent,
    projectIntentTrail,
    question,
    topic,
  };
}

function buildRelatedProjects(
  project,
  topic,
  projects,
  language,
  pathname,
  projectIntent
) {
  const entries = [];
  const projectDetailPath = getProjectDetailPath(project);

  if (project && pathname !== projectDetailPath) {
    entries.push(buildCurrentProjectEntry(project, projectIntent, language));
  }

  if (project?.relatedProjectSlugs?.length) {
    entries.push(
      ...buildRelatedProjectEntries(
        projects,
        project.relatedProjectSlugs,
        language
      )
    );

    return dedupeRelatedProjects(entries).slice(0, 3);
  }

  if (topic === "methods") {
    entries.push(
      ...buildRelatedProjectEntries(
        projects,
        ["drawing-ledger-2-0", "axzo-design-system"],
        language
      )
    );

    return dedupeRelatedProjects(entries).slice(0, 3);
  }

  if (topic === "skills") {
    entries.push(
      ...buildRelatedProjectEntries(
        projects,
        ["drawing-ledger-2-0", "data-visualization-screen"],
        language
      )
    );

    return dedupeRelatedProjects(entries).slice(0, 3);
  }

  if (topic === "experience") {
    entries.push(
      ...buildRelatedProjectEntries(
        projects,
        ["drawing-ledger-2-0", "cloudtower-design-system"],
        language
      )
    );

    return dedupeRelatedProjects(entries).slice(0, 3);
  }

  entries.push(
    ...buildRelatedProjectEntries(
      projects,
      ["drawing-ledger-2-0", "axzo-design-system"],
      language
    )
  );

  return dedupeRelatedProjects(entries).slice(0, 3);
}

const PROJECT_FOLLOWUP_INTENT_WEIGHTS = {
  background: {
    challenge: 34,
    role: 22,
    decision: 18,
    tradeoff: 12,
  },
  challenge: {
    decision: 36,
    outcome: 26,
    reflection: 20,
    tradeoff: 16,
  },
  decision: {
    outcome: 34,
    reflection: 26,
    challenge: 12,
    tradeoff: 10,
  },
  outcome: {
    reflection: 36,
    tradeoff: 18,
    role: 14,
    background: 12,
    decision: 14,
    challenge: 10,
  },
  reflection: {
    challenge: 22,
    decision: 20,
    outcome: 12,
  },
  role: {
    challenge: 28,
    decision: 26,
    outcome: 16,
  },
  tradeoff: {
    decision: 32,
    outcome: 22,
    reflection: 22,
    challenge: 10,
  },
};

function buildDefaultProjectFollowupCandidates(language) {
  return [
    {
      intent: "challenge",
      question:
        language === "zh"
          ? "如果只讲这个项目里最关键的挑战，你会怎么讲？"
          : "If you focused only on the hardest challenge in this project, how would you explain it?",
    },
    {
      intent: "decision",
      question:
        language === "zh"
          ? "你在这个项目里做过哪些关键判断？"
          : "What were the most important judgments or decisions you made in this project?",
    },
    {
      intent: "outcome",
      question:
        language === "zh"
          ? "这个项目最后最有说服力的结果是什么？"
          : "What was the most convincing outcome of this project in the end?",
    },
    {
      intent: "reflection",
      question:
        language === "zh"
          ? "现在回头看，你最想重做哪一部分？"
          : "Looking back now, what part would you most want to redo?",
    },
    {
      intent: "tradeoff",
      question:
        language === "zh"
          ? "这个项目里最关键的取舍是什么？"
          : "What was the most important tradeoff in this project?",
    },
    {
      intent: "role",
      question:
        language === "zh"
          ? "你在这个项目里具体负责哪些部分？"
          : "What parts of this project were you directly responsible for?",
    },
    {
      intent: "background",
      question:
        language === "zh"
          ? "这个项目一开始为什么要做？"
          : "Why did this project need to happen in the first place?",
    },
  ].map((candidate, index) => ({
    ...candidate,
    baseScore: 52 - index,
    source: "default",
  }));
}

function buildProjectFollowupCandidates(project, language, isOnProjectDetail) {
  const recommendedCandidates = project.recommendedQuestions.map((question, index) => ({
    baseScore: 62 - index,
    intent: detectIntentFromQuestion(question) || "overview",
    question,
    source: "recommended",
  }));

  const candidates = [...recommendedCandidates];

  if (project.continuePrompt && !isOnProjectDetail) {
    candidates.push({
      baseScore: 68,
      intent: "overview",
      question: project.continuePrompt,
      source: "continue",
    });
  }

  candidates.push(...buildDefaultProjectFollowupCandidates(language));

  return candidates;
}

function scoreProjectFollowupCandidate(candidate, state, isOnProjectDetail) {
  let score = candidate.baseScore;

  if (state.projectIntent) {
    score +=
      PROJECT_FOLLOWUP_INTENT_WEIGHTS[state.projectIntent]?.[candidate.intent] || 0;

    if (candidate.intent === state.projectIntent) {
      score -= 28;
    }
  } else if (isOnProjectDetail && candidate.source === "default") {
    score += 18;
  }

  if (!isOnProjectDetail && candidate.source === "continue") {
    score += 16;
  }

  if (state.askedQuestionSignals.intents.has(candidate.intent)) {
    score -= 34;
  }

  if (
    state.askedQuestionSignals.questions.some((question) =>
      isSimilarQuestion(candidate.question, question)
    )
  ) {
    score -= 80;
  }

  return score;
}

function rankProjectFollowupCandidates(project, state, language) {
  if (!project) {
    return [];
  }

  const isOnProjectDetail = isViewingProjectDetail(
    project,
    state.normalizedPathname
  );
  const candidates = buildProjectFollowupCandidates(
    project,
    language,
    isOnProjectDetail
  );

  const rankedCandidates = candidates
    .map((candidate, index) => ({
      ...candidate,
      index,
      score: scoreProjectFollowupCandidate(candidate, state, isOnProjectDetail),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const selectedCandidates = [];
  const selectedIntents = new Set();

  for (const candidate of rankedCandidates) {
    if (selectedCandidates.length >= 4) {
      break;
    }

    if (candidate.intent !== "overview" && selectedIntents.has(candidate.intent)) {
      continue;
    }

    if (
      selectedCandidates.some((selectedCandidate) =>
        isSimilarQuestion(candidate.question, selectedCandidate.question)
      )
    ) {
      continue;
    }

    selectedCandidates.push(candidate);
    selectedIntents.add(candidate.intent);
  }

  for (const candidate of rankedCandidates) {
    if (selectedCandidates.length >= 4) {
      break;
    }

    if (
      selectedCandidates.some((selectedCandidate) =>
        isSimilarQuestion(candidate.question, selectedCandidate.question)
      )
    ) {
      continue;
    }

    selectedCandidates.push(candidate);
  }

  return dedupeQuestions(
    selectedCandidates.map((candidate) => candidate.question)
  ).slice(0, 4);
}

function buildGeneralSuggestionCandidates(knowledge, language, state) {
  const quickReplyById = new Map(
    knowledge.quickReplies.map((item) => [item.id, item.prompt])
  );

  if (state.topic === "projects") {
    return [
      quickReplyById.get("drawing-ledger"),
      language === "zh"
        ? "挑一个重点项目继续展开讲"
        : "Pick one featured project and go deeper.",
      language === "zh"
        ? "讲讲你做过的关键设计决策"
        : "Tell me about the key design decisions you have made.",
    ].filter(Boolean);
  }

  if (state.topic === "experience") {
    return [
      quickReplyById.get("experience"),
      quickReplyById.get("skills"),
      quickReplyById.get("contact"),
    ].filter(Boolean);
  }

  if (state.topic === "skills") {
    return [
      quickReplyById.get("skills"),
      quickReplyById.get("design-method"),
      quickReplyById.get("featured-projects"),
    ].filter(Boolean);
  }

  if (state.topic === "contact") {
    return [
      quickReplyById.get("featured-projects"),
      quickReplyById.get("experience"),
      quickReplyById.get("contact"),
    ].filter(Boolean);
  }

  if (state.topic === "methods") {
    return [
      quickReplyById.get("design-method"),
      quickReplyById.get("drawing-ledger"),
      language === "zh"
        ? "讲讲 Axzo 设计系统门户"
        : "Tell me about the Axzo Design System Portal.",
    ].filter(Boolean);
  }

  if (state.normalizedPathname === "/work") {
    return [
      quickReplyById.get("featured-projects"),
      quickReplyById.get("drawing-ledger"),
      language === "zh"
        ? "讲讲 Axzo 设计系统门户"
        : "Tell me about the Axzo Design System Portal.",
    ].filter(Boolean);
  }

  if (state.normalizedPathname === "/about") {
    return [
      quickReplyById.get("intro"),
      quickReplyById.get("experience"),
      quickReplyById.get("contact"),
    ].filter(Boolean);
  }

  return knowledge.quickReplies.slice(0, 3).map((item) => item.prompt);
}

function buildSuggestedQuestionsFromState(state, knowledge, language) {
  if (state.activeProject) {
    return rankProjectFollowupCandidates(state.activeProject, state, language);
  }

  return buildGeneralSuggestionCandidates(knowledge, language, state);
}

const PROJECT_ANSWER_BUILDERS = {
  background: buildProjectBackgroundAnswer,
  challenge: buildProjectChallengeAnswer,
  decision: buildProjectDecisionAnswer,
  outcome: buildProjectOutcomeAnswer,
  reflection: buildProjectReflectionAnswer,
  role: buildProjectRoleAnswer,
  tradeoff: buildProjectTradeoffAnswer,
};

const PROJECT_ANSWER_TRANSITIONS = {
  challenge: {
    decision: {
      zh: "顺着刚才那个挑战往下讲，最关键的判断在这里：",
      en: "Following that challenge, the most important decision sits here:",
    },
    outcome: {
      zh: "如果顺着刚才的挑战继续往下看，结果最值得看的部分是：",
      en: "If we continue from that challenge, the most important outcome to look at is this:",
    },
    reflection: {
      zh: "如果从刚才那个挑战回头看，我最明确的反思是：",
      en: "If I look back from that challenge, my clearest reflection is this:",
    },
  },
  decision: {
    outcome: {
      zh: "顺着刚才那些判断继续往下讲，最后形成的结果是：",
      en: "If I continue from those decisions, the resulting outcome is this:",
    },
    reflection: {
      zh: "如果从刚才那些判断回头看，我现在最明确的反思是：",
      en: "If I look back at those decisions now, my clearest reflection is this:",
    },
    tradeoff: {
      zh: "如果把刚才那些判断换成取舍的角度来看，核心其实在这里：",
      en: "If I reframe those decisions as tradeoffs, the core is really here:",
    },
  },
  outcome: {
    reflection: {
      zh: "如果从刚才那个结果再往后看，我最想补充的反思是：",
      en: "If I continue past that outcome, the reflection I most want to add is this:",
    },
    role: {
      zh: "如果顺着刚才那个结果回到我的职责上看，我主要负责的是：",
      en: "If I trace that outcome back to my role, what I mainly owned was this:",
    },
  },
};

function joinAnswerSections(...sections) {
  return sections.filter(Boolean).join("\n\n");
}

function buildProjectAnswerLead(project, state, language) {
  if (!state.projectIntent) {
    return null;
  }

  if (
    state.coveredProjectIntents.has(state.projectIntent) &&
    state.previousProjectIntent === state.projectIntent
  ) {
    return language === "zh"
      ? "这个角度上一轮已经提到过了，我换一个更聚焦的方式继续往下讲："
      : "We already touched on this angle in the previous turn, so I will continue with a more focused explanation:";
  }

  const transition =
    PROJECT_ANSWER_TRANSITIONS[state.previousProjectIntent]?.[state.projectIntent];

  if (transition) {
    return transition[language];
  }

  if (state.previousProjectIntent && state.previousProjectIntent !== state.projectIntent) {
    return language === "zh"
      ? "如果把刚才那一层再往下展开，我会这样接着讲："
      : "If I take the previous angle one step further, I would continue like this:";
  }

  return null;
}

function buildProjectAnswerFromState(project, state, language) {
  const lead = buildProjectAnswerLead(project, state, language);

  if (state.projectIntent && PROJECT_ANSWER_BUILDERS[state.projectIntent]) {
    return joinAnswerSections(
      lead,
      PROJECT_ANSWER_BUILDERS[state.projectIntent](project, language)
    );
  }

  if (state.isProjectFollowup && state.previousProjectIntent) {
    const followupLead =
      language === "zh"
        ? "我们已经锁定在这个项目上了，我继续顺着上一层往下展开："
        : "We are already anchored on this project, so I will keep unpacking the next layer:";

    return joinAnswerSections(followupLead, buildProjectAnswer(project, language));
  }

  return buildProjectAnswer(project, language);
}

export function createPortfolioChatFallbackReply({ language, messages = [], pathname, question }) {
  // fallback 的职责是“稳定保底”，不是无限模拟聊天机器人。
  // 这里优先保留正式版也一定需要的几类能力：固定信息、项目摘要、边界拒答和异常兜底。
  const localizedKnowledge = getLocalizedChatValue(portfolioChatKnowledge, language);
  const state = createConversationState({
    localizedKnowledge,
    messages,
    pathname,
    question,
  });
  const {
    activeProject,
    isProjectFollowup,
    normalizedPathname,
    normalizedQuestion,
    projectFromPathname,
    projectIntent,
    topic,
  } = state;

  if (!normalizedQuestion) {
    return {
      answer:
        language === "zh"
          ? "你可以问我关于项目、经历、技能、设计方法或联系方式的问题。"
          : "You can ask me about projects, experience, skills, design approach, or contact information.",
      relatedPages: projectFromPathname?.relatedPages || ["/work", "/about"],
      relatedProjects: buildRelatedProjects(
        projectFromPathname,
        null,
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (isOutOfScope(normalizedQuestion)) {
    return {
      answer: buildRefusalAnswer(localizedKnowledge),
      relatedPages: projectFromPathname?.relatedPages || ["/work", "/about"],
      relatedProjects: buildRelatedProjects(
        activeProject,
        null,
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "guardrail",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (activeProject) {
    return {
      answer: buildProjectAnswerFromState(activeProject, state, language),
      relatedPages: buildRelatedPages(activeProject),
      relatedProjects: buildRelatedProjects(
        activeProject,
        null,
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "projects") {
    return {
      answer: buildProjectOverview(localizedKnowledge.projects, language),
      relatedPages: ["/work"],
      relatedProjects: buildRelatedProjects(
        null,
        "projects",
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "experience") {
    return {
      answer: buildExperienceAnswer(localizedKnowledge, language),
      relatedPages: ["/about"],
      relatedProjects: buildRelatedProjects(
        null,
        "experience",
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "skills") {
    return {
      answer: buildSkillsAnswer(localizedKnowledge, language),
      relatedPages: ["/about", "/"],
      relatedProjects: buildRelatedProjects(
        null,
        "skills",
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "contact") {
    return {
      answer: buildContactAnswer(localizedKnowledge, language),
      relatedPages: ["/about"],
      relatedProjects: buildRelatedProjects(
        null,
        "contact",
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "methods") {
    return {
      answer: buildMethodAnswer(language),
      relatedPages: ["/", "/work"],
      relatedProjects: buildRelatedProjects(
        null,
        "methods",
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "profile") {
    return {
      answer: buildProfileAnswer(localizedKnowledge, language),
      relatedPages: ["/about", "/"],
      relatedProjects: buildRelatedProjects(
        null,
        "profile",
        localizedKnowledge.projects,
        language,
        normalizedPathname,
        projectIntent
      ),
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  return {
    answer: buildRefusalAnswer(localizedKnowledge),
    relatedPages: projectFromPathname?.relatedPages || ["/work", "/about"],
    relatedProjects: buildRelatedProjects(
      activeProject,
      null,
      localizedKnowledge.projects,
      language,
      normalizedPathname,
      projectIntent
    ),
    source: "guardrail",
    suggestedQuestions: buildSuggestedQuestionsFromState(
      state,
      localizedKnowledge,
      language
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
      voice: localizedKnowledge.voice,
    },
    null,
    2
  );
}

function hasConversationContext(messages) {
  return Array.isArray(messages) && messages.length >= 3;
}

function shouldUseModel(question, fallbackReply, messages) {
  if (!question.trim()) {
    return false;
  }

  if (isOutOfScope(normalizeQuestion(question))) {
    return false;
  }

  if (fallbackReply.source !== "guardrail") {
    return true;
  }

  return hasConversationContext(messages);
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

function isInvalidApiKeyError(error) {
  const errorText = String(error?.message || "").toLowerCase();

  if (
    errorText.includes("invalid_api_key") ||
    errorText.includes("incorrect api key provided")
  ) {
    return true;
  }

  if (!Array.isArray(error?.errors)) {
    return false;
  }

  return error.errors.some((nestedError) =>
    String(nestedError?.responseBody || "")
      .toLowerCase()
      .includes("invalid_api_key")
  );
}

function createPortfolioModel() {
  const baseURL = process.env.OPENAI_BASE_URL?.trim();

  // 这里让项目既能直连 OpenAI 官方接口，也能在需要时切到兼容的中转站。
  const provider = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    ...(baseURL ? { baseURL } : {}),
  });

  return provider.responses("gpt-5.4");
}

function getSystemPrompt(language) {
  return language === "zh"
    ? [
        "你是作品集网站里的 Portfolio Chatbot，只能回答这个作品集相关的问题。",
        "允许回答的话题只有：个人介绍、项目介绍、工作经历、设计方法、技能、联系方式。",
        "如果问题超出范围，必须礼貌拒答，并把话题引回作品集。",
        "只能基于提供的知识回答，不要编造没有给出的事实。",
        "如果知识里没有明确答案，要坦诚说明这个作品集里没有公开写到。",
        "回答语气要冷静、可信、简洁，像作品集里的本人分身，而不是客服。",
        "项目名、职责、关键决策、结果这类高确定性信息，优先使用知识库里的原始表达，不要改写成新的事实。",
        "回答项目问题时，优先用第一人称去讲清楚挑战、关键决策、结果，以及我现在回头看的反思。",
        "默认用 3 到 6 句完成回答；只有在列举经历或技能时才适度使用列表。",
      ].join("\n")
    : [
        "You are the Portfolio Chatbot inside a portfolio website and may only answer portfolio-related questions.",
        "Allowed topics are only: profile, projects, experience, design approach, skills, and contact.",
        "If the question is out of scope, politely refuse and steer the conversation back to the portfolio.",
        "Answer only from the provided knowledge and do not invent facts.",
        "If the answer is not clearly covered by the knowledge, say that it is not publicly specified in the portfolio.",
        "Keep the tone calm, credible, and concise, like the portfolio owner speaking directly, not a customer support bot.",
        "For project titles, role descriptions, key decisions, and outcomes, prefer the exact source wording from the knowledge base instead of paraphrasing into new facts.",
        "When answering project questions, prefer a first-person explanation that makes the challenge, key decisions, outcome, and retrospective reflection legible.",
        "Default to 3 to 6 sentences unless a short list is genuinely clearer for experience or skills.",
      ].join("\n");
}

function buildReferenceAnchor(fallbackReply, language) {
  if (!fallbackReply?.answer || fallbackReply.source === "guardrail") {
    return language === "zh"
      ? "当前问题没有额外参考稿。"
      : "There is no extra reference draft for this question.";
  }

  return language === "zh"
    ? `下面这段是站内知识整理出的参考稿，请把它当成事实锚点。你可以润色语气和结构，但不要和它冲突：\n${fallbackReply.answer}`
    : `Below is a reference draft synthesized from the on-site knowledge. Treat it as a factual anchor. You may improve tone and structure, but do not contradict it:\n${fallbackReply.answer}`;
}

function buildConversationStateSummary(state, language) {
  if (!state) {
    return language === "zh" ? "当前没有额外状态。" : "There is no extra state.";
  }

  const activeProjectLabel = state.activeProject?.title
    ? state.activeProject.title
    : language === "zh"
      ? "无"
      : "none";
  const currentIntentLabel = state.projectIntent || (language === "zh" ? "无" : "none");
  const previousIntentLabel =
    state.previousProjectIntent || (language === "zh" ? "无" : "none");
  const coveredIntentLabel = state.projectIntentTrail?.length
    ? state.projectIntentTrail.join(", ")
    : language === "zh"
      ? "无"
      : "none";

  return language === "zh"
    ? [
        `当前激活项目：${activeProjectLabel}`,
        `当前问题意图：${currentIntentLabel}`,
        `上一层项目意图：${previousIntentLabel}`,
        `本轮会话已覆盖的项目意图：${coveredIntentLabel}`,
        "如果上一轮已经在讲同一个项目，请保留承接感，不要把回答写成全新开题。",
      ].join("\n")
    : [
        `Active project: ${activeProjectLabel}`,
        `Current question intent: ${currentIntentLabel}`,
        `Previous project intent: ${previousIntentLabel}`,
        `Project intents already covered in this conversation: ${coveredIntentLabel}`,
        "If the previous turn was already about the same project, preserve continuity instead of writing the answer like a brand new topic.",
      ].join("\n");
}

function formatChatHistory(messages, language) {
  if (!Array.isArray(messages) || !messages.length) {
    return language === "zh" ? "暂无历史对话。" : "No prior conversation.";
  }

  return messages
    .slice(-8)
    .map((message) => {
      const speaker =
        message.role === "assistant"
          ? language === "zh"
            ? "助手"
            : "Assistant"
          : language === "zh"
            ? "用户"
            : "User";

      return `${speaker}: ${message.content}`;
    })
    .join("\n");
}

function getUserPrompt(
  language,
  localizedKnowledge,
  pathname,
  messages,
  question,
  fallbackReply,
  state
) {
  const conversationHistory = formatChatHistory(messages, language);
  const referenceAnchor = buildReferenceAnchor(fallbackReply, language);
  const conversationState = buildConversationStateSummary(state, language);

  return language === "zh"
    ? [
        `以下是作品集知识库：\n${buildPromptKnowledge(localizedKnowledge)}`,
        `当前页面：${pathname}`,
        `最近对话：\n${conversationHistory}`,
        `当前会话状态：\n${conversationState}`,
        referenceAnchor,
        `当前用户问题：${question}`,
        "请结合最近对话理解指代关系，例如“这个项目”“刚才那个”“继续展开”。",
        "如果当前问题是在承接上一轮，请沿着上一轮继续讲，不要重新从项目总览开始。",
        "请直接给出最终回答。",
      ].join("\n\n")
    : [
        `Here is the portfolio knowledge base:\n${buildPromptKnowledge(localizedKnowledge)}`,
        `Current page: ${pathname}`,
        `Recent conversation:\n${conversationHistory}`,
        `Current conversation state:\n${conversationState}`,
        referenceAnchor,
        `Current user question: ${question}`,
        'Use the recent conversation to resolve references like "this project", "that one", or "go deeper".',
        "If the current question continues the previous turn, continue from that layer instead of restarting from a project overview.",
        "Return only the final answer.",
      ].join("\n\n");
}

function buildResponsesUrl(baseURL) {
  return `${baseURL.replace(/\/$/, "")}/responses`;
}

function createProxyRequestError(message, details = {}) {
  return Object.assign(new Error(message), details);
}

function extractResponseText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (!Array.isArray(data?.output)) {
    return "";
  }

  const textParts = data.output.flatMap((item) =>
    Array.isArray(item?.content)
      ? item.content
          .map((contentItem) =>
            contentItem?.type === "output_text" ? contentItem.text : null
          )
          .filter(Boolean)
      : []
  );

  return textParts.join("\n").trim();
}

async function generateTextWithCompatibleProxy({
  apiKey,
  baseURL,
  fallbackReply,
  language,
  localizedKnowledge,
  messages,
  pathname,
  question,
  state,
}) {
  const response = await fetch(buildResponsesUrl(baseURL), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5.4",
      instructions: getSystemPrompt(language),
      input: getUserPrompt(
        language,
        localizedKnowledge,
        pathname,
        messages,
        question,
        fallbackReply,
        state
      ),
      store: false,
      temperature: 0.35,
      text: {
        format: {
          type: "text",
        },
      },
    }),
  });

  const rawText = await response.text();
  let data;

  try {
    data = JSON.parse(rawText);
  } catch {
    throw createProxyRequestError("Proxy provider returned invalid JSON.", {
      responseBody: rawText,
    });
  }

  if (!response.ok) {
    throw createProxyRequestError(
      data?.error?.message || `Proxy provider request failed with status ${response.status}.`,
      {
        responseBody: rawText,
        statusCode: response.status,
      }
    );
  }

  return extractResponseText(data);
}

export async function createPortfolioChatReply({
  language,
  messages = [],
  pathname,
  question,
}) {
  const localizedKnowledge = getLocalizedChatValue(portfolioChatKnowledge, language);
  const state = createConversationState({
    localizedKnowledge,
    messages,
    pathname,
    question,
  });
  const fallbackReply = createPortfolioChatFallbackReply({
    language,
    messages,
    pathname,
    question,
  });

  if (!shouldUseModel(question, fallbackReply, messages)) {
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

  const baseURL = process.env.OPENAI_BASE_URL?.trim();
  const systemPrompt = getSystemPrompt(language);
  const userPrompt = getUserPrompt(
    language,
    localizedKnowledge,
    pathname,
    messages,
    question,
    fallbackReply,
    state
  );

  try {
    const answer = baseURL
      ? await generateTextWithCompatibleProxy({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL,
          fallbackReply,
          language,
          localizedKnowledge,
          messages,
          pathname,
          question,
          state,
        })
      : (
          await generateText({
            model: createPortfolioModel(),
            system: systemPrompt,
            prompt: userPrompt,
            temperature: 0.35,
          })
        ).text.trim();

    return {
      ...fallbackReply,
      answer: answer || fallbackReply.answer,
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
          : isInvalidApiKeyError(error)
            ? language === "zh"
              ? "当前 API key 或 provider 配置无效，所以聊天已切换为站内知识库兜底回答。请检查 OPENAI_API_KEY 和 OPENAI_BASE_URL 是否匹配。"
              : "The current API key or provider configuration is invalid, so the chat fell back to the on-site knowledge mode. Please verify that OPENAI_API_KEY and OPENAI_BASE_URL match."
          : language === "zh"
            ? "当前回答已切换为站内知识兜底模式。"
            : "The reply fell back to the on-site knowledge mode.",
    };
  }
}
