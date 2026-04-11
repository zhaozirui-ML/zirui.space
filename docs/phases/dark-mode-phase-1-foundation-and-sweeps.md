# Dark Mode Phase 1 Foundation And Sweeps

## 目标

为作品集接入第一版 dark mode 基础能力，并逐页清理最明显的 light-only 样式残留，同时保持现有 portfolio 视觉气质不跑偏。

## 改动

- 扩展 `design-system/tokens/portfolio.js` 与 `design-system/tokens/index.js`：
  - 建立 `portfolio.colorThemes.light` / `portfolio.colorThemes.dark`
  - 补充 `bg-soft`、`bg-pure`、`surface-raised`、`text-subtle` 等 dark token
  - 提供 light / dark 两套 CSS variable 输出
- 更新 `src/site/components/SiteLayout.jsx`：
  - 使用系统 `prefers-color-scheme` 自动切换 light / dark 主题变量
  - 同步设置站点容器的 `colorScheme`
- 清理站点壳层与页面残留：
  - `src/site/styles/site-shell.module.css`
  - `src/site/styles/home-page.module.css`
  - `src/site/styles/work-components.module.css`
  - `src/site/styles/blog-page.module.css`
  - `src/site/styles/blog-detail-page.module.css`
  - `src/site/styles/case-study-toc.module.css`
  - `src/site/styles/drawing-ledger-case-study.module.css`
  - `src/site/styles/axzo-design-system-case-study.module.css`
  - `src/site/styles/data-visualization-screen-detail.module.css`
- 对 `data-visualization-screen-detail` 额外做了页面级变量收拢：
  - hero 深蓝区
  - demo board / indicator cards
  - chart fills / legend / shadows
  - dark mode 下的页面局部微调

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 站点已具备基于系统偏好的 dark mode 切换能力
- 主要页面中最明显的写死浅色值已回到 token 或页面级语义变量体系

## 下一步

- 进行真实浏览器视觉走查，重点检查：
  - 首页卡片层级和 hover 强度
  - 博客页 dark featured card 的阅读对比度
  - case study toc hover glow 是否过亮
  - `data-visualization-screen-detail` 的 chart 区块是否显得过跳
- 如果视觉上仍有不顺的地方，优先调 token 或 page-level variables，不要回到组件内部散改颜色
