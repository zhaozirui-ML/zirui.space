"use client";

import { useEffect, useRef, useState } from "react";

import CommentForm from "./CommentForm";
import CommentTrigger from "./CommentTrigger";
import { useCommentHistory } from "./CommentHistoryProvider";
import styles from "../../styles/comment-feedback.module.css";

const LONG_PRESS_DELAY_MS = 520;
const LONG_PRESS_MOVE_THRESHOLD = 12;

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getCommentCountLabel(count) {
  return `${count} ${count === 1 ? "comment" : "comments"}`;
}

function getCommentAuthor(comment, language) {
  return comment?.visitorName || (language === "en" ? "Visitor" : "访客");
}

function getAvatarLabel(author) {
  return author.trim().charAt(0).toUpperCase() || "?";
}

function getReceiptAuthors(comments, language) {
  const authors = [];
  const seenAuthors = new Set();

  comments.forEach((comment) => {
    const author = getCommentAuthor(comment, language);
    const authorKey = author.toLowerCase();

    if (!seenAuthors.has(authorKey)) {
      seenAuthors.add(authorKey);
      authors.push(author);
    }
  });

  return authors.slice(0, 3);
}

function getRelativeTime(value, language) {
  const createdTime = new Date(value).getTime();
  const now = Date.now();

  if (!Number.isFinite(createdTime)) {
    return language === "en" ? "Just now" : "刚刚";
  }

  const diffInSeconds = Math.max(0, Math.floor((now - createdTime) / 1000));
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return language === "en" ? "Just now" : "刚刚";
  }

  if (diffInMinutes < 60) {
    return language === "en" ? `${diffInMinutes}m ago` : `${diffInMinutes} 分钟前`;
  }

  if (diffInHours < 24) {
    return language === "en" ? `${diffInHours}h ago` : `${diffInHours} 小时前`;
  }

  if (diffInDays < 365) {
    return language === "en" ? `${diffInDays}d ago` : `${diffInDays} 天前`;
  }

  return language === "en"
    ? `${Math.floor(diffInDays / 365)}y ago`
    : `${Math.floor(diffInDays / 365)} 年前`;
}

function getMoreCommentLabel(count, language) {
  if (language === "en") {
    return `${count} more ${count === 1 ? "comment" : "comments"}`;
  }

  return `${count} 条更多评论`;
}

function getThreadLabel(language) {
  return language === "en" ? "Comment thread" : "评论线程";
}

function getThreadDragLabel(language) {
  return language === "en" ? "Drag comment panel" : "拖动评论面板";
}

function getSafeDomId(value) {
  return String(value || "comment-target").replace(/[^a-zA-Z0-9_-]/g, "-");
}

function isInteractiveElement(target) {
  return Boolean(
    target instanceof Element &&
      target.closest("a, button, input, textarea, select, label, [role='button']"),
  );
}

