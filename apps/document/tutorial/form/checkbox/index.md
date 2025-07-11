# Checkbox 复选框

用于在一组备选项中进行多选。

## 基础用法

使用标签 `NueCheckbox` 生成复选框。

通过 `v-model` 绑定复选框的值。

通过 `label` 属性或 **默认插槽** 设置复选框的标识文本。

::: preview
demo-preview=./basic.vue
:::

## 禁用状态

通过 `disabled` 属性来禁用复选框，接受 Boolean 类型，默认为 `false`。

::: preview
demo-preview=./disabled.vue
:::

## 大小

通过 `size` 属性来设置复选框的大小，可选值为 `small` 和 `large`，不设置则为正常大小。

::: preview
demo-preview=./size.vue
:::

## 中间状态

通过属性 `indeterminate` 设置复选框的中间状态，接受 Boolean 类型，默认为 `false`。

::: tip
由于 `indeterminate` 属性表示的是一种模糊的中间状态，因此优先级会低于选中值为 `true` 、高于选中值为 `false` 的情况。
:::

::: preview
demo-preview=./indeterminate.vue
:::

## 加载状态和状态变更前的回调函数

通过属性 `loading` 设置复选框的加载状态，通常搭配状态变更前的回调函数属性 `before-check` 使用。在 `before-switch` 回调函数中，只有返回 Resolved Promise 或是布尔类型 ture 时才会使开关组件的状态发生改变。

::: preview
demo-preview=./loading.vue
:::

## 复选框组

复选框组能够统一控制和记录多个复选框的选中以及其他属性，适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

使用标签 `NueCheckboxGroup` 生成复选框组，通过 `v-model` 绑定复选框组的值。

::: tip
在复选框组中的复选框组件需要指定 `name` 属性用于记录当前复选框的值，否则内部将随机生成由 4 个字符组成的随机字符串作为 `name` 默认属性值。
:::

::: preview
demo-preview=./cg-basic.vue
:::

## 复选框组 - 禁用状态

通过使用复选框组的 `disabled` 属性控制组内的复选框的禁用状态，接受 Boolean 类型，默认为 `false`。

::: preview
demo-preview=./cg-disabled.vue
:::

## 复选框组 - 大小

通过使用复选框组的 `size` 属性控制组内复选框的大小，可选值为 `small` 和 `large`，不设置则为正常大小。

::: preview
demo-preview=./cg-size.vue
:::

## 复选框组 - 控制器

通过使用复选框组的 `useController` 属性开启和关闭复选框组控制器，接受 Boolean 类型，默认为 `false`。

通过 `controllerLabel` 属性设置控制器标识文本。

::: preview
demo-preview=./cg-controller.vue
:::

## 复选框组 - 最小和最大选中数

通过使用复选框的 `min` 和 `max` 属性指定复选框组内复选框的最小和最大选中数，接受 Number 类型，默认值分别为 `0` 和 `Infinity`。

::: preview
demo-preview=./cg-min-max.vue
:::

## 自定义主题

通过属性 `theme` 设置复选框的主题样式。

::: preview
demo-preview=./theme.vue
:::
