# nue-ui-theme-glass v0.2.0 — Frostline

> **这是重新设计，不是迭代。** 整套视觉语言换掉了：色板、圆角、密度、玻璃参数、字重全部改变。

## 为什么重做

v0.1.0 的 glass 本质是 shadlike 的换皮：34 个组件文件 90% 结构照抄，只改了值；色板用 Apple 系统蓝 `hsl(211 90%)`，玻璃 `saturate(180%)` 把背景色放大成糖水——**客观上读起来是 Apple HIG 的临摹品，不是有自己观点的设计**。

v0.2.0 重新定义为 **Frostline（霜线）**：结霜的光学玻璃 + 阳极氧化金属面板。面向**开发工具 / 技术产品的落地页**——要的是精确可靠，不是潮流。

## 你会看到的变化

| 维度            | v0.1                       | **v0.2 Frostline**                              |
| --------------- | -------------------------- | ----------------------------------------------- |
| 色相 / 主色饱和 | 211 / 90%                  | **192 / 38%**                                   |
| 基底            | 近白 / 近黑                | Ink `#0C1417`（暗）· Hoarfrost `#EDF0F1`（亮）  |
| 圆角            | 10px                       | **6px**                                         |
| 层次手段        | 多层阴影                   | **1px 结构性描边 + 内高光**，阴影仅 `0 1px 2px` |
| 玻璃            | `blur(20/180%)` α0.76·0.80 | **`blur(16/118%)`** α0.82·0.86                  |
| 密度            | padding 1rem · box 2.25rem | **0.875rem** · **2rem**                         |
| 标题字重        | 700–800                    | **500**（CJK 只有 400 的现实约束）              |
| 等宽            | 无                         | 数据/代码/时间戳 + `tabular-nums`               |

**唯一的记忆点是霜边**：外冷线（功能性，≥3:1）+ 内白线（霜的结晶线）。其余一律安静——无渐变装饰、无彩色光晕、无入场动画。

## 破坏性变更

这是**重新设计**：v0.1 的视觉定制（覆盖某个 `--nue-*` 变量）升级后会失效或错位。建议对照上表重算，而不是逐个打补丁。

**`.nue-content` 不再是滚动容器**（v0.1.0 后期已引入，v0.2.0 正式纳入契约）：长内容的滚动职责由使用方承担——让外层页面滚动，或自建滚动区。原因：滚动容器会裁掉超出 padding box 的绘制，内部元素阴影无法完整显示。

## 字体

主题包**不打包 Web Font**，`--nue-primary-font-family` 仍是系统栈（消费方零负担）。

推荐自托管 [IBM Plex Sans](https://github.com/IBM/plex)（可变 400–500）+ IBM Plex Mono（OFL）以获得完整设计意图：

```css
:root {
    --nue-primary-font-family: 'IBM Plex Sans', -apple-system, 'PingFang SC', sans-serif;
}
```

**中文层级不依赖 500**：中文常见字体只有 400 一档，字号 + 颜色 + 间距才是层级主手段；500 只作拉丁增强，缺失时不得降级（配 `font-synthesis-weight: none`）。

## 质量门禁

| 项         | 值                                                  |
| ---------- | --------------------------------------------------- |
| 测试       | **687 例 / 0 红**（36 文件）                        |
| 对比度     | **254 组**（常规 184 + 退化 70；v0.1 是 148+64）    |
| 文本最紧   | **4.738**（余量 0.238，不再贴 4.5 的线）            |
| 非文本最紧 | 3.455（日历 today 描边）                            |
| 结构断言   | A1–A11 + S1–S8，每组带防假绿自证（含变异自证）      |
| 体积       | dist 106,181 B · gzip 13,414 B · 单文件最大 9,971 B |

## 本次修掉的三个真缺陷

这三个都不是设计稿推演出来的，是重写时**算**出来的：

| 缺陷                        | v0.1 实测                                 | 修复后                                                                  |
| --------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `switch` 滑块 vs 轨道       | **1.16:1**（v0.1 遗留，视觉上等于不存在） | 各加 1px 描边 → 5.16 / 8.39                                             |
| `scroll-bar` 拇指（玻璃面） | **2.25:1**                                | 600 → 700 档，四端最坏 4.54                                             |
| 三处同源问题                | —                                         | **同一个 token 在不同容器里对比度不同**（对实底算的，放进玻璃面就失守） |

根因是 v0.1 的对比度矩阵只覆盖了「对 `primary-0` 实底」，没覆盖「放进玻璃面」。v0.2 新增 36 组配对后才第一次被检验。

## 已知边界

1. **暗色深文本档只有两级**（≈secondary / 800+）：玻璃最坏背景压窄可用对比带的必然结果
2. **`dist/global/variables.css` 9,971 B**（上限 12,000）：新设计系统 token 更多，余量不大
3. **非 teleport 渲染的浮层**仍会被自建 `overflow: hidden` 容器裁切——浏览器语义，主题层不修
4. **`content` 不滚动**：滚动职责在消费方（见上）

## 相关文档

- 设计文档：[`docs/prds/2026-10-25-glass-v0.2-frostline.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/prds/2026-10-25-glass-v0.2-frostline.md)
- v0.1 设计与评审：[`docs/prds/2026-10-25-glass-theme.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/prds/2026-10-25-glass-theme.md) · [`docs/reports/2026-10-25-T75-arch.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/reports/2026-10-25-T75-arch.md)
- ADR：[`docs/adr/2026-10-25-glass-theme-tokens-degradation.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/adr/2026-10-25-glass-theme-tokens-degradation.md) · [`docs/adr/2026-10-25-glass-shadow-clip.md`](https://github.com/Nathan3303/nue-ui/blob/master/docs/adr/2026-10-25-glass-shadow-clip.md)