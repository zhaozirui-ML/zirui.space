import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

import { blogPosts } from "../data/blog-posts";
import {
  getLocalizedChatValue,
  portfolioChatKnowledge,
} from "./portfolio-chat-knowledge";

const MAX_SUGGESTED_QUESTIONS = 3;

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
  blog: [
    "article",
    "articles",
    "blog",
    "post",
    "posts",
    "write",
    "writing",
    "wrote",
    "文章",
    "博客",
    "写",
    "写作",
    "主题",
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

function normalizeQuestionKey(question) {
  return normalizeQuestion(question).replace(/[\p{P}\p{S}\s]+/gu, "");
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

function getLocalizedBlogPosts(language) {
  return getLocalizedChatValue(blogPosts, language);
}

function getBlogDetailPath(blogPost) {
  return blogPost ? `/blog/${blogPost.slug}` : "/blog";
}

function detectBlogByPathname(blogs, pathname) {
  const normalizedPathname = normalizePathname(pathname);

  if (!normalizedPathname.startsWith("/blog/")) {
    return null;
  }

  const slug = normalizedPathname.replace(/^\/blog\//, "").split("/")[0];

  return blogs.find((blogPost) => blogPost.slug === slug) || null;
}

function getBlogAliases(blogPost) {
  return [
    blogPost.slug,
    blogPost.title,
    blogPost.title?.replace(/[《》"'"]/g, ""),
  ]
    .filter(Boolean)
    .map((alias) => String(alias).toLowerCase());
}

function detectBlog(blogs, normalizedQuestion) {
  return blogs.find((blogPost) =>
    getBlogAliases(blogPost).some((alias) => normalizedQuestion.includes(alias))
  ) || null;
}

function detectBlogFromMessages(blogs, messages) {
  if (!Array.isArray(messages) || !messages.length) {
    return null;
  }

  const recentMessages = [...messages].slice(-8).reverse();

  for (const message of recentMessages) {
    if (!message || typeof message.content !== "string") {
      continue;
    }

    const matchedBlog = detectBlog(blogs, normalizeQuestion(message.content));

    if (matchedBlog) {
      return matchedBlog;
    }
  }

  return null;
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

function detectBlogIntent(normalizedQuestion) {
  if (/项目|实践|project|practice|actual work/.test(normalizedQuestion)) {
    return "practice";
  }

  if (/为什么|动机|触发|why|motivation|decide/.test(normalizedQuestion)) {
    return "motivation";
  }

  if (/重写|补充|修正|更新|rewrite|change|revise|update/.test(normalizedQuestion)) {
    return "rewrite";
  }

  if (/工具|吸引|tool|attracted|fit/.test(normalizedQuestion)) {
    return "tool-fit";
  }

  if (/落差|期待|差距|gap|expectation/.test(normalizedQuestion)) {
    return "expectation-gap";
  }

  if (/长期|值不值得|判断|long term|judge|worth/.test(normalizedQuestion)) {
    return "tool-judgment";
  }

  if (/建议|启发|takeaway|actionable|practical/.test(normalizedQuestion)) {
    return "takeaway";
  }

  if (/主题|最近在写|写哪些|topics|writing about/.test(normalizedQuestion)) {
    return "themes";
  }

  if (/写文章|写作|看重|writing|write these posts/.test(normalizedQuestion)) {
    return "writing-style";
  }

  if (/讲清楚|核心|main idea|core judgment|summarize/.test(normalizedQuestion)) {
    return "main-idea";
  }

  return null;
}

function isImplicitProjectFollowup(normalizedQuestion) {
  return /继续|展开|细讲|详细说说|挑一个|选一个|this one|that one|go deeper|tell me more|keep going/.test(
    normalizedQuestion
  );
}

function isExplicitProjectReference(normalizedQuestion) {
  return /这个项目|这个案例|这个作品|该项目|这个页面|this project|this case study|this case|that project/.test(
    normalizedQuestion
  );
}

function shouldUsePathnameProject({
  explicitProject,
  isProjectFollowup,
  normalizedQuestion,
  projectIntent,
  projectTopic,
}) {
  // 详情页上下文只应该服务于“继续聊这个项目”，不应该劫持联系方式、技能等泛问题。
  if (explicitProject || projectIntent || projectTopic === "projects") {
    return true;
  }

  if (isProjectFollowup || isExplicitProjectReference(normalizedQuestion)) {
    return true;
  }

  return false;
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

function buildBlogOverviewAnswer(blogs, language) {
  const featuredBlogs = blogs.slice(0, 4);

  if (language === "zh") {
    return [
      "Blog 里主要记录三类内容：设计工作流、协作方法，以及工具使用后的反思。",
      "",
      ...featuredBlogs.map((post) => `- ${post.title}：${post.summary}`),
      "",
      "这些文章更像是项目之外的思考补充：它们能说明我怎么复盘工作、沉淀方法，以及判断一个工具或流程是否真的适合长期使用。",
    ].join("\n");
  }

  return [
    "The Blog mainly covers three kinds of writing: design workflow, collaboration methods, and reflections after using tools.",
    "",
    ...featuredBlogs.map((post) => `- ${post.title}: ${post.summary}`),
    "",
    "I see these posts as supporting context around the project work: they show how I reflect on work, distill methods, and judge whether a tool or process is worth using over time.",
  ].join("\n");
}

function getBlogPracticeLink(blogPost, language) {
  if (blogPost.category === "设计" || blogPost.category === "DESIGN") {
    return language === "zh"
      ? "它和项目实践的关系很直接：我不是在抽象地讲设计流程，而是在复盘真实工作里如何拆主线任务、支线协作和设计系统沉淀。"
      : "Its connection to project practice is direct: it is not an abstract design-process note, but a reflection on how core tasks, supporting collaboration, and design-system work were separated in real work.";
  }

  if (blogPost.category === "工具" || blogPost.category === "TOOLS") {
    return language === "zh"
      ? "它和项目实践的关系更偏工作流判断：我在意的不是工具本身有多强，而是它和真实需求、长期维护成本、迁移成本之间是否匹配。"
      : "Its connection to project practice is more about workflow judgment: the point is not how powerful the tool is, but whether it fits real needs, long-term maintenance, and migration cost.";
  }

  return language === "zh"
    ? "它和项目实践的关系更偏方法沉淀：把一个看似通用的问题，转成我在协作、决策或产品判断里可以反复使用的框架。"
    : "Its connection to project practice is more about method-building: turning a general topic into a reusable frame for collaboration, decision-making, or product judgment.";
}

function buildBlogAnswer(blogPost, state, language) {
  const intent = state.blogIntent || "main-idea";

  if (intent === "practice") {
    return [
      language === "zh"
        ? `《${blogPost.title}》和我的项目实践之间，核心连接点是：`
        : `The core connection between "${blogPost.title}" and my project work is this:`,
      "",
      getBlogPracticeLink(blogPost, language),
      "",
      blogPost.detailSummary || blogPost.summary,
    ].join("\n");
  }

  if (intent === "motivation") {
    return language === "zh"
      ? [
          `我写《${blogPost.title}》，更多是为了把当时正在经历或反复思考的问题沉淀下来。`,
          "",
          blogPost.detailSummary || blogPost.summary,
          "",
          "它不是单纯的内容更新，更像是一次阶段性复盘：把工作里的判断、协作里的感受，或者工具使用后的落差整理成可以回看的材料。",
        ].join("\n")
      : [
          `I wrote "${blogPost.title}" mainly to capture a problem I was experiencing or repeatedly thinking about at the time.`,
          "",
          blogPost.detailSummary || blogPost.summary,
          "",
          "It was less about publishing content for its own sake and more like a retrospective: turning work judgments, collaboration observations, or the gap after using a tool into something I could revisit.",
        ].join("\n");
  }

  if (intent === "rewrite") {
    return language === "zh"
      ? [
          `如果现在重写《${blogPost.title}》，我会更明确地补上“后来我怎么判断这件事”。`,
          "",
          "早期文章更像记录当时的理解，现在我会更在意把判断条件讲清楚：为什么这个问题重要、它和实际项目或工作流有什么关系，以及这个判断后来有没有变化。",
        ].join("\n")
      : [
          `If I rewrote "${blogPost.title}" today, I would make the later judgment clearer.`,
          "",
          "The earlier post records how I understood the topic at the time. Today I would clarify the decision criteria: why the problem matters, how it connects to real project work or workflow, and whether my judgment changed later.",
        ].join("\n");
  }

  if (intent === "tool-fit" || intent === "expectation-gap" || intent === "tool-judgment") {
    return language === "zh"
      ? [
          `这篇《${blogPost.title}》里，真正重要的不是工具本身，而是期待和真实需求之间的匹配。`,
          "",
          blogPost.detailSummary || blogPost.summary,
          "",
          "现在我判断一个工具是否值得长期使用，会更看重三个问题：它是否真的进入日常工作流、迁移和维护成本是否可控，以及它解决的是长期问题还是短期新鲜感。",
        ].join("\n")
      : [
          `In "${blogPost.title}", the real point is not the tool itself, but the match between expectation and actual need.`,
          "",
          blogPost.detailSummary || blogPost.summary,
          "",
          "Today, when judging whether a tool is worth using long term, I care more about three questions: whether it actually enters my daily workflow, whether migration and maintenance costs are manageable, and whether it solves a lasting problem rather than a short-term novelty.",
        ].join("\n");
  }

  if (intent === "takeaway") {
    return language === "zh"
      ? [
          `如果只从《${blogPost.title}》里保留一个可执行建议，我会说：先判断它对应的真实问题，再决定方法或工具。`,
          "",
          "很多时候，问题没有被讲清楚时，流程、工具或技巧都会变成表面优化。先把目标、约束和实际使用场景讲清楚，后面的选择才更稳。",
        ].join("\n")
      : [
          `If I kept one practical takeaway from "${blogPost.title}", it would be this: define the real problem first, then choose the method or tool.`,
          "",
          "When the problem is unclear, processes, tools, and techniques easily become surface-level optimizations. Clarifying the goal, constraints, and usage context first makes the later choices more stable.",
        ].join("\n");
  }

  return language === "zh"
    ? [
        `《${blogPost.title}》最想讲清楚的是：${blogPost.detailSummary || blogPost.summary}`,
        "",
        getBlogPracticeLink(blogPost, language),
      ].join("\n")
    : [
        `The main idea in "${blogPost.title}" is: ${blogPost.detailSummary || blogPost.summary}`,
        "",
        getBlogPracticeLink(blogPost, language),
      ].join("\n");
}

function buildBlogWritingStyleAnswer(language) {
  if (language === "zh") {
    return [
      "我写文章时最看重的是把一个具体经验整理成可复用的判断，而不是只记录发生了什么。",
      "",
      "如果是设计类文章，我会更关注流程和方法；如果是工具类文章，我会更关注期待、落差和长期使用成本；如果是协作类文章，我会更关注它能不能帮助真实团队更好地沟通和决策。",
    ].join("\n");
  }

  return [
    "When I write, I care most about turning a specific experience into a reusable judgment, not just recording what happened.",
    "",
    "For design posts, I focus more on process and method. For tool posts, I focus on expectation, gap, and long-term cost. For collaboration posts, I care about whether the thinking can help a real team communicate and decide better.",
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
    const normalizedQuestion = normalizeQuestionKey(question);

    if (!question || !normalizedQuestion || seen.has(normalizedQuestion)) {
      return false;
    }

    seen.add(normalizedQuestion);
    return true;
  });
}

function isSimilarQuestion(question, previousQuestion) {
  const normalizedQuestion = normalizeQuestion(question);
  const normalizedPreviousQuestion = normalizeQuestion(previousQuestion);
  const normalizedQuestionKey = normalizeQuestionKey(question);
  const normalizedPreviousQuestionKey = normalizeQuestionKey(previousQuestion);

  if (
    !normalizedQuestion ||
    !normalizedPreviousQuestion ||
    !normalizedQuestionKey ||
    !normalizedPreviousQuestionKey
  ) {
    return false;
  }

  return (
    normalizedQuestion === normalizedPreviousQuestion ||
    normalizedQuestionKey === normalizedPreviousQuestionKey ||
    normalizedQuestion.includes(normalizedPreviousQuestion) ||
    normalizedPreviousQuestion.includes(normalizedQuestion) ||
    normalizedQuestionKey.includes(normalizedPreviousQuestionKey) ||
    normalizedPreviousQuestionKey.includes(normalizedQuestionKey)
  );
}

function filterAlreadyAskedQuestions(questions, askedQuestions) {
  return dedupeQuestions(questions).filter(
    (question) =>
      !askedQuestions.some((askedQuestion) =>
        isSimilarQuestion(question, askedQuestion)
      )
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
  localizedBlogs,
  localizedKnowledge,
  messages,
  pathname,
  question,
}) {
  const normalizedQuestion = normalizeQuestion(question);
  const normalizedPathname = normalizePathname(pathname);
  const explicitBlog = detectBlog(localizedBlogs, normalizedQuestion);
  const blogFromPathname = detectBlogByPathname(localizedBlogs, normalizedPathname);
  const blogFromMessages = detectBlogFromMessages(localizedBlogs, messages);
  const blogIntent = detectBlogIntent(normalizedQuestion);
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
  const projectIntent = detectProjectIntent(normalizedQuestion);
  const topic = detectTopic(normalizedQuestion);
  const shouldLockToPathnameProject = shouldUsePathnameProject({
    explicitProject,
    isProjectFollowup: isImplicitProjectFollowup(normalizedQuestion),
    normalizedQuestion,
    projectIntent,
    projectTopic: topic,
  });
  const activeProject =
    explicitProject ||
    projectFromMessages ||
    (shouldLockToPathnameProject ? projectFromPathname : null) ||
    null;
  const projectIntentTrail = getProjectIntentTrail(messages, activeProject);

  return {
    activeProject,
    activeBlog: explicitBlog || blogFromPathname || blogFromMessages || null,
    askedQuestionSignals: getAskedQuestionSignals(messages),
    blogFromPathname,
    blogIntent,
    coveredProjectIntents: new Set(projectIntentTrail),
    isBlogContext: normalizedPathname === "/blog" || normalizedPathname.startsWith("/blog/"),
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

  // 这里单独看“同一个项目里已经聊过什么”，避免建议追问反复把用户带回旧角度。
  if (candidate.intent !== "overview" && state.coveredProjectIntents.has(candidate.intent)) {
    score -= 44;
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
    if (selectedCandidates.length >= MAX_SUGGESTED_QUESTIONS) {
      break;
    }

    if (
      candidate.intent !== "overview" &&
      state.coveredProjectIntents.has(candidate.intent)
    ) {
      continue;
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
    if (selectedCandidates.length >= MAX_SUGGESTED_QUESTIONS) {
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
  ).slice(0, MAX_SUGGESTED_QUESTIONS);
}

function buildGeneralSuggestionCandidates(knowledge, language, state) {
  const quickReplyById = new Map(
    knowledge.quickReplies.map((item) => [item.id, item.prompt])
  );

  if (state.isBlogContext || state.topic === "blog") {
    return [
      language === "zh"
        ? "你最近在写哪些主题？这些内容大致反映了你在关注什么问题？"
        : "What topics have you been writing about recently, and what do they say about the problems you care about?",
      language === "zh"
        ? "这些文章和你的项目实践有什么关系？"
        : "How do these articles connect to your project practice?",
      language === "zh"
        ? "你写这些文章时最看重什么？"
        : "What matters most to you when writing these posts?",
    ];
  }

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

function buildBlogSuggestionCandidates(blogPost, language) {
  if (!blogPost) {
    return [];
  }

  return [
    language === "zh"
      ? `这篇《${blogPost.title}》最想讲清楚什么？`
      : `What is the main idea in "${blogPost.title}"?`,
    language === "zh"
      ? "这篇文章和你的实际项目有什么关系？"
      : "How does this article connect to your actual project work?",
    language === "zh"
      ? "如果现在重写，你会补什么？"
      : "What would you add if you rewrote it now?",
  ];
}

function buildSuggestedQuestionsFromState(state, knowledge, language) {
  const askedQuestions = [...state.askedQuestionSignals.questions, state.question];

  if (state.activeProject) {
    return filterAlreadyAskedQuestions(
      rankProjectFollowupCandidates(state.activeProject, state, language),
      askedQuestions
    ).slice(0, MAX_SUGGESTED_QUESTIONS);
  }

  if (state.activeBlog) {
    return filterAlreadyAskedQuestions(
      buildBlogSuggestionCandidates(state.activeBlog, language),
      askedQuestions
    ).slice(0, MAX_SUGGESTED_QUESTIONS);
  }

  return filterAlreadyAskedQuestions(
    buildGeneralSuggestionCandidates(knowledge, language, state),
    askedQuestions
  ).slice(0, MAX_SUGGESTED_QUESTIONS);
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
  const localizedBlogs = getLocalizedBlogPosts(language);
  const state = createConversationState({
    localizedBlogs,
    localizedKnowledge,
    messages,
    pathname,
    question,
  });
  const {
    activeProject,
    activeBlog,
    blogIntent,
    isProjectFollowup,
    normalizedPathname,
    normalizedQuestion,
    blogFromPathname,
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
      relatedPages: blogFromPathname
        ? [getBlogDetailPath(blogFromPathname), "/blog"]
        : projectFromPathname?.relatedPages || ["/work", "/about", "/blog"],
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

  if (activeBlog) {
    return {
      answer: buildBlogAnswer(activeBlog, state, language),
      relatedPages: [getBlogDetailPath(activeBlog), "/blog"],
      relatedProjects: [],
      source: "fallback",
      suggestedQuestions: buildSuggestedQuestionsFromState(
        state,
        localizedKnowledge,
        language
      ),
    };
  }

  if (topic === "blog" || state.isBlogContext) {
    return {
      answer:
        blogIntent === "writing-style"
          ? buildBlogWritingStyleAnswer(language)
          : buildBlogOverviewAnswer(localizedBlogs, language),
      relatedPages: ["/blog"],
      relatedProjects: [],
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

function buildPromptKnowledge(localizedKnowledge, language) {
  const localizedBlogs = getLocalizedBlogPosts(language);

  return JSON.stringify(
    {
      blogs: localizedBlogs.map((post) => ({
        category: post.category,
        detailSummary: post.detailSummary,
        slug: post.slug,
        summary: post.summary,
        title: post.title,
      })),
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
        "允许回答的话题只有：个人介绍、项目介绍、工作经历、设计方法、技能、联系方式、作品集文章。",
        "如果问题超出范围，必须礼貌拒答，并把话题引回作品集。",
        "只能基于提供的知识回答，不要编造没有给出的事实。",
        "如果知识里没有明确答案，要坦诚说明这个作品集里没有公开写到。",
        "回答语气要冷静、可信、简洁，像作品集里的本人分身，而不是客服。",
        "项目名、职责、关键决策、结果这类高确定性信息，优先使用知识库里的原始表达，不要改写成新的事实。",
        "回答项目问题时，优先用第一人称去讲清楚挑战、关键决策、结果，以及我现在回头看的反思。",
        "默认用 3 到 6 句完成回答；把回答拆成 2 到 3 个短段落，避免输出一整段长文本。",
        "当回答包含多个并列点、步骤、项目或能力维度时，优先使用简短列表。",
        "只在关键标签上使用加粗，例如“核心问题：”“关键判断：”“结果：”“反思：”，不要随机加粗整句。",
      ].join("\n")
    : [
        "You are the Portfolio Chatbot inside a portfolio website and may only answer portfolio-related questions.",
        "Allowed topics are only: profile, projects, experience, design approach, skills, contact, and portfolio articles.",
        "If the question is out of scope, politely refuse and steer the conversation back to the portfolio.",
        "Answer only from the provided knowledge and do not invent facts.",
        "If the answer is not clearly covered by the knowledge, say that it is not publicly specified in the portfolio.",
        "Keep the tone calm, credible, and concise, like the portfolio owner speaking directly, not a customer support bot.",
        "For project titles, role descriptions, key decisions, and outcomes, prefer the exact source wording from the knowledge base instead of paraphrasing into new facts.",
        "When answering project questions, prefer a first-person explanation that makes the challenge, key decisions, outcome, and retrospective reflection legible.",
        "Default to 3 to 6 sentences; split the answer into 2 to 3 short paragraphs instead of one long block.",
        "Use a concise list when the answer contains parallel points, steps, projects, or skill areas.",
        "Use bold only for key labels such as \"Core problem:\", \"Key decision:\", \"Outcome:\", or \"Reflection:\". Do not randomly bold full sentences.",
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
  const activeBlogLabel = state.activeBlog?.title
    ? state.activeBlog.title
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
        `当前激活文章：${activeBlogLabel}`,
        `当前问题意图：${currentIntentLabel}`,
        `上一层项目意图：${previousIntentLabel}`,
        `本轮会话已覆盖的项目意图：${coveredIntentLabel}`,
        "如果上一轮已经在讲同一个项目，请保留承接感，不要把回答写成全新开题。",
      ].join("\n")
    : [
        `Active project: ${activeProjectLabel}`,
        `Active article: ${activeBlogLabel}`,
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
        `以下是作品集知识库：\n${buildPromptKnowledge(localizedKnowledge, language)}`,
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
        `Here is the portfolio knowledge base:\n${buildPromptKnowledge(localizedKnowledge, language)}`,
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
  const localizedBlogs = getLocalizedBlogPosts(language);
  const state = createConversationState({
    localizedBlogs,
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
