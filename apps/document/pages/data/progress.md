# 进度展示组件

用于展示任务的进度。

## 基础用法

通过标签 `NueProgress` 使用进度展示组件。

通过属性 `percentage` 设置显示的进度百分比，接受 `number` 类型的值，范围为 0-100。

通过属性 `type` 设置进度展示的类型，可选值为 `line*` 和 `circle`。

::: preview
demo-preview=../../demos/progress/basic.vue
:::

## 自定义颜色

通过属性 `color` 设置进度条的颜色，接受 `string` 以及 `string[]` 类型的值，默认值为 #7777ff 。

`string[]` 类型的值会作为渐变色进行展示。

:::tip
类型 `string[]` 的值仅支持类型为 `line` 类型的进度条，当类型为 `circle` 类型的进度条接收到类型 `string[]` 的值时，会默认取第一个值作为颜色。
:::

::: preview
demo-preview=../../demos/progress/color.vue
:::

## 设置进度条粗细

通过属性 `stroke-width` 设置进度条的粗细，接受 `number` 类型的值，默认值为 6 。

::: preview
demo-preview=../../demos/progress/stroke-width.vue
:::

## 设置缩放比例

通过属性 `scale` 设置进度条缩放比例，接受 `number` 类型的值，默认值为 1 。

::: preview
demo-preview=../../demos/progress/scale.vue
:::

## 将进度文字显示到内部

通过属性 `showInnerText` 设置进度文字是否显示到进度条内部，接受 `boolean` 类型的值，默认值为 false 。

:::tip
属性 `showInnerText` 目前仅支持类型为 `line` 类型的进度条。
:::

::: preview
demo-preview=../../demos/progress/show-inner-text.vue
:::

## 隐藏百分比文字

通过属性 `hideText` 设置百分比文字的隐藏和显示，接受 `boolean` 类型的值，默认值为 false 。

::: preview
demo-preview=../../demos/progress/hide-text.vue
:::
