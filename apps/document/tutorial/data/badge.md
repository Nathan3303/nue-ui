# Badge 徽标

用于展示消息数量等徽标信息。

## 基础用法

通过 `NueBadge` 组件来展示徽标。

通过 `value` 属性来设置徽标显示的文字或数字，该属性接收 `string` 和 `number` 两种类型的值。

::: preview
demo-preview=../demos/badge/basic.vue
:::

## 设置上限

通过 `max` 属性设置徽标的最大值，当 `value` 超过 `max` 时，徽标显示 `<max>+`。

::: tip

- 由于需要对 `max` 和 `value` 进行数值比较，因此 `value` 必须是 `number` 类型或数字字符串，否则 `max` 属性设置不生效。
- 当 `value` 为数字字符串时，组件内部会尝试通过 `parseInt` 方法转换为数字，转换失败时 `max` 属性设置不生效。
:::

::: preview
demo-preview=../demos/badge/max.vue
:::

## 小红点

通过 `dot` 属性设置徽标为小红点。

当不想显示具体数值或最大值时，可以设置 `dot` 属性。

::: tip
若设置了 `dot` 属性，则 `value` 和 `max` 属性将失效。
:::

::: preview
demo-preview=../demos/badge/dot.vue
:::

## 隐藏与显示控制

通过 `hidden` 属性控制徽标是否隐藏。

::: preview
demo-preview=../demos/badge/hidden.vue
:::

## 在组件内部使用

当 `NueBadge` 组件没有内容时，徽标部分将不会定位到右上角，而是水平展示。因此可以在 `NueButton` 以及 `NueLink` 等组件的内部插槽中直接使用。

::: preview
demo-preview=../demos/badge/inner.vue
:::
