"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import styles from "../../styles/comments-page.module.css";

const labels = {
  zh: {
    actionError: "评论操作失败。",
    delete: "删除",
    hide: "隐藏",
    restore: "恢复显示",
  },
  en: {
    actionError: "Comment action failed.",
    delete: "Delete",
    hide: "Hide",
    restore: "Restore",
  },
};

export default function CommentAdminActions({
  accessToken,
  commentId,
  language = "zh",
  onActionComplete,
  status,
}) {
  const copy = labels[language] || labels.zh;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const nextStatus = status === "archived" ? "open" : "archived";
  const statusLabel = status === "archived" ? copy.restore : copy.hide;
  const isBusy = isRequesting || isPending;

  async function requestCommentUpdate(action) {
    setErrorMessage("");
    setIsRequesting(true);

    try {
      const response =
        action === "delete"
          ? await fetch(`/api/comments?access=${encodeURIComponent(accessToken)}`, {
              body: JSON.stringify({ id: commentId }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "DELETE",
            })
          : await fetch(`/api/comments?access=${encodeURIComponent(accessToken)}`, {
              body: JSON.stringify({
                id: commentId,
                status: nextStatus,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "PATCH",
            });

      const data = await response.json();

      if (!response.ok || data?.ok !== true) {
        throw new Error(data?.error || copy.actionError);
      }

      if (typeof onActionComplete === "function") {
        await onActionComplete({
          action,
          comment: data?.comment || null,
          commentId,
          nextStatus,
        });
      }

      startTransition(() => {
        router.refresh();
      });
    } finally {
      setIsRequesting(false);
    }
  }

  async function handleStatusToggle() {
    try {
      await requestCommentUpdate("status");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : copy.actionError);
    }
  }

  async function handleDelete() {
    try {
      await requestCommentUpdate("delete");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : copy.actionError);
    }
  }

  return (
    <div className={styles.commentActions}>
      <button
        className={styles.actionButton}
        disabled={isBusy}
        onClick={handleStatusToggle}
        type="button"
      >
        {statusLabel}
      </button>
      <button
        className={`${styles.actionButton} ${styles.deleteButton}`}
        disabled={isBusy}
        onClick={handleDelete}
        type="button"
      >
        {copy.delete}
      </button>
      {errorMessage ? <p className={styles.actionError}>{errorMessage}</p> : null}
    </div>
  );
}
