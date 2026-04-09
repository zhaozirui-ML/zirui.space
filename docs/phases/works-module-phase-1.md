# Works Module Phase 1

## 目标
- 将 `/work` 列表页按 Figma 第一阶段设计接入当前项目。
- 补齐 `Professional Work`、`Explorations`、`Side Projects` 三个 tab 的页面内容与基础交互。
- 为后续接入更多详情页先稳定列表页结构、组件层和作品数据层。

## 改动
- 重写 `/work` 页面结构与响应式布局，按 Figma 节奏展示项目列表。
- 将 `Works` 页面拆分为页面头部、tabs、项目卡片、explorations 面板、side projects 面板等组件。
- 为 `Explorations` 和 `Side Projects` 接入真实内容，不再使用占位文案。
- 使用现有组件库图标替换 tab 图标，并细调 active / inactive 状态。
- 为 `Side Projects` 增加 hover 反馈、整卡点击跳转、外链箭头与 `pointer` 光标反馈。
- 为 `Works` 模块补充一组专用 design token，并映射为 CSS variables，供组件样式复用。
- 将 explorations 相关图片与 SVG 资源落地到 `public/site/work/explorations/`。
- 对 explorations 中两个 compact 卡片做了 Figma 对齐和像素级微调。

## 验证结果
- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 已对照 Figma 对 `/work` 页面做过多轮视觉检查。
- 已验证 tabs 可切换，side project 可整卡跳转到 GitHub。

## 下一步
- 从主分支新开一个独立分支，继续接入剩余三个项目的详情页。
- 详情页阶段尽量不要再回头修改本阶段的列表页结构，除非发现明确 bug。
