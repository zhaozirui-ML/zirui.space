"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  LoaderCircle,
  MessageCircleMore,
  SendHorizontal,
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
 *   relatedPages?: string[],
 *   suggestedQuestions?: string[],
 * }} ChatMessage
 */

const CHATBOT_PAGE_LABELS = {
  "/": { zh: "首页", en: "Home" },
  "/about": { zh: "About / 简历", en: "About" },
  "/work": { zh: "Work / 作品", en: "Work" },
  "/work/axzo-design-system": { zh: "Axzo 设计系统门户", en: "Axzo Design Portal" },
  "/work/cloudtower-design-system": { zh: "CloudTower 设计系统", en: "CloudTower Design System" },
  "/work/data-visualization-screen": { zh: "数据可视化系统", en: "Data Visualization System" },
  "/work/drawing-ledger-2-0": { zh: "图纸台账 2.0", en: "Drawing Register 2.0" },
};

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
        ? "你好，我是这个作品集里的 Portfolio Chatbot。你可以问我关于赵子瑞的项目、经历、技能、设计方法或联系方式的问题。"
        : "Hi, I'm the Portfolio Chatbot for this portfolio. You can ask me about Zirui Zhao's projects, experience, skills, design approach, or contact information.",
    relatedPages: ["/about", "/work"],
  };
}

function createMessageId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getPageLabel(pathname, language) {
  const localizedLabel = CHATBOT_PAGE_LABELS[pathname];

  return localizedLabel ? localizedLabel[language] : pathname;
}

export default function PortfolioChatbot() {
  const { language } = useLanguage();
  const localizedKnowledge = useMemo(
    () => getLocalizedChatValue(portfolioChatKnowledge, language),
    [language]
  );
  const quickReplies = localizedKnowledge.quickReplies;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  /** @type {[ChatMessage[], import("react").Dispatch<import("react").SetStateAction<ChatMessage[]>>]} */
  const [messages, setMessages] = useState(() => [createInitialAssistantMessage(language)]);
  const messageViewportRef = useRef(null);

  useEffect(() => {
    // 跟随站点语言时，直接重置会话可以避免中英文消息混杂在同一个面板里。
    setMessages([createInitialAssistantMessage(language)]);
    setInputValue("");
    setErrorMessage("");
    setStatusMessage("");
  }, [language]);

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
          relatedPages: data.relatedPages || [],
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

  return (
    <>
      {isOpen ? (
        <section
          aria-label={
            language === "zh" ? "作品集问答助手面板" : "Portfolio assistant panel"
          }
          className={styles.chatPanel}
        >
          <header className={styles.chatPanelHeader}>
            <div className={styles.chatPanelHeading}>
              <span className={styles.chatPanelEyebrow}>
                <Sparkles aria-hidden="true" size={14} />
                {language === "zh" ? "Portfolio Assistant" : "Portfolio Assistant"}
              </span>
              <h2 className={styles.chatPanelTitle}>
                {language === "zh" ? "问我作品集相关的问题" : "Ask me about the portfolio"}
              </h2>
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
            {messages.map((message) => (
              <article
                className={[
                  styles.messageBubble,
                  message.role === "user" ? styles.userBubble : styles.assistantBubble,
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={message.id}
              >
                <p className={styles.messageRole}>
                  {message.role === "user"
                    ? language === "zh"
                      ? "你"
                      : "You"
                    : language === "zh"
                      ? "Portfolio Chatbot"
                      : "Portfolio Chatbot"}
                </p>

                <p className={styles.messageText}>{message.content}</p>

                {message.relatedPages?.length ? (
                  <div className={styles.relatedPages}>
                    {message.relatedPages.map((pathname) => (
                      <Link className={styles.relatedPageLink} href={pathname} key={pathname}>
                        {getPageLabel(pathname, language)}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {message.role === "assistant" && message.suggestedQuestions?.length ? (
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
                ) : null}
              </article>
            ))}

            {messages.length === 1 ? (
              <section className={styles.quickReplySection}>
                <p className={styles.quickReplyHeading}>
                  {language === "zh" ? "你可以先从这些问题开始：" : "Start with one of these questions:"}
                </p>

                <div className={styles.quickReplyList}>
                  {quickReplies.map((item) => (
                    <button
                      className={styles.quickReplyButton}
                      key={item.id}
                      onClick={() => void sendQuestion(item.prompt)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {isLoading ? (
              <div className={styles.loadingRow} role="status">
                <LoaderCircle aria-hidden="true" className={styles.loadingIcon} size={16} />
                {language === "zh" ? "正在整理回答…" : "Preparing the reply..."}
              </div>
            ) : null}
          </div>

          <footer className={styles.chatPanelFooter}>
            {statusMessage ? <p className={styles.statusMessage}>{statusMessage}</p> : null}
            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

            <form className={styles.composer} onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="portfolio-chat-input">
                {language === "zh" ? "聊天输入框" : "Chat input"}
              </label>

              <textarea
                className={styles.composerField}
                id="portfolio-chat-input"
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={
                  language === "zh"
                    ? "例如：讲讲图纸台账 2.0 这个项目"
                    : "For example: Tell me about Drawing Register 2.0"
                }
                rows={3}
                value={inputValue}
              />

              <button
                className={styles.sendButton}
                disabled={!inputValue.trim() || isLoading}
                type="submit"
              >
                <SendHorizontal aria-hidden="true" size={16} />
                {language === "zh" ? "发送" : "Send"}
              </button>
            </form>
          </footer>
        </section>
      ) : null}

      <button
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? language === "zh"
              ? "关闭作品集聊天助手"
              : "Close portfolio assistant"
            : language === "zh"
              ? "打开作品集聊天助手"
              : "Open portfolio assistant"
        }
        className={styles.floatingTrigger}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <MessageCircleMore aria-hidden="true" size={20} />
        <span>{language === "zh" ? "问我作品集" : "Ask the portfolio"}</span>
      </button>
    </>
  );
}
