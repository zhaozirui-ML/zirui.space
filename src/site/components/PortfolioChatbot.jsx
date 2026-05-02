"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  LoaderCircle,
  Sparkles,
  X,
} from "lucide-react";

import { useLanguage } from "../i18n/LanguageProvider";
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
        ? "你好，我可以带你快速浏览赵子瑞的作品集。可以问我项目、经历、技能、设计方法或联系方式。"
        : "Hi, I can guide you through Zirui's portfolio. Ask about projects, experience, skills, process, or contact.",
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
  const project = getProjectFromPathname(pathname, localizedKnowledge);

  if (project) {
    return language === "zh"
      ? `你现在正在看 ${project.title}。如果你愿意，我可以直接展开这个项目的背景、我的角色、关键决策或结果。`
      : `You're currently viewing ${project.title}. If you want, I can go straight into the background, my role, key decisions, or outcomes for this project.`;
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
    ? "你好，我可以带你快速浏览赵子瑞的作品集。可以问我项目、经历、技能、设计方法或联系方式。"
    : "Hi, I can guide you through Zirui's portfolio. Ask about projects, experience, skills, process, or contact.";
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

function getRelatedProjectHeading(language) {
  return language === "zh"
    ? "继续浏览"
    : "Continue browsing";
}

function getCurrentProjectHeading(language) {
  return language === "zh"
    ? "下一步"
    : "Next step";
}

function getComposerHint(language) {
  return language === "zh"
    ? "回车发送 · Shift + 回车换行"
    : "Enter to send · Shift + Enter for a new line";
}

function getLoadingMessage(pathname, language, localizedKnowledge) {
  const project = getProjectFromPathname(pathname, localizedKnowledge);

  if (project) {
    return language === "zh"
      ? `正在整理 ${project.title} 的关键线索…`
      : `Pulling together the key threads from ${project.title}...`;
  }

  return language === "zh"
    ? "正在整理一条更像作品集导览的回答…"
    : "Putting together a reply that feels more like a portfolio walkthrough...";
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
  const currentPageLabel = getPageLabel(pathname, language);
  const contextualIntro = getContextualIntro(pathname, language, localizedKnowledge);
  const loadingMessage = getLoadingMessage(pathname, language, localizedKnowledge);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  /** @type {[ChatMessage[], import("react").Dispatch<import("react").SetStateAction<ChatMessage[]>>]} */
  const [messages, setMessages] = useState(() => [
    createInitialAssistantMessage(language),
  ]);
  const messageViewportRef = useRef(null);

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
    const viewport = messageViewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTop = viewport.scrollHeight;
  }, [messages, isLoading]);

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
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const data = await response.json();

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId("assistant"),
          role: "assistant",
          content: data.answer,
          relatedProjects: data.relatedProjects || [],
          suggestedQuestions: data.suggestedQuestions || [],
        },
      ]);
      setStatusMessage(data.notice || "");
    } catch (error) {
      console.error("Portfolio chatbot request failed.", error);
      setErrorMessage(
        language === "zh"
          ? "暂时无法连接聊天服务。你可以稍后再试，或者先使用上面的预设问题浏览作品集内容。"
          : "The chat service is temporarily unavailable. Please try again later, or use the quick questions above to continue exploring the portfolio."
      );
    } finally {
      setIsLoading(false);
    }
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
      {isOpen ? (
        <section
          aria-label={
            language === "zh" ? "作品集导览面板" : "Portfolio guide panel"
          }
          className={styles.chatPanel}
        >
          <header className={styles.chatPanelHeader}>
            <div className={styles.chatPanelHeading}>
              <div className={styles.chatPanelTitleRow}>
                <h2 className={styles.chatPanelTitle}>
                  {language === "zh" ? "作品集导览" : "Portfolio guide"}
                </h2>
              </div>
              <p className={styles.chatPanelContext}>
                {language === "zh" ? "当前" : "Now viewing"}: {currentPageLabel}
              </p>
            </div>

            <button
              aria-label={language === "zh" ? "关闭聊天面板" : "Close chat panel"}
              className={styles.iconButton}
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={16} />
            </button>
          </header>

          <div className={styles.messageViewport} ref={messageViewportRef}>
            {messages.map((message) => {
              const currentProjectEntry = message.relatedProjects?.find(
                (project) => project.kind === "current-project"
              );
              const secondaryProjects =
                message.relatedProjects?.filter(
                  (project) => project.kind !== "current-project"
                ) || [];

              return (
              <article
                className={[
                  styles.messageBubble,
                  message.role === "user" ? styles.userBubble : styles.assistantBubble,
                  message.role === "assistant" && messages.length === 1
                    ? styles.welcomeBubble
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={message.id}
              >
                {message.role === "assistant" && messages.length === 1 ? (
                  <span
                    aria-label={
                      language === "zh" ? "作品集导览小机器人" : "Portfolio guide mascot"
                    }
                    className={styles.chatMascot}
                    role="img"
                  />
                ) : null}

                <p className={styles.messageText}>{message.content}</p>

                {message.role === "assistant" && currentProjectEntry ? (
                  <section className={styles.currentProjectSection}>
                    <p className={styles.relatedProjectHeading}>
                      {getCurrentProjectHeading(language)}
                    </p>

                    <Link
                      className={styles.currentProjectCard}
                      href={currentProjectEntry.path}
                    >
                      <span className={styles.currentProjectEyebrow}>
                        {currentProjectEntry.eyebrow ||
                          (language === "zh"
                            ? "当前正在聊"
                            : "Currently discussing")}
                      </span>
                      <span className={styles.currentProjectTitle}>
                        {currentProjectEntry.title}
                      </span>
                      <span className={styles.currentProjectReason}>
                        {currentProjectEntry.reason}
                      </span>
                      <span className={styles.relatedProjectCta}>
                        {language === "zh" ? "打开完整案例" : "Open full case study"}
                      </span>
                    </Link>
                  </section>
                ) : null}

                {message.role === "assistant" && secondaryProjects.length ? (
                  <section className={styles.relatedProjectSection}>
                    <p className={styles.relatedProjectHeading}>
                      {getRelatedProjectHeading(language)}
                    </p>

                    <div className={styles.relatedProjectList}>
                      {secondaryProjects.map((project) => (
                        <Link
                          className={styles.relatedProjectCard}
                          href={project.path}
                          key={project.slug}
                        >
                          <span className={styles.relatedProjectTitle}>{project.title}</span>
                          <span className={styles.relatedProjectReason}>{project.reason}</span>
                          <span className={styles.relatedProjectCta}>
                            {language === "zh" ? "查看项目页" : "Open project page"}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}

                {message.role === "assistant" && message.suggestedQuestions?.length ? (
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

            {messages.length === 1 ? (
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

            {isLoading ? (
              <article className={[styles.messageBubble, styles.assistantBubble].join(" ")} role="status">
                <div className={styles.loadingBubble}>
                  <LoaderCircle aria-hidden="true" className={styles.loadingIcon} size={16} />
                  <span>{loadingMessage}</span>
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
                      ? "例如：讲讲图纸台账 2.0 这个项目"
                      : "For example: Tell me about Drawing Register 2.0"
                  }
                  rows={3}
                  value={inputValue}
                />
                <span className={styles.composerHint}>{getComposerHint(language)}</span>
                <button
                  aria-label={language === "zh" ? "发送消息" : "Send message"}
                  className={styles.sendButton}
                  disabled={!inputValue.trim() || isLoading}
                  type="submit"
                >
                  <ArrowUp aria-hidden="true" size={16} strokeWidth={2.25} />
                </button>
              </div>
            </form>
          </footer>
        </section>
      ) : null}

      <button
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? language === "zh"
              ? "关闭作品集导览"
              : "Close portfolio guide"
            : language === "zh"
              ? "打开作品集导览"
              : "Open portfolio guide"
        }
        className={styles.floatingTrigger}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <Sparkles aria-hidden="true" size={20} strokeWidth={2} />
      </button>
    </>
  );
}
