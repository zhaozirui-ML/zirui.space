"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import CommentAdminActions from "./CommentAdminActions";
import {
  clearCommentsAccessToken,
  getStoredCommentsAccessToken,
  storeCommentsAccessToken,
} from "../../lib/comments/comment-owner-client";
import styles from "../../styles/comments-page.module.css";

function displayDate(value, language) {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function groupComments(comments) {
  return comments.reduce((groups, comment) => {
    const key = `${comment.workSlug}:${comment.sectionId}`;
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.items.push(comment);
      return groups;
    }

    groups.set(key, {
      key,
      sectionId: comment.sectionId,
      sectionLabel: comment.sectionLabel,
      workSlug: comment.workSlug,
      items: [comment],
    });

    return groups;
  }, new Map());
}

export default function CommentsPageClient({ initialAccess = "", language = "zh" }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const text = {
    bootstrap:
      language === "en"
        ? "Saving private review access for this browser..."
        : "正在为当前浏览器保存私有管理权限…",
    clear:
      language === "en" ? "Exit owner mode" : "退出管理模式",
    description:
      language === "en"
        ? "Private feedback management for your portfolio. This page only works in browsers where you have enabled owner mode."
        : "这里是作品评论的私有管理页。只有你当前启用了 owner 模式的浏览器，才能看到和管理这些内容。",
    empty: language === "en" ? "No feedback yet." : "暂时还没有收到反馈。",
    error:
      language === "en"
        ? "Private review access is missing or invalid in this browser."
        : "当前浏览器没有可用的私有管理权限，或者权限已经失效。",
    eyebrow: language === "en" ? "Private review" : "私有反馈",
    manageHint:
      language === "en"
        ? "Use /comments?access=... once in this browser to enable owner mode."
        : "你可以在当前浏览器打开一次 /comments?access=... 来启用 owner 模式。",
    status: language === "en" ? "Status" : "状态",
    title: language === "en" ? "Portfolio feedback" : "作品反馈",
    visitor: language === "en" ? "Anonymous reader" : "匿名访客",
  };

  const loadComments = useCallback(async (nextAccessToken) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/comments?access=${encodeURIComponent(nextAccessToken)}`,
        {
          cache: "no-store",
        },
      );
      const data = await response.json();

      if (!response.ok || data?.ok !== true) {
        throw new Error(data?.error || text.error);
      }

      setComments(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      clearCommentsAccessToken();
      setAccessToken("");
      setComments([]);
      setErrorMessage(error instanceof Error ? error.message : text.error);
    } finally {
      setIsLoading(false);
    }
  }, [text.error]);

  useEffect(() => {
    const nextAccessToken = initialAccess
      ? storeCommentsAccessToken(initialAccess)
      : getStoredCommentsAccessToken();

    setAccessToken(nextAccessToken);
    setIsHydrated(true);

    if (initialAccess) {
      router.replace("/comments");
    }
  }, [initialAccess, router]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    loadComments(accessToken);
  }, [accessToken, isHydrated, loadComments]);

  const groups = useMemo(
    () => Array.from(groupComments(comments).values()),
    [comments],
  );

  function handleExitOwnerMode() {
    clearCommentsAccessToken();
    setAccessToken("");
    setComments([]);
    setErrorMessage("");
    router.replace("/comments");
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1 className={styles.title}>{text.title}</h1>
          <p className={styles.description}>{text.description}</p>
          {accessToken ? (
            <button
              className={styles.ownerModeButton}
              onClick={handleExitOwnerMode}
              type="button"
            >
              {text.clear}
            </button>
          ) : null}
        </header>

        {!isHydrated || (initialAccess && accessToken) ? (
          <p className={styles.statePanel}>{text.bootstrap}</p>
        ) : null}

        {isHydrated && !accessToken ? (
          <div className={styles.statePanel}>
            <p className={styles.stateText}>{errorMessage || text.error}</p>
            <p className={styles.stateHint}>{text.manageHint}</p>
          </div>
        ) : null}

        {isHydrated && accessToken && isLoading ? (
          <p className={styles.statePanel}>{language === "en" ? "Loading..." : "正在加载…"}</p>
        ) : null}

        {isHydrated && accessToken && !isLoading && errorMessage ? (
          <p className={styles.statePanel}>{errorMessage}</p>
        ) : null}

        {isHydrated && accessToken && !isLoading && !errorMessage && groups.length === 0 ? (
          <p className={styles.statePanel}>{text.empty}</p>
        ) : null}

        {isHydrated && accessToken && !isLoading && !errorMessage && groups.length > 0 ? (
          <div className={styles.groups}>
            {groups.map((group) => (
              <section className={styles.group} key={group.key}>
                <header className={styles.groupHeader}>
                  <div>
                    <h2 className={styles.groupTitle}>{group.sectionLabel}</h2>
                    <p className={styles.groupMeta}>
                      {group.workSlug} / {group.sectionId}
                    </p>
                  </div>
                  <Link
                    className={styles.groupLink}
                    href={`/work/${group.workSlug}`}
                  >
                    {language === "en" ? "Open work page" : "打开作品页"}
                  </Link>
                </header>

                <ul className={styles.commentList}>
                  {group.items.map((comment) => (
                    <li className={styles.commentItem} key={comment.id}>
                      <p className={styles.commentText}>{comment.comment}</p>
                      <p className={styles.visitorName}>
                        {comment.visitorName || text.visitor}
                      </p>
                      <p className={styles.commentMeta}>
                        {displayDate(comment.createdAt, language)} / {text.status}:{" "}
                        {comment.status}
                      </p>
                      <CommentAdminActions
                        accessToken={accessToken}
                        commentId={comment.id}
                        language={language}
                        onActionComplete={() => loadComments(accessToken)}
                        status={comment.status}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
