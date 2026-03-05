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

## 选择后保持打开

默认情况下，选择器会在选择后关闭，通过属性 `persistent` 启用选择后保持打开状态。

::: preview
demo-preview=./persistent.vue
:::

## 组件生命周期事件

### 选择器打开 & 关闭事件

通过事件 `@before-open` 和 `@after-open` 监听选择器打开前和打开后的事件；`@before-close` 和 `@after-close` 监听选择器关闭前和关闭后的事件。

::: preview
demo-preview=./e-open-close.vue
:::

### 选择器值变化事件

通过事件 `@change` 监听选择器值变化事件。

::: preview
demo-preview=./e-change.vue
:::

## 选择器选项组件

`<NueSelectOption>` 选择器选项组件拥有多个属性，用于设置选项值、标识文字、禁用状态等。

### 禁用选项组件

通过属性 `disabled` 禁用选择选项组件。

::: preview
demo-preview=./option-disabled.vue
:::

### 图标选项

通过属性 `icon` 设置选择选项组件的图标。属性值为图标名称。

::: preview
demo-preview=./option-icon.vue
:::

### 默认插槽

选择器选项组件支持通过默认插槽自定义选项内容。但选择器组件只会显示选项组件 `label` 属性值。

::: preview
demo-preview=./option-default-slot.vue
:::

### 追加插槽

追加插槽 `#append` 用于在选项组件内容后，选中标识图标前追加自定义内容。

::: preview
demo-preview=./option-append-slot.vue
:::

## 注意事项

1. **选项注册**：`<NueSelectOption>` 组件需要在 `<NueSelect>` 组件内部使用，组件会自动注册选项。
2. **值类型**：`modelValue` 支持多种数据类型，包括字符串、数字、布尔值、对象、数组等。
3. **清除功能**：`clearable` 属性允许用户通过点击清除按钮清空已选值。
4. **持久化**：`persistent` 属性控制在选择后是否保持下拉菜单打开状态。
5. **禁用选项**：可以在 `<NueSelectOption>` 上单独设置 `disabled` 属性来禁用特定选项。

## 组件属性与事件

下方涵盖了 `NueSelect` 和 `NueSelectOption` 组件所有的可用属性与事件。

### NueSelect 属性

| 属性          | Type                                                                  | 默认值  | 说明                           |
| ------------- | --------------------------------------------------------------------- | ------- | ------------------------------ |
| `modelValue`  | `string \| number \| boolean \| object \| array \| null \| undefined` | -       | 绑定值                         |
| `placeholder` | `string`                                                              | -       | 占位符                         |
| `size`        | `'small' \| 'large'`                                                  | -       | 尺寸                           |
| `disabled`    | `boolean`                                                             | `false` | 是否禁用                       |
| `clearable`   | `boolean`                                                             | `false` | 可清除                         |
| `persistent`  | `boolean`                                                             | `false` | 选择后保持打开                 |
| `theme`       | `string \| string[] \| Record<string, boolean>`                       | -       | 主题样式（继承自 GlobalProps） |

### NueSelect 事件

| 事件                | 参数    | 说明             |
| ------------------- | ------- | ---------------- |
| `update:modelValue` | `value` | 值更新事件       |
| `change`            | `value` | 值变化事件       |
| `close`             | -       | 下拉菜单关闭事件 |

### NueSelectOption 属性

| 属性          | Type                                                                  | 默认值  | 说明                           |
| ------------- | --------------------------------------------------------------------- | ------- | ------------------------------ |
| `label`       | `string`                                                              | -       | 选项显示文本                   |
| `value`       | `string \| number \| boolean \| object \| array \| null \| undefined` | -       | 选项值                         |
| `icon`        | `string`                                                              | -       | 选项图标                       |
| `loading`     | `boolean`                                                             | `false` | 加载状态                       |
| `loadingIcon` | `string`                                                              | -       | 加载图标                       |
| `disabled`    | `boolean`                                                             | `false` | 是否禁用此选项                 |
| `theme`       | `string \| string[] \| Record<string, boolean>`                       | -       | 主题样式（继承自 GlobalProps） |
