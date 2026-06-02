# Portfolio2026 项目问题与解决方案复盘

> 本文基于 Codex chronicle 记忆、Portfolio2026 相关对话摘要、以及仓库内已有文档整理。它不是完整时间线，而是把项目过程中反复出现、已经被解决或形成处理方式的问题沉淀下来，方便后续写项目复盘、博客或继续接入旧项目时回看。

## 1. 复盘范围

这份文档关注三类问题：

- 实际遇到过的产品、内容、设计、工程、协作问题。
- 当时采用的解决方式，尤其是已经验证有效的方式。
- 后续可复用的判断原则，避免下次从头摸索。

不包含：

- 每一次小改动的完整 changelog。
- 未经验证的结果性判断。
- 只出现过一次、对后续没有明显复用价值的临时细节。

## 2. 协作与工作流问题

### 2.1 规划请求容易被误推进成代码实现

**问题**

有些需求本质上是在问“怎么规划”，例如新增 Change Log、规划旧项目迁移、判断 chatbot 当前阶段。但如果把这些请求直接当成实现任务，会导致过早写代码，范围也容易变大。

**解决方式**

后续形成了 planning-first 的处理方式：当请求明确是“功能实现规划”“框架梳理”“阶段判断”时，先只读检查仓库结构、内容模型、路由、导航、sitemap、文档分工，再输出实施范围，不直接改文件。

**沉淀原则**

如果用户问的是“怎么做”，先回答结构和边界；如果用户确认“帮我更新到网站中”，再进入实现。

### 2.2 Branch、worktree、thread 容易混淆

**问题**

在较大的 chatbot、旧项目迁移、文档维护任务里，`branch`、`worktree`、`thread` 经常一起出现，容易误以为 thread 也是 Git 对象，或者上下文满了就需要重新建分支和 worktree。

**解决方式**

项目沉淀了 `docs/worktree-workflow.md`：

- `branch` 负责代码历史。
- `worktree` 负责独立工作目录。
- `thread` 负责对话上下文。

新任务建议用：

```bash
git worktree add -b codex/your-task /path/to/worktree main
```

thread 上下文变长时，不需要新建分支或 worktree，只需要新开 thread，并通过 handoff 继续。

**沉淀原则**

大任务隔离靠 branch/worktree；上下文续接靠 thread/handoff。

### 2.3 新 worktree 里命令失败，经常是依赖没初始化

**问题**

新 worktree 本质是新的目录，`node_modules` 不会跟着 Git 一起复制。进入新 worktree 后直接跑 `pnpm typecheck`、`pnpm lint` 或 dev server，可能因为依赖缺失失败。

**解决方式**

形成初始化顺序：

```bash
pnpm install
git status --short --branch
pnpm typecheck
pnpm lint
```

同时也保留一个判断：如果只是只读规划，不一定要立即安装依赖；如果要运行项目、验证 UI 或提交改动，就应该补齐依赖。

**沉淀原则**

先判断任务是否需要运行环境。需要运行时，先初始化 worktree，再做验证。

### 2.4 AGENTS.md 容易被写得过重

**问题**

`AGENTS.md` 是协作规则入口，但它很容易被扩写成完整设计文档或流程百科，导致后续 agent 读取负担变重，也容易和其他文档重复。

**解决方式**

项目确立了文档分工：

- `AGENTS.md`：协作规则和执行约束。
- `docs/design-context.md`：高层设计意图、受众、气质。
- `design-system.md`：token、字体、颜色、系统层规则。
- `design.md`：页面层叙事、案例结构、图文关系、Figma 还原规则。
- `docs/worktree-workflow.md`：详细 worktree 流程。

更新 `AGENTS.md` 时，只补缺失的最小路由规则，不复制整份详细文档。

**沉淀原则**

`AGENTS.md` 是导航，不是资料库。详细规则应该留在对应文档里。

## 3. 内容结构与信息架构问题

### 3.1 新页面容易只看页面组件，漏掉 route、data、i18n、sitemap

