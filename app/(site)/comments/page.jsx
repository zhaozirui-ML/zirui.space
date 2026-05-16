import { notFound } from "next/navigation";

import CommentAdminActions from "../../../src/site/components/comments/CommentAdminActions";
import { getServerLanguage } from "../../../src/site/i18n/server";
import { listComments } from "../../../src/site/lib/comments/comment-service";
import styles from "../../../src/site/styles/comments-page.module.css";

export const metadata = {
  title: "Portfolio feedback",
};
export const dynamic = "force-dynamic";

function displayDate(value, language) {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function groupComments(comments) {
  return comments.reduce((groups, comment) => {
    const key = `${comment.workSlug}:${comment.sectionId}`;
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.items.push(comment);
      return groups;
    }

    groups.set(key, {
      key,
      sectionId: comment.sectionId,
      sectionLabel: comment.sectionLabel,
      workSlug: comment.workSlug,
      items: [comment],
    });

    return groups;
  }, new Map());
}

export default async function CommentsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const accessToken = process.env.COMMENTS_ACCESS_TOKEN?.trim();
  const access = resolvedSearchParams?.access?.trim();
  const language = await getServerLanguage();
  const text = {
    eyebrow: language === "en" ? "Private review" : "私有反馈",
    title: language === "en" ? "Portfolio feedback" : "作品反馈",
    description:
      language === "en"
        ? "Section-level feedback submitted from the portfolio case study pages."
        : "这里汇总作品详情页 section 级反馈，仅用于你自己回看和迭代作品集。",
    empty: language === "en" ? "No feedback yet." : "暂时还没有收到反馈。",
    error:
      language === "en"
        ? "Feedback storage is not configured or is temporarily unavailable."
        : "反馈存储还没有配置，或者暂时不可用。",
    status: language === "en" ? "Status" : "状态",
    visitor: language === "en" ? "Anonymous reader" : "匿名访客",
  };

  if (!accessToken || access !== accessToken) {
    notFound();
  }

  let comments = [];
  let loadError = false;

  try {
    comments = await listComments();
  } catch (error) {
    console.error("Failed to render comments page.", error);
    loadError = true;
  }

  const groups = Array.from(groupComments(comments).values());

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1 className={styles.title}>{text.title}</h1>
          <p className={styles.description}>{text.description}</p>
        </header>

        {loadError ? <p className={styles.statePanel}>{text.error}</p> : null}
        {!loadError && groups.length === 0 ? (
          <p className={styles.statePanel}>{text.empty}</p>
        ) : null}

        {!loadError && groups.length > 0 ? (
          <div className={styles.groups}>
            {groups.map((group) => (
              <section className={styles.group} key={group.key}>
                <header className={styles.groupHeader}>
                  <h2 className={styles.groupTitle}>{group.sectionLabel}</h2>
                  <p className={styles.groupMeta}>
                    {group.workSlug} / {group.sectionId}
                  </p>
                </header>

                <ul className={styles.commentList}>
                  {group.items.map((comment) => (
                    <li className={styles.commentItem} key={comment.id}>
                      <p className={styles.commentText}>{comment.comment}</p>
                      <p className={styles.visitorName}>
                        {comment.visitorName || text.visitor}
                      </p>
                      <p className={styles.commentMeta}>
                        {displayDate(comment.createdAt, language)} / {text.status}:{" "}
                        {comment.status}
                      </p>
                      <CommentAdminActions
                        accessToken={accessToken}
                        commentId={comment.id}
                        language={language}
                        status={comment.status}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
