# AGENTS.md

本文件给在本仓库工作的 AI 编程助手使用。
优先写短而具体的规则，避免长篇空话。

## 项目

- 名称：`cerotd`
- 类型：谷歌独立站（海外 B2B 获客）+ 轻量后台 CMS
- 公司：Cerotd（山东润滑技术）
- 目标：面向海外分销商 / 工业采购方，靠 Google 自然搜索拿询盘
- 技术栈：Nuxt 4、Vue 3、TypeScript、Sass、Cloudflare Workers / D1 / R2
- 语言：`en`（默认，SEO 主语言）、`zh`（辅助）
- 当前部署域名：`moonc.love`
- 原网站地址：https://www.cerotd.com/

## 常用命令

- `npm start` — 本地开发
- `npm run build` — 构建 Cloudflare 产物
- `npm run deploy` — 使用 Wrangler 部署
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
- `sucai/` — 本地素材（已 gitignore，不要提交）

## 协作规则

- 改动尽量小，风格与现有代码保持一致。
- 新增用户可见文案时，同时更新 `i18n/locales/en.json` 和 `i18n/locales/zh.json`。
- 英文文案优先服务 Google 搜索与询盘转化，中文保持同步即可。
- 优先沿用附近文件已有写法，不要随意引入新抽象。
- 未经明确要求，不要提交代码、创建分支或部署。
- 未经明确要求，不要修改 `.dev.vars`、密钥或 Cloudflare binding ID。

## 产品说明

- 前台：首页、产品、新闻、关于我们、服务、优势、联系
- 核心转化路径：产品详情 / 联系页 → 询盘表单 → `inquiries`
- 后台：ADMIN_API_TOKEN 登录；管理产品、新闻、询盘、上传
- 产品分类已写死在 shared/product-categories.ts，前后端共用；后台不可新增/删除
- 内容字段通常是双语结构（`*_en` / `*_zh`）
- 媒体上传到 R2，并通过 `/cdn/...` 访问
- 本地 npm start 下：D1 走 Cloudflare HTTP API 连远程库；`/cdn/*` 回源线上站点读媒体（R2 remote binding 不稳定）
- SEO 基建：`usePageSeo`、`/sitemap.xml`、`/robots.txt`（后台已 disallow）

## SEO / 独立站规则

- 默认面向 Google：title、description、H1、正文先把英文写清楚。
- 新页面或详情页要接 `usePageSeo`（title / description / canonical / og）。
- 可收录内容同步进 `sitemap.xml`；`/admin/**` 保持 noindex / disallow。
- slug、URL、canonical 稳定，不要随意改已上线路径。
- 文案偏 B2B：工厂直供、规格、OEM、批量采购、稳定交付；少空泛品牌口号。
- 图片优先有意义的 alt；大图注意体积（webp/压缩）。

## 可以做 / 不要做

### 可以做

- 优化英文 SEO 文案、页面结构和询盘转化路径
- 沿用现有 API / D1 / R2 / i18n 模式扩展内容能力
- 小范围复用附近页面的样式与组件写法
- 为 CMS 内容补齐双语字段与发布状态

### 不要做

- 不要做成国内营销站风格（过度动画、空泛口号、弱转化）
- 不要引入未要求的重型依赖、UI 框架或新状态管理
- 不要破坏现有双语字段约定和 slug 唯一性
- 不要把密钥、`.dev.vars`、binding ID 写进代码或文档示例
- 不要提交 `sucai/`、构建产物或本地环境文件

## 待确认事项

- 正式生产域名是否继续用 `moonc.love`，还是切回 / 指向 `cerotd.com`
- 目标市场与主关键词优先级（如 industrial lubricant、grease manufacturer、OEM）
- 询盘后是否需要邮件 / 第三方通知，还是仅后台查看
- 产品规格、认证、出货能力等对外口径，以客户确认稿为准

