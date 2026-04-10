# Dark Mode Palette

本文档记录当前作品集 dark mode 色板的评审结论。

目标不是一次性定义所有页面实现细节，而是先把暗色 token 的语义层级定清楚，避免后续接入时一边改代码一边重新争论色值。

## 1. 结论

当前 dark palette 的大方向成立，不需要推翻重做。

保留方向：

- 暖黑底，而不是纯黑底
- 低饱和表面层，而不是科技感很强的冷灰蓝
- 亮文字克制，不走高对比刺眼路线
- 强调色偏灰化、偏柔和，不做霓虹点缀

需要提前微调的点有两类：

- 弱文字语义不够细
- 边框层级过轻，可能在真实页面里变得不够稳定

## 2. 调整策略

本次选择采用 `方案 A`：

- 保留当前 `#8A8580`
- 但不再让它承担常规 `text-muted`
- 将它下放为更弱一级的 `text-subtle`
- 新增一个更实用的 `text-muted`

同时，边框只做一档轻微抬高，不破坏整体克制感。

## 3. 推荐 Token 对照

### 3.1 背景与表面层

这些值当前可以保留：

- `bg-primary`: `#1C1B1A`
- `bg-soft`: `#242321`
- `bg-pure`: `#121110`
- `surface-100`: `#2A2927`
- `surface-200`: `#353330`

### 3.2 文本层级

建议保留：

- `text-title`: `#F9F8F6`
- `text-body`: `#DCD9D1`
- `text-inverted`: `#2D2F30`

建议调整为：

- `text-muted`: `#9A948E`
- `text-subtle`: `#8A8580`

说明：

- `text-muted` 用于辅助说明、日期、caption、meta、非核心正文
- `text-subtle` 只用于更弱一级的信息，例如极轻提示、装饰性说明、非关键信息标签
- 不要再把 `text-subtle` 当作常规辅助正文色使用

### 3.3 边框层级

建议调整为：

- `border-light`: `#45423E`
- `border-strong`: `#5D5853`

说明：

- 这只是小幅抬高一档，不是要做出很强的线框感
- 目标是让卡片、分组、轻容器在暗色下更容易成立
- 页面仍然优先靠背景层差、留白和排版建立层级，不靠重边框

### 3.4 强调色

这些值当前可以保留：

- `accent-brand`: `#C57A6C`
- `accent-moss`: `#7E8F7A`
- `accent-blue`: `#8DA1B3`
- `accent-ochre`: `#D9B475`

## 4. 使用边界

### 4.1 中性色负责什么

中性色是整个 dark mode 的视觉骨架。

主要负责：

- 页面背景
- 卡片层级
- 文本可读性
- 分组关系
- 整体品牌气质

不要让强调色替代这些职责。

### 4.2 强调色负责什么

强调色只负责小范围语义和记忆点。

适合：

- section eyebrow
- 小标签
- 链接强调
- icon 点缀
- 轻状态提示
- 插图和图形局部点缀

不适合：

- 大面积 section 主背景
- 大段正文主色
- 把整页主视觉做成高饱和色块

### 4.3 关于 Filled Controls

当前 accent 色默认更适合：

- 文本强调
- 描边
- 轻背景提示

如果后续需要做实心按钮、实心 tag、实心 pill，不要默认直接使用现有 accent token。

原因：

- `accent-brand` 和 `accent-moss` 在暗色界面里更适合做点缀，不一定天然适合直接承担 filled control 的大面积底色
- 如果后续需要 filled control，建议单独评估是否补充更适合承载文字的 fill token

## 5. 当前建议稿

本轮评审后的推荐 dark palette 如下：

- `accent-brand`: `#C57A6C`
- `accent-moss`: `#7E8F7A`
- `accent-blue`: `#8DA1B3`
- `accent-ochre`: `#D9B475`
- `bg-primary`: `#1C1B1A`
- `bg-soft`: `#242321`
- `bg-pure`: `#121110`
- `surface-100`: `#2A2927`
- `surface-200`: `#353330`
- `text-title`: `#F9F8F6`
- `text-body`: `#DCD9D1`
- `text-muted`: `#9A948E`
- `text-subtle`: `#8A8580`
- `text-inverted`: `#2D2F30`
- `border-light`: `#45423E`
- `border-strong`: `#5D5853`

## 6. 下一步

真正开始接 dark mode 时，建议按下面顺序推进：

1. 先把 `portfolio` 主题扩展成 light / dark 两套 token
2. 先接入全局主题变量，不急着逐页硬改
3. 再检查首页、Work、案例详情是否存在写死颜色
4. 最后再看是否需要为 filled controls 单独补 accent fill token
