# tool-collection 项目约定

本仓库基于 IT Tools，当前站点品牌为 **TAMES - TOOLS**。应用使用 Vue 3、TypeScript 和 Vite，界面使用 Naive UI 和 UnoCSS。协作语言、工作区保护和 Git 授权遵循用户的全局规则。

## 新增或修改工具

以 `src/tools/json-to-csv/` 为例，工具定义、Vue 页面、转换逻辑、单测和端到端测试都放在同一目录。

1. 新增工具可运行 `pnpm run script:create:tool my-tool`，名称使用小写连字符。脚手架会创建目录、测试占位和一条 import。
2. 在工具的 `index.ts` 中用 `defineTool` 声明路径、名称、描述、关键词和图标，通过动态 import 加载页面。将工具加入 `src/tools/index.ts` 中对应分类的 `components` 数组。首页、侧栏和工具路由都从这份清单派生。
3. 在根目录 `locales/` 的对应语言 YAML 中维护文案。标题和描述由工具路径决定，例如 `/json-to-csv` 对应 `tools.json-to-csv.title` 和 `tools.json-to-csv.description`。公共工具布局 `src/layouts/tool.layout.vue` 已渲染标题、描述和收藏按钮。
4. 修改已有工具路径时，在工具定义的 `redirectFrom` 中保留旧地址，并检查翻译键和收藏兼容性。`src/tools/tools.store.ts` 将新收藏按路径保存，同时支持按名称读取历史收藏。

## 界面与共享代码

- 基础控件优先复用 `src/ui/` 的 `c-*` 组件，跨工具的组合组件放在 `src/components/`。复制功能使用 `src/composable/copy.ts` 的 `useCopy`，其中已处理兼容模式和提示。
- 主题色统一维护在 `src/ui/theme/themes.ts`，Naive UI 的覆盖配置在 `src/themes.ts`。编写样式时沿用 UnoCSS 的 `primary`、`primary-fill`、`on-primary`，同时检查明暗主题。
- 自动导入由 `vite.config.ts` 配置。`auto-imports.d.ts`、`components.d.ts` 和 `.eslintrc-auto-import.json` 由插件生成，调整自动导入时修改源配置。
- 修改站点名称时，同步核对 `index.html` 的浏览器标题和分享元数据、`src/layouts/base.layout.vue` 的侧栏标题，以及现有 E2E 用例和 `scripts/create-tool.mjs` 中的标题断言。

## 开发与验证

本地 Node 版本见 `.nvmrc`（18.18.2），pnpm 版本见 `package.json` 的 `packageManager`（9.11.0）。按改动范围选择检查，单工具改动可将下表的示例路径替换为目标文件。

| 用途 | 命令 |
| --- | --- |
| 按锁文件安装依赖 | `pnpm install --frozen-lockfile` |
| 启动开发服务器 | `pnpm dev` |
| 单次运行指定单测（jsdom） | `pnpm run test:unit --run src/tools/json-to-csv/json-to-csv.service.test.ts` |
| 检查改动文件 | `pnpm exec eslint src/tools/json-to-csv/json-to-csv.vue` |
| 全量源码 lint、类型检查 | `pnpm lint`、`pnpm typecheck` |
| 生产构建 | `pnpm build` |
| 在已启动的开发服务（5173）上验证工具页面 | `pnpm run test:e2e:dev src/tools/json-to-csv/json-to-csv.e2e.spec.ts` |

`pnpm test:e2e` 默认在 5050 端口启动预览并读取 `dist/`，先运行 `pnpm build` 以测试当前源码。Playwright 的 `getByTestId` 对应属性 `data-test-id`。

`pnpm release` 会更新变更日志、创建 Git 提交和版本标签。执行前须按全局 Git 规则取得用户明确确认。
