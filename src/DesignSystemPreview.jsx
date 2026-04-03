"use client";

import { useMediaQuery } from "../design-system";
import PreviewCardShowcase from "./preview/PreviewCardShowcase";
import PreviewComponentShowcase from "./preview/PreviewComponentShowcase";
import PreviewFooter from "./preview/PreviewFooter";
import PreviewHero from "./preview/PreviewHero";
import PreviewTokenShowcase from "./preview/PreviewTokenShowcase";
import PreviewTopbar from "./preview/PreviewTopbar";

export default function DesignSystemPreview() {
  const isCompact = useMediaQuery("(max-width: 920px)");

  return (
    <main className="preview-page">
      <div className="preview-shell">
        <PreviewTopbar />
      </div>
      <PreviewHero isCompact={isCompact} />
      <PreviewComponentShowcase />
      <PreviewCardShowcase isCompact={isCompact} />
      <PreviewTokenShowcase />
      <PreviewFooter />
    </main>
  );
}
