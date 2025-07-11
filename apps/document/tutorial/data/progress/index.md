# 进度展示组件

用于展示任务的进度。

## 基础用法

通过标签 `<NueProgress>` 使用进度展示组件。

### 百分比值

通过属性 `percentage` 设置显示的进度百分比。属性接受 `number` 类型值，范围为 `0-100`。

::: preview
demo-preview=./basic.vue
:::

### 进度条粗细

通过属性 `stroke-width` 设置进度条的粗细。属性接受 `number` 类型值，默认值为 `6` 。

::: preview
demo-preview=./stroke-width.vue
:::

### 自定义颜色

通过属性 `color` 设置进度条的颜色。属性接受 `string` 以及 `string[]` 类型值，默认值为 `#7777ff` 。
`string[]` 类型的值会作为渐变色进行展示。

::: preview
demo-preview=./color.vue
:::

### 将进度文字显示到内部

通过属性 `showInnerText` 设置进度文字是否显示到进度条内部。

:::tip
在使用 `showInnerText` 属性时，请确保同时设置了进度条粗细 `stroke-width`
属性，因为文字会根据粗细进行缩放，需避免因粗细过小导致百分比文字无法阅读的情况。
:::

::: preview
demo-preview=./show-inner-text.vue
:::

### 隐藏百分比文字

通过属性 `hideText` 设置百分比文字的隐藏和显示。

::: preview
demo-preview=./hide-text.vue
:::

## 环形进度条 <Badge text="实验性🧪" type="warning" />

通过属性 `type` 设置进度展示的类型。属性可选值为 `line` 和 `circle`，默认值为 `line` 。

:::warning
由于条形进度条与环形进度条的设计差异过大，环形进度条对上述的所有属性支持度不高，未来将会继续完善。
:::

::: preview
demo-preview=./type.vue
:::

### 缩放比例 <Badge text="实验性🧪" type="warning" />

通过属性 `scale` 设置进度条缩放比例，接受 `number` 类型的值，默认值为 1 。

::: preview
demo-preview=./scale.vue
:::