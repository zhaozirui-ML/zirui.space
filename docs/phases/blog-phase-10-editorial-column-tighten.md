# Blog Phase 10: Editorial Column Tighten

## 目标
- 将 Blog 详情页正文列再微微收窄，增强“编辑部长文”的阅读感。

## 改动
- 在详情页样式中新增局部变量 `--blog-reading-width`。
- 将返回链接、摘要、正文 section、段落列表和 footer 的宽度统一收窄到同一阅读列宽度。
- 保持 hero 图宽度不变，只调整阅读内容列，不改变页面结构。

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 headless Chrome 检查 `/blog/communication-at-work` 的桌面端和移动端，确认桌面正文行长更适合阅读，移动端布局正常

## 下一步
- 如果想继续增强“编辑部”气质，可以再小步尝试：
- 稍微提高正文段落与 section 标题之间的垂直节奏
- 继续微调正文宽度到更窄一档