**问题**

Portfolio2026 是 Next.js App Router 项目。新增一个公开内容页时，如果只做页面组件，会漏掉 route、数据模块、导航、字典或 sitemap，导致页面结构不完整。

**解决方式**

项目形成了静态内容页模式：

- `app/(site)/<route>/page.jsx`
- `src/site/pages/<Page>.jsx`
- `src/site/data/*`
- 必要时更新 `src/site/i18n/dictionary.js`
- 公开页面需要考虑 `app/sitemap.js`
- 是否进入 `src/site/data/navigation.js` 是 IA 决策，不是默认动作

Change Log 规划就是按这套方式先做结构映射，而不是直接开始写 UI。

**沉淀原则**

新增页面先画“接入地图”，再写组件。

### 3.2 旧项目迁移一开始容易想一次迁完

**问题**

V1 Framer 作品集里有多个旧项目。如果一次迁完三个案例页，内容结构、图片资源、交互演示和渲染组件都会同时变复杂，出错后很难定位。

**解决方式**

最后选择 staged migration：

1. 先迁一个结构相对可控的项目。
2. 把它变成模板。
3. 再迁移更复杂的项目。

当时推荐顺序是 `vm-features-optimization` -> `smtx-elf-virtualization` -> `cloudtower-design-system`，原因是复杂度逐步上升。

**沉淀原则**

旧项目迁移先做一个可验证样本，不要一口气迁完整批。

### 3.3 旧项目内容来源不只在当前 repo

**问题**

旧案例页的真实内容部分来自 V1 Framer 站点。如果只看当前 repo，容易误以为本地 placeholder 就是完整内容，导致迁移信息不足。

**解决方式**

把 Framer 旧站点纳入证据链。当前 repo 负责识别 slug、现有 fallback shell、数据结构和渲染入口；外部 Framer 负责补足原始内容和媒体。

**沉淀原则**

迁移任务必须同时看“新站实现位置”和“旧站内容来源”。

### 3.4 About 页技能 taxonomy 容易夸大能力边界

**问题**

在 About 页 Skills 分类里，一些命名会不小心过度工程化。例如 `Implementation QA` 暗示能做代码质量审计，但这超出了真实能力边界。中英文翻译也容易机械直译，不符合设计团队语境。

**解决方式**

最后采用更贴近设计师身份的表达：

- `设计工程素养 / Design Engineering Literacy`
- `UI 实现走查 / UI Implementation Review`
- `AI 辅助工作流 / AI-Assisted Workflow`

同时把 `竞品分析`、`可用性测试` 等能力放回语义正确的栏目，而不是为了 AI 叙事强行归类。

**沉淀原则**

能力标签要守住真实边界。中文和英文要作为一组内容一起校对。

## 4. 设计实现与视觉表达问题

### 4.1 Hero 容易走向装饰性视觉，而不是表达判断力

**问题**

首页 Hero 如果只追求“好看”或“炫”，容易变成通用作品集视觉，无法表达这个项目真正想传达的 Design + Code、真实约束、系统判断。

**解决方式**

后续把方向收敛到 `Constraint Playground`：通过 Ideal、Time pressure、Complexity、Feasible final 等状态，让 Hero 传达“在约束中做判断”的能力，而不是只做装饰。

**沉淀原则**

Portfolio2026 的 Hero 不只是视觉入口，而是能力叙事入口。

### 4.2 参考站浏览器渲染不稳定时，不能卡在截图上

**问题**

分析参考站时，浏览器工具曾经因为环境或渲染限制无法稳定展示 motion。只依赖可视化浏览会让分析停住。

**解决方式**

对 Figma Sites 导出的页面，转而检查 HTML、生成的组件 JSON 和 bundled JS，从源码侧提取结构与动效线索。

**沉淀原则**

视觉参考打不开时，不等于没有证据。能读源码就读源码。

### 4.3 页面层、组件层、站点层一开始容易混在一起

**问题**

字体、布局、目录、卡片等问题，如果不区分层级，很容易把页面局部问题改到系统层，或者把系统级规则散落在组件里。

