import Image from "next/image";
import Link from "next/link";

import { featuredBlogPosts } from "../../data/blog-posts";
import { formatBlogDate } from "../../lib/format-blog-date";
import styles from "../../styles/home-page.module.css";

const homeBlogPosts = featuredBlogPosts.slice(0, 2);

export default function HomeBlogsSection() {
  if (homeBlogPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Blogs</h2>
        <p className={styles.sectionSubtitle}>See what I Thought</p>
      </div>

      <div className={styles.blogList}>
        {homeBlogPosts.map((post) => (
          <Link
            aria-label={`Read ${post.title}`}
            className={styles.blogCard}
            href={{ pathname: `/blog/${post.slug}`, query: { from: "/" } }}
            key={post.slug}
          >
            <div className={styles.blogCardMediaFrame}>
              <div className={styles.blogCardMedia}>
                <Image
                  alt={post.imageAlt}
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
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardSummary}>{post.summary}</p>
              </div>

              <p className={styles.blogCardMeta}>
                <span>{formatBlogDate(post.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.category}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
