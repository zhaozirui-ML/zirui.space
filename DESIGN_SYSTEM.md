# DESIGN SYSTEM

本文档只记录这个项目的 design system 本体。

它不负责讲作品集页面叙事策略。  
如果要看页面规则，请看 [GUIDELINES.md](/Users/zhaozirui/Desktop/AI%20Coding/Portfolio2026/GUIDELINES.md)。

如果要看更上层的受众、品牌气质、参考方向与长期设计原则，请先看 [docs/design-context.md](/Users/zhaozirui/Desktop/AI%20Coding/Portfolio2026/docs/design-context.md)。

本文档只负责 system layer：token、组件、主题分层和职责边界。

## 1. System Layers

### 1.1 Base Layer

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

### 1.2 Portfolio Theme Layer

负责作品集的专用风格：

- 更暖的页面色彩
- 更有情绪的标题系统
- 更大的 section 节奏
- 图注、强调标签和大图容器规则
- 作品集专用 layout token

相关文件：

- `design-system/tokens/portfolio.js`

## 2. Base Tokens

当前 base layer 更接近下面这组关键词：

- 轻盈
- 克制
- 中性 UI
- 小清新
- 轻卡片感

它更像一个通用前端底座，而不是完整的作品集页面语言。

### 2.1 Colors

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

### 2.2 Spacing

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

### 2.3 Typography

- `display`: `Inter / Avenir Next / sans-serif`
- `ui`: `Avenir Next / Inter / sans-serif`
- `body`: `Inter / sans-serif`

### 2.4 Shared Visual Tokens

- radius
  - `--ds-radius-sm: 0.75rem`
  - `--ds-radius-md: 1rem`
  - `--ds-radius-lg: 1.5rem`
  - `--ds-radius-xl: 1.75rem`
  - `--ds-radius-pill: 999px`
- shadow
  - `--ds-shadow-soft: 0 18px 40px rgba(20, 24, 27, 0.06)`
  - `--ds-shadow-edge: inset 0 0 0 1px rgba(227, 229, 232, 1)`

补充理解：

- base layer 几乎没有强品牌主色
- 强调色更像气氛辅助，不是大面积视觉主角
- 如果以后要做更强烈、更时尚的变化，优先从 `portfolio` 主题层调整，不要先破坏 base layer

## 3. Portfolio Theme Tokens

`portfolio` 主题是当前作品集页面的专用视觉层。

### 3.1 Colors

- `portfolioCanvas`: `#FCFBF8`
- `portfolioSurface`: `#FFFFFF`
- `portfolioSurfaceWarm`: `#F0EDE8`
- `portfolioTextTitle`: `#2D2F30`
- `portfolioTextBody`: `#4A4D4E`
- `portfolioTextMuted`: `#7A7E80`
- `portfolioBorderLight`: `#ECE9E4`
- `portfolioBorderStrong`: `#DCD9D1`
- `portfolioAccentBrand`: `#B36A5E`

### 3.2 Typography

- `portfolioFontTitle`: `"FZQingKeBenYueSongS-R-GB", serif`
- `portfolioFontBody`: `"Inter", "Noto Sans SC", "Noto Sans JP", sans-serif`
- `portfolioFontLabel`: `"Satoshi", "Inter", "Noto Sans SC", "Noto Sans JP", sans-serif`

推荐字级：

- `portfolioTypeHero`: `48px / 48px / 400`
- `portfolioTypeSectionTitle`: `24px / normal / 400`
- `portfolioTypeBody`: `16px / 24px / 400 / -0.176px`
- `portfolioTypeLabel`: `16px / 24px / 500 / -0.176px`
- `portfolioTypeBodySm`: `14px / 20px / 400 / -0.084px`
- `portfolioTypeCaption`: `12px / 16px / 400`

页面使用规则：

- 模块首页（如 Home、Work、About、Blog 的首页）正文默认使用 `Satoshi`
- 项目详情页正文默认使用 `Inter`
- 导航、目录、按钮、标签、图注、辅助信息等功能性与信息性文字默认使用 `Satoshi`
- 展示性标题继续按页面既有展示字体规则，不跟随正文一起切换

### 3.3 Spacing

