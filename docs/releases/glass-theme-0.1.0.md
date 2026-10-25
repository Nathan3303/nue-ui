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

## 本版本包含的修复（相对初次合并）

- **浮层内阴影不再被裁剪**：
    - 根因一：`backdrop-filter` 会把元素渲染成离屏纹理，**纹理边界 = border-box**，子元素 `box-shadow` 越界部分被丢弃。已收敛阴影（输入框 focus 光晕 24→12px、浮层投影 64→32px）并把面板内边距提到 1.25rem。
    - 根因二：`.nue-container` 的 `> .nue-footer` 等包装层带 `overflow: hidden`，且 dialog footer 的 `padding: 0` —— **只加面板内边距修不了 footer 里的按钮阴影**。已将 `header / main / footer` 放行为 `visible`（容器本体与 `--nested` 仍保留 `hidden` 兜底）。
- **`content` 区域不再裁剪内部阴影**：`.nue-content` 从 `overflow: auto` 改为 `visible`。

## ⚠️ 行为变更（升级必读）

**`.nue-content` 不再是滚动容器。**

|        | 旧行为             | 新行为                                                          |
| ------ | ------------------ | --------------------------------------------------------------- |
| 长内容 | `content` 内部滚动 | `content` 允许溢出，**滚动职责由使用方承担**                    |
| 原因   | —                  | 滚动容器会裁掉超出 padding box 的绘制，内部元素阴影无法完整显示 |

迁移方式二选一：

1. **页面级滚动**：让外壳高度自适应（`height: auto`），由 `html`/`body` 承担滚动
2. **自建滚动区**：在 `content` 外层包一个 `overflow: auto` 的容器

若你用 `.nue-container` 做锁高度的全屏布局，升级后长内容可能看不见——请按上面任一种方式补滚动层。

另：**非 teleport 渲染的浮层**（自定义 `to` 指向带 `overflow: hidden` 的容器）仍可能被该容器裁剪，这是浏览器语义，主题层不修。

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

## 质量门禁

`packages/themes/glass/__tests__/` 共 **287 个用例**（全仓 645），包含：

- 对比度 **148 组**（含 10 组「组件自有不透明底」）+ 退化态重算 **64 组**
- 结构断言 A1–A11（7 条 `backdrop-filter` / 424 个定义名 / 0 悬空 / 3 块退化 × 3 条）
- 阴影裁剪断言 S1–S8（面板内边距 ≥ 子元素最大阴影外溢 + 4px、`content` 必须显式 `visible` 等）
- 每组断言带**防假绿自证**（含变异自证：把正确值改坏，断言必须变红）

## 相关文档

- 规格：[`docs/prds/2026-10-25-glass-theme.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/prds/2026-10-25-glass-theme.md)
- 技术方案：[`docs/reports/2026-10-25-T75-arch.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/reports/2026-10-25-T75-arch.md)
- 决策 ADR：[`docs/adr/2026-10-25-glass-theme-tokens-degradation.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/adr/2026-10-25-glass-theme-tokens-degradation.md)