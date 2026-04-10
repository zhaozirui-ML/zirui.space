# Design Context Phase 1

## 目标

为作品集项目补齐高层设计上下文，并明确它与设计系统文档、页面规则文档之间的分工关系。

## 改动

- 新增 `docs/design-context.md`，沉淀受众、品牌气质、审美方向、主题策略与长期设计原则
- 在 `DESIGN_SYSTEM.md` 顶部补充说明：高层设计意图应先参考 `docs/design-context.md`
- 在 `GUIDELINES.md` 顶部补充说明：页面层规则应建立在 `docs/design-context.md` 之上
- 在 `AGENTS.md` 增加“设计上下文文档分工”规则，明确三份文档各自负责的层级

## 验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 已确认当前实现仍是 light-first，但 dark mode 已是近期接入项；文档措辞已同步修正，避免误导后续协作

## 下一步

- 正式接入 dark mode 时，先从 token 和主题层设计暗色语义，再逐页落地
- 如果未来发现 `docs/design-context.md` 与页面规则文档有内容漂移，优先做小范围同步，不急着重构三份文档结构
