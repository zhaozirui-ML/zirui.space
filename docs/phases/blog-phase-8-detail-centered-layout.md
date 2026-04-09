# Blog Phase 8: Detail Centered Layout

## 目标
- 试验把 Blog 详情页从“左侧内容柱”调整为“居中阅读列”。
- 保持正文段落左对齐，只移动整体内容重心，避免牺牲阅读性。

## 改动
- 给详情页标题区增加局部居中样式，让分类、日期、标题和摘要回到页面中轴。
- 把正文 intro、各 section 和 footer 收成统一的阅读宽度，并整体居中。
- 保留正文文本、列表和图片的原有视觉体系，不改数据结构和 design token。

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 headless Chrome 打开 `/blog/communication-at-work` 做截图自检，确认标题区和正文列已经回到中间，右侧留白不再失衡

## 下一步
- 如果想继续往“杂志排版”方向推进，可以再小步尝试：
- 进一步缩窄正文宽度
- 单独调整 hero 图与正文列之间的对齐关系
