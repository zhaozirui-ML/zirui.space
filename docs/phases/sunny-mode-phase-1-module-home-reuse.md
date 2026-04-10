# Sunny Mode Phase 1

## 目标

把首页已经确认的 `Sunny Mode` 固定背景复用到模块首页：

- `/`
- `/about`
- `/blog`
- `/work`

同时确保详情页不继承这套背景。

## 改动

- 抽出站点级共享背景组件 `src/site/components/SiteSunnyBackground.jsx`
- 新增共享背景样式 `src/site/styles/site-sunny-background.module.css`
- 在 `src/site/components/SiteLayout.jsx` 里用 pathname 精确命中模块首页，作为唯一背景入口
- 从 `src/site/pages/HomePage.jsx` 移除首页本地背景挂载，避免首页和壳层重复渲染 video
- 给 `src/site/styles/site-shell.module.css` 的主内容和 footer 补上前景层级，保证背景固定时内容仍正常显示

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 Playwright 真浏览器验证：
  - `/`、`/about`、`/blog`、`/work` 都只存在 1 个 Sunny 背景 video
  - 这 4 个模块首页的背景容器都是 `position: fixed`
  - `/`、`/blog`、`/work` 在滚动后，背景仍固定在视口中，前景内容正常滚动
  - `/about` 也正确挂载了固定背景，但当前页面内容较短，在 1440 x 900 视口下没有额外滚动空间
  - `/blog/smartx-design-workflow` 和 `/work/drawing-ledger-2-0` 没有挂载 Sunny 背景
  - 首页 video 的关键样式仍保持：
    - `filter: saturate(0.88) brightness(1.06) contrast(0.92)`
    - `object-position: 50% 45%`
    - `opacity: 0.72`

## 下一步

- 如果后续 `About` 页面内容继续增长，这套背景机制可以直接继承，不需要再补挂背景逻辑
- 如果后续还要做别的模式背景，建议继续沿用“壳层单入口 + pathname 精确命中”的方式，避免页面各自复制实现
