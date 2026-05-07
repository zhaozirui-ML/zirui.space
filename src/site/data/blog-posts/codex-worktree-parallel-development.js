const t = (zh, en) => ({ zh, en });

export const codexWorktreeParallelDevelopment = {
  slug: "codex-worktree-parallel-development",
  section: "featured",
  title: {
    zh: "Codex 中利用 Git Worktree 并行开发的实践",
    en: "Parallel Development with Git Worktrees in Codex",
  },
  summary: {
    zh: "结合一次真实踩坑经历，梳理 branch、worktree、thread 三者的关系，以及在 Codex 里更稳的并行开发方式。",
    en: "How branches, worktrees, and threads fit together in a real Codex workflow.",
  },
  detailSummary: {
    zh: "这篇文章结合一次真实开发经历，整理了在 Codex 里使用 Git worktree 并行开发时最容易混淆的概念边界，以及更稳妥的创建、协作、提交和清理流程。",
    en: "Based on a real development workflow, this article clarifies the concepts people most often confuse when using Git worktrees in Codex and outlines a safer process for setup, collaboration, delivery, and cleanup.",
  },
  date: "2026年5月6日",
  category: {
    zh: "工具",
    en: "TOOLS",
  },
  imageSrc: "/site/blog/codex-worktree-parallel-development/cover-thumb.png",
  imagePosition: "left center",
  imageAlt: {
    zh: "Codex 中利用 Git Worktree 并行开发的实践文章封面",
    en: "Cover image for Parallel Development in Codex with Git Worktrees",
  },
  heroImageSrc: "/site/blog/codex-worktree-parallel-development/cover.png",
  heroImageAlt: {
    zh: "Codex 中利用 Git Worktree 并行开发的实践文章头图",
    en: "Hero image for Parallel Development in Codex with Git Worktrees",
  },
  supportsEnglishDetail: true,
  contentBlocks: [
    {
      type: "paragraph",
      text: t(
        "在这次使用 Codex 开发作品集网站的过程中，我个人踩了不少坑。",
        "While using Codex to build my portfolio site, I ran into more pitfalls than I expected.",
      ),
    },
    {
      type: "paragraph",
      text: t(
        "主要的挑战集中在以下几个方面：",
        "Most of the friction came from three areas:",
      ),
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          text: t(
            "并行开发的 Git 功能：在使用 Worktree、Branch 这些 Git 功能进行并行开发时，我遇到了不少麻烦。因为我本身并没有这方面的知识背景，也不理解其底层逻辑，所以需要重新去学习。",
            "Git features for parallel development: I ran into a lot of trouble when using worktrees and branches for parallel work. I did not have much background here, and I did not yet understand the underlying model, so I had to relearn it from the ground up.",
          ),
          nested: [],
        },
        {
          text: t(
            "Codex 的可视化实现：我需要去了解 Codex 是如何把这些 Git 功能可视化的，哪些动作已经有 UI，哪些动作仍然需要回到终端执行。这一步其实很重要，因为只有把界面能力和命令行能力的边界看清楚，后续并行开发才不容易误判。",
            "Codex's visual layer: I also needed to understand how Codex turns these Git capabilities into interface actions, which tasks are already covered by the UI, and which still need to happen in the terminal. That boundary matters, because without it, parallel development becomes easy to misread and harder to control.",
          ),
          quote: t(
            "例如目前的 Codex 客户端里，就有一种很典型的“管生不管埋”感：UI 可以很方便地基于任务或上下文创建新分支和 worktree，但如果你想删除历史分支、清理无用分支，还是得绕回 Terminal 处理。",
            "For example, the current Codex client still has a very recognizable “create, but do not clean up” feel: the UI makes it easy to create a new branch or worktree from a task or context, but if you want to delete old branches or clean up unused ones, you still have to go back to the terminal.",
          ),
          nested: [],
        },
        {
          text: t(
            "功能间的复杂关系：理清这些 Git 功能之间错综复杂的关系。只有理清楚这些内容，才能更高效地并行开发自己想做的模块。",
            "The relationships between these features: the concepts are tightly connected, and without sorting out those relationships first, it becomes very hard to work on multiple modules efficiently in parallel.",
          ),
          nested: [],
        },
      ],
    },
    {
      type: "paragraph",
      text: t(
        "下面就结合这次开发过程，复盘几个最容易踩坑的地方，以及我是怎么一点点把它们理顺的。",
        "What follows is a review of the places where I got stuck most easily, and how I gradually worked through them.",
      ),
    },
    {
      type: "heading",
      level: "h2",
      text: t("What（worktree、branch、thread）", "What: worktree, branch, and thread"),
    },
    {
      type: "paragraph",
      text: t(
        "先把几个最容易混淆的概念拆开。",
        "First, it helps to separate the concepts that are easiest to confuse.",
      ),
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: t("branch：代码历史分叉。", "Branch: a line of code history."),
          nested: [],
        },
        {
          text: t(
            "worktree：这个分支对应的一份独立工作目录。",
            "Worktree: an independent working directory tied to a branch.",
          ),
          nested: [],
        },
        {
          text: t(
            "thread：Codex 里围绕这份工作目录展开的一段对话上下文。",
            "Thread: the conversation context inside Codex that develops around that working directory.",
          ),
          nested: [],
        },
      ],
    },
    {
      type: "paragraph",
      text: t(
        "它们之间通常是这样的关系：",
        "In practice, their relationship usually looks like this:",
      ),
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: t(
            "一个 worktree 通常对应一个正在工作的分支。",
            "A worktree usually corresponds to one active working branch.",
          ),
          nested: [],
        },
        {
          text: t(
            "一个 thread 通常绑定一个当前工作目录，也就是某个 worktree。",
            "A thread is usually tied to the current working directory, which means a specific worktree.",
          ),
          nested: [],
        },
        {
          text: t(
            "thread 可以换，但 branch 和 worktree 可以继续复用。",
            "You can switch threads, while continuing to reuse the same branch and worktree.",
          ),
          nested: [],
        },
      ],
    },
    {
      type: "paragraph",
      text: t(
        "对我来说，最关键的一点是：thread 是协作过程的上下文，不是代码资产。",
        "For me, the key point is this: a thread is collaboration context, not a code asset.",
      ),
    },
    {
      type: "heading",
      level: "h2",
      text: t("How", "How"),
    },
    {
      type: "heading",
      level: "h4",
      text: t("1. 创建阶段", "1. Setup"),
    },
    {
      type: "paragraph",
      text: t(
        "Codex 中有两种创建 worktree 和 branch 的方式。",
        "In Codex, there are two common ways to create a worktree and a branch.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t(
        "方式 A：直接创建 worktree，同时创建新分支",
        "Option A: create a worktree and a new branch at the same time",
      ),
    },
    {
      type: "paragraph",
      text: t(
        "典型命令思路是：",
        "A typical command looks like this:",
      ),
    },
    {
      type: "code",
      code: t(
        "git worktree add -b codex/xxx /path/to/worktree main",
        "git worktree add -b codex/xxx /path/to/worktree main",
      ),
    },
    {
      type: "paragraph",
      text: t("含义是：", "What this means:"),
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: t(
            "从 main 派生一个新分支 `codex/xxx`，新分支的 HEAD 继承自 main。",
            "Create a new branch `codex/xxx` from `main`, with its HEAD inherited from `main`.",
          ),
          nested: [],
        },
        {
          text: t(
            "在新目录创建一个 worktree。",
            "Create a new worktree in a separate directory.",
          ),
          nested: [],
        },
      ],
    },
    {
      type: "paragraph",
      text: t(
        "这是最常见、最干净的方式，也就是在创建 worktree 时同步帮你创建新分支。",
        "This is the cleanest and most common approach because it creates the worktree and the new branch in one step.",
      ),
    },
    {
      type: "paragraph",
      text: t(
        "如果走可视化 UI，做法就是在输入框下方的 workspace selector 里选择“移交到工作树”，系统会自动帮你创建新的 worktree 和分支。",
        "In the UI, the equivalent move is to choose “Hand off to worktree” from the workspace selector below the input box. Codex then creates both the new worktree and the new branch for you.",
      ),
    },
    {
      type: "quote",
      text: t(
        "这里也能看出 Codex 当前一个很典型的产品特征：创建动作做得很顺手，但清理动作还没有完全进入 UI。",
        "This also shows a very typical product trait in Codex today: creation is well supported in the UI, while cleanup has not fully made its way there yet.",
      ),
    },
    {
      type: "image",
      src: "/site/blog/codex-worktree-parallel-development/body-1.png",
      alt: t(
        "Codex 中通过工作区 selector 创建新 worktree 和分支的界面截图",
        "Screenshot of creating a new worktree and branch from the workspace selector in Codex",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t(
        "方式 B：先建分支，再把它挂到 worktree",
        "Option B: create the branch first, then attach it to a worktree",
      ),
    },
    {
      type: "paragraph",
      text: t(
        "典型思路是分两步：",
        "The typical sequence is split into two steps:",
      ),
    },
    {
      type: "code",
      code: t(
        "git branch codex/xxx main\ngit worktree add /path/to/worktree codex/xxx",
        "git branch codex/xxx main\ngit worktree add /path/to/worktree codex/xxx",
      ),
    },
    {
      type: "paragraph",
      text: t(
        "日常开发时优先用方式 A，因为它把“建分支”和“建独立工作目录”一次做完，最不容易出错。我之前为了完全搞清楚 Codex 中的操作逻辑，也尝试过几次方式 B，但它确实更容易出错，尤其是在并行开发多个功能的时候。",
        "For day-to-day work, I would strongly prefer Option A because it completes “create a branch” and “create an isolated working directory” in one move. It is simply the least error-prone. I tried Option B a few times because I wanted to fully understand how Codex behaves, but it is easier to make mistakes there, especially when several features are being developed in parallel.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("2. 工作阶段", "2. Working phase"),
    },
    {
      type: "paragraph",
      text: t(
        "这一步最核心的是：thread 绑定的是“当前工作目录上下文”。也就是说，当你在 Codex 里进入某个 worktree 目录时，这个 thread 实际上就在围绕这个 worktree 工作。",
        "The key idea here is that a thread is tied to the context of the current working directory. In other words, once you enter a specific worktree in Codex, that thread is effectively operating around that worktree.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("2.1 正常工作流", "2.1 The normal workflow"),
    },
    {
      type: "paragraph",
      text: t(
        "典型状态是：你在某个 thread 里，当前 cwd 是某个 worktree，这个 worktree checkout 着某个分支，你就在这条分支上持续提交。",
        "The normal state is straightforward: you are in a thread, the current `cwd` points to a specific worktree, that worktree has a specific branch checked out, and you keep committing on that branch.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("2.2 当 thread 上下文满了怎么办", "2.2 What to do when the thread context fills up"),
    },
    {
      type: "paragraph",
      text: t(
        "这时候不是换分支，也不是重建 worktree，而是保留原来的 branch 和 worktree，然后新开一个 thread，让新 thread 继续在同一个 worktree 里工作。也就是说，thread 可以换，worktree 不用换。",
        "At that point, the right move is not to switch branches or recreate the worktree. Instead, keep the existing branch and worktree, open a new thread, and let the new thread continue working in the same worktree. In short: the thread can change, while the worktree does not need to.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("2.3 关于“转交任务”", "2.3 About handoff"),
    },
    {
      type: "paragraph",
      text: t(
        "最稳的方式是让 Agent 帮你做一个简短 handoff。建议包含这几类信息：",
        "The safest approach is to ask the agent to prepare a short handoff. I would recommend including at least the following information:",
      ),
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          text: t("当前工作目录。", "The current working directory."),
          nested: [],
        },
        {
          text: t("当前分支名。", "The current branch name."),
          nested: [],
        },
        {
          text: t("已完成内容。", "What has already been completed."),
          nested: [],
        },
        {
          text: t("未完成内容。", "What still remains unfinished."),
          nested: [],
        },
        {
          text: t("关键文件。", "Key files."),
          nested: [],
        },
        {
          text: t("是否有未提交改动。", "Whether there are uncommitted changes."),
          nested: [],
        },
        {
          text: t("下一步建议。", "Suggested next steps."),
          nested: [],
        },
      ],
    },
    {
      type: "paragraph",
      text: t(
        "之前做 Chatbot 功能时，让 Agent 帮我整理的交接文件就是 `docs/chatbot-handoff.md`。",
        "When I was working on the chatbot feature earlier, I asked the agent to prepare a handoff document, which became `docs/chatbot-handoff.md`.",
      ),
    },
    {
      type: "image",
      src: "/site/blog/codex-worktree-parallel-development/body-2.png",
      alt: t(
        "Codex 中 Chatbot handoff 文档示例截图",
        "Screenshot of a chatbot handoff document prepared in Codex",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("3. 提交与合并阶段", "3. Commit and merge"),
    },
    {
      type: "paragraph",
      text: t(
        "工作完成后，通常流程是先在 worktree 对应分支上提交，再合并到 main，之后回到主仓库或 main worktree 验证，最后再清理 worktree 和分支。",
        "Once the work is done, the usual flow is to commit on the branch associated with that worktree, merge it back into `main`, return to the main repository or the `main` worktree to verify everything, and only then clean up the worktree and branch.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("4. 清理阶段", "4. Cleanup"),
    },
    {
      type: "paragraph",
      text: t(
        "清理顺序通常是先移除 worktree，再删除 branch。原因很直接：只要某个分支还被某个 worktree checkout 着，Git 往往不允许你直接删除这个分支，所以先删 branch 常常会失败。",
        "The cleanup order is usually: remove the worktree first, then delete the branch. The reason is simple: as long as a branch is still checked out by a worktree, Git usually will not let you delete that branch directly, so deleting the branch first often fails.",
      ),
    },
    {
      type: "heading",
      level: "h4",
      text: t("5. Thread 的收尾", "5. Closing the thread"),
    },
    {
      type: "paragraph",
      text: t(
        "清理完成后，就可以 archive thread，因为这个 thread 对应任务已经没有后续要继续。逻辑上是先处理代码资产，再归档对话资产。",
        "After cleanup is complete, the thread can be archived because the task tied to it no longer needs to continue. Conceptually, the order is: handle the code assets first, and archive the conversation asset second.",
      ),
    },
    {
      type: "heading",
      level: "h2",
      text: t("总结", "Conclusion"),
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: t(
            "thread 不是 branch 的一部分，也不是必须和 branch 一一绑定。",
            "A thread is not part of a branch, and it does not need to map one-to-one with a branch.",
          ),
          nested: [],
        },
        {
          text: t(
            "当 thread 上下文满了，不需要重新建分支或 worktree。正确做法是：新建 thread，继续复用原 worktree。",
            "When a thread runs out of context, there is no need to create a new branch or worktree. The right move is to open a new thread and keep reusing the existing worktree.",
          ),
          nested: [],
        },
      ],
    },
    {
      type: "image",
      src: "/site/blog/codex-worktree-parallel-development/body-3.png",
      alt: t(
        "Codex 帮助整理的 worktree 并行开发流程图",
        "Workflow diagram for parallel development with worktrees, summarized with Codex",
      ),
    },
    {
      type: "paragraph",
      text: t(
        "这篇复盘真正的价值，不在于记住几个 Git 命令，而在于厘清 branch、worktree、thread 各自的职责边界。只有先把这些边界想清楚，并行协作、任务切换和后续清理才会真正变得可控。",
        "The value of this review lies less in memorizing a few Git commands than in clarifying the boundaries between branch, worktree, and thread. Once those boundaries are explicit, parallel collaboration, task switching, and cleanup become far more controllable.",
      ),
    },
  ],
};
