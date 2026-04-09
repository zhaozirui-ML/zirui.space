# Blog Phase 2

## 目标

把 Blog 列表页里的卡片正式接到 `/blog/[slug]`，让 Blog 模块从“可浏览列表”变成“可进入文章详情”的完整链路。

## 改动

- 扩展 `src/site/data/blog-posts.js`，为每篇文章补充详情摘要和正文小节数据。
- 新增 `src/site/lib/get-blog-by-slug.js`，统一处理 Blog 的 slug 查询。
- 新增 `app/(site)/blog/[slug]/page.jsx`，接入 Next.js 动态路由和 `notFound()` 处理。
- 新增 `src/site/pages/BlogDetailPage.jsx` 与 `src/site/styles/blog-detail-page.module.css`，提供文章详情页骨架。
- 更新 `src/site/pages/BlogPage.jsx`，让 featured 和 browse 两类卡片整张可点击。

## 验证结果

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 本地访问 `http://localhost:3001/blog/smartx-design-workflow` 返回 `200 OK`。
- 使用 Playwright CLI + 本机 Chrome 抓取详情页桌面端和移动端截图，确认列表页已能进入详情页且详情内容正常显示。

## 下一步

- 给 Blog 详情页补真实长文内容与更多专属图片。
- 如果后续有 Figma 详情页视觉稿，可以继续把当前骨架升级成正式文章模板。
