# Dark Mode Sweep Phase 1

## 目标

先清理博客页、博客详情页、目录组件中明显依赖浅色模式的辅助色与边框值，让它们回到 portfolio 主题 token 体系。

## 改动

- 在 `src/site/styles/blog-page.module.css` 中：
  - 将 blog 网格边框变量改为 `portfolio` token
  - 将 blog meta 文字改为 `text-subtle`
  - 将 featured / browse hover wash 改为基于 accent token 的轻混合色
- 在 `src/site/styles/blog-detail-page.module.css` 中：
  - 将 detail grid 边框变量改为 `portfolio` token
  - 将文章 meta 行改为 `text-subtle`
- 在 `src/site/components/case-study/CaseStudyToc.jsx` 中：
  - 将默认 `mutedColor` 从固定 rgba 改为 `var(--portfolio-color-text-muted)`
- 在 `src/site/components/work/DrawingLedgerCaseStudy.jsx` 中：
  - 将传给目录组件的 `mutedColor` 改为 `var(--portfolio-color-text-muted)`

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 博客页与目录组件的弱文字、边框、hover wash 已能跟随 dark mode 主题变量变化

## 下一步

- 继续检查 `drawing-ledger-case-study`、`data-visualization-screen-detail`、`axzo-design-system-case-study`
- 重点关注这些页面里的局部浅底卡片、半透明浅色遮罩、案例专属强调面板
