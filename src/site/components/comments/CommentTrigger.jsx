"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";

import Button from "../../../../design-system/components/Button";
import CommentForm from "./CommentForm";
import styles from "../../styles/comment-feedback.module.css";

const labels = {
  zh: {
    close: "收起反馈面板",
    open: "添加评论",
    tooltip: "添加评论",
  },
  en: {
    close: "Close feedback panel",
    open: "Add comment",
    tooltip: "Add comment",
  },
};

export default function CommentTrigger({
  language = "zh",
  onCommentSubmitted = null,
  sectionId = null,
  sectionLabel = null,
  targetId = null,
  targetLabel = null,
  workSlug,
}) {
  const copy = labels[language] || labels.zh;
  const feedbackRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const commentTargetId = targetId || sectionId;
  const commentTargetLabel = targetLabel || sectionLabel;
  const popoverId = `${commentTargetId}-feedback-popover`;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!feedbackRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleCommentSubmitted(comment) {
    onCommentSubmitted?.(comment);
    setIsOpen(false);
  }

  return (
    <aside
      className={styles.feedback}
      data-comment-feedback
      data-open={isOpen ? "true" : "false"}
      ref={feedbackRef}
    >
      <div className={styles.summary}>
        <Button
          aria-label={isOpen ? copy.close : copy.open}
          aria-controls={popoverId}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          leadingIcon={<MessageSquare aria-hidden="true" size={16} strokeWidth={1.8} />}
          onClick={() => setIsOpen((current) => !current)}
          size="icon"
          type="button"
          variant="iconFilled"
        />
        <span className={styles.tooltip} role="tooltip">
          {copy.tooltip}
        </span>
      </div>

      {isOpen ? (
        <div className={styles.popover} id={popoverId}>
          <CommentForm
            language={language}
            onSubmitted={handleCommentSubmitted}
            sectionId={commentTargetId}
            sectionLabel={commentTargetLabel}
            workSlug={workSlug}
          />
        </div>
      ) : null}
    </aside>
  );
}
