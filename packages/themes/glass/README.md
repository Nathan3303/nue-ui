# NueUI Theme Glass · Frostline

NueUI 组件库的玻璃拟态主题包，视觉语言为 **Frostline（霜线）**：结霜的光学玻璃 + 阳极氧化金属面板。
面向**开发工具 / 技术产品的落地页**——要的是精确可靠，不是潮流。

34 个组件全量覆盖，亮/暗双套，浮层玻璃 + 数据区实底分层，自带三条退化路径。

## 包信息

- **名称**: `nue-ui-theme-glass`
- **版本**: `0.2.0`
- **描述**: An Apple HIG glassmorphism theme for NueUI
- **作者**: Nathan Lee
- **许可证**: MIT
- **仓库**: [GitHub](https://github.com/Nathan3303/nue-ui.git)

> ⚠️ **与 `nue-ui-theme-shadlike` 二选一**：两个主题使用同一套 `:root` / `.nue-*` 选择器作用域，
> **不可同时引用**（同时引用会互相覆盖）。换肤 = 替换那一行 `import`，重启 dev server。

## 安装 / 引用

```bash
pnpm add nue-ui-theme-glass
```

```ts
// 只引一个主题：与 shadlike 二选一
import 'nue-ui-theme-glass/dist/index.css';
```

本仓内开发时也可直连源码：`import '@nue-ui/themes/glass/src/index.css'`。

## 设计系统

| 维度          | 值                                                             |
| ------------- | -------------------------------------------------------------- |
| 色相          | **192**（冷灰青）                                              |
| 主色饱和      | **38%**（低饱和是「去果冻感」的关键）                          |
| 品牌色        | Verdigris `#3E7C8A`（青瓷铜绿，像仪表盘指示灯）                |
| 基底          | Ink `#0C1417`（暗）/ Hoarfrost `#EDF0F1`（亮）                 |
| 圆角          | `0.375rem`（6px）                                              |
| 层次手段      | **1px 结构性描边 + 内高光**；阴影仅 `0 1px 2px`                |
| 内边距 / 间距 | `0.875rem` / `0.75rem`（密度高于常规组件库）                   |
| 错误色        | Ember `#A8453C`——唯一用于**强调/装饰**的暖色（状态色不受此限） |

### 层次语言：霜边

```css
border: 1px solid var(--nue-glass-border); /* 外冷线：功能性，对比度 ≥3:1 */
box-shadow:
    inset 0 1px 0 hsl(0 0% 100% / 0.55),
    /* 内白线：霜的结晶线 */ 0 1px 2px hsl(192 40% 10% / 0.06); /* 仅用于脱离背景，不营造戏剧 */
```

整套设计只有两个记忆点：**冷青调 + 霜边**。其余一律安静——无渐变装饰、无彩色光晕、无入场动画。

## 字体

**主题包不打包 Web Font**：`--nue-primary-font-family` 是系统栈（`-apple-system` / `PingFang SC` 等），
消费方零字体负担。

**推荐自托管 [IBM Plex Sans](https://github.com/IBM/plex)（可变 400–500）+ IBM Plex Mono**（OFL）以获得完整设计意图：

```css
:root {
    --nue-primary-font-family: 'IBM Plex Sans', -apple-system, 'PingFang SC', sans-serif;
}
```

为什么不推荐 Poppins 一类几何圆体：只切 400 字重却在 UI 声明 500 会触发**合成粗体**（笔画糊），
且几何圆体 + 大 x-height 与 PingFang 并排是「两种字体硬拼」。

**CJK 现实约束**：中文常见字体只有 400 一档。因此**层级不依赖 500**——字号 + 颜色 + 间距才是主手段，
500 只作拉丁增强，缺失时不得降级。需要用 `font-synthesis-weight: none` 防止合成。

数据、代码、标识符、时间戳统一走 `--nue-font-mono` + `font-variant-numeric: tabular-nums`；
正文不变量宽字体。

## 双模式切换

沿用和 shadlike 相同的单开关机制，默认亮色：

```css
:root {
    --nue-dark-switch: 1; /* 0 = 亮色（默认），1 = 暗色 */
}
```

整套色阶随开关翻转，不需要媒体查询，也不使用 `color-scheme` / `light-dark()`。

**翻转 vs 固定（重要）**：

- **翻转**：`--nue-primary-*` 阶梯、`--nue-hsl-l*` / `--nue-hsl-s*` 原语、玻璃基元（bg / border / scrim / shadow）。
- **固定不翻转**：语义实心填充（success / warning / error 按钮底色）。翻转后暗色白字只有 2.2–3.5:1，
  必然踩 WCAG AA，故两模式取同一组固定值；语义**文字**三色统一走同一档（避免三色错位）。

## 分层

| 层                | 组件                                                                                       | 表现                                     |
| ----------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| 玻璃底（9）       | `overlay` `dialog` `drawer` `dropdown` `tooltip` `message` `confirm` `prompt` `popup-pool` | 半透明底 + 装饰高光描边                  |
| 其中施加模糊（7） | `dialog` `drawer` `dropdown` `tooltip` `message-node-inner` `confirm` `prompt`             | `backdrop-filter: var(--nue-glass-blur)` |
| 不模糊            | `overlay`（仅 `--nue-glass-scrim` 全屏遮罩）· `popup-pool`（0×0 挂载容器）                 | 全视口模糊是单帧最贵开销，且是面板父层   |
| 实底（其余组件）  | 表格、日历、输入框等数据/表单区                                                            | 不透明，长阅读不累眼                     |

`select` / `date-picker` 的下拉浮层复用 `.nue-dropdown`，因此自动玻璃化，自身 0 条模糊。

## 玻璃参数与性能边界

| 项                       | 值                                |
| ------------------------ | --------------------------------- |
| 模糊半径                 | `blur(16px)`（硬上限 24px）       |
| 饱和度                   | `saturate(118%)`（硬上限 140%）   |
| 同叠加链模糊层           | ≤ 1（面板内的二次浮层降级为实底） |
| 同屏同时可见模糊层       | ≤ 2                               |
| 全视口面积模糊           | 0                                 |
| 模糊动画 / `will-change` | 0 处                              |

## 玻璃 token（6 个）

| 变量                 | 作用                                            |
| -------------------- | ----------------------------------------------- |
| `--nue-glass-bg`     | 半透明玻璃底（亮 α0.82 / 暗 α0.86）             |
| `--nue-glass-blur`   | **唯一**模糊来源（`blur(16px) saturate(118%)`） |
| `--nue-glass-border` | 结构性描边（功能性，参与 3:1 判定）             |
| `--nue-glass-solid`  | 退化 / 嵌套实底的唯一落点                       |
| `--nue-glass-scrim`  | 仅 `overlay` 全屏遮罩                           |
| `--nue-glass-shadow` | 内高光 + 极淡投影（暗色内高光 α 降至 0.28）     |

组件不得硬编码模糊值或透明度；改观感只改这 6 个变量。

## 退化（三条路径，同一组覆写）

`blur → none`、`bg → var(--nue-glass-solid)`、`border → var(--nue-border-color)`：

1. `@supports not (backdrop-filter: blur(1px))` —— 浏览器不支持模糊
2. `@media (prefers-reduced-transparency: reduce)` —— **仅 Chromium 识别**
3. `@media (prefers-contrast: more)` —— Safari / Firefox 的等价用户意图

退化后浮层为不透明实底，文本对比度仍 ≥4.5:1、功能性边框 ≥3:1。

## 使用注意：全屏布局的滚动职责

`.nue-content` **默认不参与裁剪**（`overflow: visible`），以保证子元素阴影不被 `backdrop-filter`
纹理边界或容器 `overflow` 裁掉。因此：

- `content` **不是滚动容器**；长内容不会在内部出现滚动条；
- 用 `.nue-container` 搭「锁全屏高度」的布局时，**滚动由使用方承担**：要么让外层页面滚动
  （把 `html/body/#app` 与容器 `height` 放开为 `auto`，如本仓 `apps/playground` 的做法），
  要么在自己的页面层另建滚动区；
- 若把浮层渲染进自建 `overflow: hidden` 容器（非 teleport），阴影仍会被该容器裁掉——属消费方用法问题。

参考实现：`apps/playground/src/playground.css` + `App.vue`（页面级滚动）。

## 从 v0.1.0 升级：**这是重新设计，不是迭代**

v0.1.0 本质是 shadlike 的换皮（色板用 Apple 系统蓝 `hsl(211 90%)`、玻璃 `saturate(180%)`）。
v0.2.0 换掉整套视觉语言：

| 维度            | v0.1                       | v0.2 Frostline                          |
| --------------- | -------------------------- | --------------------------------------- |
| 色相 / 主色饱和 | 211 / 90%                  | **192 / 38%**                           |
| 圆角            | 10px                       | **6px**                                 |
| 层次手段        | 多层阴影                   | **描边 + 内高光**（阴影仅 `0 1px 2px`） |
| 玻璃            | `blur(20/180%)` α0.76·0.80 | **`blur(16/118%)`** α0.82·0.86          |
| 密度            | padding 1rem               | **0.875rem**                            |
| 标题字重        | 700–800                    | **500**（CJK 约束）                     |

**破坏性**：如果你在 v0.1 上覆盖过某些 `--nue-*` 变量做定制，升级后会失效或错位。
建议对照上表重算，而不是逐个打补丁。

## 构建

```bash
pnpm --filter nue-ui-theme-glass build
```

产物落 `dist/`（`dist/index.css` + `dist/global/*` + `dist/components/*`），结构与 shadlike 一致。

## 状态

已发布 `0.1.0`（Apple HIG 临摹版）与 `0.2.0`（Frostline 重设计）。
质量门禁：687 例测试、254 组对比度配对、11 条结构断言（A1–A11）+ 8 条阴影裁剪断言（S1–S8），
每组均带「防假绿自证」。