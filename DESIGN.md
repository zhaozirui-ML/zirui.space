# DESIGN

本文档是这个项目的设计 source of truth。

它的作用不是记录所有讨论过程，而是用最少的信息明确 4 件事：

- 这个项目应该延续什么视觉方向
- 后续实现时哪些规则不能被随意打破
- 哪些 token 和页面模式是默认标准
- 需要调整时，应该先改哪一层

## 1. How To Use

后续做任何设计或前端实现时，默认按这个优先级理解：

1. 先看本文件里的硬规则
2. 再看 token 和页面模式
3. 最后再看当前页面的临时实现

如果出现冲突，默认优先级如下：

1. 本文件里的明确规则
2. `portfolio` 主题 token
3. 通用设计系统 token
4. 页面里的临时视觉处理

## 2. Non-negotiables

下面这些规则默认不能随意打破：

- 作品集页面优先使用 `portfolio` 主题，而不是旧的通用 preview 风格
- 基础组件可以继续复用通用设计系统，但作品集页面的视觉语义应优先服从 `portfolio` token
- 标题字体只用于封面标题、章节标题和叙事型标题，不用于按钮、表单、功能型标签
- 大图展示默认优先使用“外层浅底容器 + 轻边框 + 内层圆角内容”的模式
- 图注默认弱于正文，不和正文抢层级
- 页面优先服务“阅读和案例叙事”，不是“组件展台式信息堆叠”

## 3. Design Direction

当前作品集的方向关键词：

- 精致
- 克制
- 内容优先
- 叙事感
- 温暖留白
- 轻 editorial 气质

不要把它做成：

- 过度科技感
- 过度后台感
- 过度插画化
- 过度依赖强品牌色

## 4. System Layers

### 4.1 Base Layer

负责通用基础能力：

- 基础 spacing 命名
- 基础圆角体系
- 基础组件骨架
- 全局 CSS Variables 机制
- 通用按钮、输入、卡片

相关文件：

- `design-system/tokens/colors.js`
- `design-system/tokens/spacing.js`
- `design-system/tokens/typography.js`
- `design-system/tokens/index.js`
- `design-system/styles.css`

### 4.2 Portfolio Theme Layer

负责作品集的专用风格：

- 更暖的页面色彩
- 更有情绪的标题系统
- 更大的 section 节奏
- 图注、强调标签和大图容器规则
- 更接近 editorial 的页面结构

相关文件：

- `design-system/tokens/portfolio.js`
- 页面层样式和 section 组件

## 5. Tokens

### 5.1 Base Tokens

当前通用系统保留这些能力：

#### Colors

- `canvas`: `#fcfcfb`
- `surface`: `#ffffff`
- `surfaceSoft`: `#f9fafa`
- `surfaceMuted`: `#f4f5f6`
- `ink`: `#14181b`
- `text`: `#22262a`
- `textSupport`: `#4c5257`
- `textMuted`: `#6d7378`
- `textSubtle`: `#9fa3a7`
- `border`: `#e3e5e8`

#### Spacing

- `2xs`: `0.25rem`
- `xs`: `0.5rem`
- `sm`: `0.75rem`
- `md`: `1rem`
- `lg`: `1.5rem`
- `xl`: `2rem`
- `2xl`: `3rem`
- `3xl`: `4rem`
- `section`: `6rem`
- `hero`: `7.5rem`

#### Typography

- `display`: Inter / Avenir Next / sans-serif
- `ui`: Avenir Next / Inter / sans-serif
- `body`: Inter / sans-serif

Base layer 的职责是稳定、可复用，不负责作品集的最终气质。

### 5.2 Portfolio Theme Tokens

`portfolio` 主题是当前作品集页面的默认视觉标准。

#### Colors

- `portfolioCanvas`: `#FCFBF8`
- `portfolioSurface`: `#FFFFFF`
- `portfolioSurfaceWarm`: `#F0EDE8`
- `portfolioTextTitle`: `#2D2F30`
- `portfolioTextBody`: `#4A4D4E`
- `portfolioTextMuted`: `#7A7E80`
- `portfolioBorderLight`: `#ECE9E4`
- `portfolioBorderStrong`: `#DCD9D1`
- `portfolioAccentBrand`: `#B36A5E`

#### Typography

- `portfolioFontTitle`: `"FZQingKeBenYueSongS-R-GB", serif`
- `portfolioFontBody`: `"Inter", "Noto Sans SC", "Noto Sans JP", sans-serif`
- `portfolioFontLabel`: `"Inter", "Noto Sans SC", "Noto Sans JP", sans-serif`

推荐字级：

