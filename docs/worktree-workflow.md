# Worktree Workflow

## 1. 目的

本文档说明在 Codex 里配合 `worktree`、`branch` 和 `thread` 工作时的推荐流程。

核心目标有三个：

- 让不同任务有独立工作目录，避免互相污染
- 让同一条任务线可以在上下文变长时平滑续接
- 让任务完成后的清理动作有固定顺序，不留下无用分支和 worktree

## 2. 三个对象分别是什么

### 2.1 Branch

`branch` 是代码历史分叉。

它负责：

- 承载某条任务线的代码提交
- 与 `main` 隔离
- 在完成后被合并、保留或删除

### 2.2 Worktree

`worktree` 是某个分支对应的一份独立工作目录。

它负责：

- 让多个分支同时有各自独立目录
- 避免频繁切换同一个目录的 checkout 状态
- 让 Codex 能围绕某个具体任务目录持续工作

### 2.3 Thread

`thread` 是 Codex 里的会话上下文容器，不是 Git 对象。

它负责：

- 承载某次协作过程中的对话、决策与任务状态
- 绑定当前工作目录的上下文
- 在上下文过长时，通过 handoff 交给新的 thread 继续工作

补充理解：

- 真正稳定的资产是 `branch` 和 `worktree`
- `thread` 是协作上下文，不是代码资产

## 3. 创建阶段

### 3.1 推荐方式：一次创建 worktree 和分支

最常见的做法是：

```bash
git worktree add -b codex/your-task /path/to/worktree main
```

这条命令会同时完成三件事：

1. 从 `main` 派生一个新分支
2. 创建一个新的 worktree 目录
3. 让这个新 worktree checkout 到新分支

优点：

- 步骤最少
- 最不容易把分支和目录挂错
- 最适合 Codex 的日常任务流

### 3.2 另一种方式：先建分支，再挂 worktree

也可以分两步做：

```bash
git branch codex/your-task main
git worktree add /path/to/worktree codex/your-task
```

效果同样成立，只是步骤更多。

适用场景：

- 你已经先建好了分支
- 或者这个分支是别的流程里先生成的

## 4. 初始化阶段

新建好 worktree 后，建议先做这些动作：

1. 进入新目录
2. 跑依赖安装
3. 确认当前分支和工作状态
4. 再开始任务

典型顺序：

```bash
cd /path/to/worktree
pnpm install
git status --short --branch
```

如果当前仓库已经有明确约定，也可以补：

```bash
pnpm typecheck
pnpm lint
```

## 5. 正常工作阶段

典型状态是：

- 一个 worktree 对应一个任务分支
- 一个 thread 围绕这个 worktree 工作
- 所有代码提交都落在这条分支上

这时候最重要的是：

- 不要在同一个 worktree 里混做多条无关任务
- 不要把临时调试产物和正式代码提交混在一起

## 6. Thread 上下文满了怎么办

这是最容易混淆的地方。

### 6.1 正确理解

当当前 thread 上下文过长时：

- **不需要**新建分支
- **不需要**重建 worktree
- **只需要**新开一个 thread，然后继续使用原来的 worktree

也就是说：

- `branch` 不变
- `worktree` 不变
- `thread` 可以切换

### 6.2 推荐交接动作

在旧 thread 结束前，建议补一份 handoff，至少包含：

1. 当前工作目录
2. 当前分支
3. 已完成内容
4. 未完成内容
5. 关键文件
6. 是否有未提交改动
7. 下一步建议

如果任务比较复杂，建议直接把 handoff 写成仓库内文档，例如：

- `docs/chatbot-handoff.md`
- `docs/worktree-workflow.md`

### 6.3 新 thread 的启动方式

新 thread 里建议先做：

```bash
git status --short --branch
git log --oneline -5
```

然后阅读 handoff 文档，再继续工作。

## 7. 提交与合并阶段

工作完成后，通常顺序是：

1. 在任务分支提交改动
2. 检查代码状态
3. 合并到 `main`
4. 回到主仓库验证

典型检查：

```bash
pnpm typecheck
pnpm lint
git status --short
```

如果需要把一部分改动先带回 `main`，也可以只挑稳定部分提交或 cherry-pick。

## 8. 清理阶段

### 8.1 正确顺序

清理时推荐顺序是：

1. 确认代码已经合并到 `main`
2. 删除 worktree
3. 删除分支
4. archive 对应 thread

### 8.2 为什么先删 worktree

因为如果某个分支还被某个 worktree checkout 着，Git 通常不允许直接删分支。

你会看到类似报错：

```text
Cannot delete branch 'xxx' checked out at '...'
```

所以应该：

```bash
git worktree remove /path/to/worktree
git branch -D codex/your-task
```

如果 worktree 是脏的，需要在确认后强制移除：

```bash
git worktree remove /path/to/worktree --force
```

### 8.3 Thread 的收尾

只有在下面三个条件都满足时，才适合 archive thread：

1. 分支已经合并或不再需要
2. worktree 已删除
3. 这条任务线没有后续协作需求

也就是说：

- 先处理代码资产
- 再归档对话资产

## 9. 推荐的最小标准流程

以后可以直接按这套记：

1. 从 `main` 创建新分支和新 worktree
2. 在这个 worktree 对应的 thread 里工作
3. 如果 thread 上下文太长：
   - 保留原 branch
   - 保留原 worktree
   - 新开 thread
   - 写 handoff
   - 在新 thread 继续
4. 提交并合并到 `main`
5. 删除 worktree
6. 删除分支
7. archive thread

## 10. 常见误区

### 误区 1：创建分支时必须绑定 thread

不准确。

更准确的说法是：

- 创建分支不需要 thread
- 但你在 Codex 里继续高效工作，通常需要一个 thread 来承载该 worktree 的上下文

### 误区 2：thread 满了就要重建 worktree

不对。

正确做法是：

- worktree 不变
- branch 不变
- 只换 thread

### 误区 3：先删分支再删 worktree

不推荐。

标准顺序通常是：

- 先删 worktree
- 再删分支

## 11. 一句话总结

可以把这套流程记成一句话：

**branch 存代码历史，worktree 存独立工作目录，thread 存协作上下文；上下文满了换 thread，任务完成后先删 worktree，再删分支，最后 archive thread。**
