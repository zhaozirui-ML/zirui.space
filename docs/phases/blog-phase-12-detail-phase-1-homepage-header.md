# Blog Phase 12: Detail Header Shift Toward Homepage Style

## 目标
- 先完成 Blog 详情页视觉迁移的 Phase 1。
- 只调整详情页头部视觉、标题区排版和 hero 图容器，让它更接近参考页那种“复用首页语言”的感觉。
- 暂时不改正文 section 结构和内容列样式。

## 改动
- 将详情页头部从“居中阅读列”改成更像首页主视觉的左对齐宽标题布局。
- 放大标题字号，并让标题区使用更宽的头部容器宽度。
- `Back to Blog` 从正文宽度中拆出来，改为跟随头部容器宽度。
- 去掉 hero 图外层的卡片边框、背景和内边距，只保留更干净的图片展示。
- 为长标题做了一个小修正，放宽最大行宽，避免中英混排标题被压得过度海报化。

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 headless Chrome 检查了：
- `/blog/communication-at-work` 的桌面端和移动端
- `/blog/obsidian-from-honeymoon-to-wakeup` 的桌面端
- 结果确认：标题区、返回链接和 hero 图已经明显脱离旧的“文章卡片页”视觉，更接近参考页的首页式头部语言

## 下一步
- Phase 2 可以继续处理正文区：
- 弱化 section 卡片感与边框感
- 调整正文分隔线、图片块和 footer，使整个详情页与新的头部语言完全统一
