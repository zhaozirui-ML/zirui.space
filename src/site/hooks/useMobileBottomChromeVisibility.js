"use client";

import { useEffect, useRef, useState } from "react";

export default function useMobileBottomChromeVisibility() {
  const lastScrollYRef = useRef(0);
  const scrollFrameRef = useRef(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const topRevealOffset = 80;
    const scrollDeltaThreshold = 8;

    const updateVisibility = () => {
      scrollFrameRef.current = 0;

      if (!mobileQuery.matches || reducedMotionQuery.matches) {
        setIsHidden(false);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY < topRevealOffset) {
        setIsHidden(false);
      } else if (scrollDelta > scrollDeltaThreshold) {
        setIsHidden(true);
      } else if (scrollDelta < -scrollDeltaThreshold) {
        setIsHidden(false);
      }

      if (Math.abs(scrollDelta) > scrollDeltaThreshold) {
        lastScrollYRef.current = currentScrollY;
      }
    };

    const requestVisibilityUpdate = () => {
      if (scrollFrameRef.current !== 0) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    lastScrollYRef.current = window.scrollY;
    updateVisibility();

    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
    mobileQuery.addEventListener("change", updateVisibility);
    reducedMotionQuery.addEventListener("change", updateVisibility);

    return () => {
      window.removeEventListener("scroll", requestVisibilityUpdate);
      mobileQuery.removeEventListener("change", updateVisibility);
      reducedMotionQuery.removeEventListener("change", updateVisibility);

      if (scrollFrameRef.current !== 0) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return isHidden;
}