**解决方式**

项目沉淀了三层判断：

- 站点层：全局外壳、默认字体、Header/Footer。
- 页面层：某一页的 section、节奏、叙事结构。
- 组件层：目录、卡片、媒体块等可复用单元。

**沉淀原则**

先判断规则属于哪一层，再决定改哪个文件。

### 4.4 目录点击后“像没选中”

**问题**

案例页目录点击后，页面会滚动过去，但 active 状态不稳定。根因是选中态完全依赖 `IntersectionObserver`，用户点击后没有立即设置 active。

**解决方式**

最小修复是：点击目录项时先立即设置 active，再继续保留滚动观察逻辑。

**沉淀原则**

用户主动点击触发的状态，应该先给即时反馈；被动观察逻辑适合做后续校正。

### 4.5 TOC 层级用数字表达，容易读错和写错

**问题**

目录项用 `level: 0 / 1` 表示层级时，每次都要脑内翻译，复用到其他案例页时容易写错。

**解决方式**

改成更有语义的字段，例如 `hierarchy: "primary"`。

**沉淀原则**

如果数据字段需要频繁解释，优先改成语义表达，而不是依赖数字约定。

## 5. 资源、图片与 Supabase 问题

### 5.1 Supabase 接入一开始容易被当成一次性全量迁移

**问题**

图片资源迁移时，容易想等三个项目都完成后一起接 Supabase。但全量接入会让排查变难：路径、bucket、公开权限、Next 图片处理、页面引用都可能同时出问题。

**解决方式**

最后采用单页试点：先用当前项目验证 bucket、路径、代码切换、图片显示链路，再推广到后续项目。

**沉淀原则**

资源链路先用一个页面跑通，再推广到多个页面。

### 5.2 图片上传成功，但页面仍然不显示

**问题**

曾经出现 Supabase 图片本身可以访问，但页面里不显示。根因不是图片坏了，也不是 bucket 不公开，而是 Next 的 `/_next/image` 优化接口拦了远程 URL，报错里出现 `"url" parameter is not allowed`。

**解决方式**

没有全局关闭 Next 图片优化，而是只让这页来自 Supabase 的图片绕过 `/_next/image`，直接使用公开地址渲染。

**沉淀原则**

资源问题要拆成两层查：资源本身能否访问，框架是否允许这样处理。

### 5.3 “Supabase 里还剩什么”不能只靠代码 grep

**问题**

当前 repo 里大部分图片已经转成本地 `public/site/...`，但 Supabase 远端历史对象可能仍然存在。只看当前代码引用，会漏掉仍然公开可访问的旧资源。

**解决方式**

形成 Supabase Storage 审计流程：

1. 搜 `get-storage-asset-url`、`NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL`、`remotePatterns`、`storagePath`。
2. 查当前 repo 配置残留。
3. 从 Git 历史提取真实历史 bucket path。
4. 用公开 URL 做 HEAD/GET 验证。
5. 把结果标注为某个日期的审计结论。

**沉淀原则**

“代码还引用什么”和“远端还存在什么”是两个不同问题。

### 5.4 Supabase CLI 不一定可用

**问题**

尝试用 Supabase CLI 枚举 Storage 时，如果本机没有 token，或者命令需要 experimental flag，就会卡住。

**解决方式**

不在 CLI 上耗太久；确认没有可用 token 后，快速切换到公开 URL 验证和 Git 历史路径提取。

**沉淀原则**

缺少凭证时，不要把审计卡死在官方 CLI；能用公开证据验证的部分先验证。

## 6. Chatbot 问题

### 6.1 Chatbot 阶段判断容易凭直觉

**问题**

Chatbot 看起来已经有 UI、知识库和 API，很容易直接说“进入 Phase 3”。但阶段判断不能只看可见 UI。

**解决方式**

