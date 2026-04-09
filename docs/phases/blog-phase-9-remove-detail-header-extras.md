# Blog Phase 9: Remove Detail Header Extras

## 目标
- 去掉 Blog 详情页顶部的红色分类标签和标题下方的副标题说明。

## 改动
- 在 `BlogDetailPage` 中移除 `pageEyebrow` 渲染。
- 在 `BlogDetailPage` 中移除 `detailSummary` 渲染。
- 保留数据字段本身，先不删除数据层内容，方便后续回退或再次启用。

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 headless Chrome 检查 `/blog/communication-at-work`，确认顶部只保留返回、日期和标题

## 下一步
- 如果想让详情页头部更紧凑，可以继续小步收一下标题与 hero 图之间的垂直间距。
