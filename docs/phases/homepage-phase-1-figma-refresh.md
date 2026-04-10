# Homepage Phase 1

## 目标

- 按 Figma 首页稿调整当前首页，而不是重做一套新页面
- 保持现有路由、数据来源与设计系统 token 的使用方式
- 先完成首页主体结构、导航项和核心卡片样式的对齐

## 改动

- 首页区块顺序调整为 `Hero -> Recent Works -> Skills -> Blogs`
- 新增首页专用 `HomeBlogsSection`，复用现有 blog 数据与详情路由
- 首页 Hero 文案、作品卡首页专用标题与摘要改为更接近 Figma 的英文版本
- 移除全站导航里的 `Mode`
- 首页样式改为更接近 Figma 的纯净白底、标题层级、作品卡排版和 blog list 结构

## 验证结果

- 已通过 `pnpm typecheck`
- 已通过 `pnpm lint`
- 已完成本地首页截图复核，确认 `Sunny Mode`、`Recent Works`、`Skills`、`Blogs` 的顺序与主体视觉接近 Figma
- 已验证 blog 详情页在携带 `?from=/` 时渲染出的返回链接为 `/`

## 下一步

- 根据 Playwright 截图继续微调间距、卡片高度和移动端表现
- 如果首页文案需要继续和 Figma 一字不差，再单独整理 blog 区块的展示文案