export default function CommentableBlock({
  as: Component = "div",
  children,
  className = "",
  language = "zh",
  sectionId = null,
  sectionLabel = null,
  targetId = null,
  targetLabel = null,
  targetType = "block",
  workSlug,
}) {
  const commentTargetId = targetId || sectionId;
  const commentTargetLabel = targetLabel || sectionLabel;
  const commentHistory = useCommentHistory();
  const [submittedComments, setSubmittedComments] = useState([]);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const [isThreadDragging, setIsThreadDragging] = useState(false);
  const [isMobileActionVisible, setIsMobileActionVisible] = useState(false);
  const [threadOffset, setThreadOffset] = useState({ x: 0, y: 0 });
  const dragStateRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const longPressStartRef = useRef(null);
  const threadRef = useRef(null);
  const Wrapper = /** @type {any} */ (Component);
  const historyComments = commentHistory?.getCommentsForTarget(commentTargetId) || [];
  const visibleComments = commentHistory ? historyComments : submittedComments;
  const latestComment = visibleComments[0] || null;
  const latestCommentAuthor = getCommentAuthor(latestComment, language);
  const receiptAuthors = getReceiptAuthors(visibleComments, language);
  const threadPanelId = `${getSafeDomId(commentTargetId)}-comment-thread`;
  const orderedComments = visibleComments.slice().reverse();

  function handleCommentSubmitted(comment) {
    if (commentHistory) {
      commentHistory.addComment(comment);
    } else {
      setSubmittedComments((current) => [comment, ...current]);
    }

    setIsMobileActionVisible(false);
  }

  function handleThreadOpen() {
    setThreadOffset({ x: 0, y: 0 });
    setIsThreadOpen(true);
  }

  function handleThreadDragStart(event) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    dragStateRef.current = {
      originX: threadOffset.x,
      originY: threadOffset.y,
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsThreadDragging(true);
  }

  function clearLongPressTimer() {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }

  function handleBlockPointerDown(event) {
    if (event.pointerType === "mouse" || isInteractiveElement(event.target)) {
      return;
    }

    longPressStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    clearLongPressTimer();
    longPressTimerRef.current = window.setTimeout(() => {
      setIsMobileActionVisible(true);
      longPressTimerRef.current = null;
    }, LONG_PRESS_DELAY_MS);
  }

  function handleBlockPointerMove(event) {
    const start = longPressStartRef.current;

    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);

    if (distance > LONG_PRESS_MOVE_THRESHOLD) {
      clearLongPressTimer();
      longPressStartRef.current = null;
    }
  }

  function handleBlockPointerEnd(event) {
    const start = longPressStartRef.current;

    if (start?.pointerId === event.pointerId) {
      clearLongPressTimer();
      longPressStartRef.current = null;
    }
  }

  function handleBlockContextMenu(event) {
    if (isMobileActionVisible) {
      event.preventDefault();
    }
  }

  useEffect(() => {
    if (!isThreadOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!threadRef.current?.contains(event.target)) {
        setIsThreadOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsThreadOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThreadOpen]);

  useEffect(() => {
    if (!isThreadDragging) {
      return undefined;
    }

    function handlePointerMove(event) {
      const dragState = dragStateRef.current;

      if (!dragState) {
        return;
      }

      setThreadOffset({
        x: dragState.originX + event.clientX - dragState.startX,
        y: dragState.originY + event.clientY - dragState.startY,
      });
    }

    function handlePointerEnd() {
      dragStateRef.current = null;
      setIsThreadDragging(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [isThreadDragging]);

  useEffect(() => {
    return () => {
      clearLongPressTimer();
    };
  }, []);

  return (
    <Wrapper
      className={joinClassNames(styles.commentableBlock, className)}
      data-mobile-comment-active={isMobileActionVisible ? "true" : "false"}
      data-comment-target-type={targetType}
      onContextMenu={handleBlockContextMenu}
      onPointerCancel={handleBlockPointerEnd}
      onPointerDown={handleBlockPointerDown}
      onPointerMove={handleBlockPointerMove}
      onPointerUp={handleBlockPointerEnd}
    >
      {children}
      <CommentTrigger
        language={language}
        onCommentSubmitted={handleCommentSubmitted}
        targetId={commentTargetId}
        targetLabel={commentTargetLabel}
        workSlug={workSlug}
      />
      {latestComment ? (
        <div className={styles.commentReceipt} data-thread-open={isThreadOpen ? "true" : "false"}>
          <button
            aria-controls={threadPanelId}
            aria-expanded={isThreadOpen}
            aria-haspopup="dialog"
            className={styles.commentReceiptButton}
            onClick={handleThreadOpen}
            type="button"
          >
            <span className={styles.commentReceiptAvatars} aria-hidden="true">
              {receiptAuthors.map((author) => (
                <span className={styles.commentReceiptAvatar} key={author}>
                  {getAvatarLabel(author)}
                </span>
              ))}
            </span>
            <span className={styles.commentReceiptCount}>
              {getCommentCountLabel(visibleComments.length)}
            </span>
            <span className={styles.commentReceiptTime}>
              {getRelativeTime(latestComment.createdAt, language)}
            </span>
          </button>

          <div className={styles.commentPreview} role="status">
            <div className={styles.previewComment}>
              <span className={styles.previewAvatar} aria-hidden="true">
                {getAvatarLabel(latestCommentAuthor)}
              </span>
              <div className={styles.previewBody}>
                <p className={styles.previewMeta}>
                  <strong className={styles.previewAuthor}>{latestCommentAuthor}</strong>
                  <span className={styles.previewTime}>
                    {getRelativeTime(latestComment.createdAt, language)}
                  </span>
                </p>
                <p className={styles.previewText}>{latestComment.comment}</p>
              </div>
            </div>
            {visibleComments.length > 1 ? (
              <p className={styles.previewMore}>
                {getMoreCommentLabel(visibleComments.length - 1, language)}
              </p>
            ) : null}
          </div>

          {isThreadOpen ? (
            <div
              aria-label={getThreadLabel(language)}
              className={styles.threadPanel}
              id={threadPanelId}
              ref={threadRef}
              role="dialog"
              style={{
                transform: `translate3d(${threadOffset.x}px, ${threadOffset.y}px, 0)`,
              }}
            >
              <button
                aria-label={getThreadDragLabel(language)}
                className={styles.threadHandle}
                data-dragging={isThreadDragging ? "true" : "false"}
                onPointerDown={handleThreadDragStart}
                type="button"
              />
              <div className={styles.threadList}>
                {orderedComments.map((comment) => {
                  const author = getCommentAuthor(comment, language);

                  return (
                    <article className={styles.threadItem} key={comment.id}>
                      <span className={styles.threadAvatar} aria-hidden="true">
                        {getAvatarLabel(author)}
                      </span>
                      <div className={styles.threadBody}>
                        <p className={styles.threadMeta}>
                          <strong className={styles.threadAuthor}>{author}</strong>
                          <span className={styles.threadRole}>Visitor</span>
                          <span className={styles.threadTime}>
                            {getRelativeTime(comment.createdAt, language)}
                          </span>
                        </p>
                        <p className={styles.threadText}>{comment.comment}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className={styles.threadComposer}>
                <CommentForm
                  language={language}
                  onSubmitted={handleCommentSubmitted}
                  sectionId={commentTargetId}
                  sectionLabel={commentTargetLabel}
                  variant="thread"
                  workSlug={workSlug}
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </Wrapper>
  );
}