- `portfolioTypeHero`: `48px / 48px / 400`
- `portfolioTypeSectionTitle`: `24px / normal / 400`
- `portfolioTypeBody`: `16px / 24px / 400 / -0.176px`
- `portfolioTypeLabel`: `16px / 24px / 500 / -0.176px`
- `portfolioTypeBodySm`: `14px / 20px / 400 / -0.084px`
- `portfolioTypeCaption`: `12px / 16px / 400`

#### Spacing

- `portfolioSpace2xs`: `6px`
- `portfolioSpaceXs`: `12px`
- `portfolioSpaceSm`: `24px`
- `portfolioSpaceMd`: `48px`
- `portfolioSpaceLg`: `96px`
- `portfolioSectionPaddingY`: `132px`

#### Radius

- `portfolioRadiusSm`: `8px`
- `portfolioRadiusMd`: `16px`
- `portfolioRadiusLg`: `24px`
- `portfolioRadiusHero`: `64px`

#### Shadow

- `portfolioShadowCard`: `0 16px 32px -12px rgba(14, 18, 27, 0.1)`

#### Layout Tokens

这些值属于作品集版式规则，不建议并入全局基础 token：

- `portfolioPageGutter`: `544px`
- `portfolioContentWidth`: `832px`
- `portfolioHeroWidth`: `1440px`

## 6. Portfolio Patterns

后续新增案例页或重做首页时，优先沿用这些模式。

### 6.1 Cover / Hero

适用场景：

- 案例页开头
- 项目标题区
- 大图引导区

规则：

- 优先使用强标题和大图，不堆很多辅助元素
- 标题、简介、主视觉要形成明确节奏
- 主视觉优先大图展示，不切碎成很多同级小卡片

### 6.2 Section Header

适用场景：

- 章节开头
- 大 section 标题和说明

规则：

- 章节标题优先使用作品集标题体系
- 标题下方可以跟一到两段说明文字
- 强调标签优先用品牌强调色的小标签，不额外加重装饰

### 6.3 Media Frame

适用场景：

- 大截图展示
- 方案对比图
- 过程稿展示

规则：

- 外层优先使用暖灰浅底和轻边框
- 内层内容要与外壳形成明显的圆角层级
- 不要让边框、阴影、背景同时都很重

### 6.4 Caption

适用场景：

- 图片说明
- 图注
- 对比说明

规则：

- 图注默认弱于正文
- 图注只负责帮助理解图片
- 图注尽量短，不写成另一段正文

### 6.5 Narrative Section

适用场景：

- 背景说明
- 问题分析
- 设计决策
- 落地结果

规则：

- 一屏优先只讲一个重点
- 文字和图片要互相支撑
- section 之间靠留白和标题节奏区分，不靠过度装饰区分

## 7. Responsive And Accessibility Rules

### 7.1 Responsive

- 页面优先保持单主列阅读逻辑
- 小屏下优先改单列，不强保复杂横向结构
- 大图容器缩放或改单列时，不能裁掉关键信息
- 标题可以缩小，但层级关系不能消失
- section 纵向节奏可以收紧，但不能挤到失去呼吸感

### 7.2 Accessibility

- 图片必须保留有意义的替代文本，纯装饰图可留空
- 正文和图注颜色对比必须保持可读
- 按钮和链接需要明确的可点击反馈
- 不要只靠颜色表达状态差异
- 功能型 UI 先保证可读、可点、可理解，再谈风格统一

## 8. Components And Page Boundaries

### 8.1 通用设计系统负责什么

- `Button`
- `Input`
- `Card`
- 基础 hook
- 通用 token

### 8.2 页面层负责什么

- section 结构
- 作品集案例排版
- 图文关系
- 页面节奏
- 页面专用视觉模块

原则：

- 不要把所有页面问题都丢给基础组件层
- 作品集页面的视觉个性，优先在页面层和主题层解决

## 9. Where To Edit

如果你要继续调整，优先从正确的层开始：

- 想改整体气质：
  - `design-system/tokens/portfolio.js`
  - `design-system/tokens/colors.js`
  - `design-system/tokens/typography.js`
  - `design-system/tokens/spacing.js`
- 想改基础按钮、输入、卡片：
  - `design-system/components/*`
  - `design-system/styles.css`
- 想改作品集页面结构：
  - `src/personal-site/*`
  - 或未来的作品集页面模块
- 想改内容：
  - `src/personal-site/site-data.js`

## 10. Current Implementation Notes

当前项目已经确认了以下方向：

- `portfolio` 主题已建立，不再只是草案
- 通用设计系统仍然保留，作为底层基础层
- 后续作品集页面应逐步接入 `portfolio` token
- 不建议一次性全局替换所有旧组件样式

当前最合理的推进方式：

1. 先让作品集页面层继续吃 `portfolio` token
2. 先沉淀页面模块，再决定是否改基础组件
3. 每次只做小步改动，并及时验证视觉结果
