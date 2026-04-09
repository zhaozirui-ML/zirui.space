import { createElement } from "react";

import styles from "../../styles/case-study-heading.module.css";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function normalizeParagraphs(descriptions) {
  if (!descriptions) {
    return [];
  }

  if (Array.isArray(descriptions)) {
    return descriptions.filter(Boolean);
  }

  return [descriptions];
}

export function CaseStudyHeadingOne({
  children = null,
  className = "",
  descriptions = null,
  id = null,
  title,
  titleAs: TitleTag = "h2",
}) {
  const paragraphs = normalizeParagraphs(descriptions);

  return (
    <section
      className={joinClassNames(styles.headingBlock, styles.headingOne, className)}
      id={id}
    >
      {createElement(TitleTag, { className: styles.headingOneTitle }, title)}
      {paragraphs.map((paragraph) => (
        <p className={styles.headingBody} key={paragraph}>
          {paragraph}
        </p>
      ))}
      {children}
    </section>
  );
}

export function CaseStudyHeadingTwo({
  accentColor = null,
  children = null,
  className = "",
  descriptions = null,
  id = null,
  title,
  titleAs: TitleTag = "h3",
}) {
  const paragraphs = normalizeParagraphs(descriptions);
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const inlineStyles = accentColor
    ? { "--case-study-heading-accent": accentColor }
    : undefined;

  return (
    <div
      className={joinClassNames(styles.headingBlock, styles.headingTwo, className)}
      id={id}
      style={inlineStyles}
    >
      {createElement(TitleTag, { className: styles.headingTwoTitle }, title)}
      {paragraphs.map((paragraph) => (
        <p className={styles.headingBody} key={paragraph}>
          {paragraph}
        </p>
      ))}
      {children}
    </div>
  );
}

export function CaseStudyHeadingThree({
  children = null,
  className = "",
  descriptions = null,
  hideLabel = false,
  id = null,
  label = "Label",
  labelAs: LabelTag = "p",
}) {
  const paragraphs = normalizeParagraphs(descriptions);

  return (
    <div
      className={joinClassNames(styles.headingBlock, styles.headingThree, className)}
      id={id}
    >
      {hideLabel ? null : (
        <div className={styles.headingThreePill}>
          {createElement(LabelTag, { className: styles.headingThreeLabel }, label)}
        </div>
      )}
      {paragraphs.map((paragraph) => (
        <p className={styles.headingBody} key={paragraph}>
          {paragraph}
        </p>
      ))}
      {children}
    </div>
  );
}
