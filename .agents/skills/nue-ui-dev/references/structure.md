# 仓库结构与常用命令

NueUI 是一个 Vue 3 + TypeScript 的组件库 monorepo（pnpm workspace）。本文帮你快速定位"东西在哪、命令怎么跑"。

## 目录布局

```
packages/
├── components/          # 所有组件源码（不含样式）
│   ├── index.ts         # 聚合导出：export * from './<每个组件>'
│   └── <name>/          # 一个组件一个目录（见 component-conventions.md）
│       ├── <name>.vue
│       ├── types.ts
│       ├── index.ts
│       └── __tests__/<name>.test.ts
├── core/                # 发布为 npm 包 nue-ui；打包入口
│   ├── components.ts    # 全量安装组件清单（新增公有组件要在这里注册）
│   ├── index.ts         # makeInstaller + export * from components/utils；默认导出 installer
│   └── vite.*.config.ts # ES/UMD 构建
├── utils/               # @nue-ui/utils：install/parsers/component(parseTheme)/utils/date-utils/types
├── hooks/               # @nue-ui/hooks：use-popper(-v2)/use-popup-anchor/use-bool-state 等
├── plugins/             # @nue-ui/plugins：resolver（自动导入）等
└── themes/              # 主题源码
    ├── iconfont/        # nue-ui-iconfont：图标字体（.iconfont + .icon-<name>）
    └── shadlike/        # nue-ui-theme-shadlike：默认主题样式
        └── src/{index.css, global/, components/}
apps/
├── document/            # VitePress 文档站（组件文档 + demo）
└── playground/          # 组件演练场
```

约定：包间互相引用用别名 `@nue-ui/components` / `@nue-ui/utils` / `@nue-ui/hooks`（vitest.config.ts 与 tsconfig 已配置）；`packages/utils`、`packages/hooks` 的别名允许子路径（如 `@nue-ui/hooks/use-popup-anchor`），组件之间互相引用则用相对路径 `../xxx`。

## 常用命令（根目录执行）

| 命令                                               | 作用                                                                                         |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `pnpm test` / `pnpm test:run`                      | 运行全部单元测试（watch / 单次）。底层是 `vp test`                                           |
| `pnpm test:coverage`                               | 单次测试 + 覆盖率报告                                                                        |
| `pnpm exec vp test run packages/components/<name>` | 只跑某个组件的测试（开发时最快）                                                             |
| `pnpm exec vp lint`                                | 代码检查：vite-plus 内置基于 oxc（oxlint）的 lint + 类型检查（配置在根 vite.config.ts）      |
| `pnpm exec vp fmt`                                 | 按仓库格式（4 空格/单引号/分号/无尾逗号）格式化代码，可用 `pnpm exec vp fmt <path>` 限定范围 |
| `pnpm exec vp check`                               | fmt + lint + 类型检查一站式                                                                  |
| `pnpm core build`                                  | 构建发布包 nue-ui（ES + UMD + d.ts）                                                         |
| `pnpm shadlike-theme build`                        | 构建主题 nue-ui-theme-shadlike（postcss 处理 src 全部 css 到 dist）                          |
| `pnpm iconfont build`                              | 构建图标字体                                                                                 |
| `pnpm document dev`                                | 启动文档站 dev server                                                                        |
| `pnpm playground dev`                              | 启动演练场 dev server                                                                        |

## 测试与代码质量基础设施

- 测试运行器是 vite-plus（`vp`），测试仍基于 Vitest，但 **测试文件里必须从 `'vite-plus/test'` 导入** `describe/it/expect/vi/...`（有 lint 规则强制）。参见 `references/testing.md`。
- `vitest.config.ts`：jsdom 环境、`test-setup.ts`（stub 了 ResizeObserver/IntersectionObserver/matchMedia 等）、测试匹配 `packages/**/*.{test,spec}.*`。
- `vite.config.ts`：vite-plus 的总配置（含 lint/fmt 选项）。格式化风格、lint 规则若与手写不符，以它为准，用 `vp fmt` 自动修正。
- 代码走 lint/type 双重检查：`lint.options.typeCheck = true`；tsconfig.base.json 开了 `strict` 及 `noUnusedLocals` 等严格项，别留未使用变量/参数。

## 代码怎么被消费（理解接线全貌）

1. 组件目录 `index.ts` 用 `withInstall`（来自 `@nue-ui/utils`）包装 SFC → 成为可 `app.use()` 的插件。
2. `packages/components/index.ts` 具名导出所有组件 → 支持 `import { NueButton } from '@nue-ui/components'`。
3. `packages/core/index.ts` `export * from '@nue-ui/components'` 并默认导出 `makeInstaller(components.ts 清单)` → 支持 `app.use(NueUI)` 全量安装。
4. 样式不随 JS 分发：由 `nue-ui-theme-shadlike/dist/...`（`index.css` / `global/index.css` + `components/<name>.css`）提供，文档站与消费方各自引入。

看到"改一个组件"时，脑中先过一遍这条链：结构在 `packages/components/<name>/`，视觉在 `packages/themes/shadlike/src/components/<name>.css`，文档在 `apps/document/tutorial/...`。