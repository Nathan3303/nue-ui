# 设计系统（Design Tokens）

所有 token 定义在主题包源码的 `src/global/variables.css`（发布物为 `dist/global/index.css`）。本文档是该文件的人肉镜像，改动 token 时必须同步。

> **本文数值以 shadlike 为基准。** 两个主题的 **变量名完全一致**（组件只认名字，所以可互换），但**值不同**——尤其主色相、密度与层次语言。切换主题时不需要改任何引用代码，但要按下方差异表重新审视你的定制覆盖。

## 体系原理

- 颜色全部由 **HSL 分量变量**派生：`--nue-hsl-h / s / l`，语义色再组合成 `hsl(...)` 值；
- 明度/饱和度刻度跟随 `--nue-dark-switch` 翻转，因此**引用 token 的样式天然适配深色模式**；
- 约定：写样式一律引用 token / 用 `hsl(from ...)` 派生，禁止写死色值。

## 两个主题的数值差异

变量名一致、值不同。下表是**实读两份 `variables.css`** 的结果：

| Token                       | shadlike                | Glass（Frostline）                     |
| --------------------------- | ----------------------- | -------------------------------------- |
| `--nue-brand-hue`           | `0`（红）               | **`192`**（冷灰青）                    |
| `--nue-padding-df`          | `1rem`                  | **`0.875rem`**                         |
| `--nue-gap-df`              | `1rem`                  | **`0.75rem`**                          |
| `--nue-box-size-df`         | `2.25rem`               | **`2rem`**                             |
| `--nue-primary-shadow`      | `1px 1px 2px`           | **`0 1px 2px`**                        |
| `--nue-secondary-shadow`    | `1px 1px 2px`           | **`0 1px 2px`**                        |
| `--nue-dark-prefix`         | `cos(pi * switch) * -1` | **`calc(switch * 2 - 1)`**             |
| `--nue-primary-radius`      | `0.375rem`              | `0.375rem`（**相同**）                 |
| `--nue-radius-sm / df / lg` | `0.25 / 0.375 / 0.5rem` | 同左                                   |
| `--nue-font-mono`           | 无                      | **新增**（等宽栈，用于数据/代码/数字） |
| `--nue-glass-*`             | 无                      | **6 个**（见下）                       |

`--nue-dark-prefix` 的算法差异值得单独说：shadlike 用 `cos(pi * switch) * -1`，Glass 用 `calc(switch * 2 - 1)`。两者在 `switch ∈ {0,1}` 上都得到 `-1 / +1`，但后者不依赖三角函数，在旧引擎上更稳。

### Glass 独有的玻璃 token（6 个）

| 变量                 | 亮色                         | 暗色                      | 作用                           |
| -------------------- | ---------------------------- | ------------------------- | ------------------------------ |
| `--nue-glass-bg`     | `hsl(192 22% 98% / 0.82)`    | `hsl(192 18% 10% / 0.86)` | 玻璃底                         |
| `--nue-glass-blur`   | `blur(16px) saturate(118%)`  | 同                        | **唯一**模糊来源               |
| `--nue-glass-border` | `hsl(192 25% 45% / 0.28)`    | `hsl(192 20% 78% / 0.22)` | 结构性霜边（功能性，参与 3:1） |
| `--nue-glass-solid`  | `var(--nue-primary-color-0)` | 同                        | 退化 / 嵌套实底唯一落点        |
| `--nue-glass-scrim`  | `hsl(192 30% 12% / 0.32)`    | `hsl(192 30% 8% / 0.55)`  | 仅 `overlay` 遮罩              |
| `--nue-glass-shadow` | 内高光 + 极淡投影            | 内高光 α 降低             | 浮层投影                       |

细节见 [Glass 主题](./glass.md)。

## 颜色

### 语义色阶

每种语义色提供一档色阶（数值越大越深），由对应 `--nue-*-hue` 决定色相：

| 变量前缀               | 色阶                          | 默认色相                       |
| ---------------------- | ----------------------------- | ------------------------------ |
| `--nue-primary-color-` | `0, 100, 200 … 1000`（11 档） | `--nue-brand-hue: 0`（红）     |
| `--nue-success-color-` | `0, 10, 20 … 100`（11 档）    | `--nue-success-hue: 120`（绿） |
| `--nue-warning-color-` | `0, 10, 20 … 100`（11 档）    | `--nue-warning-hue: 30`（橙）  |
| `--nue-error-color-`   | `0, 10, 20 … 100`（11 档）    | `--nue-error-hue: 10`（红）    |

示例：

```css
--nue-primary-color-500: hsl(
    var(--nue-brand-hue),
    var(--nue-hsl-s0),
    var(--nue-hsl-l50)
); /* 中间色 */
--nue-error-color-100: hsl(var(--nue-error-hue), var(--nue-hsl-s80), var(--nue-hsl-l25)); /* 最深 */
```

### 语义文本与线条

| 变量                         | 说明                              |
| ---------------------------- | --------------------------------- |
| `--nue-primary-text-color`   | 主文本色                          |
| `--nue-secondary-text-color` | 次要文本色                        |
| `--nue-link-color`           | 链接色                            |
| `--nue-border-color`         | 边框色（= `--nue-divider-color`） |
| `--nue-divider-color`        | 分割线色                          |
| `--nue-disabled-color`       | 禁用态颜色                        |

## 字体

| 变量                           | 说明                                               |
| ------------------------------ | -------------------------------------------------- |
| `--nue-primary-font-size-base` | 基准字号（16px）                                   |
| `--nue-primary-font-size`      | 根字号（1rem）                                     |
| `--nue-primary-font-family`    | 字体栈（含 PingFang SC / Noto Sans SC 等中文字体） |

字号刻度：`--nue-text-2xs / xs / sm / df / md / lg / xl / 2xl / 3xl`，其中 `--nue-text-df` 即 1rem 基准，其余为其倍数。

## 间距与尺寸

| 类别     | 变量                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------- |
| 内边距   | `--nue-padding-2xs / xs / sm / df / md / lg` + 别名 `--nue-primary-padding`、`--nue-secondary-padding`    |
| 间距     | `--nue-gap-2xs / xs / sm / df / md / lg` + 别名 `--nue-primary-gap`、`--nue-secondary-gap`                |
| 圆角     | `--nue-radius-sm / df / lg` + `--nue-primary-radius`                                                      |
| 阴影     | `--nue-primary-shadow`、`--nue-secondary-shadow`（颜色见 `--nue-*-shadow-color`）                         |
| 控件高度 | `--nue-box-size-2xs / xs / sm / df / md / lg` + 别名 `--nue-primary-box-size`、`--nue-secondary-box-size` |

## 动画

| 变量                                                      | 说明                          |
| --------------------------------------------------------- | ----------------------------- |
| `--nue-animation-duration-xshort / short / (默认) / long` | 0.06s / 0.18s / 0.36s / 0.54s |
| `--nue-animation-timing-function`                         | 默认缓动函数（ease-in-out）   |

## 暗色开关

| 变量                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `--nue-dark-switch` | `0` 浅色 / `1` 深色                                          |
| `--nue-dark-prefix` | `cos(pi * switch) * -1` 派生的方向因子，状态色常用它加减明度 |

用法见[深色模式](./dark-mode.md)。

## 使用示例

```css
.my-toolbar {
    gap: var(--nue-gap-sm);
    background-color: hsl(
        from var(--nue-primary-color-100) h s calc(l + var(--nue-dark-prefix) * 10)
    );
    color: var(--nue-primary-text-color);
}
```