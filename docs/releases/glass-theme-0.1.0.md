# nue-ui-theme-glass v0.1.0

> NueUI 的第二个主题包：**Apple HIG 玻璃拟态**。面向 C 端官网 / 落地页，34 个组件全量覆盖、亮/暗双套、浮层玻璃化 + 数据区实底。

## 安装

```bash
pnpm add nue-ui-theme-glass
```

```ts
// 二选一：与 shadlike 不可同时引用
import 'nue-ui-theme-glass/dist/index.css';
```

## 你会看到什么

- **浮层玻璃化**：`dialog` `drawer` `dropdown` `tooltip` `message` `confirm` `prompt` 七类浮层使用 `backdrop-filter: blur(20px) saturate(180%)` 半透明底 + 高光描边 + 多层柔和阴影；`overlay` 只做半透明遮罩（全视口模糊是最贵的单帧开销，不做）
- **数据区实底**：`table` `calendar` `date-picker` `input` `textarea` 等 25 个组件保持不透明实底，长时间阅读不累眼
- **系统蓝主色**：`#007AFF` 系（`--nue-brand-hue: 211`）
- **一套开关切双模式**：`--nue-dark-switch: 0 | 1`，与 shadlike 同机制，不引入 `prefers-color-scheme`

## 三条退化路径（同一组覆写）

玻璃会在下列任一条件下自动退化为不透明实底，功能与可读性不受损：

1. 浏览器不支持 `backdrop-filter`（`@supports not`）
2. 系统开启「减弱透明度」（`prefers-reduced-transparency`，Chromium）
3. 系统开启「增强对比度」（`prefers-contrast: more`，Safari/Firefox 的等价意图）

## 边界（请按此预期使用，不是缺陷）

- **暗色下深文本档由三级压到两级**：玻璃最坏背景（叠加纯白）会把可用对比带压窄，这是玻璃拟态的固有成本；`700/800/900` 三档在暗色收敛为「次级 / 主文本」两级
- **`--nue-glass-*` 只有 6 个基元**：`bg` `blur` `border` `solid` `scrim` `shadow`。模糊**只能**由 `--nue-glass-blur` 驱动，不要在组件里自造模糊变量（会绕过 24px 上限）
- **与 shadlike 互斥**：两个主题都作用在 `:root` 与 `.nue-*`，同时引入会互相覆盖

## 可访问性

- 文本对比度 ≥ 4.5:1、非文本（功能性边框）≥ 3:1，亮/暗双套，按玻璃最坏背景实算
- 门禁由 `packages/themes/glass/__tests__/` 机械保证：148 组常规配对 + 64 组退化态重算 + 11 条结构断言（A1–A11），共 260 个用例；全仓 618 个用例

## 包内容

仅 `dist/`（41 个 CSS）+ README + LICENSE，无源码与测试。压缩后约 19 kB，gzip 后 CSS 约 13 kB。

## 相关文档

- 规格：[`docs/prds/2026-10-25-glass-theme.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/prds/2026-10-25-glass-theme.md)
- 技术方案：[`docs/reports/2026-10-25-T75-arch.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/reports/2026-10-25-T75-arch.md)
- 决策 ADR：[`docs/adr/2026-10-25-glass-theme-tokens-degradation.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/adr/2026-10-25-glass-theme-tokens-degradation.md)