通过 `docs/chatbot-handoff.md`、`PortfolioChatbot.jsx`、`portfolio-chat-engine.js`、`portfolio-chat-knowledge.js`、`app/api/chat/route.js` 核对能力边界。最后判断更接近 substantial Phase 2 / Phase 2.5，而不是完整 Phase 3，因为还缺少 page-control function calling、long-term memory、analytics、formal RAG 等能力。

**沉淀原则**

阶段命名要由能力证据决定，不由“看起来完成度”决定。

### 6.2 纯模型回答不够稳，纯规则回答又太硬

**问题**

如果完全靠模型回答，事实准确性不可控；如果完全靠硬编码 FAQ，又容易像模板，不自然。

**解决方式**

当前采用双层结构：

- fallback 层先给稳定事实答案。
- 模型层在可用时做承接、润色和上下文延展。
- 模型失败或 key 不存在时，自动回到 fallback。

**沉淀原则**

作品集 chatbot 的核心不是“最大自由生成”，而是“事实稳定 + 表达自然”。

### 6.3 追问链路需要理解项目上下文

**问题**

用户问完“图纸台账 2.0”后，再问“最难的挑战是什么”，如果系统只看当前这句话，就无法知道在问哪个项目。

**解决方式**

项目识别改成三层来源：

- 当前问题里的 alias。
- 当前 pathname 对应的项目详情页。
- 最近消息里的项目 alias。

同时用 `detectProjectIntent()` 区分 `background`、`challenge`、`decision`、`outcome`、`reflection`、`role`、`tradeoff` 等意图。

**沉淀原则**

多轮问答要记住“上一个对象”和“这句话的意图”。

### 6.4 不同页面的 welcome 规则不同

**问题**

Chatbot 全站挂载后，如果所有页面都显示同样 welcome，会让详情页显得重复；如果全都隐藏，又会让模块首页缺少引导。

**解决方式**

通过 `isModuleHomePath(pathname)` 区分：

- `/`、`/work`、`/blog`、`/about` 显示 welcome。
- `/work/*`、`/blog/*` 等详情页直接进入建议问题。

**沉淀原则**

全站组件也需要 page-aware，不是所有页面都共享同一种首屏状态。

## 7. 自动化、验证与外部工具问题

### 7.1 GitHub API 不可用时，release notes 不能编造

**问题**

周报自动化尝试读取 GitHub PR 元数据时，`gh pr list` / `gh repo view` 连接 `api.github.com` 失败。与此同时，本地分支里有一个 in-window commit，但它不在 `main` 上。

**解决方式**

改用本地 git history 作为证据，并检查 commit 是否 reachable from `main` / `origin/main`。如果窗口内没有确认合并到 main 的 PR，就输出 “No merged PRs found”，而不是把 branch-local commit 写成 merged PR。

**沉淀原则**

release notes 必须基于可验证的 merged 证据；没有证据就说没有。

### 7.2 自动化记忆路径可能受 sandbox 限制

**问题**

周报自动化尝试写 `$CODEX_HOME/automations/weekly-release-notes/memory.md` 时，路径解析到 `/automations`，并因为权限失败。

**解决方式**

把内容生成和记忆持久化拆开：先完成当前周报判断，再单独说明 memory 写入受环境限制。

**沉淀原则**

自动化任务要区分“本次内容结果”和“自动化状态保存”。

### 7.3 浏览器验证有时会受环境影响

**问题**

部分浏览器工具或 Playwright 环境可能遇到目录权限、渲染、截图不稳定等问题。如果只依赖一种浏览器验证方式，任务容易卡住。

**解决方式**

优先使用 Codex 应用内浏览器；如果上下文无法完成验证，再切到 Playwright、页面源码、截图或本地脚本检查。视觉任务要尽量补浏览器实际渲染检查。

**沉淀原则**

验证目标比验证工具更重要。工具失败时，换证据来源继续验证。

### 7.4 每次内容或代码改动后需要最小验证闭环

**问题**

小范围内容改动如果不验证，很容易留下类型错误、lint 问题或页面渲染异常。

**解决方式**

仓库形成默认闭环：

