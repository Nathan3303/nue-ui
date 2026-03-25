# Dialog 对话框

对话框组件用于在当前页面上弹出一个对话框，用于展示重要的信息或与用户进行交互。

## 基础用法

通过标签 `<NueDialog>` 可以创建一个对话框组件。

### 显示隐藏控制

对话框组件需要使用 `v-model` 传入一个响应式属性用于控制对话框的显示和隐藏。

通过 `title` 属性设置对话框的标题。属性值类型为 `string`。

::: preview
demo-preview=./basic.vue
:::

### 允许通过遮罩层关闭抽屉

对话框组件默认不允许点击组件遮罩层区域触发关闭动作，通过属性 `allow-close-by-overlay` 设置允许通过点击遮罩层关闭。

属性 `allow-close-by-overlay` 被指定后，遮罩层会响应键盘 Escape 键事件，按键按下后触发对话框关闭。

::: preview
demo-preview=./allow-close-by-overlay.vue
:::

## 自定义头部、主体以及底部

通过指定插槽完成对应内容的自定义。

### 基本插槽

基础插槽包含 `header`、`content` 以及 `footer` 插槽，分别用于自定义对话框的头部、主体以及底部内容。这些插槽都可以解构出 `close` 方法，用于关闭对话框。

::: preview
demo-preview=./basic-slots.vue
:::

### 重写插槽

重写插槽 `reset` 可以重写整个对话框内所有元素，包括头部、主体以及底部。提供更为灵活的自定义。

::: preview
demo-preview=./reset-slot.vue
:::

## 连续打开多个对话框

对话框组件可以连续打开多个，每个对话框之间是独立的，互不干扰。

:::preview
demo-preview=./open-multiple.vue
:::

## 生命周期事件

对话框组件提供了 `before-open`、`after-open`、`before-close`、`after-close` 四个生命周期事件，分别在对话框打开前、打开后、关闭前、关闭后触发。

::: preview
demo-preview=./lifecycle.vue
:::

## 注意事项

1. **双向绑定**：使用 `v-model` 控制对话框的显示隐藏。
2. **传送机制**：通过 `teleportTo` 属性可以将对话框传送到指定 DOM 节点下。
3. **生命周期**：四个生命周期事件可用于执行打开/关闭前后的逻辑。
4. **多实例**：支持同时打开多个对话框，互不影响。

## 组件属性与事件

下方涵盖了 `NueDialog` 组件所有的可用属性与事件。

### 属性

| 属性         | Type                                            | 默认值 | 说明                           |
| ------------ | ----------------------------------------------- | ------ | ------------------------------ |
| `modelValue` | `boolean`                                       | -      | 控制显示隐藏                   |
| `teleportTo` | `string`                                        | -      | 传送到指定 DOM 节点            |
| `title`      | `string`                                        | -      | 对话框标题                     |
| `theme`      | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### 事件

| 事件                | 参数             | 说明             |
| ------------------- | ---------------- | ---------------- |
| `update:modelValue` | `value: boolean` | 显示状态变化事件 |
| `confirm`           | -                | 确认按钮点击事件 |
| `beforeOpen`        | -                | 打开前事件       |
| `afterOpen`         | -                | 打开后事件       |
| `beforeClose`       | -                | 关闭前事件       |
| `afterClose`        | -                | 关闭后事件       |
