# Chatbot Handoff

## 1. 当前状态

- 仓库路径：`/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026`
- 当前分支：`codex/chatbot`
- 当前 `HEAD`：`da3e657` (`Refine portfolio chatbot and clean up design docs`)
- 分支状态：相对 `origin/codex/chatbot` `ahead 5`

当前未提交的本地文件只有两类调试产物，没有纳入正式提交：

- `.playwright-mcp/`
- `chatbot-trigger-alignment.png`

最近所有正式代码修改都已经跑过：

- `pnpm typecheck`
- `pnpm lint`

## 2. 主要实现文件

- API 路由：[app/api/chat/route.js](/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026/app/api/chat/route.js)
- 对话引擎：[src/site/chatbot/portfolio-chat-engine.js](/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026/src/site/chatbot/portfolio-chat-engine.js)
- 知识库：[src/site/chatbot/portfolio-chat-knowledge.js](/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026/src/site/chatbot/portfolio-chat-knowledge.js)
- Chatbot UI：[src/site/components/PortfolioChatbot.jsx](/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026/src/site/components/PortfolioChatbot.jsx)
- Chatbot 样式：[src/site/styles/portfolio-chatbot.module.css](/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026/src/site/styles/portfolio-chatbot.module.css)
- 模块首页判断：[src/site/lib/is-module-home-path.js](/Users/zhaozirui/.codex/worktrees/b348/Portfolio2026/src/site/lib/is-module-home-path.js)

## 3. 当前已确认的产品/交互规则

### 3.1 面板定位

- Chatbot 是全站悬浮入口 + 悬浮面板，不是右侧固定 sidebar。
- 入口只保留图标，不带文字。
- 入口默认视觉较克制，hover 再增强反馈。

### 3.2 欢迎语规则

- 模块首页显示欢迎语：
  - `/`
  - `/work`
  - `/blog`
  - `/about`
- 详情页不显示欢迎语，直接进入建议问题：
  - `/work/*`
  - `/blog/*`
- 这一条规则现在是通过 `isModuleHomePath(pathname)` 控制的，不再只对 `work` 单独写死。

### 3.3 输入区规则

- `Enter` 发送，`Shift + Enter` 换行。
- 输入框默认高度已经缩小。
- 当用户输入多行内容时，`textarea` 会按内容自适应增长。
- 发送中按钮会切到暂停态，对应 `Square` 图标。

### 3.4 Welcome / Suggestions 规则

- 首页 welcome 文案已经收短。
- Porty mascot 在 welcome 卡片里展示。
- Porty 已取消逐帧闪烁，只保留轻微浮动。
- `Suggestions / 建议问题` 现在是纯文本列表，不再是 pill/button card 风格。
- 标题和列表项间距、列表项彼此间距都已经收过一轮。

## 4. 当前回答机制

### 4.1 双层回答结构

当前是“知识库 fallback + 模型润色/承接”的双层结构：

1. 先由 `createPortfolioChatFallbackReply()` 产出一个稳定保底答案。
2. 再根据条件决定是否调用模型。
3. 如果模型可用，模型会拿到：
   - 最近聊天记录
   - 当前页面 pathname
   - 当前会话状态 summary
   - fallback 参考稿作为 factual anchor
4. 如果模型失败，会自动回退到 fallback。

### 4.2 什么时候调用模型

`shouldUseModel()` 当前逻辑：

- 问题为空：不调模型
- 明显 out-of-scope：不调模型
- fallback 不是 `guardrail`：直接调模型
- fallback 是 `guardrail` 但已有会话上下文：也允许调模型承接

这意味着：

- 单轮 FAQ/项目问答可以直接走模型
- 多轮追问会把最近消息一起传给模型
- 无关问题仍然优先拒答

### 4.3 环境变量与 provider

当前支持两种模式：

1. 官方 OpenAI：
   - `OPENAI_API_KEY`
