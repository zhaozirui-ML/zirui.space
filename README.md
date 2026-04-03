# Zirui.me

一个基于 Next.js 构建的个人作品集网站项目，包含：

- 个人作品集主页
- 本地设计系统与组件预览页

## 技术栈

- Next.js
- React
- pnpm

## 本地启动

```bash
pnpm install
pnpm dev
```

启动后可访问：

- 首页：`http://localhost:3000`
- 设计系统预览：`http://localhost:3000/design-system`

如果 `3000` 端口被占用，Next.js 会自动切换到其他可用端口。

## 常用命令

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## 项目结构

```text
app/            Next.js 路由入口
design-system/  本地设计系统组件与 tokens
src/            页面内容与预览模块
public/         静态资源
```

## 说明

当前项目默认使用 `pnpm` 作为包管理工具。
