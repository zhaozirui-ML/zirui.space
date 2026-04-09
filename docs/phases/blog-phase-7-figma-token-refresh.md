# Blog Phase 7

## 目标

根据 Figma 最新节点参数重新同步 `/blog` 列表页的页面骨架和 token 配色，让当前实现更接近设计稿最新版本，同时保留已经接入的真实文章内容。

## 改动

- 使用 Figma MCP 重新获取了节点 `919:18930` 的 `get_design_context`、`get_screenshot` 和 `get_variable_defs`。
- 更新 `src/site/pages/BlogPage.jsx`，为 `Featured` 标题行、`Browse all` 标题行和上下留白区添加区块级样式变体，方便按 Figma 的不同边线规则分别控制。
- 更新 `src/site/styles/blog-page.module.css`，同步最新 Figma 参数：
  - 去掉标题两侧额外的短虚线装饰。
  - 将 `Featured` 标题行改为顶部虚线，右侧 rail 改为虚线边框。
  - 将 `Featured` 内容区顶部恢复为实线。
  - 将 `Browse all` 标题区改成更简洁的实线框关系，去掉额外内部分隔。
  - 将上下 spacer 拆成“虚线版”和“实线版”，贴近 Figma 中两个留白区不同的边界表达。
  - 将 meta 文本颜色收回到 Figma token `text-muted` 对应的 `#8a8580`。
  - 去掉 browse 网格里额外的虚线列分隔，让卡片更接近最新稿中的轻量排布。
- 保留现有真实文章封面和正文数据，没有用 Figma 里的占位图片覆盖内容层。

## 验证结果

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 使用 Playwright CLI 检查了 `/blog` 的桌面端和移动端页面，确认：
  - 页面主边框和区块边界更接近最新 Figma。
  - `Featured` 与 `Browse all` 的标题区和 spacer 区样式关系已经按新版设计重新分层。
  - 移动端布局没有因为边框变体而出现错位。

## 下一步

- 如果你后面继续在 Figma 中调整字体或字号 token，可以下一步把标题和摘要的字重、行高也同步过来。
- 如果你想进一步贴近新版设计，也可以再补一轮针对卡片图片比例和内边距的微调。
