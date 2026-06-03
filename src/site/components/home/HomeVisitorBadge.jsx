"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  VISITOR_STATS_ACCESS_PARAM,
  VISITOR_STATS_OWNER_STORAGE_KEY,
} from "../../lib/visitor-analytics";
import styles from "../../styles/home-page.module.css";

const isDevelopment = process.env.NODE_ENV !== "production";

function formatVisitorCount(totalUniqueVisitors, language) {
  const formatter = new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US");
  const formattedCount = formatter.format(totalUniqueVisitors);

  return language === "zh"
    ? `${formattedCount} 位访客`
    : `${formattedCount} visitors`;
}

function readAccessKeyFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  const searchParams = new URLSearchParams(window.location.search);
  const accessKey = searchParams.get(VISITOR_STATS_ACCESS_PARAM);

  return typeof accessKey === "string" && accessKey.trim().length > 0
    ? accessKey.trim()
    : "";
}

function readInitialOwnerAccessKey() {
  if (typeof window === "undefined") {
    return "";
  }

  const accessKeyFromUrl = readAccessKeyFromUrl();

  if (accessKeyFromUrl) {
    return accessKeyFromUrl;
  }

  const savedAccessKey = window.localStorage.getItem(VISITOR_STATS_OWNER_STORAGE_KEY);

  return typeof savedAccessKey === "string" && savedAccessKey.trim().length > 0
    ? savedAccessKey.trim()
    : "";
}

export default function HomeVisitorBadge({ language }) {
  const [totalUniqueVisitors, setTotalUniqueVisitors] = useState(null);
  const [ownerAccessKey] = useState(readInitialOwnerAccessKey);

  useEffect(() => {
    const accessKeyFromUrl = readAccessKeyFromUrl();

    if (accessKeyFromUrl) {
      window.localStorage.setItem(VISITOR_STATS_OWNER_STORAGE_KEY, accessKeyFromUrl);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadVisitorSummary() {
      try {
        const response = await fetch("/api/visitor/summary", {
          cache: "no-store",
        });
        const summary = await response.json();

        if (
          isMounted &&
          summary?.enabled &&
          typeof summary.totalUniqueVisitors === "number"
        ) {
          setTotalUniqueVisitors(summary.totalUniqueVisitors);
        }
      } catch {
        // 公开小数字只是附加信息，失败时不占位也不影响首页。
      }
    }

    void loadVisitorSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  if (typeof totalUniqueVisitors !== "number") {
    return null;
  }

  const label = formatVisitorCount(totalUniqueVisitors, language);
  const ariaLabel =
    language === "zh"
      ? `当前记录到 ${label}`
      : `Currently recorded ${label}`;

  if (ownerAccessKey || isDevelopment) {
    const detailHref = ownerAccessKey
      ? `/visitor-stats?${VISITOR_STATS_ACCESS_PARAM}=${encodeURIComponent(ownerAccessKey)}`
      : "/visitor-stats";

    return (
      <Link
        aria-label={language === "zh" ? `${ariaLabel}，查看详情` : `${ariaLabel}, view details`}
        className={[styles.visitorBadge, styles.visitorBadgeInteractive].join(" ")}
        href={detailHref}
      >
        {label}
      </Link>
    );
  }

  return (
    <p aria-label={ariaLabel} className={styles.visitorBadge}>
      {label}
    </p>
  );
}
