# Blog Phase 14: Detail Frame System Restore

## 目标
- 将 Blog 详情页补回与首页一致的外围框线系统。
- 在保留新的标题与正文节奏的前提下，恢复周围的实线、虚线和侧边 rail。

## 改动
- 为详情页头部、hero 区和正文区增加分段 frame 容器。
- 恢复左右外框、顶部实线/虚线分隔以及两侧 rail。
- 保留之前已经完成的标题排版、hero 展示和正文节奏，不回退为旧样式。
- 移动端继续沿用首页策略，隐藏这些外框 rail，避免窄屏过挤。

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 用 headless Chrome 检查 `/blog/goals-activities-tasks-and-actions` 的桌面端与移动端
- 结果确认：桌面端已恢复外围实线与虚线框线系统，移动端没有因此出现布局错乱

## 下一步
- 如果还要继续精修，可以下一步只调两件事：
- 虚线和实线的强弱关系
- 头部区与 hero 区之间的边框节奏
