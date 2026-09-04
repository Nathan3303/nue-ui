# ScrollBar 滚动条 <Badge type="warning" text="1.10.57 +" />

自定义滚动条组件，替换浏览器原生滚动条，提供统一样式和交互。

## 基础用法

通过标签 `<NueScrollBar>` 包裹需要滚动的内容，通过属性 `vertical` 开启垂直滚动，通过属性 `horizontal` 开启水平滚动。

::: preview
demo-preview=./basic.vue
:::

### 水平滚动

通过属性 `horizontal` 开启水平滚动。

::: preview
demo-preview=./horizontal.vue
:::

## 显示模式

通过属性 `mode` 控制滚动条的显示方式，可选值为 `always`（常驻）、`hover`（悬停显示）和 `hidden`（隐藏）。

::: preview
demo-preview=./mode.vue
:::

## 主题与自定义样式

通过 `theme` 属性可以为滚动条应用主题样式。同时，组件暴露了多个 CSS 变量，可以在全局或局部覆盖以实现自定义外观。

::: preview
demo-preview=./theme-custom.vue
:::

## 交互行为

- **拖拽拇指**：在滚动条拇指上按住鼠标左键并拖动，内容会同步滚动。
- **点击轨道**：点击滚动条轨道的空白区域，内容会跳转到对应位置。
- **滚轮滚动**：使用鼠标滚轮可以正常滚动内容。
- **悬停显示**：`mode` 为 `hover` 时，鼠标移入容器显示滚动条，移出后自动隐藏。

## 注意事项

1. **高度设置**：使用 `NueScrollBar` 时，需要为组件设置固定高度（或通过父容器限制高度），否则内容不会出现滚动。
2. **水平滚动**：水平滚动需要内容宽度超出容器宽度才会生效，可以通过 `horizontal` 属性启用。
3. **样式覆盖**：滚动条样式通过 CSS 变量控制，可以在全局样式中覆盖。

## 组件属性与事件

下方涵盖了 `NueScrollBar` 组件所有的可用属性与事件。

### 属性

| 属性           | 类型                                            | 默认值      | 说明                           |
| -------------- | ----------------------------------------------- | ----------- | ------------------------------ |
| `mode`         | `'always' \| 'hover' \| 'hidden'`               | `'hover'`   | 滚动条显示模式                 |
| `vertical`     | `boolean`                                       | `false`     | 启用垂直滚动                   |
| `horizontal`   | `boolean`                                       | `false`     | 启用水平滚动                   |
| `thumbSize`    | `'small' \| 'default' \| 'large'`               | `'default'` | 滚动条拇指大小                 |
| `minThumbSize` | `number`                                        | `20`        | 拇指最小像素值                 |
| `theme`        | `string \| string[] \| Record<string, boolean>` | -           | 主题样式（继承自 GlobalProps） |

### 事件

| 事件     | 参数    | 说明             |
| -------- | ------- | ---------------- |
| `scroll` | `Event` | 滚动时触发的事件 |

### CSS 变量

| 变量                              | 默认值                         | 说明           |
| --------------------------------- | ------------------------------ | -------------- |
| `--nue-scroll-bar-size`           | `6px`                          | 滚动条默认粗细 |
| `--nue-scroll-bar-size--small`    | `4px`                          | 滚动条细尺寸   |
| `--nue-scroll-bar-size--large`    | `8px`                          | 滚动条粗尺寸   |
| `--nue-scroll-bar-track-bg`       | `transparent`                  | 轨道背景色     |
| `--nue-scroll-bar-thumb-bg`       | `var(--nue-primary-color-400)` | 拇指背景色     |
| `--nue-scroll-bar-thumb-hover-bg` | `var(--nue-primary-color-500)` | 拇指悬停背景色 |
| `--nue-scroll-bar-thumb-radius`   | `var(--nue-primary-radius)`    | 拇指圆角       |