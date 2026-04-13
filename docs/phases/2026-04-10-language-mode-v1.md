# Language Mode V1

## 目标
- 为站点建立可扩展的中英文切换骨架。
- 第一阶段先覆盖 Header、Home、Work、Blog、About 这类公共页面。
- 当切到英文时，未完成翻译的详情页不再混入中文正文，而是统一进入英文占位页。

## 改动
- 新增轻量语言层：服务端通过 cookie 读取首屏语言，客户端通过 toggle 写回 cookie 并刷新当前页面。
- `app/layout.jsx` 现在会根据当前语言切换 `<html lang>` 和根 metadata。
- Header 新增 `中 / EN` 切换入口，Footer、导航、首页模块、Work/Blog/About 列表页已接入双语文案。
- Work 和 Blog 的卡片数据改为双语字段；英文模式下的详情页会根据 `translationStatus` 显示英文占位页。
- Blog 日期格式升级为按语言输出：中文保持 `YYYY.MM` 风格，英文改为英文日期格式。

## 验证结果
- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 英文模式下，Work / Blog 详情页会进入英文占位页，不再展示中文正文。

## 下一步
- 继续把 Blog 正文与案例长页正文从组件内抽到结构化数据层。
- 为各个详情页补齐英文正文、图片说明和辅助文案。
- 等详情页翻译覆盖率足够高后，再评估是否需要升级到带路由或 SEO 策略的完整 i18n 方案。
