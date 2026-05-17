"use client";

import Link from "next/link";
import { MessageSquareMore } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  getStoredCommentsAccessToken,
  subscribeCommentsOwnerMode,
} from "../../lib/comments/comment-owner-client";
import styles from "../../styles/site-shell.module.css";

export default function CommentsOwnerEntry({ language = "zh" }) {
  const pathname = usePathname();
  const [isOwnerMode, setIsOwnerMode] = useState(false);

  useEffect(() => {
    const syncOwnerMode = () => {
      setIsOwnerMode(Boolean(getStoredCommentsAccessToken()));
    };

    syncOwnerMode();
    return subscribeCommentsOwnerMode(syncOwnerMode);
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
