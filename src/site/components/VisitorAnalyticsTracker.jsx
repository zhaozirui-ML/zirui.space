"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  VISITOR_ID_STORAGE_KEY,
  normalizeLandingPath,
} from "../lib/visitor-analytics";

function createVisitorId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readOrCreateVisitorId() {
  const savedVisitorId = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);

  if (typeof savedVisitorId === "string" && savedVisitorId.trim().length > 0) {
    return savedVisitorId.trim();
  }

  const nextVisitorId = createVisitorId();
  window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, nextVisitorId);

  return nextVisitorId;
}

export default function VisitorAnalyticsTracker() {
  const pathname = usePathname();
  const initialPathnameRef = useRef(normalizeLandingPath(pathname));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const visitorId = readOrCreateVisitorId();

    void fetch("/api/visitor/register", {
      body: JSON.stringify({
        pathname: initialPathnameRef.current,
        referrer: document.referrer,
        visitorId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch(() => {
      // 统计只做静默上报，失败不影响主站浏览体验。
    });
  }, []);

  return null;
}
