# Select 选择器

提供下拉选择功能。组件内部设计分为两个子组件，分别是选择器和选择选项。

## 基础用法

通过标签 `<NueSelect>` 声明选择器组件以及 `<NueSelectOption>` 声明选择选项组件，实现下拉选择功能。

### 选择器值 & 选择选项组件标识文字

通过 `v-model` 在 `<NueSelect>` 选择器组件上绑定响应式值，记录当前选中的 `<NueSelectOption>` 选择选项组件的
`value` 属性值。

通过选择选项组件属性 `value` 设置选项值；属性 `label` 设置标识文字。

::: preview
demo-preview=./basic.vue
:::

### 空值时的占位文字

通过属性 `placeholder` 设置选择器组件空值时的占位文字。

::: preview
demo-preview=./placeholder.vue
:::

### 禁用状态

通过属性 `disabled` 禁用选择器。

::: preview
demo-preview=./disabled.vue
:::

### 大小

通过属性 `size` 设置选择器大小。属性可选值为 `small` 和 `large` 。

::: preview
demo-preview=./size.vue
:::

### 清除

通过属性 `clearable` 启用选择器的清除按钮。

::: preview
demo-preview=./clearable.vue
:::

## 组件生命周期事件

### 选择器打开 & 关闭事件

通过事件 `before-open` 和 `after-open` 监听选择器打开前和打开后的事件；`before-close` 和 `after-close` 监听选择器关闭前和关闭后的事件。

::: preview
demo-preview=./e-open-close.vue
:::

### 选择器值变化事件

通过事件 `change` 监听选择器值变化事件。

::: preview
demo-preview=./e-change.vue
:::

## 选择后保持打开

默认情况下，选择器会在选择后关闭，通过属性 `persistent` 启用选择后保持打开状态。

::: preview
demo-preview=./persistent.vue
:::
