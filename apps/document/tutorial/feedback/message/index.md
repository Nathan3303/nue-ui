# Message 信息提示

用于提示用户操作执行结果或其他消息。

## 基础用法

使用组件库暴露的方法 `NueMessage` 创建一个信息提示。

`NueMessage` 方法接收一个 `options` 对象作为参数，其中的 `message` 属性表示提示信息。

::: preview
demo-preview=./basic.vue
:::

### 消息类型

通过属性 `type` 指定消息类型，可选值为 `success`、`info`、`warning`、`error` 以及 `log`。

::: preview
demo-preview=./type.vue
:::

### 消息图标

通过属性 `icon` 设置消息提示的图标。由于组件内部复用 `<NueIcon>` 组件，因此 `icon` 属性可选值为
`<NueIcon>` 组件的 `name` 属性可选值。

::: preview
demo-preview=./icon.vue
:::

### 持续时间 & 手动关闭

通过 `duration` 属性设置消息提示的显示持续时间，接收 `number` 类型的值。持续时间的单位为毫秒，默认为
`3000`（即 3 秒）。

当属性 `duration` 的值设置为 `0` 时，表示持续时间为 `Infinity`，即消息提示不会自动消失，需要手动确认关闭。

::: preview
demo-preview=./duration.vue
:::

## 确定类型的快速使用

通过 `NueMessage` 中的子方法 `success`、`info`、`warn`、`error`、`log` 可以快速创建不同类型的消息提示。这些子方法都拥有同样的形参，包括 `message`、`duration`、`icon` 以及 `size` 。

::: preview
demo-preview=./quick-use.vue
:::

## 注意事项

1. **调用方式**：`NueMessage` 是一个方法，不是组件，需要通过组件库的全局方法调用。
2. **快速方法**：可以通过 `NueMessage.success()`、`NueMessage.error()` 等快速创建对应类型的消息。
3. **持续时间**：`duration` 为 0 时消息不会自动消失，需要手动关闭。
4. **图标**：图标使用组件库的 Icon 组件，值需要是有效的图标名称。

## 组件属性与事件

下方涵盖了 `NueMessage` 方法所有的可用参数。

### 参数

| 属性       | Type                                                   | 默认值 | 说明                                 |
| ---------- | ------------------------------------------------------ | ------ | ------------------------------------ |
| `message`  | `string`                                               | -      | 消息内容                             |
| `type`     | `'success' \| 'error' \| 'warning' \| 'info' \| 'log'` | -      | 消息类型                             |
| `duration` | `number`                                               | `3000` | 显示持续时间（毫秒），0 为不自动关闭 |
| `icon`     | `string`                                               | -      | 自定义图标                           |
| `size`     | `'small' \| 'large'`                                   | -      | 消息提示尺寸                         |