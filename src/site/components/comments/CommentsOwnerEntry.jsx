"use client";

import Link from "next/link";
import { MessageSquareMore } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  COMMENTS_OWNER_ACCESS_STORAGE_KEY,
  getStoredCommentsAccessToken,
} from "../../lib/comments/comment-owner-client";
import styles from "../../styles/site-shell.module.css";

function subscribeOwnerMode(onChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event) => {
    if (
      event instanceof StorageEvent &&
      event.key !== null &&
      event.key !== COMMENTS_OWNER_ACCESS_STORAGE_KEY
    ) {
      return;
    }

    onChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("portfolio-comments-owner-change", onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("portfolio-comments-owner-change", onChange);
  };
}

export default function CommentsOwnerEntry({ language = "zh" }) {
  const pathname = usePathname();
  const [isOwnerMode, setIsOwnerMode] = useState(false);

  useEffect(() => {
    const syncOwnerMode = () => {
      setIsOwnerMode(Boolean(getStoredCommentsAccessToken()));
    };

    syncOwnerMode();
    return subscribeOwnerMode(syncOwnerMode);
  }, []);

  if (!isOwnerMode || pathname === "/comments") {
    return null;
  }

  return (
    <Link
      aria-label={language === "en" ? "Open comment review" : "打开评论管理"}
      className={styles.commentsOwnerEntry}
      href="/comments"
    >
      <MessageSquareMore size={16} strokeWidth={1.8} />
      <span>{language === "en" ? "Comments" : "评论管理"}</span>
    </Link>
  );
}
