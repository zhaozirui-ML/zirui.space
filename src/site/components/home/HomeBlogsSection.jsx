import Image from "next/image";
import Link from "next/link";

import { featuredBlogPosts } from "../../data/blog-posts";
import { homePageDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import { formatBlogDate } from "../../lib/format-blog-date";
import styles from "../../styles/home-page.module.css";

const homeBlogPosts = featuredBlogPosts.slice(0, 2);

/**
 * 首页文章区块会跟随语言切换标题、按钮和日期格式。
 *
 * @param {{ language: import("../../i18n/config").SiteLanguage }} props
 */
export default function HomeBlogsSection({ language }) {
  if (homeBlogPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {getLocalizedValue(homePageDictionary.blogsSectionTitle, language)}
        </h2>
        <p className={styles.sectionSubtitle}>
          {getLocalizedValue(homePageDictionary.blogsSectionSubtitle, language)}
        </p>
      </div>

      <div className={styles.blogList}>
        {homeBlogPosts.map((post) => {
          const title = getLocalizedValue(post.title, language);
          const summary = getLocalizedValue(post.summary, language);
          const category = getLocalizedValue(post.category, language);
          const imageAlt = getLocalizedValue(post.imageAlt, language);

          return (
            <Link
              aria-label={`${getLocalizedValue(homePageDictionary.blogsSectionViewArticle, language)}: ${title}`}
              className={styles.blogCard}
              href={{ pathname: `/blog/${post.slug}`, query: { from: "/" } }}
              key={post.slug}
            >
              <div className={styles.blogCardMediaFrame}>
                <div className={styles.blogCardMedia}>
                  <Image
                    alt={imageAlt}
                    className={styles.blogCardImage}
                    fill
                    sizes="(max-width: 640px) 100vw, 180px"
                    src={post.imageSrc}
                  />
                </div>
              </div>

              <div className={styles.blogCardBody}>
                <div className={styles.blogCardCopy}>
                  <h3 className={styles.blogCardTitle}>{title}</h3>
                  <p className={styles.blogCardSummary}>{summary}</p>
                </div>

                <p className={styles.blogCardMeta}>
                  <span>{formatBlogDate(post.date, language)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{category}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