- `portfolioSpace2xs`: `6px`
- `portfolioSpaceXs`: `12px`
- `portfolioSpaceSm`: `24px`
- `portfolioSpaceMd`: `48px`
- `portfolioSpaceLg`: `96px`
- `portfolioSectionPaddingY`: `132px`

### 3.4 Radius

- `portfolioRadiusSm`: `8px`
- `portfolioRadiusMd`: `16px`
- `portfolioRadiusLg`: `24px`
- `portfolioRadiusHero`: `64px`

### 3.5 Shadow

- `portfolioShadowCard`: `0 16px 32px -12px rgba(14, 18, 27, 0.1)`

### 3.6 Layout Tokens

这些值属于作品集版式规则，不建议并入 base layer：

- `portfolioPageGutter`: `544px`
- `portfolioContentWidth`: `832px`
- `portfolioHeroWidth`: `1440px`

## 4. System Intent

### 4.1 Base Layer 主要解决什么

- 统一颜色、字体、间距这些基础视觉规则
- 提供可复用的基础组件，比如 `Button`、`Input`、`Card`
- 用统一的 CSS Variables 让页面样式和组件样式共用一套 token
- 让页面能通过组合区块继续演进，而不是每次推倒重做

### 4.2 Portfolio Theme Layer 主要解决什么

- 提供更暖的页面气质
- 承接作品集专用标题系统
- 定义更适合案例页的 section 节奏
- 统一图注、强调标签、大图容器这些作品集语义

## 5. Components And Ownership

### 5.1 Base Design System 负责什么

- `Button`
- `Input`
- `Card`
- 基础 hook
- 通用 token

### 5.2 Page Layer 负责什么

- section 结构
- 作品集案例排版
- 图文关系
- 页面节奏
- 页面专用视觉模块

原则：

- 不要把所有页面问题都丢给基础组件层
- 作品集页面的视觉个性，优先在主题层和页面层解决

## 6. Base Components

### 6.1 Button

文件：`design-system/components/Button.jsx`

Button 是当前使用频率最高的基础组件之一，负责统一按钮视觉规则。

支持的主要属性：

- `as`
- `children`
- `className`
- `fullWidth`
- `href`
- `leadingIcon`
- `trailingIcon`
- `size`
- `variant`

支持的主要变体：

- `primary`
- `secondary`
- `soft`
- `ghost`
- `chip`
- `link`
- `icon`
- `iconFilled`

补充理解：

- 默认是圆角 pill
- `chip` 更像胶囊标签
- `link` 更适合卡片里的文字型 CTA

### 6.2 Input

文件：`design-system/components/Input.jsx`

这个 Input 更像带操作区的大输入容器，不是传统单行表单输入。

适合：

- 创作输入
- AI prompt 输入
- 留言输入

不适合：

- 标准后台表单字段批量复用

如果以后需要更标准的表单体系，建议单独补：

- `TextField`
- `Textarea`
- `Select`
- `Checkbox / Radio`

### 6.3 Card

文件：`design-system/components/Card.jsx`

Card 的意义不是只有一种卡片，而是用一套共同语言支持不同卡片形态。

当前支持：

- `feature`
- `featureReverse`
- `article`

补充理解：

- `feature` 是横向双栏
- `featureReverse` 适合交错布局
- `article` 更适合作品、文章、博客列表
- 当前个人网站里的作品集虽然没有直接调用 `Card.jsx`，但视觉语言仍在继承它的方向

### 6.4 useMediaQuery

文件：`design-system/hooks/useMediaQuery.js`

这个 hook 的作用：

- 订阅屏幕尺寸变化
- 在 React 环境里安全处理 SSR 和客户端差异

当前实现亮点：

- 用的是 `useSyncExternalStore`
- 比传统 `useEffect + useState` 更稳，尤其适合 Next.js

## 7. Promotion Rules

下面这些内容可以进入 design system：

- 重复出现的颜色语义
- 重复出现的 typography 规则
- 可复用的 spacing / radius / shadow
- 被多个模块共享的组件约束

下面这些内容不应过早进入 design system：

- 单个案例页的固定截图尺寸
- 一次性绝对定位值
- 某个页面专属的大背景图处理
- 只在一个模块里出现的特殊装饰
