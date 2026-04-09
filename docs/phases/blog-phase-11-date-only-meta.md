# Blog Phase 11: Date-Only Meta

## 目标
- 统一 Blog 列表页和详情页的信息层级。
- 将时间信息移动到标题下方，并移除分类类型信息，只保留时间。

## 改动
- `Featured` 卡片把时间从摘要下方移到标题下方。
- `Browse all` 卡片保留标题下方的 meta 位置，但移除类型文字。
- 详情页将时间从标题上方移动到标题下方，并移除类型文字。
- 数据层中的 `category` 先保留，不删除，方便后续继续试排版。

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 headless Chrome 检查 `/blog` 与 `/blog/obsidian-from-honeymoon-to-wakeup`，确认列表页和详情页都只显示时间

## 下一步
- 如果还想继续统一语气，可以下一步只微调“标题和时间”之间的垂直间距，让两类页面更像同一套模板。
