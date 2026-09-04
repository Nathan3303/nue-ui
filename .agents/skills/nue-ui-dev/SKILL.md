---
name: nue-ui-dev
description: NueUI 组件库（Vue3 + TS，Monorepo）的「开发/更新」指南。当用户要求在本仓库中开发组件库本身——新增或修改组件（packages/components）、主题样式（packages/themes/shadlike 或 nue-ui-theme-shadlike）、单元测试（__tests__）、组件文档（apps/document）、或新增/修改 @nue-ui/utils 与 @nue-ui/hooks——请使用本技能。任务往往很口语化，例如"帮我加个 NueXxx 组件""这个按钮样式不对""给 Select 加个功能""补个测试""写组件文档"。注意：若目标是消费方项目里用现有 NueUI 组件写界面，应使用已发布的使用向技能 nue-ui（npm 包 nue-ui-skill），而非本技能。本技能揭示仓库最反直觉的架构事实：组件 SFC 本身不带任何样式、样式由主题包的 CSS 变量与 BEM 类名提供，以及"新增组件需要完成多处固定接线（聚合导出/全量安装/resolver 映射/主题 CSS）"等规则。
---

# NueUI 组件库开发技能

本技能指导在本仓库（NueUI monorepo）内开发组件库。**不要在仓库之外的消费方项目中使用**；那里应改用 npm 包 `nue-ui` + `nue-ui-theme-shadlike`。

在动手前先读完"心智模型"和"通用工作流"，再按"任务路由表"按需加载 references/ 下的深度文档。参考资料在真正需要时读取，避免一次读入过多。

## 心智模型（先理解，再动手）

**1. 结构与样式彻底分离，这是最容易踩的坑。**
`packages/components/*` 里的 `.vue` 文件**没有 `<style>` 块**。组件只负责：

- 渲染 DOM 结构（含 BEM 类名钩子，如 `nue-button`、`nue-button__icon`、`nue-button--disabled`）；
- 通过 `:style` 绑定把 props 映射为**组件级 CSS 变量**（如 `--nue-button-flex`、`--nue-button-alignment`）；
- 通过 `parseTheme(props.theme, prefix)` 把 `theme` prop 转成 `${prefix}--<名称>` 类名。

真正可被看见的样式（颜色、尺寸、暗色模式）全部来自主题包源码 `packages/themes/shadlike/src/{global,components}/*.css`。所以：

- 想让组件"好看"，改的是主题包 CSS，不是 .vue；
- 改了 .vue 后"没样式变化"是正常的，除非你也动了结构/类名/变量；
- 主题源码改动需要 `pnpm shadlike-theme build` 重建 dist 后，文档站/演练场等引入 dist 的地方才生效。

**2. 新增/修改组件都有固定的“接线”点，漏接是最常见 bug。**
一个组件要被外部可用，需要出现在：

1. 组件目录自己的 `index.ts`（`withInstall` 导出 + 类型再导出）；
2. `packages/components/index.ts`（聚合导出，供 `import { NueXxx } from '...'`）；
3. 若要支持 `app.use(NueUI)` 全量安装：`packages/core/components.ts` 的 import + 数组（另见核心包 `packages/core/index.ts` 的默认导出 installer）；
4. 可见样式：主题包 `src/components/<name>.css` + `src/components/index.css` 里的 `@import`；
5. 若要支持 unplugin-vue-components 自动导入：`packages/plugins/resolver/index.ts` 的 `COMPONENT_ENTRIES` 补 `NueXxx: '<name>'`（并同步 resolver README 的支持清单）。
   发布前还需同步各组件清单文档：根 `README.md`、核心包与主题包的 README（见 add-component 收尾步骤）。

**3. 每个新组件都应该有一个"近亲"作参照。**
本仓库的约定是"就近相似"式的：写之前先找到最接近的现有组件并完整读一遍，而不是凭记忆凭空造。参照物速查：

- 简单展示/操作组件：`button/`、`switch/`、`link/`
- 带分组上下文（父传子 size/disabled 等）：`button-group/` + `button/`、`checkbox-group/` + `checkbox/`
- 需要弹层/浮层：`dialog/`（teleport + NueOverlay + usePopupAnchor）、`tooltip/`（popper）、`dropdown/`
- 函数式调用（`Xxx.success(...)` 式 API）：`message/`、`confirm/`、`prompt/`
- 纯布局工具组件（渲染函数实现）：`div/`、`container/` 系列
- 日期/复杂状态：`calendar/`、`date-picker/`、`select/`

## 通用工作流

对"新增组件"类任务按此顺序（细节各参考对应文件）：

1. **读参照组件** → 决定组件形态（普通 SFC / 分组子组件 / 函数式调用 / 纯布局），复制其文件骨架。
2. **实现结构** → 写 `types.ts`（Props/Emits/Size 等）与 `.vue`（或 `.ts`）；组件内部引用其它组件时从 `../<x>` 目录 import。
3. **接线** → 目录 `index.ts` → `packages/components/index.ts` → （全量安装需要时）`packages/core/components.ts`；需要自动导入时再补 resolver 的 `COMPONENT_ENTRIES`。
4. **样式** → 需要视觉呈现时在主题包写 `<name>.css` 并注册 `@import`，然后 build 主题。
5. **测试** → `__tests__/<name>.test.ts`，跑单文件测试验证。
6. **文档** → `apps/document/tutorial/<类别>/<name>/` 下 index.md + 演示 vue。
7. **校验** → `pnpm exec vp lint`、`pnpm exec vp fmt`、相关测试全绿。
8. **发布配套** → 新组件落地后必须同步各发布包的清单文档与版本号（见下节，NueTable 为参照样例）。

