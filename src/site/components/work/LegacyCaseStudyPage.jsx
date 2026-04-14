import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CaseStudyHeadingOne, CaseStudyHeadingTwo } from "../case-study/CaseStudyHeading";
import CaseStudyToc from "../case-study/CaseStudyToc";
import styles from "../../styles/legacy-case-study.module.css";

function shouldBypassNextImageOptimizer(source) {
  return typeof source === "string" && source.startsWith("http");
}

function MetadataGrid({ items }) {
  return (
    <dl className={styles.metadataGrid}>
      {items.map((item) => (
        <div className={styles.metadataCard} key={item.label}>
          <dt className={styles.metadataLabel}>{item.label}</dt>
          <dd className={styles.metadataValue}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function renderTextSection(section) {
  return (
    <section className={styles.sectionGroup} key={section.id}>
      <CaseStudyHeadingOne
        className={styles.sectionHeading}
        descriptions={section.descriptions}
        id={section.id}
        title={section.title}
      />

      <div className={styles.bodyStack}>
        {section.paragraphs?.map((paragraph) => (
          <p className={styles.bodyText} key={paragraph}>
            {paragraph}
          </p>
        ))}

        {section.bullets?.length ? (
          <ul className={styles.bulletList}>
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function renderCardsSection(section) {
  return (
    <section className={styles.sectionGroup} key={section.id}>
      <CaseStudyHeadingOne
        className={styles.sectionHeading}
        descriptions={section.descriptions}
        id={section.id}
        title={section.title}
      />

      <div className={styles.cardGrid}>
        {section.cards.map((card) => (
          <article className={styles.infoCard} key={card.title}>
            <h3 className={styles.infoCardTitle}>{card.title}</h3>
            <p className={styles.infoCardBody}>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderStepsSection(section) {
  return (
    <section className={styles.sectionGroup} key={section.id}>
      <CaseStudyHeadingOne
        className={styles.sectionHeading}
        descriptions={section.descriptions}
        id={section.id}
        title={section.title}
      />

      <div className={styles.stepList}>
        {section.steps.map((step, index) => (
          <article className={styles.stepCard} key={step.title}>
            <p className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</p>
            <div className={styles.stepCopy}>
              <h3 className={styles.infoCardTitle}>{step.title}</h3>
              <p className={styles.infoCardBody}>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderFormulaSection(section) {
  return (
    <section className={styles.sectionGroup} key={section.id}>
      <CaseStudyHeadingOne
        className={styles.sectionHeading}
        descriptions={section.descriptions}
        id={section.id}
        title={section.title}
      />

      <div className={styles.formulaGrid}>
        {section.formulas.map((formula) => (
          <article className={styles.formulaCard} key={formula.label}>
            <p className={styles.formulaLabel}>{formula.label}</p>
            <pre className={styles.formulaCode}>{formula.code}</pre>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderSubsectionsSection(section) {
  return (
    <section className={styles.sectionGroup} key={section.id}>
      <CaseStudyHeadingOne
        className={styles.sectionHeading}
        descriptions={section.descriptions}
        id={section.id}
        title={section.title}
      />

      <div className={styles.subsectionStack}>
        {section.subsections.map((subsection) => (
          <section className={styles.subsectionPanel} key={subsection.title}>
            <CaseStudyHeadingTwo
              className={styles.subsectionHeading}
              descriptions={subsection.body}
              title={subsection.title}
            />

            <div className={styles.cardGrid}>
              {subsection.cards.map((card) => (
                <article className={styles.infoCard} key={card.title}>
                  <h3 className={styles.infoCardTitle}>{card.title}</h3>
                  <p className={styles.infoCardBody}>{card.body}</p>
                </article>
              ))}
            </div>

            {subsection.note ? <p className={styles.noteText}>{subsection.note}</p> : null}
          </section>
        ))}
      </div>
    </section>
  );
}

function renderSection(section) {
  if (section.type === "cards") {
    return renderCardsSection(section);
  }

  if (section.type === "steps") {
    return renderStepsSection(section);
  }

  if (section.type === "formula") {
    return renderFormulaSection(section);
  }

  if (section.type === "subsections") {
    return renderSubsectionsSection(section);
  }

  return renderTextSection(section);
}

export default function LegacyCaseStudyPage({ backHref = "/work", caseStudy }) {
  const tocTheme = {
    accentColor: caseStudy.accentColor,
    backHref,
    backLabel: "返回",
    desktopShiftX: "30rem",
    desktopTopOffset: "clamp(4.5rem, 8vw, 8.25rem)",
    preferHistoryBack: true,
  };

  /** @type {import("react").CSSProperties & Record<string, string>} */
  const heroStyle = {
    "--legacy-case-study-accent": caseStudy.accentColor,
  };

  return (
    <article className={styles.page} style={heroStyle}>
      <section className={styles.heroFullBleed}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} href={backHref}>
              返回
            </Link>
            <p className={styles.eyebrow}>{caseStudy.category}</p>
            <h1 className={styles.heroTitle}>{caseStudy.title}</h1>
            <p className={styles.heroSubtitle}>{caseStudy.subtitle}</p>

            <MetadataGrid items={caseStudy.metadata} />
          </div>

          <figure className={styles.heroMediaFrame}>
            <Image
              alt={caseStudy.preview.alt}
              className={styles.heroMediaImage}
              fill
              priority
              sizes="(max-width: 1024px) calc(100vw - 2rem), 960px"
              src={caseStudy.preview.src}
              unoptimized={shouldBypassNextImageOptimizer(caseStudy.preview.src)}
            />
          </figure>
        </div>
      </section>

      <div className={styles.caseBody}>
        <CaseStudyToc items={caseStudy.tocItems} {...tocTheme} />

        <div className={styles.contentStack}>
          {caseStudy.showOverview !== false ? (
            <section className={styles.summaryCard}>
              <p className={styles.summaryLabel}>Overview</p>
              <p className={styles.summaryBody}>
                {caseStudy.summary ??
                  `${caseStudy.title} 现在已经迁移到当前站点中，Framer 旧页面只作为历史版本保留。`}
              </p>
              <a
                className={styles.secondaryLinkButton}
                href={caseStudy.framerUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open original Framer version
                <ArrowUpRight aria-hidden="true" className={styles.linkIcon} size={15} />
              </a>
            </section>
          ) : null}

          {caseStudy.sections.map((section) => renderSection(section))}

          {caseStudy.showMigrationNote !== false ? (
            <section className={styles.footerPanel}>
              <CaseStudyHeadingTwo
                accentColor="var(--legacy-case-study-accent)"
                descriptions={[
                  "这三个页面现在都已经有了站内案例页，后续如果要继续精修，就可以直接在这套骨架上逐段替换更完整的图片和说明。",
                ]}
                id="project-reference"
                title="Migration note"
              />
              <p className={styles.bodyText}>
                如果你之后想把 Framer 版本进一步“抠”成完整站内版本，最适合继续补的是过程图、评审截图和最终交付物，而不是重新搭结构。
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
