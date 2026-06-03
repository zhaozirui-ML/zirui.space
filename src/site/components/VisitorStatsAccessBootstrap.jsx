"use client";

import { useEffect } from "react";

import {
  VISITOR_STATS_ACCESS_PARAM,
  VISITOR_STATS_OWNER_STORAGE_KEY,
} from "../lib/visitor-analytics";

export default function VisitorStatsAccessBootstrap({ accessKey: initialAccessKey = "" }) {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessKeyFromUrl = searchParams.get(VISITOR_STATS_ACCESS_PARAM);
    const accessKey =
      typeof accessKeyFromUrl === "string" && accessKeyFromUrl.trim().length > 0
        ? accessKeyFromUrl.trim()
        : initialAccessKey.trim();

    if (typeof accessKey !== "string" || accessKey.trim().length === 0) {
      return;
    }

    window.localStorage.setItem(VISITOR_STATS_OWNER_STORAGE_KEY, accessKey.trim());
  }, [initialAccessKey]);

  return null;
}
