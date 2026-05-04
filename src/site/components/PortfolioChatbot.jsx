"use client";

import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, RotateCcw, Square, Sparkles, X } from "lucide-react";

import { useLanguage } from "../i18n/LanguageProvider";
import { isModuleHomePath } from "../lib/is-module-home-path";
import { getBlogBySlug } from "../lib/get-blog-by-slug";
import { getLocalizedChatValue, portfolioChatKnowledge } from "../chatbot/portfolio-chat-knowledge";
import styles from "../styles/portfolio-chatbot.module.css";

/**
 * @typedef {{
 *   id: string,
 *   role: "assistant" | "user",
 *   content: string,
 *   relatedProjects?: { eyebrow?: string, kind?: "current-project" | "related-project", path: string, reason: string, slug: string, title: string }[],
 *   suggestedQuestions?: string[],
 * }} ChatMessage
 */

const CHATBOT_PAGE_LABELS = {
  "/": { zh: "首页", en: "Home" },
  "/about": { zh: "简历", en: "About" },
  "/work": { zh: "作品", en: "Work" },
  "/work/axzo-design-system": { zh: "Axzo 设计系统门户", en: "Axzo Design Portal" },
  "/work/cloudtower-design-system": { zh: "CloudTower 设计系统", en: "CloudTower Design System" },
  "/work/data-visualization-screen": { zh: "数据可视化系统", en: "Data Visualization System" },
  "/work/drawing-ledger-2-0": { zh: "图纸台账 2.0", en: "Drawing Register 2.0" },
};
const MAX_GLOBAL_QUICK_REPLIES = 4;
const MAX_PROJECT_QUICK_REPLIES = 3;
const MAX_SUGGESTED_FOLLOWUPS = 3;
const PANEL_CLOSE_DURATION_MS = 300;
const PANEL_STATE_STORAGE_KEY = "portfolio-chatbot-panel-state";

/**
 * @param {"zh" | "en"} language
 * @returns {ChatMessage}
 */
function createInitialAssistantMessage(language) {
  return {
    id: `assistant-welcome-${language}`,
    role: "assistant",
    content:
      language === "zh"
        ? "Hi，我是 Porty。可以问我项目、经历、技能或联系方式。"
        : "Hi, I'm Porty. Ask me about projects, experience, skills, or contact.",
  };
}

function createMessageId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function serializeChatHistory(messages) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function normalizeQuestionKey(question) {
  return question.trim().toLowerCase().replace(/[\p{P}\p{S}\s]+/gu, "");
}

function isSimilarQuestion(question, previousQuestion) {
  const normalizedQuestion = normalizeQuestionKey(question);
  const normalizedPreviousQuestion = normalizeQuestionKey(previousQuestion);

  if (!normalizedQuestion || !normalizedPreviousQuestion) {
    return false;
  }

  return (
    normalizedQuestion === normalizedPreviousQuestion ||
    normalizedQuestion.includes(normalizedPreviousQuestion) ||
    normalizedPreviousQuestion.includes(normalizedQuestion)
  );
}

function filterSuggestedQuestionsForHistory(suggestedQuestions, messages) {
  const askedQuestions = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content);
  const seenQuestions = new Set();

  return suggestedQuestions
    .filter((question) => {
      const normalizedQuestion = normalizeQuestionKey(question);

      if (!normalizedQuestion || seenQuestions.has(normalizedQuestion)) {
        return false;
      }

      seenQuestions.add(normalizedQuestion);

      return !askedQuestions.some((askedQuestion) =>
        isSimilarQuestion(question, askedQuestion)
      );
    })
    .slice(0, MAX_SUGGESTED_FOLLOWUPS);
}

function isInitialAssistantMessage(message) {
  return message?.role === "assistant" && message.id?.startsWith("assistant-welcome-");
}

