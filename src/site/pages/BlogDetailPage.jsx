import Link from "next/link";

import DetailTranslationPlaceholder from "../components/DetailTranslationPlaceholder";
import { untranslatedDetailDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import { getBlogBySlug } from "../lib/get-blog-by-slug";
import { getReturnPath } from "../lib/get-return-path";
import { formatBlogDate } from "../lib/format-blog-date";
import shellStyles from "../styles/site-shell.module.css";
import styles from "../styles/blog-detail-page.module.css";

function resolveLocalizedText(value, language) {
  return typeof value === "string" ? value : getLocalizedValue(value, language);
}

function renderNestedList(items, ordered, keyPrefix, language) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className={styles.contentList} key={keyPrefix}>
      {items.map((item, index) => (
        <li className={styles.contentListItem} key={`${keyPrefix}-${index}`}>
          {item.text ? (
            <p className={styles.contentParagraph}>{resolveLocalizedText(item.text, language)}</p>
          ) : null}
          {item.nested.map((nestedList, nestedIndex) =>
            renderNestedList(
              nestedList.items,
              nestedList.ordered,
              `${keyPrefix}-${index}-${nestedIndex}`,
              language,
            ),
          )}
        </li>
      ))}
    </ListTag>
  );
}

function renderContentBlock(block, index, language) {
  if (block.type === "heading") {
    if (block.level === "h4") {
      return (
        <h3 className={styles.contentSubTitle} key={`${block.type}-${index}`}>
          {resolveLocalizedText(block.text, language)}
        </h3>
      );
    }

    return (
      <h2 className={styles.contentSectionTitle} key={`${block.type}-${index}`}>
        {resolveLocalizedText(block.text, language)}
      </h2>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className={styles.contentParagraph} key={`${block.type}-${index}`}>
        {resolveLocalizedText(block.text, language)}
      </p>
    );
  }

  if (block.type === "list") {
    return renderNestedList(block.items, block.ordered, `${block.type}-${index}`, language);
  }

  if (block.type === "image") {
    return (
      <div className={styles.contentImageFrame} key={`${block.type}-${index}`}>
        {/* 这里直接消费旧站文章里的远程图片内容，先不改变当前图片接入链路。 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={resolveLocalizedText(block.alt, language)}
          className={styles.contentImage}
          loading="lazy"
          src={block.src}
        />
      </div>
    );
  }

  return null;
}

/**
 * @param {{
 *   language?: import("../i18n/config").SiteLanguage,
 *   returnHref?: string,
 *   slug: string,
 * }} props
 */
export default function BlogDetailPage({ language = "zh", returnHref = "/blog", slug }) {
  const post = getBlogBySlug(slug);

  if (!post) {
    return null;
  }

  const contentGroups = [];
  let currentGroup = {
    heading: null,
    blocks: [],
  };

  post.contentBlocks.forEach((block) => {
    const isSectionHeading = block.type === "heading" && block.level === "h2";

    if (isSectionHeading) {
      if (currentGroup.heading || currentGroup.blocks.length > 0) {
        contentGroups.push(currentGroup);
      }

      currentGroup = {
        heading: block,
        blocks: [],
      };

      return;
    }

    currentGroup.blocks.push(block);
  });

  if (currentGroup.heading || currentGroup.blocks.length > 0) {
    contentGroups.push(currentGroup);
  }

  const safeReturnHref = getReturnPath(returnHref, "/blog");
  const title = getLocalizedValue(post.title, language);
  const summary = getLocalizedValue(post.summary, language);
  const heroImageAlt = getLocalizedValue(post.heroImageAlt, language);
  const canShowEnglishDetail = post.supportsEnglishDetail === true;

  if (language === "en" && !canShowEnglishDetail) {
    return (
      <DetailTranslationPlaceholder
        backHref={safeReturnHref}
        backLabel={untranslatedDetailDictionary.backToBlog}
        description={untranslatedDetailDictionary.description}
        eyebrow={untranslatedDetailDictionary.blogEyebrow}
        language={language}
        noteItems={untranslatedDetailDictionary.noteItems}
        noteTitle={untranslatedDetailDictionary.noteTitle}
        title={untranslatedDetailDictionary.blogTitle}
      />
    );
  }

  return (
    <div className={styles.articlePage}>
      <div className={styles.backLinkRow}>
        <Link aria-label="Back to Blog" className={styles.backLink} href={safeReturnHref}>
          <span aria-hidden="true" className={styles.backLinkIcon}>
            ←
          </span>
          <span className={styles.backLinkLabel}>Back</span>
        </Link>
      </div>

      <section className={[styles.detailFrame, styles.detailFrameDashedTop].join(" ")}>
        <div className={[styles.detailRow, styles.detailRowDashedRails].join(" ")}>
          <div aria-hidden="true" className={[styles.detailRail, styles.detailRailDashed].join(" ")} />
          <div className={styles.headerContent}>
            <div className={[shellStyles.pageStack, styles.headerStack].join(" ")}>
              <section className={[shellStyles.pageIntro, styles.articleIntro].join(" ")}>
                <h1 className={[shellStyles.pageTitle, styles.articleTitle].join(" ")}>
                  {title}
                </h1>
                <p className={styles.metaRow}>
                  <span>{formatBlogDate(post.date, language)}</span>
                </p>
              </section>
            </div>
          </div>
          <div aria-hidden="true" className={[styles.detailRail, styles.detailRailDashed].join(" ")} />
        </div>
      </section>

      <section className={[styles.detailFrame, styles.detailFrameSolidTop].join(" ")}>
        <div className={styles.detailRow}>
          <div aria-hidden="true" className={styles.detailRail} />
          <div className={styles.heroContent}>
            <section className={styles.heroFrame}>
              <div className={styles.heroImageWrap}>
                {/* 这里直接沿用 V1 站点的远程 banner，只替换内容，不改当前图片接入链路。 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heroImageAlt}
                  className={styles.heroImage}
                  src={post.heroImageSrc}
                />
              </div>
              {post.heroCaption ? <p className={styles.heroCaption}>{post.heroCaption}</p> : null}
            </section>
          </div>
          <div aria-hidden="true" className={styles.detailRail} />
        </div>
      </section>

      <section
        className={[
          styles.detailFrame,
          styles.detailFrameDashedTop,
          styles.detailFrameSolidBottom,
        ].join(" ")}
      >
        <div className={styles.detailRow}>
          <div aria-hidden="true" className={styles.detailRail} />
          <div className={styles.bodyContent}>
            <div className={styles.body}>
              <p className={styles.intro}>{summary}</p>

              {contentGroups.map((group, groupIndex) => (
                <section
                  className={[
                    styles.contentSection,
                    !group.heading && groupIndex === 0 ? styles.contentSectionLead : "",
                  ].join(" ")}
                  key={`${post.slug}-group-${groupIndex}`}
                >
                  {group.heading ? (
                    <h2 className={styles.contentSectionTitle}>
                      {resolveLocalizedText(group.heading.text, language)}
                    </h2>
                  ) : null}
                  {group.blocks.map((block, blockIndex) =>
                    renderContentBlock(block, `${groupIndex}-${blockIndex}`, language),
                  )}
                </section>
              ))}
            </div>

            {post.articleFooterTitle && post.articleFooterText ? (
              <section className={styles.articleFooter}>
                <h2 className={styles.articleFooterTitle}>{post.articleFooterTitle}</h2>
                <p className={styles.articleFooterText}>{post.articleFooterText}</p>
              </section>
            ) : null}
          </div>
          <div aria-hidden="true" className={styles.detailRail} />
        </div>
      </section>
    </div>
  );
}
