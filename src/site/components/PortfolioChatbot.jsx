"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, RotateCcw, Square, Sparkles, X } from "lucide-react";

import { useLanguage } from "../i18n/LanguageProvider";
import { isModuleHomePath } from "../lib/is-module-home-path";
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

  return suggestedQuestions.filter((question) => {
    const normalizedQuestion = normalizeQuestionKey(question);

    if (!normalizedQuestion || seenQuestions.has(normalizedQuestion)) {
      return false;
    }

    seenQuestions.add(normalizedQuestion);

    return !askedQuestions.some((askedQuestion) =>
      isSimilarQuestion(question, askedQuestion)
    );
  });
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

function pickQuickReplies(items, maxCount) {
  return items.filter(Boolean).slice(0, maxCount);
}

function getContextualQuickReplies(pathname, localizedKnowledge, language) {
  const project = getProjectFromPathname(pathname, localizedKnowledge);

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
      ? "你现在在作品页。如果你想更快判断我的代表项目，可以直接问我某个项目的挑战、职责、决策或结果。"
      : "You're on the Work page. If you want to evaluate my strongest case studies quickly, ask me about a project's challenge, role, decision-making, or outcome.";
  }

  if (pathname === "/about") {
    return language === "zh"
      ? "你现在在 About 页。如果你是在判断岗位匹配，可以直接问我经历、技能结构、设计方法或联系方式。"
      : "You're on the About page. If you're evaluating role fit, you can ask about my experience, skill set, design approach, or contact information.";
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

function getSuggestedFollowupHeading(language) {
  return language === "zh"
    ? "继续追问"
    : "Suggested follow-ups";
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
  }, [contextualIntro, language, localizedKnowledge, pathname]);

  useEffect(() => {
    return () => {
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
                  {language === "zh" ? "作品集导览" : "Portfolio guide"}
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
              const previousUserMessageCount = messages
                .slice(0, index)
                .filter((item) => item.role === "user").length;
              const isFollowupUserMessage =
                message.role === "user" && previousUserMessageCount > 0;
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
                    isFollowupUserMessage ? styles.followupUserBubble : "",
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

                  <div className={styles.messageText}>
                    {renderMessageContent(message.content)}
                  </div>

                  {isLatestMessage && message.role === "assistant" && message.suggestedQuestions?.length ? (
                    <section className={styles.suggestedQuestionSection}>
                      <p className={styles.suggestedQuestionHeading}>
                        {getSuggestedFollowupHeading(language)}
                      </p>

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
