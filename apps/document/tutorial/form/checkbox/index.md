# Checkbox 复选框

用于在一组备选项中进行多选。

:::warning ❗ 警告
该组件在设计上没有使用到 HTML 的 Input 元素。
:::

## 基础用法

使用标签 `<NueCheckbox>` 声明一个复选框组件。

### 值和标识文字

通过 `v-model` 绑定复选框的值；通过属性 `label` 或默认插槽 `#default` 设置复选框的标识文本。

::: preview
demo-preview=./basic.vue
:::

### 禁用状态

通过属性 `disabled` 禁用复选框。

::: preview
demo-preview=./disabled.vue
:::

### 大小

通过属性 `size` 来设置复选框的大小。属性可选值为 `small` 和 `large`。

::: preview
demo-preview=./size.vue
:::

### 中间状态

通过属性 `indeterminate` 设置复选框为中间状态。

::: tip

- 属性 `indeterminate` 表示有选择项但不是全选的中间状态，通常会在控制整体选项组的复选框上应用。
- 属性 `indeterminate` 的显示优先级会低于选中值为 `true` 、高于选中值为 `false` 的情况。

:::

::: preview
demo-preview=./indeterminate.vue
:::

## 加载态和值变更前的回调函数

通过属性 `loading` 设置复选框处于加载状态。通常搭配状态变更前的回调函数属性 `before-check` 使用。在
`before-switch` 回调函数中，只有返回 Resolved Promise 或是 `ture` 时才会使开关组件的状态发生改变。

::: preview
demo-preview=./loading.vue
:::

## 复选框组

复选框组能够统一控制和记录多个复选框的选中以及其他属性，适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

使用标签 `<NueCheckboxGroup>` 声明一个复选框组。

建议为每个 `<NueCheckbox>` 复选框组件指定 `name` 属性，通过 `v-model` 在 `<NueCheckboxGroup>`
上绑定一个复选框组的响应式值，该值将会记录下所有已选择的 `<NueCheckbox>` 复选框组件的 `name` 属性值。

::: tip
若 `<NueCheckbox>` 复选框组件没有指定 `name` 属性值，则内部将随机生成由 4 个字符组成的随机字符串作为
`name` 默认属性值。
:::

::: preview
demo-preview=./cg-basic.vue
:::

### 禁用状态

通过属性 `disabled` 控制组内 `<NueCheckbox>` 复选框组件的禁用状态。

::: preview
demo-preview=./cg-disabled.vue
:::

### 大小

通过属性 `size` 控制组内 `<NueCheckbox>` 复选框组件的大小，可选值与 `<NueCheckbox>` 复选框组件的属性
`size` 相同。

::: preview
demo-preview=./cg-size.vue
:::

### 控制器

通过属性 `useController` 开启复选框组的预设选择控制器。通过属性 `controllerLabel` 设置控制器标识文本。

::: preview
demo-preview=./cg-controller.vue
:::

### 最小和最大选中数

通过属性 `min` 和 `max` 指定复选框组内 `<NueCheckbox>` 复选框组件的最小和最大选中数。属性接受
`Number` 类型，默认值分别为 `min=0` 和 `max=Infinity`。

::: preview
demo-preview=./cg-min-max.vue
:::
