# Dark Mode Auto Theme Phase 1

## 目标

先在站点壳层接入系统自动切换的 dark mode，不改逐页内容结构，只让主题变量随系统深浅色偏好自动切换。

## 改动

- 在 `src/site/components/SiteLayout.jsx` 中接入 `useMediaQuery("(prefers-color-scheme: dark)")`
- 根据系统偏好在 `portfolioThemeCssVariables.light` 与 `portfolioThemeCssVariables.dark` 之间切换
- 同步设置 `colorScheme`，让站点容器的原生 UI 语义与当前主题保持一致
- 在 `src/site/styles/site-shell.module.css` 中把几个明显写死的浅色值改为 portfolio token：
  - header 背景与边框
  - navigation hover 背景
  - work card 年份文字
  - CTA 文字颜色

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 站点入口层已经具备 light / dark 自动切换能力

## 下一步

- 逐页检查首页、Work、案例详情是否存在局部写死浅色值
- 根据真实页面效果决定是否需要补充 dark mode 专用语义 token
- 如果后续要提供手动 toggle，再在当前自动切换结构上增加用户覆盖逻辑
