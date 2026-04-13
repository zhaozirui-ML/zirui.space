import Image from "next/image";
import Link from "next/link";

import { featuredBlogPosts } from "../../data/blog-posts";
import { homePageDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import { formatBlogDate } from "../../lib/format-blog-date";
import styles from "../../styles/home-page.module.css";

const homeBlogPosts = featuredBlogPosts.slice(0, 2);

export default function HomeBlogsSection({ language }) {
  if (homeBlogPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {getLocalizedValue(homePageDictionary.blogSectionTitle, language)}
        </h2>
        <p className={styles.sectionSubtitle}>
          {getLocalizedValue(homePageDictionary.blogSectionSubtitle, language)}
        </p>
      </div>

      <div className={styles.blogList}>
        {homeBlogPosts.map((post) => (
          <Link
            aria-label={`${getLocalizedValue(homePageDictionary.readArticleAriaLabel, language)} ${getLocalizedValue(post.title, language)}`}
            className={styles.blogCard}
            href={{ pathname: `/blog/${post.slug}`, query: { from: "/" } }}
            key={post.slug}
          >
            <div className={styles.blogCardMediaFrame}>
              <div className={styles.blogCardMedia}>
                <Image
                  alt={getLocalizedValue(post.imageAlt, language)}
                  className={styles.blogCardImage}
                  fill
                  sizes="(max-width: 640px) 100vw, 180px"
                  src={post.imageSrc}
                  unoptimized
                />
              </div>
            </div>

            <div className={styles.blogCardBody}>
              <div className={styles.blogCardCopy}>
                <h3 className={styles.blogCardTitle}>
                  {getLocalizedValue(post.title, language)}
                </h3>
                <p className={styles.blogCardSummary}>
                  {getLocalizedValue(post.summary, language)}
                </p>
              </div>

              <p className={styles.blogCardMeta}>
                <span>{formatBlogDate(post.date, language)}</span>
                <span aria-hidden="true">·</span>
                <span>{getLocalizedValue(post.category, language)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
