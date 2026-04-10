# Dark Mode Token Phase 1

## 目标

先为作品集主题建立 light / dark 双色板结构，并保持现有页面行为不变，为后续 dark mode 接入提供稳定地基。

## 改动

- 在 `design-system/tokens/portfolio.js` 中新增 `portfolio.colorThemes.light` 与 `portfolio.colorThemes.dark`
- 保留 `portfolio.colors` 指向 light 主题，避免破坏当前已有页面
- 在 `design-system/tokens/index.js` 中新增：
  - `portfolioLightCssVariables`
  - `portfolioDarkCssVariables`
  - `portfolioThemeCssVariables`
- 保留 `portfolioCssVariables` 默认导出 light 主题变量，确保现有页面样式不变
- 将 dark palette 评审结论沉淀到 `docs/dark-mode-palette.md`

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 现有页面仍默认使用 light 主题变量，没有引入主题切换行为变化

## 下一步

- 在站点层接入系统自动切换或手动切换逻辑
- 检查 `SiteLayout` 与页面级样式中是否存在需要补充的暗色语义变量
- 再逐页验证首页、Work、案例详情在 dark mode 下的层级和可读性
