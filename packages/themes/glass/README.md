# NueUI Theme Glass

NueUI Theme Glass 是 NueUI 组件库的 Apple HIG 玻璃拟态主题包，面向 C 端官网 / 落地页：
**浮层玻璃底 + 数据区实底分层**，亮/暗双套，并自带三条退化路径。

## 包信息

- **名称**: `nue-ui-theme-glass`
- **版本**: `0.1.0`
- **描述**: An Apple HIG glassmorphism theme for NueUI
- **作者**: Nathan Lee
- **许可证**: MIT
- **类型**: Module
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
  必然踩 WCAG AA，故两模式取同一组固定值；语义**文字**走 `l20` 单步（亮 20% / 暗 80%）。

## 分层

| 层                | 组件                                                                                       | 表现                                            |
| ----------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| 玻璃底（9）       | `overlay` `dialog` `drawer` `dropdown` `tooltip` `message` `confirm` `prompt` `popup-pool` | 半透明底 + 装饰高光描边                         |
| 其中施加模糊（7） | `dialog` `drawer` `dropdown` `tooltip` `message-node-inner` `confirm` `prompt`             | `backdrop-filter: var(--nue-glass-blur)`        |
| 不模糊            | `overlay`（仅 `--nue-glass-scrim` 全屏遮罩）· `popup-pool`（0×0 挂载容器）                 | 全视口模糊是单帧最贵开销，且 overlay 是面板父层 |
| 实底（其余组件）  | 表格、日历、输入框等数据/表单区                                                            | 不透明，长阅读不累眼                            |

`select` / `date-picker` 的下拉浮层复用 `.nue-dropdown`，因此自动玻璃化，自身 0 条模糊。

## 玻璃参数与性能边界

| 项                       | 值                                |
| ------------------------ | --------------------------------- |
| 模糊半径                 | `blur(20px)`（硬上限 24px）       |
| 饱和度                   | `saturate(180%)`（硬上限 200%）   |
| 同叠加链模糊层           | ≤ 1（面板内的二次浮层降级为实底） |
| 同屏同时可见模糊层       | ≤ 2                               |
| 全视口面积模糊           | 0                                 |
| 模糊动画 / `will-change` | 0 处                              |

## 玻璃 token（6 个）

| 变量                 | 作用                                            |
| -------------------- | ----------------------------------------------- |
| `--nue-glass-bg`     | 半透明玻璃底（亮 α0.76 / 暗 α0.80）             |
| `--nue-glass-blur`   | **唯一**模糊来源（`blur(20px) saturate(180%)`） |
| `--nue-glass-border` | 装饰性高光描边（WCAG 1.4.11 豁免，不参与 3:1）  |
| `--nue-glass-solid`  | 退化 / 嵌套实底的唯一落点                       |
| `--nue-glass-scrim`  | 仅 `overlay` 全屏遮罩                           |
| `--nue-glass-shadow` | 浮层多层柔和投影                                |

组件不得硬编码模糊值或透明度；改观感只改这 6 个变量。

## 退化（三条路径，同一组覆写）

`blur → none`、`bg → var(--nue-glass-solid)`、`border → var(--nue-border-color)`：

1. `@supports not (backdrop-filter: blur(1px))` —— 浏览器不支持模糊
2. `@media (prefers-reduced-transparency: reduce)` —— **仅 Chromium 识别**
3. `@media (prefers-contrast: more)` —— Safari / Firefox 的等价用户意图

退化后浮层为不透明实底，文本对比度仍 ≥4.5:1、功能性边框 ≥3:1。

## 构建

```bash
pnpm --filter nue-ui-theme-glass build
```

产物落 `dist/`（`dist/index.css` + `dist/global/*` + `dist/components/*`），结构与 shadlike 一致。

## 状态

本包仍在开发中：当前批次已落地 **global tokens + 9 个浮层组件**，其余实底组件随后补。