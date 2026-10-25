# ADR：玻璃面阴影裁剪——裁剪源分离、padding 预算与阴影收敛

| 项       | 内容                                                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 日期     | 2026-10-25                                                                                                                                          |
| 状态     | 提议（待 PM 批准后转已接受）                                                                                                                        |
| 关联     | Issue #77 · 报告 `docs/reports/2026-10-25-T77-shadow-clip.md` · 依赖 ADR `2026-10-25-glass-theme-tokens-degradation.md`（D2/D9/D10）                |
| 决策者   | arch-designer（技术裁定）· PM（trade-off）                                                                                                          |
| 影响范围 | `packages/themes/glass/src/global/variables.css`、`components/{dialog,confirm,prompt,drawer,container}.css`；**不涉及组件 SFC/TS，不涉及 shadlike** |

## 背景

玻璃面板在 `backdrop-filter` 下被渲染为离屏纹理，纹理边界 = **border-box**，子元素 `box-shadow` 越界即被丢弃（实测：面板 padding 1rem，`--nue-primary-shadow` 外溢 32px）。此外 `.nue-container`（= dialog/drawer/confirm/prompt 的面板本体）及其 `> .nue-header/.nue-main/.nue-footer` 还带 `overflow: hidden`，在包装层就裁掉子元素阴影 —— 两个裁剪源相互独立。

## 决策

1. **裁剪源分离**：C1（纹理边界）用「padding 预算 + 阴影收敛」解决；C2（容器 `overflow`）用「放掉 3 个 flex 包装层」解决。二者不可互相替代——footer 的 `padding: 0` 决定了只加面板 padding 修不了 footer 内的按钮阴影。
2. **阴影收敛取 B1，且只动 `--nue-primary-shadow`**：`0 8px 24px` → `0 4px 12px`（外溢 32 → 16px）。事实依据：该 token 在 glass 中**仅**被 input/textarea 的 focus 阴影使用（2 处），不影响 table/button（它们用 `--nue-secondary-shadow`）。
    - **B2（玻璃面内覆盖）被门禁否决**：D9/D10 只允许组件文件定义 `defined(shadlike:同文件) ∪ 6 个 --nue-glass-*`，而 `--nue-primary-shadow` 未在 shadlike 的对应组件文件中定义。
3. **padding 按「是否有会画阴影的直接子元素」分类**：Class-1（dialog/confirm/prompt/drawer）= **1.25rem（20px）** = maxChildExtent 16 + 4px 余量；Class-2（dropdown/tooltip/message）**不改**（无阴影子元素，强加 padding 会毁紧凑度）。
4. **`.nue-container` 本体保留 `overflow: hidden`**（最后兜底；对 C1 无收益，去掉会把异常内容放到页面）；`--nested`（360px 定高）必须保留。
5. **`> .nue-header / > .nue-main / > .nue-footer` 改 `overflow: visible`**；`.nue-aside` 的 `hidden` 是死声明（被后续 `overflow: auto` 覆盖），不动。
6. **`overflow: clip` + `overflow-clip-margin` 不引入**：Safari 完全不支持 `overflow-clip-margin`（BCD `safari: false`），且它只解决 C2、对 C1 的纹理边界无效，用在滚动容器上还会禁用滚动。
7. **`--nue-glass-shadow` 收敛**：4 层 → 3 层、最大 64 → 32px（外溢 88 → 44px）；paint 成本与体积双降（−96 B）。
8. **验收改为 8 条机械断言（S1–S8）**：`maxChildExtent`、Class-1 `min(padding) ≥ maxChildExtent+4`、Class-2 后代 0 条 `box-shadow`、3 条包装层 `visible`、容器/`--nested` 保留 `hidden`、仅 content/aside 可 `auto`、glass-shadow ≤48px、禁用 `overflow: clip`。

## 对照过的备选模式（含不采纳理由）

| 备选                                            | 不采纳理由                                                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 只加面板 padding（不动容器 overflow）           | footer `padding: 0`，按钮阴影在 `.nue-footer` 的 `overflow: hidden` 边界就被裁，面板 padding 用不上 ⇒ 修不掉                                      |
| 全面去掉 `.nue-container` 的 `overflow: hidden` | 对 C1 零收益；对 C2 不必（padding 已给预算）；代价是异常内容溢出到页面，且 shadlike 同构扩散面过大                                                |
| B2 玻璃面内覆盖阴影 token                       | 与本仓 D9/D10 变量门禁冲突（该名字不在 shadlike 对应组件文件中，也不能新增第 7 个 `--nue-glass-*`）                                               |
| 把 focus 阴影改成 `0 0 0 3px` 焦点环            | 外溢仅 3px 更省，但 `--nue-primary-shadow-color` alpha 0.5 ⇒ 环对比度约 2.5:1，弱于 WCAG 2.2 SC 2.4.11 的 3:1 期望；保留「边框转 600 + 柔和阴影」 |
| `overflow: clip` + `overflow-clip-margin: 16px` | Safari 不支持 `overflow-clip-margin`；解决不了 backdrop 纹理裁剪；用在滚动容器会禁用滚动                                                          |
| 给 tooltip/message 也加 padding                 | 二者无阴影子元素；`min-height: 2.25rem` 的紧凑浮层加 20px padding 直接毁形态                                                                      |

## 后果

- **正面**：两个裁剪源分别有机械判据；`variables.css` 净减约 100 B（解 365 B 上限压力）；对比度门禁与 A1–A11 零影响；改动只在 glass 主题内。
- **代价**：dialog/confirm/prompt 内边距 +4px；drawer 首次出现 20px 内边距（sheet 内容内缩）；input/textarea focus 光晕 24→12px；浮层投影最远 64→32px —— 需 PM 视觉走查确认（M6）。
- **残余**：消费方非 teleport 渲染浮层时仍可能被自身 `overflow:hidden` 裁（README 说明）；`.nue-aside` 的死声明 `overflow: hidden` 登记为清理项；未来若在 Class-2 面内嵌卡片/按钮，S3 会红，届时按 Class-1 提升 padding 而非加豁免。
- **复审触发**：新增会画阴影的组件；允许 dropdown/message 内嵌任意组件；目标浏览器开始支持 `overflow-clip-margin`（届时可重新评估用 clip-margin 替代 padding 预算）。

## 参考来源（访问日期 2026-10-25）

- MDN BCD · `overflow-clip-margin`（Safari false；Chrome 90 partial；Firefox 102）— https://github.com/mdn/browser-compat-data/blob/main/css/properties/overflow-clip-margin.json
- MDN BCD · `overflow`（`clip`：Chrome 90 / Firefox 81 / Safari 16）— https://github.com/mdn/browser-compat-data/blob/main/css/properties/overflow.json
- MDN · `box-shadow` — https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
- MDN · `backdrop-filter`（backdrop root / 离屏纹理）— https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- CSS Overflow 3 · `overflow-clip-margin` — https://drafts.csswg.org/css-overflow/#overflow-clip-margin