```bash
pnpm typecheck
pnpm lint
```

UI、视觉、交互、裁切相关改动还需要浏览器实际检查。

**沉淀原则**

实现不是终点；验证通过才算完成。

## 8. AI 协作知识问题

### 8.1 Skill、Plugin、MCP 一开始容易混淆

**问题**

协作过程中经常会提到 Skill、Plugin、MCP，但它们不在同一层级，容易混用。

**解决方式**

项目文档中已经整理成：

- MCP：能力接口，回答“能连接到什么能力”。
- Skill：工作方法，回答“应该怎么做这类任务”。
- Plugin：能力包，回答“这一组能力整体能做什么”。

**沉淀原则**

遇到工具问题，先判断是在问能力接口、做事方法，还是能力包。

### 8.2 重复工作流应该变成 skill

**问题**

很多问题会反复出现：worktree 路由、只读规划、Chrome History 找站、Supabase Storage 审计。如果每次都靠记忆临时回想，容易漏步骤。

**解决方式**

已经把高频流程沉淀成个人 skill：

- `portfolio-readonly-planning`
- `portfolio-worktree-router`
- `chrome-history-recovery`
- `portfolio-supabase-storage-audit`

后续又收窄了触发描述，避免普通开发任务误触发。

**沉淀原则**

重复三次以上、步骤稳定、容易漏关键验证的流程，适合变成 skill。

## 9. 可复用的项目经验

### 9.1 先判断问题属于哪一层

很多问题表面像“页面不好看”或“功能不对”，实际可能属于不同层级：

- 内容层：文案、叙事、taxonomy、双语一致性。
- 页面层：section 节奏、图文关系、案例页结构。
- 系统层：字体、颜色、token、共享组件。
- 资源层：图片路径、Supabase、Next Image、public assets。
- 协作层：worktree、thread、handoff、验证闭环。

先定位层级，可以减少误改。

### 9.2 先做最小可验证样本

Supabase、旧项目迁移、案例页组件、chatbot 规则，都证明了同一个方法有效：先让一个小范围样本跑通，再扩到更多页面或更多项目。

### 9.3 不确定时先停在证据上

在这个项目里，好的推进方式不是“猜一个合理答案”，而是先说明证据边界：

- 阶段判断要看真实文件。
- 远端资源存在性要重新验证。
- release notes 要看 merged 证据。
- 外部旧站内容要回到 Framer 来源。

### 9.4 内容表达要守住真实能力边界

About taxonomy、Hero 概念、chatbot 文案都说明：这个作品集最重要的不是把能力说满，而是把真实判断力说清楚。过强的工程措辞、过泛的 AI branding、过装饰的视觉，都会削弱可信度。

### 9.5 文档是协作系统的一部分

这个项目不是只靠代码推进。`AGENTS.md`、`docs/worktree-workflow.md`、`docs/codex-learning-notes.md`、`docs/chatbot-handoff.md`、`design.md`、`design-system.md` 都在降低重复解释成本。

后续继续做项目时，值得坚持：

- 大任务结束后写 handoff。
- 新规则进入正确的文档层。
- 反复出现的问题进入 skill 或 learning notes。
- 已验证的流程比临时记忆更可靠。

## 10. 可用于项目复盘文章的主线提炼

如果把这些问题写进项目复盘，主线可以不是“我修了很多 bug”，而是：

> 这个作品集项目的难点，不只是把页面做出来，而是在设计表达、内容证据、工程边界和 AI 协作之间建立一套可持续的判断系统。

可以展开成四个复盘角度：

- 从页面实现到系统思考：站点层、页面层、组件层逐渐分清。
- 从内容堆叠到证据叙事：About taxonomy、Hero、旧项目迁移都围绕真实能力边界收敛。
- 从单次任务到协作流程：worktree、handoff、AGENTS.md、skill 把临时经验变成稳定流程。
- 从“AI 帮我写代码”到“AI 辅助判断”：很多关键进展来自先问边界、再做最小验证，而不是直接生成大改动。

