import styles from "../styles/visitor-stats-page.module.css";
import { VISITOR_ANALYTICS_TIME_ZONE } from "../lib/visitor-analytics";

function formatTimestamp(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim().length === 0) {
    return null;
  }

  const date = new Date(rawValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: VISITOR_ANALYTICS_TIME_ZONE,
  }).format(date);
}

function StatsCard({ description, title, value }) {
  return (
    <article className={styles.metricCard}>
      <p className={styles.metricTitle}>{title}</p>
      <p className={styles.metricValue}>{value}</p>
      <p className={styles.metricDescription}>{description}</p>
    </article>
  );
}

function BreakdownTable({ emptyLabel, rows, title }) {
  return (
    <section className={styles.breakdownPanel}>
      <div className={styles.panelHeading}>
        <h2 className={styles.panelTitle}>{title}</h2>
      </div>

      {rows.length > 0 ? (
        <div className={styles.table}>
          {rows.map((row) => (
            <div className={styles.tableRow} key={row.key}>
              <p className={styles.tableLabel}>{row.label}</p>
              <p className={styles.tableValue}>{row.count}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>{emptyLabel}</p>
      )}
    </section>
  );
}

export default function VisitorStatsPage({
  summary,
}) {
  const lastUpdatedAt = formatTimestamp(summary.lastUpdatedAt);

  if (!summary.enabled) {
    return (
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Private Stats</p>
          <h1 className={styles.pageTitle}>传播统计尚未配置</h1>
          <p className={styles.pageDescription}>
            还没有检测到可用的 Supabase 统计配置。先完成环境变量和 SQL 初始化，这个页面就会开始显示真实数据。
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Private Stats</p>
        <h1 className={styles.pageTitle}>访客传播反馈</h1>
        <p className={styles.pageDescription}>
          这是一个面向你自己的轻量统计页，记录全站匿名首次访客、今日新增、来源渠道与首次落地页。
        </p>
        <p className={styles.metaNote}>
          统计口径：匿名首次访客。今日口径按 {VISITOR_ANALYTICS_TIME_ZONE} 计算。
          {lastUpdatedAt ? ` 最近一次刷新：${lastUpdatedAt}` : ""}
        </p>
      </header>

      <section className={styles.metricsGrid}>
        <StatsCard
          description="统计的是第一次访问这个网站的匿名浏览器数量，不是现实世界绝对唯一的人数。"
          title="累计匿名首次访客"
          value={summary.totalUniqueVisitors}
        />
        <StatsCard
          description="方便你判断今天分享出去后有没有带来新的访问。"
          title="今日新增访客"
          value={summary.todayUniqueVisitors}
        />
      </section>

      <section className={styles.breakdownGrid}>
        <BreakdownTable
          emptyLabel="还没有来源数据。"
          rows={summary.referrerBreakdown}
          title="来源渠道"
        />
        <BreakdownTable
          emptyLabel="还没有落地页数据。"
          rows={summary.landingBreakdown}
          title="首次落地页"
        />
      </section>
    </div>
  );
}
