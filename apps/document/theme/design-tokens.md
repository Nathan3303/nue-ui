# 设计系统（Design Tokens）

所有 token 定义在主题包源码的 `src/global/variables.css`（发布物为 `dist/global/index.css`）。本文档是该文件的人肉镜像，改动 token 时必须同步。

## 体系原理

- 颜色全部由 **HSL 分量变量**派生：`--nue-hsl-h / s / l`，语义色再组合成 `hsl(...)` 值；
- 明度/饱和度刻度跟随 `--nue-dark-switch` 翻转，因此**引用 token 的样式天然适配深色模式**；
- 约定：写样式一律引用 token / 用 `hsl(from ...)` 派生，禁止写死色值。

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