# Glass 主题（Frostline）

`nue-ui-theme-glass` 是 NueUI 的第二个主题包，视觉语言代号 **Frostline（霜线）**：结霜的光学玻璃 + 阳极氧化金属面板。

它面向**开发工具 / 技术产品的落地页**——要的是精确可靠，不是潮流。与 [`nue-ui-theme-shadlike`](./shadlike.md) 是**并列可选**关系，不是替代。

> 当前版本：`nue-ui-theme-glass@0.2.2`
> 本页右上角的主题开关可以实时切换两个主题，直接对比。

## 设计语言

整套设计只有两个记忆点：**冷青调** 与 **霜边**，其余一律安静。

| 维度     | 值                                                 |
| -------- | -------------------------------------------------- |
| 色相     | `192`（冷灰青）                                    |
| 主色饱和 | `38%`                                              |
| 圆角     | `0.375rem`（6px，与 shadlike 相同）                |
| 层次手段 | 1px 结构性描边 + 内高光；阴影仅 `0 1px 2px`        |
| 玻璃     | `blur(16px) saturate(118%)`，底色 α0.82 / 0.86     |
| 密度     | 紧凑（`padding-df 0.875rem` · `box-size-df 2rem`） |
| 字重     | 最高 500，层级靠字号 + 颜色                        |

**霜边**是没有直接用组件库、而是直接看 CSS 就能认出的东西：

```css
border: 1px solid var(--nue-glass-border); /* 外冷线：功能性，对比度 ≥3:1 */
box-shadow:
    inset 0 1px 0 hsl(0 0% 100% / 0.55),
    /* 内白线：霜的结晶线 */ 0 1px 2px hsl(192 40% 10% / 0.06); /* 仅用于脱离背景 */
```

分层不靠阴影堆叠，而靠**描边与底色差**——这是它和 shadlike 最本质的区别：shadlike 用柔和投影表达"浮起"，Frostline 用刻线表达"精密"。

逐 token 的数值差异见 [设计系统](./design-tokens.md#两个主题的数值差异)，选择依据见 [Shadlike 主题](./shadlike.md#适合什么场景)。

## 玻璃分层

不是所有组件都用玻璃。**浮层玻璃化，数据区实底**——这是刻意的分层，不是遗漏。

| 层                 | 组件                                                                                       | 表现                                     |
| ------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| 玻璃底（9）        | `overlay` `dialog` `drawer` `dropdown` `tooltip` `message` `confirm` `prompt` `popup-pool` | 半透明底 + 霜边                          |
| 其中施加模糊（7）  | `dialog` `drawer` `dropdown` `tooltip` `message-node-inner` `confirm` `prompt`             | `backdrop-filter: var(--nue-glass-blur)` |
| 不模糊             | `overlay`（仅全屏遮罩）· `popup-pool`（0×0 挂载容器）                                      | 全视口模糊是单帧最贵开销                 |
| 实底（其余 25 个） | `table` `calendar` `date-picker` `input` `textarea` …                                      | 不透明，长阅读不累眼                     |

`select` / `date-picker` 的下拉浮层复用 `.nue-dropdown`，因此自动玻璃化。

**玻璃效果全部由 6 个变量驱动**，组件里不硬编码模糊值：

| 变量                 | 作用                                                        |
| -------------------- | ----------------------------------------------------------- |
| `--nue-glass-bg`     | 半透明玻璃底                                                |
| `--nue-glass-blur`   | **唯一**模糊来源（硬上限 `blur ≤ 24px`、`saturate ≤ 140%`） |
| `--nue-glass-border` | 结构性描边（功能性，参与 3:1 判定）                         |
| `--nue-glass-solid`  | 退化 / 嵌套实底的唯一落点                                   |
| `--nue-glass-scrim`  | 仅 `overlay` 全屏遮罩                                       |
| `--nue-glass-shadow` | 内高光 + 极淡投影                                           |

## 三条退化路径

玻璃在下列任一条件下会自动退为不透明实底，可读性不受损：

1. `@supports not (backdrop-filter: blur(1px))` —— 浏览器不支持模糊
2. `@media (prefers-reduced-transparency: reduce)` —— **仅 Chromium 识别**
3. `@media (prefers-contrast: more)` —— Safari / Firefox 的等价用户意图

三条路径共用同一组覆写（`blur → none`、`bg → glass-solid`、`border → border-color`），改观感只需改 token，不必逐组件处理。

## 字体建议

主题包**不打包 Web Font**，`--nue-primary-font-family` 仍是系统栈，消费方零字体负担。

但如果想完整呈现设计意图，推荐自托管 [IBM Plex Sans](https://github.com/IBM/plex)（可变 400–500）+ IBM Plex Mono（OFL）：

```css
:root {
    --nue-primary-font-family: 'IBM Plex Sans', -apple-system, 'PingFang SC', sans-serif;
}
```

**中文层级不要依赖字重**：中文常见字体只有 400 一档，`500` 会触发浏览器合成粗体（笔画糊）。层级应该由字号、颜色、间距承担；字重只作拉丁增强，并配合 `font-synthesis-weight: none` 止损。

数据、代码、时间戳使用 `--nue-font-mono` 与 `font-variant-numeric: tabular-nums`，正文不变量宽字体。

## 已知边界

| 边界                      | 说明                                                                                                                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 阴影与 `backdrop-filter`  | 滤镜会把元素渲染成离屏纹理，纹理边界 = border-box，**子元素阴影越界部分被丢弃**。Glass 通过「面板 padding 20px + 阴影收敛到 16px」保证常规状态完整；贴近滚动边缘时仍会被裁一半，属浏览器语义        |
| `.nue-content` 是滚动容器 | 0.2.2 起 `content` 内部滚动、header 与 aside 固定。若你的外壳按其他方式布局，可能出现双层滚动条，见 [发布说明](https://github.com/Nathan3303/nue-ui/blob/master/docs/releases/glass-theme-0.2.2.md) |
| flex 滚动前提             | 自定义布局时，flex 子项默认 `min-height: auto` 不收缩，**只写 `overflow: auto` 不会滚动**，必须同时给 `min-height: 0`                                                                               |
| 暗色深文本只有两级        | 玻璃最坏背景（叠加纯白）压窄了可用对比带，暗色下深文本档收敛为「次级 / 主文本」两档。这是色板的固有代价，不是缺陷——提亮应走字号与霜边，而不是放开饱和度                                             |
| 与 shadlike 互斥          | 两主题变量名一致、作用域相同，**同时引入会互相覆盖**                                                                                                                                                |

## 相关页面

- 安装与引入 → [安装与引入](./install.md)
- 深色模式 → [深色模式](./dark-mode.md)
- 换主色 / 改玻璃参数 → [定制主题](./customize.md)
- 完整 token 数值差异 → [设计系统](./design-tokens.md#两个主题的数值差异)
- 另一个主题 → [Shadlike 主题](./shadlike.md)