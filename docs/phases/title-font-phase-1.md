# Title Font Phase 1

## 这次改动的目标
- 把“方正清刻本悦宋”正式接入项目。
- 让作品集站点里通过 `--portfolio-font-title` 控制的一级标题统一使用这款字体。

## 这次做了什么
- 从本机字体目录复制正式字体文件到项目内：
  - `src/site/fonts/files/FZQKBYSJW.ttf`
- 在 `src/site/fonts/site-fonts.js` 中新增 `next/font/local` 字体入口：
  - `fzQingKeBenYueSong`
- 在 `src/site/components/SiteLayout.jsx` 中把这个字体变量挂到站点根节点。
- 在 `design-system/tokens/portfolio.js` 中把标题字体 token 更新为：
  - `var(--font-fz-qingke-benyuesong)`
- 把 `AXZO` 案例页里临时写死的中文衬线标题方案回收成统一 token。

## 这次没做什么
- 没有继续调整标题字号、字重、字距。
- 没有改正文、标签、小标题字体。
- 没有处理英文标题是否需要单独 fallback 的视觉优化。

## 改了哪些关键文件
- `src/site/fonts/files/FZQKBYSJW.ttf`
- `src/site/fonts/site-fonts.js`
- `src/site/components/SiteLayout.jsx`
- `design-system/tokens/portfolio.js`
- `src/site/styles/axzo-design-system-case-study.module.css`

## 为什么这样改
- 字体通过项目内托管和 `next/font/local` 加载，能避免“本机装了才看得见”的不稳定问题。
- 标题字体统一走 token，比在每个页面里单独改 `font-family` 更容易维护。
- 先只改标题 token，风险最小，回退也简单。

## 当前验证结果
- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- Figma 缓存已确认字体信息：
  - family: `FZQingKeBenYueSongS-R-GB`
  - postscript: `FZQKBYSJW--GB1-0`

## 下一步建议
- 你先人工打开站点检查这款字体在以下位置的观感是否符合预期：
  - 首页主标题
  - Works 页面标题
  - AXZO 案例页各章节标题
- 如果你确认字体方向没问题，下一步可以再细调：
  - 字重
  - 字号
  - 行高
  - 中英混排时的 fallback 策略
