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

通过 `NueMessage` 中的子方法 `success`、`info`、`warn`、`error`、`log` 可以快速创建不同类型的消息提示。这些子方法都拥有同样的形参，包括 `message`、`duration` 以及 `icon` 。

::: preview
demo-preview=./quick-use.vue
:::
