# Drawer 抽屉

抽屉组件用于在屏幕上显示临时内容，从而提供额外的操作或信息。

## 基础用法

通过标签 `<NueDrawer>` 创建一个抽屉。

### 显示隐藏控制

抽屉组件需要使用 `v-model` 传入一个响应式属性用于控制抽屉的显示和隐藏。

通过属性 `title` 设置抽屉的标题。属性值类型为 `string`。

::: preview
demo-preview=./basic.vue
:::

### 打开方向

通过属性 `open-from` 设置抽屉组件打开的方向。属性可选值为 `left`、`right`、`top`、`bottom`，默认值为
`right`。

::: preview
demo-preview=./open-from.vue
:::

### 展开范围以及最小展开范围

通过属性 `span` 和 `min-span` 分别设置抽屉的展开范围以及最小展开范围。

`span` 和 `min-span` 属性接收 `string` 类型的值，具体应用到 CSS 的 `width`、`height`、`min-width`、`min-height` 这些属性上。

::: tip

- 由于抽屉的开启方向可以是上下左右四个方向，因此在上下方向时，`span` 和 `min-span`
  分别指的是高度和最小高度；在左右方向时，`span` 和 `min-span` 分别指的是宽度和最小宽度。
- `span` 和 `min-span` 的效果会在视口发生变化时体现出来。
  :::

::: preview
demo-preview=./prop-span.vue
:::

### 允许通过遮罩层关闭抽屉

抽屉组件默认不允许点击组件遮罩层区域触发关闭动作，通过属性 `allow-close-by-overlay` 设置允许通过点击遮罩层关闭。

::: preview
demo-preview=./allow-close-by-overlay.vue
:::

## 自定义头部、主体以及底部

通过指定插槽完成对应内容的自定义。

- `header` 插槽用于自定义抽屉的头部内容。头部插槽可以解构出 `close` 方法用于关闭抽屉。
- `default` 默认插槽用于自定义抽屉的主体内容。
- `footer` 插槽用于自定义抽屉的底部内容。

::: preview
demo-preview=./slots.vue
:::

## 连续打开多个抽屉

抽屉组件可以连续使用，在同一个页面上可以打开多个抽屉，这些抽屉元素会根据打开顺序进行显示而非文档结构。

::: preview
demo-preview=./open-more.vue
:::

## 生命周期事件与回调函数

### 生命周期事件

抽屉组件提供了 `before-open`、`after-open`、`before-close`、`after-close` 四个生命周期事件，分别在抽屉打开前、打开后、关闭前、关闭后触发。

::: preview
demo-preview=./events.vue
:::

### 关闭抽屉时回调

通过属性 `on-close` 可以指定一个回调函数，在抽屉关闭时触发。回调函数接收一个参数 `done: () => void`，用于关闭抽屉。

::: preview
demo-preview=./on-close.vue
:::

## 注意事项

1. **打开方向**：`openFrom` 属性支持四个方向，建议根据内容宽度选择合适的展开方向。
2. **范围控制**：`span` 和 `minSpan` 属性控制抽屉展开的宽度/高度。
3. **异步关闭**：通过 `onClose` 回调可以执行异步操作，完成后调用 `done()` 关闭抽屉。
4. **遮罩层关闭**：`allowCloseByOverlay` 允许点击遮罩层关闭抽屉。

## 组件属性与事件

下方涵盖了 `NueDrawer` 组件所有的可用属性与事件。

### 属性

| 属性                  | Type                                            | 默认值  | 说明                           |
| --------------------- | ----------------------------------------------- | ------- | ------------------------------ |
| `modelValue`          | `boolean`                                       | -       | 控制显示隐藏                   |
| `title`               | `string`                                        | -       | 抽屉标题                       |
| `span`                | `string`                                        | `36%`   | 展开范围（宽度或高度）         |
| `minSpan`             | `string`                                        | `240px` | 最小展开范围                   |
| `allowCloseByOverlay` | `boolean`                                       | `false` | 允许点击遮罩层关闭             |
| `openFrom`            | `'left' \| 'right' \| 'top' \| 'bottom'`        | `right` | 打开方向                       |
| `teleportTo`          | `string`                                        | -       | 传送到指定 DOM 节点            |
| `onClose`             | `(done: () => void) => unknown`                 | -       | 关闭前回调，用于异步关闭       |
| `theme`               | `string \| string[] \| Record<string, boolean>` | -       | 主题样式（继承自 GlobalProps） |

### 事件

| 事件                | 参数             | 说明             |
| ------------------- | ---------------- | ---------------- |
| `update:modelValue` | `value: boolean` | 显示状态变化事件 |
| `beforeOpen`        | -                | 打开前事件       |
| `afterOpen`         | -                | 打开后事件       |
| `beforeClose`       | -                | 关闭前事件       |
| `afterClose`        | -                | 关闭后事件       |