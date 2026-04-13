const t = (zh, en) => ({ zh, en });

// 这一份导航数据会被站点骨架统一消费，后面首页和详情页都走同一套入口。
export const siteNavigation = [
  { href: "/work", label: t("作品", "Work") },
  { href: "/blog", label: t("博客", "Blog") },
  { href: "/about", label: t("关于", "About") },
];
