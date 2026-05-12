"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "../../styles/zoomable-media-trigger.module.css";

export default function ZoomableMediaTrigger({
  alt,
  children,
  fullSrc,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const dialog = canUsePortal && isOpen
    ? createPortal(
        <div
          aria-label={alt}
          aria-modal="true"
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <div
            className={styles.surface}
            role="document"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={alt}
              className={styles.image}
              src={fullSrc}
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <span
        aria-label={alt}
        aria-haspopup="dialog"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
      {dialog}
    </>
  );
}