function getPageLabel(pathname, language) {
  const localizedLabel = CHATBOT_PAGE_LABELS[pathname];

  return localizedLabel ? localizedLabel[language] : pathname;
}

function getProjectFromPathname(pathname, localizedKnowledge) {
  if (!pathname.startsWith("/work/")) {
    return null;
  }

  return localizedKnowledge.projects.find((project) =>
    project.relatedPages.includes(pathname)
  );
}

function getBlogFromPathname(pathname) {
  if (!pathname.startsWith("/blog/") || pathname === "/blog") {
    return null;
  }

  const slug = pathname.replace(/^\/blog\//, "").split("/")[0];

  return getBlogBySlug(slug);
}

function getBlogDetailQuickReplies(blogPost, language) {
  const title =
    typeof blogPost.title === "object"
      ? blogPost.title[language]
      : blogPost.title;
  const category =
    typeof blogPost.category === "object"
      ? blogPost.category[language]
      : blogPost.category;
  const baseReplies = [
    {
      id: `${blogPost.slug}-main-idea`,
      label:
        language === "zh"
          ? `这篇《${title}》最想讲清楚什么？`
          : `What is the main idea in "${title}"?`,
      prompt:
        language === "zh"
          ? `这篇《${title}》最想讲清楚什么？如果只保留一个核心判断，你会怎么概括？`
          : `What is the main idea in "${title}"? If you had to keep just one core judgment, how would you summarize it?`,
    },
  ];

  if (category === "设计" || category === "DESIGN") {
    return [
      ...baseReplies,
      {
        id: `${blogPost.slug}-practice-link`,
        label:
          language === "zh"
            ? "这篇文章和你的实际项目有什么关系？"
            : "How does this article connect to your actual project work?",
        prompt:
          language === "zh"
            ? `这篇《${title}》和你的实际项目有什么关系？它更像方法总结、经验复盘，还是观点表达？`
            : `How does "${title}" connect to your actual project work? Is it more of a method note, a retrospective, or a point-of-view piece?`,
      },
      {
        id: `${blogPost.slug}-write-motivation`,
        label:
          language === "zh"
            ? "你当时为什么会写这篇？"
            : "Why did you decide to write this?",
        prompt:
          language === "zh"
            ? `你当时为什么会写《${title}》？是因为工作中的某个具体问题、一次复盘，还是一个长期在意的主题？`
            : `Why did you decide to write "${title}" at the time? Was it driven by a specific problem at work, a retrospective, or a longer-running theme you care about?`,
      },
      {
        id: `${blogPost.slug}-different-now`,
        label:
          language === "zh"
            ? "如果现在重写，你会改什么？"
            : "What would you change if you rewrote it now?",
        prompt:
          language === "zh"
            ? `如果现在重写《${title}》，你最想补充、修正或更新的地方是什么？`
            : `If you rewrote "${title}" today, what would you most want to add, revise, or update?`,
      },
    ];
  }

  if (category === "工具" || category === "TOOLS") {
    return [
      ...baseReplies,
      {
        id: `${blogPost.slug}-tool-fit`,
        label:
          language === "zh"
            ? "这个工具最开始吸引你的是什么？"
            : "What attracted you to this tool at first?",
        prompt:
          language === "zh"
            ? `在《${title}》里，这个工具最开始吸引你的到底是什么？是能力、气质，还是它看起来很适合你的工作流？`
            : `In "${title}", what exactly attracted you to this tool at first? Its capabilities, its character, or how well it seemed to fit your workflow?`,
      },
      {
        id: `${blogPost.slug}-expectation-gap`,
        label:
          language === "zh"
            ? "后来真正的落差出现在哪里？"
            : "Where did the gap show up later?",
        prompt:
          language === "zh"
            ? `后来真正的落差出现在哪里？是工具本身的问题，还是你对它的期待和真实需求之间有偏差？`
            : `Where did the real gap show up later? Was it the tool itself, or a mismatch between your expectations and your actual needs?`,
      },
      {
        id: `${blogPost.slug}-decision-now`,
        label:
          language === "zh"
            ? "你现在怎么判断一个工具值不值得长期用？"
            : "How do you judge whether a tool is worth using long term now?",
        prompt:
          language === "zh"
            ? `经历了《${title}》里的这段过程之后，你现在怎么判断一个工具值不值得长期使用？`
            : `After the experience described in "${title}", how do you now judge whether a tool is worth using long term?`,
      },
    ];
  }

  return [
    ...baseReplies,
    {
      id: `${blogPost.slug}-why-worth-writing`,
      label:
        language === "zh"
          ? "你为什么觉得这个主题值得写？"
          : "Why did this topic feel worth writing about?",
      prompt:
        language === "zh"
          ? `你为什么觉得《${title}》这个主题值得专门写下来？它对应的是一个长期问题，还是一次很明确的触发？`
          : `Why did "${title}" feel worth writing down as a standalone post? Was it tied to a long-running question or to a more specific trigger?`,
    },
    {
      id: `${blogPost.slug}-practical-takeaway`,
      label:
        language === "zh"
          ? "如果只给一个可执行建议，你会给什么？"
          : "If you gave one practical takeaway, what would it be?",
      prompt:
        language === "zh"
          ? `如果从《${title}》里只保留一个最可执行的建议，你会给什么？`
          : `If you kept just one actionable takeaway from "${title}", what would it be?`,
    },
    {
      id: `${blogPost.slug}-different-now`,
      label:
        language === "zh"
          ? "如果现在重写，你会补什么？"
          : "What would you add if you rewrote it now?",
      prompt:
        language === "zh"
          ? `如果现在重写《${title}》，你最想补充的角度或修正的判断是什么？`
          : `If you rewrote "${title}" today, what angle or judgment would you most want to add or revise?`,
    },
  ];
}

function pickQuickReplies(items, maxCount) {
  return items.filter(Boolean).slice(0, maxCount);
}

function getContextualQuickReplies(pathname, localizedKnowledge, language) {
  const project = getProjectFromPathname(pathname, localizedKnowledge);
  const blogPost = getBlogFromPathname(pathname);

  if (project) {
    return pickQuickReplies(
      project.recommendedQuestions.map((question, index) => ({
        id: `${project.slug}-recommended-${index}`,
        label: question,
        prompt: question,
      })),
      MAX_PROJECT_QUICK_REPLIES
    );
  }

  if (pathname === "/work") {
    return pickQuickReplies(
      [
        localizedKnowledge.quickReplies.find((item) => item.id === "featured-projects"),
        localizedKnowledge.quickReplies.find((item) => item.id === "drawing-ledger"),
        {
          id: "axzo",
          label:
            language === "zh"
              ? "讲讲 Axzo 设计系统门户"
              : "Tell me about the Axzo Design Portal",
          prompt:
            language === "zh"
              ? "讲讲 Axzo 设计系统门户"
              : "Tell me about the Axzo Design System Portal.",
        },
        localizedKnowledge.quickReplies.find((item) => item.id === "contact"),
      ],
      MAX_GLOBAL_QUICK_REPLIES
    );
  }

  if (pathname === "/about") {
    return pickQuickReplies(
      [
        localizedKnowledge.quickReplies.find((item) => item.id === "intro"),
        localizedKnowledge.quickReplies.find((item) => item.id === "experience"),
        localizedKnowledge.quickReplies.find((item) => item.id === "skills"),
        localizedKnowledge.quickReplies.find((item) => item.id === "contact"),
      ],
      MAX_GLOBAL_QUICK_REPLIES
    );
  }

  if (blogPost) {
    return pickQuickReplies(
      getBlogDetailQuickReplies(blogPost, language),
      MAX_GLOBAL_QUICK_REPLIES
    );
  }

  if (pathname === "/blog") {
    return pickQuickReplies(
      [
        {
          id: "blog-recent-topics",
          label:
            language === "zh"
              ? "你最近在写哪些主题？"
              : "What topics have you been writing about recently?",
          prompt:
            language === "zh"
              ? "你最近在写哪些主题？这些内容大致反映了你在关注什么问题？"
              : "What topics have you been writing about recently, and what do they say about the problems you care about?",
        },
        {
          id: "blog-project-connection",
          label:
            language === "zh"
              ? "这些文章和你的项目实践有什么关系？"
              : "How do these articles connect to your project practice?",
          prompt:
            language === "zh"
              ? "这些文章和你的项目实践有什么关系？它们更像方法总结、复盘，还是观点输出？"
              : "How do these articles connect to your project practice? Are they more like method notes, retrospectives, or point-of-view pieces?",
        },
        {
          id: "blog-smartx-article",
          label:
            language === "zh"
              ? "讲讲 SmartX 设计工作流这篇文章"
              : "Tell me about the SmartX design workflow article",
          prompt:
            language === "zh"
              ? "讲讲 SmartX 设计工作流这篇文章。你当时最想讲清楚的重点是什么？"
              : "Tell me about the SmartX design workflow article. What was the main idea you most wanted to make clear?",
        },
        {
          id: "blog-writing-style",
          label:
            language === "zh"
              ? "你写文章时最看重什么？"
              : "What matters most to you when writing?",
          prompt:
            language === "zh"
              ? "你写这些文章时最看重什么？你更在意观点清晰、经验沉淀，还是对团队有用？"
              : "What matters most to you when writing these posts? Clear perspective, distilled experience, or practical value to a team?",
        },
      ],
      MAX_GLOBAL_QUICK_REPLIES
    );
  }

  return pickQuickReplies(
    [
      localizedKnowledge.quickReplies.find((item) => item.id === "intro"),
      localizedKnowledge.quickReplies.find((item) => item.id === "featured-projects"),
      localizedKnowledge.quickReplies.find((item) => item.id === "design-method"),
      localizedKnowledge.quickReplies.find((item) => item.id === "contact"),
    ],
    MAX_GLOBAL_QUICK_REPLIES
  );
}

function getContextualIntro(pathname, language, localizedKnowledge) {
  if (!isModuleHomePath(pathname)) {
    return "";
  }

  if (pathname === "/work") {
    return language === "zh"
      ? "如果你想更快判断我的代表项目，可以直接问我某个项目的挑战、职责、决策或结果。"
      : "If you want to evaluate my strongest case studies quickly, ask me about a project's challenge, role, decision-making, or outcome.";
  }

  if (pathname === "/about") {
    return language === "zh"
      ? "如果你是在判断岗位匹配，可以直接问我经历、技能结构、设计方法或联系方式。"
      : "If you're evaluating role fit, you can ask about my experience, skill set, design approach, or contact information.";
  }

  if (pathname === "/blog") {
    return language === "zh"
      ? "可以直接问我最近在写什么，或者这些文章和项目实践之间的关系。"
      : "You can ask what I have been writing lately, or how these articles connect back to my project practice.";
  }

  return language === "zh"
    ? "Hi，我是 Porty。可以问我项目、经历、技能或联系方式。"
    : "Hi, I'm Porty. Ask me about projects, experience, skills, or contact.";
}

function getQuickReplyHeading(language) {
  return language === "zh"
    ? "建议问题"
    : "Suggestions";
}

function getComposerHint(language) {
  return language === "zh"
    ? "回车发送 · Shift + 回车换行"
    : "Enter to send · Shift + Enter for a new line";
}

function getLoadingMessage(language) {
  return language === "zh"
    ? "thinking"
    : "thinking";
}

function splitAnswerIntoReadableParagraphs(content, language) {
  const trimmedContent = content.trim();

  if (!trimmedContent || /\n\s*\n/.test(trimmedContent) || /^[-*]\s+/m.test(trimmedContent)) {
    return trimmedContent;
  }

  const sentences = trimmedContent.match(/[^。！？.!?]+[。！？.!?]?/g) || [trimmedContent];
  const shouldSplit =
    sentences.length > 2 &&
    trimmedContent.length > (language === "zh" ? 90 : 180);

  if (!shouldSplit) {
    return trimmedContent;
  }

  const paragraphSize = language === "zh" ? 2 : 2;
  const paragraphs = [];

  for (let index = 0; index < sentences.length; index += paragraphSize) {
    paragraphs.push(sentences.slice(index, index + paragraphSize).join("").trim());
  }

  return paragraphs.filter(Boolean).join("\n\n");
}

function tokenizeAssistantAnswer(content, language) {
  if (!content) {
    return [];
  }

  if (language === "zh") {
    return Array.from(content);
  }

  return content.match(/\S+\s*|\s+/g) || Array.from(content);
}

function emphasizeReadableLead(content) {
  if (content.includes("**")) {
    return content;
  }

  const leadPatterns = [
    "当时最核心的问题是：",
    "我的处理方式是：",
    "这里最关键的设计判断是：",
    "最后产出的结果是：",
    "如果现在回头看，我对这个项目最明确的反思是：",
    "邮箱：",
    "社交平台：",
    "The core problem was:",
    "My approach was:",
    "The most important design judgment here was:",
    "The final outcome was:",
    "Looking back, my clearest reflection on this project is:",
  ];

  const matchedLead = leadPatterns.find((pattern) => content.startsWith(pattern));

  if (!matchedLead) {
    return content;
  }

  return `**${matchedLead}**${content.slice(matchedLead.length)}`;
}

function renderInlineMarkdown(content) {
  const segments = content.split(/(\*\*.*?\*\*)/g);

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) {
      return (
        <strong key={`strong-${index}`}>
          {segment.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={`text-${index}`}>{segment}</Fragment>;
  });
}

function renderMessageContent(content) {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isList = lines.every((line) => /^[-*]\s+/.test(line));

    if (isList) {
      return (
        <ul className={styles.messageList} key={`list-${blockIndex}`}>
          {lines.map((line, lineIndex) => (
            <li className={styles.messageListItem} key={`list-item-${blockIndex}-${lineIndex}`}>
              {renderInlineMarkdown(emphasizeReadableLead(line.replace(/^[-*]\s+/, "")))}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className={styles.messageParagraph} key={`paragraph-${blockIndex}`}>
        {renderInlineMarkdown(emphasizeReadableLead(block))}
      </p>
    );
  });
}

/**
 * @param {{ content: string }} props
 */
function MessageContentComponent({ content }) {
  return (
    <div className={styles.messageText}>
      {renderMessageContent(content)}
    </div>
  );
}

const MessageContent = memo(MessageContentComponent);

export default function PortfolioChatbot() {
  const pathname = usePathname() || "/";
  const { language } = useLanguage();
  const localizedKnowledge = useMemo(
    () => getLocalizedChatValue(portfolioChatKnowledge, language),
    [language]
  );
  const quickReplies = useMemo(
    () => getContextualQuickReplies(pathname, localizedKnowledge, language),
    [language, localizedKnowledge, pathname]
  );
  const contextualIntro = getContextualIntro(pathname, language, localizedKnowledge);
  const loadingMessage = getLoadingMessage(language);
  const [panelPhase, setPanelPhase] = useState("closed");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  /** @type {[ChatMessage[], import("react").Dispatch<import("react").SetStateAction<ChatMessage[]>>]} */
  const [messages, setMessages] = useState(() => [
    createInitialAssistantMessage(language),
  ]);
  const abortControllerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const composerFieldRef = useRef(null);
  const messageViewportRef = useRef(null);
  const typingResolveRef = useRef(null);
  const typingTimerRef = useRef(null);
  const isPanelMounted = panelPhase !== "closed";
  const isOpen = panelPhase === "opening" || panelPhase === "open";
  const shouldShowWelcomeMessage = isModuleHomePath(pathname);
  const isWelcomeState =
    shouldShowWelcomeMessage &&
    messages.length === 1 &&
    isInitialAssistantMessage(messages[0]);

  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    clearTypingTimer();
    // 跟随站点语言时，直接重置会话可以避免中英文消息混杂在同一个面板里。
    setMessages([
      {
        ...createInitialAssistantMessage(language),
        content: contextualIntro,
      },
    ]);
    setInputValue("");
    setErrorMessage("");
    setStatusMessage("");
    setIsTyping(false);
    setIsLoading(false);
  }, [contextualIntro, language, localizedKnowledge, pathname]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(PANEL_STATE_STORAGE_KEY) === "open") {
      setPanelPhase("open");
    }
  }, []);

  useEffect(() => {
    const viewport = messageViewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTop = viewport.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    const composerField = composerFieldRef.current;

    if (!composerField) {
      return;
    }

    composerField.style.height = "auto";
    composerField.style.height = `${composerField.scrollHeight}px`;
  }, [inputValue]);

  function clearTypingTimer() {
    if (!typingTimerRef.current) {
      return;
    }

    window.clearTimeout(typingTimerRef.current);
    typingTimerRef.current = null;

    typingResolveRef.current?.();
    typingResolveRef.current = null;
  }

  function animateAssistantMessage({
    answer,
    messageId,
    relatedProjects,
    suggestedQuestions,
  }) {
    const tokens = tokenizeAssistantAnswer(answer, language);

    setIsTyping(true);

    return new Promise((resolve) => {
      let tokenIndex = 0;
      let visibleContent = "";
      typingResolveRef.current = resolve;

      function commitNextToken() {
        if (tokenIndex >= tokens.length) {
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === messageId
                ? {
                    ...message,
                    content: answer,
                    relatedProjects,
                    suggestedQuestions,
                  }
                : message
            )
          );
          setIsTyping(false);
          setIsLoading(false);
          typingResolveRef.current = null;
          typingTimerRef.current = null;
          resolve();
          return;
        }

        visibleContent += tokens[tokenIndex];
        tokenIndex += 1;

        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === messageId
              ? {
                  ...message,
                  content: visibleContent,
                }
              : message
          )
        );

        typingTimerRef.current = window.setTimeout(commitNextToken, language === "zh" ? 14 : 22);
      }

      commitNextToken();
    });
  }

  async function sendQuestion(rawQuestion) {
    const trimmedQuestion = rawQuestion.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    /** @type {ChatMessage} */
    const userMessage = {
      id: createMessageId("user"),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInputValue("");
    setErrorMessage("");
    setStatusMessage("");
    setIsLoading(true);
    clearTypingTimer();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          language,
          messages: serializeChatHistory([...messages, userMessage]),
          pathname,
          question: trimmedQuestion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessageId = createMessageId("assistant");
      const structuredAnswer = splitAnswerIntoReadableParagraphs(data.answer || "", language);
      const relatedProjects = data.relatedProjects || [];
      const suggestedQuestions = filterSuggestedQuestionsForHistory(
        data.suggestedQuestions || [],
        [...messages, userMessage]
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          relatedProjects: [],
          suggestedQuestions: [],
        },
      ]);
      setStatusMessage(data.notice || "");

      await animateAssistantMessage({
        answer: structuredAnswer,
        messageId: assistantMessageId,
        relatedProjects,
        suggestedQuestions,
      });
    } catch (error) {
      if (error?.name === "AbortError") {
        setStatusMessage(
          language === "zh"
            ? "已暂停本次回答。"
            : "This reply was paused."
        );
        setIsTyping(false);
        setIsLoading(false);
        return;
      }

      console.error("Portfolio chatbot request failed.", error);
      setIsTyping(false);
      setIsLoading(false);
      setErrorMessage(
        language === "zh"
          ? "暂时无法连接聊天服务。你可以稍后再试，或者先使用上面的预设问题浏览作品集内容。"
          : "The chat service is temporarily unavailable. Please try again later, or use the quick questions above to continue exploring the portfolio."
      );
    } finally {
      abortControllerRef.current = null;
    }
  }

  function handleStopGeneration() {
    abortControllerRef.current?.abort();
    clearTypingTimer();
    setIsTyping(false);
    setIsLoading(false);
  }

  function clearCloseTimer() {
    if (!closeTimerRef.current) {
      return;
    }

    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  function openPanel() {
    if (panelPhase === "open") {
      return;
    }

    window.sessionStorage.setItem(PANEL_STATE_STORAGE_KEY, "open");
    clearCloseTimer();
    setPanelPhase("opening");

    // 这里多等一帧，让浏览器先画出“入口态”，再平滑过渡到展开态。
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setPanelPhase("open");
      });
    });
  }

  function closePanel() {
    if (panelPhase === "closed" || panelPhase === "closing") {
      return;
    }

    window.sessionStorage.setItem(PANEL_STATE_STORAGE_KEY, "closed");
    clearCloseTimer();
    setPanelPhase("closing");
    closeTimerRef.current = window.setTimeout(() => {
      setPanelPhase("closed");
      closeTimerRef.current = null;
    }, PANEL_CLOSE_DURATION_MS);
  }

  function resetConversation() {
    abortControllerRef.current?.abort();
    setMessages([
      {
        ...createInitialAssistantMessage(language),
        content: contextualIntro,
      },
    ]);
    setInputValue("");
    setErrorMessage("");
    setStatusMessage("");
    setIsTyping(false);
    setIsLoading(false);
    clearTypingTimer();
  }

  function handleSubmit(event) {
    event.preventDefault();
    void sendQuestion(inputValue);
  }

  function handleComposerKeyDown(event) {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    void sendQuestion(inputValue);
  }

  return (
    <>
      {isPanelMounted ? (
        <section
          aria-label={
            language === "zh" ? "作品集导览面板" : "Portfolio guide panel"
          }
          className={styles.chatPanel}
          data-phase={panelPhase}
        >
          <header className={styles.chatPanelHeader}>
            <button
              aria-label={language === "zh" ? "新建对话" : "New chat"}
              className={styles.iconButton}
              onClick={resetConversation}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={15} />
            </button>

            <div className={styles.chatPanelHeading}>
              <div className={styles.chatPanelTitleRow}>
                <h2 className={styles.chatPanelTitle}>
                  {language === "zh" ? "问问 Porty" : "Ask Porty"}
                </h2>
              </div>
            </div>

            <button
              aria-label={language === "zh" ? "关闭聊天面板" : "Close chat panel"}
              className={styles.iconButton}
              onClick={closePanel}
              type="button"
            >
              <X aria-hidden="true" size={16} />
            </button>
          </header>

          <div
            className={[
              styles.messageViewport,
              isWelcomeState ? styles.messageViewportWelcome : "",
            ]
              .filter(Boolean)
              .join(" ")}
            ref={messageViewportRef}
          >
            {messages.map((message, index) => {
              const isLatestMessage = index === messages.length - 1;
              const isInitialWelcomeMessage = isInitialAssistantMessage(message);
              const isEmptyWelcomeMessage =
                isInitialWelcomeMessage &&
                !message.content.trim();
              const shouldHideWelcomeMessage =
                isInitialWelcomeMessage &&
                (!shouldShowWelcomeMessage || messages.length > 1);

              if (isEmptyWelcomeMessage || shouldHideWelcomeMessage) {
                return null;
              }

              return (
                <article
                  className={[
                    styles.messageBubble,
                    message.role === "user" ? styles.userBubble : styles.assistantBubble,
                    isInitialWelcomeMessage && messages.length === 1
                      ? styles.welcomeBubble
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={message.id}
                >
                  {isInitialWelcomeMessage && messages.length === 1 ? (
                    <span
                      aria-label={
                        language === "zh" ? "作品集导览小机器人" : "Portfolio guide mascot"
                      }
                      className={styles.chatMascot}
                      role="img"
                    />
                  ) : null}

                  <MessageContent content={message.content} />

                  {isLatestMessage && message.role === "assistant" && message.suggestedQuestions?.length ? (
                    <section className={styles.suggestedQuestionSection}>
                      <div className={styles.suggestedQuestions}>
                        {message.suggestedQuestions.map((suggestion) => (
                          <button
                            className={styles.suggestionButton}
                            key={suggestion}
                            onClick={() => void sendQuestion(suggestion)}
                            type="button"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </section>
                  ) : null}
                </article>
              );
            })}

            {isWelcomeState || (messages.length === 1 && !shouldShowWelcomeMessage) ? (
              <section className={styles.quickReplySection}>
                <p className={styles.quickReplyHeading}>
                  {getQuickReplyHeading(language)}
                </p>

                <div className={styles.quickReplyList}>
                  {quickReplies.map((item, index) => (
                    <button
                      className={[
                        styles.quickReplyButton,
                        index === 0 ? styles.quickReplyButtonPrimary : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={item.id}
                      onClick={() => void sendQuestion(item.prompt)}
                      type="button"
                    >
                      <span className={styles.quickReplyButtonInner}>
                        <span>{item.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {isLoading && !isTyping ? (
              <article
                className={[
                  styles.messageBubble,
                  styles.assistantBubble,
                  styles.loadingMessageBubble,
                ].join(" ")}
                role="status"
              >
                <div className={styles.loadingBubble}>
                  <span className={styles.loadingText}>{loadingMessage}</span>
                </div>
              </article>
            ) : null}
          </div>

          <footer className={styles.chatPanelFooter}>
            {statusMessage ? <p className={styles.statusMessage}>{statusMessage}</p> : null}
            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

            <form className={styles.composer} onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="portfolio-chat-input">
                {language === "zh" ? "聊天输入框" : "Chat input"}
              </label>

              <div className={styles.composerFieldWrap}>
                <textarea
                  className={styles.composerField}
                  id="portfolio-chat-input"
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  placeholder={
                    language === "zh"
                      ? "问问 Porty"
                      : "Message Porty"
                  }
                  ref={composerFieldRef}
                  rows={1}
                  value={inputValue}
                />
                <span className={styles.composerHint}>{getComposerHint(language)}</span>
                <button
                  aria-label={
                    isLoading
                      ? language === "zh"
                        ? "暂停回答"
                        : "Pause reply"
                      : language === "zh"
                        ? "发送消息"
                        : "Send message"
                  }
                  className={[
                    styles.sendButton,
                    isLoading ? styles.stopButton : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={!isLoading && !inputValue.trim()}
                  onClick={isLoading ? handleStopGeneration : undefined}
                  type={isLoading ? "button" : "submit"}
                >
                  {isLoading ? (
                    <Square aria-hidden="true" fill="currentColor" size={11} strokeWidth={2.5} />
                  ) : (
                    <ArrowUp aria-hidden="true" size={16} strokeWidth={2.25} />
                  )}
                </button>
              </div>
            </form>
          </footer>
        </section>
      ) : null}

      {!isOpen ? (
        <button
          aria-expanded={isOpen}
          aria-label={
            language === "zh"
              ? "打开作品集导览"
              : "Open portfolio guide"
          }
          className={styles.floatingTrigger}
          onClick={openPanel}
          type="button"
        >
          <Sparkles aria-hidden="true" size={13} strokeWidth={2} />
        </button>
      ) : null}
    </>
  );
}
