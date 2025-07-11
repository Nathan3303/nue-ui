# Tooltip 文字提示

常用于展示鼠标悬浮时的提示信息。

## 基础用法

通过标签 `<NueTooltip>` 声明一个提示信息。

### 内容 & 位置

通过属性 `content` 设置提示内容，属性值为 `string` 类型。

通过 `placement` 属性设置提示位置，可选值为
`[direction:top|bottom|left|right]-[alignment:start|center|end]`。其中 `direction` 表示提示框出现的位置，
`alignment` 表示提示框相对于触发元素的对齐方式。

::: preview
demo-preview=./basic.vue
:::

### 大小

通过属性 `size` 设置提示元素的大小。属性可选值为 `small` 和 `large`。

::: preview
demo-preview=./size.vue
:::

## 内容插槽

通过插槽 `#content` 自定义提示的内容。

::: preview
demo-preview=./content.vue
:::

## 自定义主题

通过属性 `theme` 自定义提示元素的样式。

::: tip
要注意的是，提示元素在内部实现时使用了 Vue3 的 Teleport 特性，因此使用自定义主题时需要将自定义的 CSS
片段设置到全局（非 scoped 样式）上才能够生效。
:::

::: preview
demo-preview=./theme.vue
:::
