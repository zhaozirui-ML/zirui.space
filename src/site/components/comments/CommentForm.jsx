"use client";

import { useEffect, useRef, useState } from "react";

import Button from "../../../../design-system/components/Button";
import styles from "../../styles/comment-feedback.module.css";

const VISITOR_NAME_STORAGE_KEY = "portfolio-comments-visitor-name";

const labels = {
  zh: {
    commentLabel: "评论",
    commentPlaceholder: "留下你的评论吧",
    commentingAs: "正在以",
    error: "发布失败，请稍后再试。",
    nameLabel: "你的名字，可选",
    namePlaceholder: "名字，可选",
    submit: "发布评论",
    submitting: "发布中...",
    success: "已发布评论。",
    tooShort: "评论至少需要 3 个字。",
  },
  en: {
    commentLabel: "Comment",
    commentPlaceholder: "Leave your comment here",
    commentingAs: "Commenting as",
    error: "Publishing failed. Please try again later.",
    nameLabel: "Your name, optional",
    namePlaceholder: "Name, optional",
    submit: "Post comment",
    submitting: "Posting...",
    success: "Comment posted.",
    tooShort: "Comment must be at least 3 characters.",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export default function CommentForm({
  language = "zh",
  onSubmitted = null,
  sectionId,
  sectionLabel,
  variant = "popover",
  workSlug,
}) {
  const copy = labels[language] || labels.zh;
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [hasStoredVisitorName, setHasStoredVisitorName] = useState(false);
  const [company, setCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const canSubmit = comment.trim().length >= 3;

  useEffect(() => {
    const storedVisitorName = window.localStorage
      .getItem(VISITOR_NAME_STORAGE_KEY)
      ?.trim();

    if (storedVisitorName) {
      setVisitorName(storedVisitorName);
      setHasStoredVisitorName(true);
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [comment]);

  useEffect(() => {
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (comment.trim().length < 3) {
      setErrorMessage(copy.tooShort);
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        body: JSON.stringify({
          comment,
          company,
          language,
          sectionId,
          sectionLabel,
          visitorName,
          workSlug,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok || data?.ok !== true) {
        throw new Error(data?.error || copy.error);
      }

      const submittedVisitorName = visitorName.trim();

      if (submittedVisitorName) {
        window.localStorage.setItem(VISITOR_NAME_STORAGE_KEY, submittedVisitorName);
        setHasStoredVisitorName(true);
      }

      onSubmitted?.(data.comment);
      setComment("");
      if (!submittedVisitorName) {
        setVisitorName("");
      }
      setCompany("");
      setSuccessMessage(copy.success);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : copy.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleTextareaKeyDown(event) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();

    if (!isSubmitting) {
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form
      className={joinClassNames(styles.form, variant === "thread" ? styles.threadForm : "")}
      onSubmit={handleSubmit}
    >
      <label className={styles.field}>
        <span className={styles.label}>{copy.commentLabel}</span>
        <textarea
          className={styles.textarea}
          maxLength={1000}
          onChange={(event) => setComment(event.target.value)}
          onKeyDown={handleTextareaKeyDown}
          placeholder={copy.commentPlaceholder}
          ref={textareaRef}
          rows={2}
          value={comment}
        />
      </label>

      {hasStoredVisitorName ? null : (
        <label className={styles.field}>
          <span className={styles.label}>{copy.nameLabel}</span>
          <input
            className={styles.input}
            maxLength={40}
            onChange={(event) => setVisitorName(event.target.value)}
            placeholder={copy.namePlaceholder}
            type="text"
            value={visitorName}
          />
        </label>
      )}

      <label className={styles.honeypot}>
        Company
        <input
          autoComplete="off"
          onChange={(event) => setCompany(event.target.value)}
          tabIndex={-1}
          type="text"
          value={company}
        />
      </label>

      <div className={styles.footer}>
        <div className={styles.footerCopy}>
          {hasStoredVisitorName ? (
            <p className={styles.helper}>
              {copy.commentingAs} <strong>{visitorName}</strong>
            </p>
          ) : null}
          {successMessage || errorMessage ? (
            <p className={styles.helper}>{successMessage || errorMessage}</p>
          ) : null}
        </div>
        <Button disabled={isSubmitting || !canSubmit} size="sm" type="submit" variant="secondary">
          {isSubmitting ? copy.submitting : copy.submit}
        </Button>
      </div>
    </form>
  );
}
