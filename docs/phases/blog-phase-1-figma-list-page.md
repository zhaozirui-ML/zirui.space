# Blog Phase 1

## 目标

把 Figma 的 Blog 列表页首版落到当前项目里，替换原来的占位页面，并保持与现有 Portfolio2026 路由和 token 体系兼容。

## 改动

- 新增 `src/site/data/blog-posts.js`，把 Blog 内容拆到独立数据层。
- 新增 `src/site/styles/blog-page.module.css`，实现 Blog 页面的专属版式和响应式规则。
- 更新 `src/site/pages/BlogPage.jsx`，按 Figma 拆成 `Featured` 和 `Browse all` 两个 section。
- 下载并接入 Figma 图片资源到 `public/site/blog/`。
- 更新 `src/site/data/navigation.js`，补上与 Figma 对齐的 `Mode` 导航入口，复用现有 `/design-system` 路由。

## 验证结果

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 使用 Playwright CLI + 本机 Chrome 抓取桌面端和移动端截图，对照 Figma 做了一轮视觉收敛。

## 下一步

- 为 Blog 卡片接入 `/blog/[slug]` 详情页路由。
- 把当前静态数据继续拆成文章摘要与详情内容两层。
- 如果后续 Figma 提供详情页设计，再按同样流程继续实现。
