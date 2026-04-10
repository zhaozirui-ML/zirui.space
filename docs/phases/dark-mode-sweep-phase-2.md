# Dark Mode Sweep Phase 2

## 目标

继续清理案例页里明显依赖浅色模式的局部容器、连接线和描边，让它们能跟随 `portfolio` 主题变量变化。

## 改动

- 在 `src/site/styles/drawing-ledger-case-study.module.css` 中：
  - 将 lifecycle connector 改为基于 `border-strong` 的主题感知颜色
  - 将 pending asset notice 的半透明白底与浅边框改为基于 `bg-pure` / `border-light` 的主题感知写法
  - 将多处手机描边改为基于 `border-strong` 的主题感知写法
- 在 `src/site/styles/axzo-design-system-case-study.module.css` 中：
  - 将 `--axzo-case-accent` 改为 `var(--portfolio-color-accent-moss)`
  - 将 `mediaFrameSoft` 的浅色背景改为 `var(--portfolio-color-bg-soft)`

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- `drawing-ledger` 与 `axzo` 页中最明显的浅色依赖已回到 portfolio token 体系

## 下一步

- 单独处理 `data-visualization-screen-detail`
- 检查是否需要为页面内置深蓝可视化面板补充更明确的 dark mode 语义边界
