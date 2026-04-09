# Blog Phase 4

## 目标

修复 Blog 详情页的 React `key` 警告，并在不改变当前设计系统方向的前提下，做两项小步优化：替换列表页缩略图为真实封面，以及优化详情页正文的长文阅读节奏。

## 改动

- 修复 `src/site/pages/BlogDetailPage.jsx` 中嵌套列表渲染缺少 key 的问题。
- 允许 `next/image` 加载 Framer 旧站图片资源，更新 `next.config.mjs`。
- 更新 `src/site/data/blog-posts.js`，把 Blog 列表页卡片图片替换为 V1 Blog 的真实封面资源。
- 更新 `src/site/pages/BlogPage.jsx`，让列表页封面图跳过 Next 服务端图片代理，直接使用浏览器加载原图，修复当前环境下 Framer 图片被判定为私有 IP 导致的坏图问题。
- 更新 `src/site/pages/BlogDetailPage.jsx`，把正文内容按 `h2` 分组渲染成多段 section。
- 更新 `src/site/styles/blog-detail-page.module.css`，细化长文分节、子标题和列表节奏。

## 验证结果

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 使用 Playwright CLI 截图检查了 `/blog` 与 `/blog/communication-at-work` 的桌面端和移动端页面，确认：
  - 列表页真实封面已正常显示。
  - 详情页长文分节与列表、表格内容渲染正常。
  - 详情页未再出现 React `unique key` 警告。
- 清理并重启 dev server 后重新检查 `.next/dev/logs/next-development.log`，未再出现 `resolved to private ip`、`Console Error` 或 `unique key` 相关日志。

## 下一步

- 如果后续你希望列表页进一步接近 V1 Blog，可以继续替换卡片的布局比例与裁切方式。
- 如果你想让详情页更像正式长文模板，可以继续补引用、代码块或注释样式。
