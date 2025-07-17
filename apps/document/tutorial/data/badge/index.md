# Badge 徽标

用于展示消息数量等徽标信息。

## 基础用法

通过 `NueBadge` 组件来展示徽标。

### 值

通过属性 `value` 来设置徽标显示的文字或数字。属性接受 `string` 和 `number` 两种类型的值。

::: preview
demo-preview=./basic.vue
:::

### 小红点

通过属性 `dot` 设置徽标为小红点形式。

当 `dot` 属性存在时，`value` 属性将无效。

::: preview
demo-preview=./dot.vue
:::

### 隐藏与显示控制

通过 `hidden` 属性控制徽标是否隐藏。

::: preview
demo-preview=./hidden.vue
:::

## 设置上限

通过属性 `max` 设置徽标的最大值，当 `value` 超过 `max` 时，徽标显示 `<max>+`。

由于需要对 `max` 和 `value` 进行数值比较，因此所提供的 `value` 属性的值必须是 `number` 类型，否则
`max` 属性设置不生效。

::: preview
demo-preview=./max.vue
:::

## 组件内使用

当 `NueBadge` 组件没有内容时，徽标部分将不会定位到右上角，而是水平展示。因此可以在 `NueButton`
以及 `NueLink` 等组件的内部插槽中直接使用。

::: preview
demo-preview=./inner.vue
:::
