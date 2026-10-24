# AGENTS.md

本文件给在本仓库工作的 AI 编程助手使用。
优先写短而具体的规则，避免长篇空话。

## 项目

- 名称：`cerotd`
- 类型：谷歌独立站（海外 B2B 获客）+ 轻量后台 CMS
- 公司：Cerotd（山东润滑技术）
- 目标：面向海外分销商 / 工业采购方，靠 Google 自然搜索拿询盘
- 技术栈：Nuxt 4、Vue 3、TypeScript、Tailwind CSS 4、Nuxt UI、Cloudflare Workers / D1 / R2
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
- `components/` — 通用前台与可复用交互组件（如 `Header`、`Footer`、`BackToTop`、`ImageLightbox`）；后台直接使用 Nuxt UI 组件
- `assets/css/main.css` — Tailwind CSS 与 Nuxt UI 的全局样式入口
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
- 样式使用 Tailwind utility 与 Nuxt UI；不要新增 Sass / SCSS 或重建已删除的手写后台基础组件。
- `/admin/**` 只面向桌面端；不编写或保留移动端响应式布局、断点降级样式。
- 能使用 Nuxt UI 现有组件能力时优先使用；不要手写同类基础弹层、表单错误展示或控件。
- 后台表单必填校验使用 `UForm` / `UFormField` 的字段级提示；接口错误由现有 toast 展示，不保留重复的 `formError` 文本区。
- 后台列表与详情的空字段默认留白；不要使用 `-`、`No message` 等占位文案，除非业务明确要求。
- 相同前台交互优先抽成组件；仅使用一次且逻辑简单的映射直接写在模板中，不额外封装函数。
- 对照旧版视觉时，明确还原其字号、颜色、边框、圆角、尺寸和断点；优先使用 Tailwind 的规范等价类。
- 未经明确要求，不要提交代码、创建分支或部署。
- 未经明确要求，不要修改 `.dev.vars`、密钥或 Cloudflare binding ID。

## 产品说明

- 前台：首页、产品、新闻、关于我们、服务、优势、联系
- 核心转化路径：产品详情 / 联系页 → 询盘表单 → `inquiries`
- 后台：ADMIN_API_TOKEN 登录；管理产品、新闻、询盘、上传
- 产品分类和新闻分类均由后台管理。
- 内容字段通常是双语结构（`*_en` / `*_zh`）
- 媒体上传到 R2，并通过 `/cdn/...` 访问
- D1 通过 Cloudflare `DB` binding 访问；媒体通过 R2 `MEDIA` binding，经 `/cdn/*` 提供
- 本地开发的 D1 / R2 binding 使用本地资源（`wrangler.toml` 的 `remote = false`）；本地数据与线上环境独立。
- SEO 基建：`usePageSeo`、`/sitemap.xml`、`/robots.txt`（后台已 disallow）

## SEO / 独立站规则

- 默认面向 Google：title、description、H1、正文先把英文写清楚。
- 新页面或详情页要接 `usePageSeo`（title / description / canonical / og）。
- 可收录内容同步进 `sitemap.xml`；`/admin/**` 保持 noindex / disallow。
- slug、URL、canonical 稳定，不要随意改已上线路径。
- 文案偏 B2B：工厂直供、规格、OEM、批量采购、稳定交付；少空泛品牌口号。
- 图片优先有意义的 alt；大图注意体积（webp/压缩）。
- 新增或替换图片资源时，建议优先转换为 WebP（可使用本机 `ffmpeg`），并检查压缩后的体积与画质。
