import Image from "next/image";
import Link from "next/link";

import { blogIndexPosts, featuredBlogPosts } from "../data/blog-posts";
import { blogIndexDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import { formatBlogDate } from "../lib/format-blog-date";
import styles from "../styles/blog-page.module.css";

/**
 * Blog 列表页先接入索引级双语；文章正文后续单独处理。
 *
 * @param {{ language: import("../i18n/config").SiteLanguage }} props
 */
export default function BlogPage({ language }) {
  return (
    <div className={styles.blogPage}>
      <section aria-labelledby="blog-featured-heading" className={styles.sectionFrame}>
        <div className={[styles.sectionTitleRow, styles.featuredTitleRow].join(" ")}>
          <div aria-hidden="true" className={styles.sectionTitleRail} />
          <div className={styles.sectionTitleCell}>
            <h1 className={styles.sectionTitle} id="blog-featured-heading">
              {getLocalizedValue(blogIndexDictionary.featuredHeading, language)}
            </h1>
          </div>
          <div
            aria-hidden="true"
            className={[styles.sectionTitleRail, styles.sectionTitleRailDashed].join(" ")}
          />
        </div>

        <div className={[styles.sectionBodyRow, styles.featuredBodyRow].join(" ")}>
          <div aria-hidden="true" className={[styles.sectionBodyRail, styles.featuredRail].join(" ")} />
          <div className={styles.featuredContent}>
            {featuredBlogPosts.map((post, index) => {
              const isDark = post.tone === "dark";
              const isReversed = post.layout === "imageEnd";
              const title = getLocalizedValue(post.title, language);
              const summary = getLocalizedValue(post.summary, language);
              const category = getLocalizedValue(post.category, language);
              const imageAlt = getLocalizedValue(post.imageAlt, language);
              const isLeadFeaturedPost = index === 0;

              return (
                <Link
                  aria-label={`${getLocalizedValue(blogIndexDictionary.readArticleAriaLabel, language)}: ${title}`}
                  className={[
                    styles.cardLink,
                    styles.featuredCard,
                    isDark ? styles.featuredCardDark : "",
                    isReversed ? styles.featuredCardReverse : "",
                  ].join(" ")}
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                >
                  <div className={styles.featuredMedia}>
                    <Image
                      alt={imageAlt}
                      className={styles.featuredImage}
                      fill
                      // 首屏第一张 featured 图最容易被浏览器判定为 LCP，优先加载能减少首屏主内容等待。
                      loading={isLeadFeaturedPost ? "eager" : undefined}
                      sizes="(max-width: 640px) 100vw, (max-width: 960px) 92vw, 448px"
                      src={post.imageSrc}
                      unoptimized
                    />
                  </div>

                  <div
                    className={[
                      styles.featuredBody,
                      isReversed ? styles.featuredBodyReverse : "",
                    ].join(" ")}
                  >
                    <div className={styles.featuredCopy}>
                      <h2
                        className={[
                          styles.featuredTitle,
                          isDark ? styles.featuredTitleDark : "",
                        ].join(" ")}
                      >
                        {title}
                      </h2>
                      <p
                        className={[
                          styles.blogMeta,
                          isDark ? styles.blogMetaDark : "",
                        ].join(" ")}
                      >
                        <span>{formatBlogDate(post.date, language)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{category}</span>
                      </p>
                      <p
                        className={[
                          styles.featuredSummary,
                          isDark ? styles.featuredSummaryDark : "",
                        ].join(" ")}
                      >
                        {summary}
                      </p>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
          <div aria-hidden="true" className={[styles.sectionBodyRail, styles.featuredRail].join(" ")} />
        </div>
      </section>

      <div aria-hidden="true" className={[styles.spacerFrame, styles.spacerFrameDashed].join(" ")}>
        <div className={[styles.spacerRail, styles.spacerRailDashed].join(" ")} />
        <div />
        <div className={[styles.spacerRail, styles.spacerRailDashed].join(" ")} />
      </div>

      <section aria-labelledby="blog-browse-heading" className={styles.sectionFrame}>
        <div className={[styles.sectionTitleRow, styles.browseTitleRow].join(" ")}>
          <div aria-hidden="true" className={[styles.sectionTitleRail, styles.browseTitleRail].join(" ")} />
          <div className={styles.sectionTitleCell}>
            <h2 className={styles.sectionTitle} id="blog-browse-heading">
              {getLocalizedValue(blogIndexDictionary.browseHeading, language)}
            </h2>
          </div>
          <div aria-hidden="true" className={[styles.sectionTitleRail, styles.browseTitleRail].join(" ")} />
        </div>

        <div className={[styles.sectionBodyRow, styles.browseBodyRow].join(" ")}>
          <div
            aria-hidden="true"
            className={[styles.sectionBodyRail, styles.browseRail, styles.browseBodyRailHidden].join(" ")}
          />
          <div className={styles.browseContent}>
            <div className={styles.browseGrid}>
              {blogIndexPosts.map((post) => {
                const title = getLocalizedValue(post.title, language);
                const category = getLocalizedValue(post.category, language);
                const imageAlt = getLocalizedValue(post.imageAlt, language);

                return (
                  <Link
                    aria-label={`${getLocalizedValue(blogIndexDictionary.readArticleAriaLabel, language)}: ${title}`}
                    className={[styles.cardLink, styles.browseCard].join(" ")}
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                  >
                    <div className={styles.browseMedia}>
                      <Image
                        alt={imageAlt}
                        className={styles.featuredImage}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 287px"
                        src={post.imageSrc}
                        unoptimized
                      />
                    </div>

                    <div className={styles.browseBody}>
                      <h3 className={styles.browseTitle}>{title}</h3>
                      <p className={styles.blogMeta}>
                        <span>{formatBlogDate(post.date, language)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{category}</span>
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div
            aria-hidden="true"
            className={[styles.sectionBodyRail, styles.browseRail, styles.browseBodyRailHidden].join(" ")}
          />
        </div>
      </section>

      <div aria-hidden="true" className={[styles.spacerFrame, styles.spacerFrameSolid].join(" ")}>
        <div className={[styles.spacerRail, styles.spacerRailDashed].join(" ")} />
        <div />
        <div className={[styles.spacerRail, styles.spacerRailDashed].join(" ")} />
      </div>
    </div>
  );
}