2. 兼容代理 / 中转：
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL`

如果 `OPENAI_API_KEY` 不存在，或 key / provider 配置无效，会自动切回站内知识库 fallback，并返回 notice。

## 5. 当前追问机制

### 5.1 项目识别

项目识别现在有三层来源：

- 当前问题里的 alias
- 当前 pathname 对应的项目详情页
- 最近消息里的项目 alias（`detectProjectFromMessages()`）

所以像“讲讲图纸台账 2.0”后再追问“最难的挑战是什么”，现在能承接。

### 5.2 项目意图识别

当前已支持的项目意图包括：

- `background`
- `challenge`
- `decision`
- `outcome`
- `reflection`
- `role`
- `tradeoff`

这些意图主要由 `detectProjectIntent()` 通过关键词命中。

### 5.3 当前追问是“半规则化”，不是纯生成

现在的追问逻辑不是完全交给模型自由生成，而是：

- fallback 层先用规则判断项目与意图
- 回答内容也优先从结构化知识字段拼装
- 模型主要负责：
  - 承接上下文
  - 语言润色
  - 避免回答像模板

这是当前阶段更稳的做法，因为它能控制事实准确性，同时比纯硬编码 FAQ 更自然。

## 6. 当前知识库结构

知识入口：`portfolioChatKnowledge`

主要字段：

- `profile`
- `projects`
- `experience`
- `skills`
- `contact`
- `faq`
- `quickReplies`
- `guardrails`
- `voice`

重点项目现在已经包含更完整的结构化字段：

- `slug`
- `title`
- `aliases`
- `oneLiner`
- `background`
- `myRole`
- `problem`
- `process`
- `keyDecisions`
- `outcome`
- `reflection`
- `tools`
- `tags`
- `relatedProjectSlugs`
- `relatedPages`
- `continuePrompt`
- `recommendedQuestions`

## 7. 本轮已经做过的视觉/交互决策

- Header 改成左右按钮 + 中间标题的三列结构。
- Header / footer 分割线已去掉，让 panel 更像一个整体。
- 输入框圆角和 panel 圆角已经重新调过。
- placeholder 改成 `问问 Porty / Message Porty`。
- loading 状态改成更轻的 `thinking` 文案。
- 用户消息卡片高度已经修过，不再明显撑高。
- Home welcome 区的 Porty 文案改成了更短版本。
- `/work` 列表页保留欢迎语；详情页隐藏欢迎语。
- 现在进一步统一成：模块首页保留欢迎语，详情页隐藏欢迎语。

## 8. 下一步最适合继续做的事

建议按这个顺序继续：

### A. 功能优化

1. 增加“新建对话 / reset”后的首屏一致性检查
   - 确认在 `/blog`、`/blog/*`、`/about` 上都符合最新规则
2. 检查详情页追问链路
   - 特别是从详情页直接追问 `挑战 -> 决策 -> 结果 -> 反思`
3. 检查多语言一致性
   - 中文和英文的 welcome / suggestions / follow-ups 是否都同步

### B. 内容优化

1. 给重点项目继续补更像本人表达的 `reflection`
2. 检查 `contact` / `experience` / `skills` 的英文语气是否过于直译
3. 继续扩 `recommendedQuestions`
   - 现在项目追问已经可用，但还可以更有“面试导览感”

### C. 视觉优化

1. 再收一轮 welcome 区、suggestions 区和 composer 区的垂直节奏
2. 校正 header 标题与左右按钮的视觉对齐
3. 检查面板在不同内容长度下的滚动感受
4. 再看一轮 mobile 端高度与入口位置

## 9. 新 thread 开始时建议先做什么

建议新 thread 一开始先做下面这几步：

1. 先读这份文档
2. 再看这几个文件：
   - `src/site/components/PortfolioChatbot.jsx`
   - `src/site/styles/portfolio-chatbot.module.css`
   - `src/site/chatbot/portfolio-chat-engine.js`
3. 跑一下：
   - `git status --short --branch`
   - `pnpm typecheck`
   - `pnpm lint`
4. 如果要继续做 UI 调整，先在浏览器里重点检查：
   - `/`
   - `/work`
   - `/work/drawing-ledger-2-0`
   - `/blog`
   - `/blog/<slug>`

## 10. 注意事项

- 不要把 `.playwright-mcp/` 和 `chatbot-trigger-alignment.png` 误提交进正式 commit。
- 颜色继续优先使用现有 design token，不要补硬编码颜色。
- 当前追问机制虽然已经能承接上下文，但本质还是“结构化知识优先，模型辅助承接”，后续不要误改成完全依赖 prompt 的黑盒模式。
- 如果下一步要继续增强 mascot 动画，先确认“不打扰阅读”仍然是第一原则。
