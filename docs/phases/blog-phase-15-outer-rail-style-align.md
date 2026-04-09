# Blog Phase 15: Outer Rail Style Align

## 目标
- 对齐 Blog 首页和详情页两最外侧 gutter 的线条样式。
- 参考既有 Figma 稿中的外框关系，恢复“外侧实线 + 内侧轻虚线”的节奏。

## 改动
- 首页：
  - 保留最外侧 frame 边框
  - 去掉 rail 元素双边都画线的做法
  - 改成只在 gutter 内侧保留一根轻虚线
- 详情页：
  - 保留最外侧 frame 边框
  - 去掉 detail rail 原来的双边线
  - 改成与首页一致的内侧轻虚线逻辑

## 验证结果
- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 截图检查了：
- `/blog`
- `/blog/smartx-design-workflow`
- 结果确认：首页与详情页两侧 gutter 的线条关系已经统一，视觉上更接近原 Figma 稿

## 下一步
- 如果还要继续精修，可以下一步只调：
- 虚线的透明度
- gutter 宽度与内侧虚线的距离
