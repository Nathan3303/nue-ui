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

## 自定义文本 <Badge text="1.8.53 以上版本" type="warning" />

通过默认插槽可以自定义进度条旁边显示的文本，替换默认的百分比文字。

::: preview
demo-preview=./slot.vue
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

## 注意事项

1. **百分比范围**：`percentage` 属性值应在 0-100 之间。
2. **颜色设置**：`color` 属性可以接受字符串或字符串数组（渐变色）。
3. **文字显示**：
    - `showInnerText` 将文字显示在进度条内部
    - `hideText` 完全隐藏百分比文字
    - 两者可同时使用控制文字显示位置
4. **格式化函数**：`formatter` 属性可以自定义百分比显示格式。
5. **环形进度条**：目前为实验性功能，对部分属性支持度有限。

## 组件属性与事件

下方涵盖了 `NueProgress` 组件所有的可用属性与事件。

### 属性

| 属性            | Type                                            | 默认值    | 说明                           |
| --------------- | ----------------------------------------------- | --------- | ------------------------------ |
| `type`          | `'line' \| 'circle' \| 'dashboard'`             | `line`    | 进度条类型                     |
| `color`         | `string \| string[]`                            | `#757575` | 进度颜色，支持渐变色           |
| `strokeWidth`   | `number`                                        | `6`       | 进度条粗细（px）               |
| `percentage`    | `number`                                        | `0`       | 百分比值（0-100）              |
| `showInnerText` | `boolean`                                       | `false`   | 显示内部文字                   |
| `hideText`      | `boolean`                                       | `false`   | 隐藏文字                       |
| `scale`         | `number`                                        | `1`       | 缩放比例（环形进度条）         |
| `formatter`     | `(p: string) => void \| string`                 | -         | 百分比格式化函数               |
| `theme`         | `string \| string[] \| Record<string, boolean>` | -         | 主题样式（继承自 GlobalProps） |

### 事件

| 事件   | 参数 | 说明               |
| ------ | ---- | ------------------ |
| `full` | -    | 进度达到100%的事件 |