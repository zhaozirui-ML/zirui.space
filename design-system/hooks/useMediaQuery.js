"use client";

import { useSyncExternalStore } from "react";

/**
 * 用 useSyncExternalStore 订阅 matchMedia，
 * 可以同时兼顾 SSR 安全性和 React 19 对外部状态订阅的推荐写法。
 */
export default function useMediaQuery(query) {
  const subscribe = (onStoreChange) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", onStoreChange);

    return () => {
      mediaQueryList.removeEventListener("change", onStoreChange);
    };
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