## 新组件落地后的发布配套（必做）

新增组件后、发布相关包之前，必须完成以下同步：

1. **组件清单文档登记**：
    - 根 `README.md` 组件概览 + `packages/core/README.md` 导出组件表；
    - `packages/themes/shadlike/README.md` 的组件样式清单与 dist 产物树（新组件必有主题 css）；
    - 若新增了 resolver 映射：`packages/plugins/resolver/README.md` 支持清单；
    - 使用向技能 `packages/nue-ui-skill` 的 `references/component-map.md` 同步新组件行。
2. **文档站版本徽标**：新组件文档页标题加 `<Badge type="warning" text="X.Y.Z +" />`，X.Y.Z 取本次 `nue-ui` 发布版本（如 Table → 1.12.0 +）。
3. **版本号提升**（包内容有对应变化才升，按 semver）：

    | 包                           | 触发                       | 建议                                              |
    | ---------------------------- | -------------------------- | ------------------------------------------------- |
    | `nue-ui`（packages/core）    | 新增组件                   | minor（1.11.0 → 1.12.0），同步 core README 版本号 |
    | `nue-ui-theme-shadlike`      | 主题 css 新增/修改         | minor 或 patch                                    |
    | `nue-ui-resolver`            | COMPONENT_ENTRIES 新增映射 | minor                                             |
    | `nue-ui-skill`（使用向技能） | component-map 等更新       | minor 或 patch                                    |

4. **校验收尾**：`pnpm document build`（文档与徽标可渲染）、`pnpm build` 无 TS 错误；按 commit.md 提交。

## 任务路由表

打开对应 reference 以获取该任务的完整约定：

| 任务                                 | 读取                                                                  | 参考实现（源码）                                     |
| ------------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------- |
| 新增组件 / 搞清组件代码怎么写        | `references/component-conventions.md` → `references/add-component.md` | `button/`、`switch/`                                 |
| 快速照抄一个组件（含全部文件与接线） | `references/add-component.md`                                         | 同类近亲组件目录                                     |
| 改颜色/尺寸/暗色模式/动画等视觉      | `references/styling-theming.md`                                       | `button.css`、`variables.css`                        |
| 写或改单元测试                       | `references/testing.md`                                               | `button/__tests__/`、`checkbox/__tests__/`           |
| 写组件文档/演示页/侧边栏             | `references/docs.md`                                                  | `apps/document/tutorial/basic/button/`               |
| 找目录/包职责/常用命令               | `references/structure.md`                                             | —                                                    |
| 用 @nue-ui/utils 或 @nue-ui/hooks    | `references/hooks-utils.md`                                           | `packages/utils/*`、`packages/hooks/*`               |
| 排查弹层/浮层/定位等复杂 bug         | `references/component-conventions.md`（弹层章节）                     | `dialog/`、`overlay/`、`tooltip/`、`use-popper(-v2)` |

## 快速纠错表（现象 → 最可能原因）

- **组件渲染出来了但完全没样式** → 主题包缺 `<name>.css`，或漏了 `src/components/index.css` 的 `@import`；本地看效果需先 build 主题。
- **`<nue-xxx>` 在模板中无法解析 / app.use(NueUI) 后仍未注册** → SFC 少了 `defineOptions({ name: 'NueXxx' })`（`withInstall` 依赖组件 name 注册全局），或漏接 `packages/core/components.ts`。
- **改完 .vue 布局无变化** → 先确认是不是只改了视觉（应改主题 CSS）；.vue 结构改动在文档站/演练场经 Vite HMR 即时生效，而**主题 src 改动必须 `pnpm shadlike-theme build` 重建 dist** 才可见（这些应用 import 的是 dist）。
- **测试报找不到模块/规则报错** → 测试里 `describe/it/expect/vi` 必须从 `'vite-plus/test'` 导入（不要直接 import 'vitest'）；组件从 `'../index'` 导入。
- **不知道提交信息怎么写** → 仓库内已有约定，见 `.agents/commands/commit.md`（feat/fix/chore/change 前缀 + 变更点列表）。

## 代码风格约定（必须遵守）

- 格式化：4 空格缩进、单引号、有分号、无尾逗号、printWidth 100（见根 `vite.config.ts` 的 `fmt` 配置）。写完跑 `pnpm exec vp fmt`（或 `pnpm exec vp fmt <path>`）。
- 命名：组件 `NueXxx`；类名前缀 `nue-xxx`；props/emits 类型全部收在 `types.ts`；类型 `NueXxxProps extends GlobalProps`（自带 `theme` prop）。
- 语言：代码注释、测试 describe/it、文档用中文（仓库惯例）；标识符、类名、CSS 变量名用英文。
- 校验命令（lint 由 vite-plus 内置的 oxc/oxlint 提供，仓库不依赖 eslint）：`pnpm exec vp lint`（oxlint + 类型检查）、`pnpm exec vp fmt`、`pnpm test:run`（全量）/ `pnpm exec vp test run packages/components/<name>`（单组件）。
- 提交前查看 `.agents/commands/commit.md` 的提交格式，并检查 staged 变更与最近提交风格。

## References（按需读取）

- `references/structure.md` — Monorepo 布局、各包职责、别名、常用命令
- `references/component-conventions.md` — 组件代码约定大全（文件结构、命名、类型、导出、分组、函数式调用、弹层）
- `references/add-component.md` — 新增组件端到端清单 + 代码骨架
- `references/styling-theming.md` — 主题包结构、CSS 变量体系、BEM 与暗色模式
- `references/hooks-utils.md` — utils / hooks 速查
- `references/testing.md` — 测试约定与断言模式
- `references/docs.md` — 文档站页面、demo、侧边栏约定