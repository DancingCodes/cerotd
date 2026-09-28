# AGENTS.md

本文件给在本仓库工作的 AI 编程助手使用。
内容会逐步补充。优先写短而具体的规则，避免长篇空话。

## 项目

- 名称：`cerotd`
- 类型：双语企业官网 + 轻量后台 CMS
- 公司：Cerotd（山东润滑技术）
- 技术栈：Nuxt 4、Vue 3、TypeScript、Sass、Cloudflare Workers / D1 / R2
- 语言：`en`（默认）、`zh`
- 当前部署域名：`moonc.love`
- 原网站地址：https://www.cerotd.com/

## 常用命令

- `npm start` — 本地开发
- `npm run build` — 构建 Cloudflare 产物
- `npm run deploy` — 使用 Wrangler 部署
- `npm run preview` — Wrangler 预览
- `npm run typecheck` — Nuxt 类型检查
- `npm run db:migrate` — 应用远程 D1 迁移

## 目录说明

- `pages/` — 前台页面与 `/admin/**` 后台页
- `components/` — 通用组件；后台编辑器在 `components/admin/`
- `composables/` — `useAdminAuth`、`useLocalized`、`usePageSeo`
- `server/api/` — Nitro API 路由
- `server/utils/` — DB / R2 / admin / site 工具
- `database/migrations/` — D1 数据库结构
- `i18n/locales/` — `en.json`、`zh.json`
- `layouts/` — `default`、`admin`
- `middleware/admin.ts` — 后台客户端鉴权

## 协作规则

- 改动尽量小，风格与现有代码保持一致。
- 新增用户可见文案时，同时更新 `i18n/locales/en.json` 和 `i18n/locales/zh.json`。
- 优先沿用附近文件已有写法，不要随意引入新抽象。
- 未经明确要求，不要提交代码、创建分支或部署。
- 未经明确要求，不要修改 `.dev.vars`、密钥或 Cloudflare binding ID。

## 产品说明

- 前台页面：首页、产品、新闻、关于我们、服务、优势、联系
- 后台：通过 `ADMIN_API_TOKEN` 登录；管理分类、产品、新闻、询盘、上传
- 内容字段通常是双语结构（`*_en` / `*_zh`）
- 媒体上传到 R2，并通过 `/cdn/...` 访问

## 可以做 / 不要做

### 可以做

- <!-- 在这里补充偏好做法 -->

### 不要做

- <!-- 在这里补充硬约束 -->

## 待确认事项

- <!-- AI 不应自行猜测、需要先问清楚的事项 -->
