# Blog Phase 3

## 目标

把 V1 Framer Blog 的真实文章内容迁入当前项目的 `/blog/[slug]` 详情页，同时保持当前 Portfolio2026 的详情页视觉系统不变。

## 改动

- 更新 `src/site/data/blog-posts.js`，替换占位英文内容，改为 V1 Blog 的真实标题、日期、分类、banner 和正文块。
- 扩展详情页数据结构，支持段落、标题、列表和文章内图片。
- 更新 `src/site/pages/BlogDetailPage.jsx`，改为根据内容块渲染正文，而不是只渲染手写占位 section。
- 更新 `src/site/styles/blog-detail-page.module.css`，只补内容型元素所需的列表与图片样式，不改整体页面视觉体系。

## 验证结果

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 本地访问 `/blog` 与 `/blog/communication-at-work` 返回 `200 OK`。
- 使用 Playwright CLI + 本机 Chrome 抓取 `沟通的方法` 详情页截图，确认 V1 的真实内容已经进入当前详情页版式。

## 下一步

- 如果你之后要把 V1 Blog 的封面缩略图也完全迁过来，可以继续把列表页的卡片图片替换成对应文章资源。
- 如果后续有新的 Blog 详情页 Figma 设计稿，可以在这份真实内容数据的基础上继续升级详情页表现。
