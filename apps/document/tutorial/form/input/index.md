# Input 输入框

用于获取用户输入。

## 基础用法

通过标签 `<NueInput>` 声明一个单行输入框组件。

### 值与占位字符

通过 `v-model` 绑定一个响应式数据，随输入内容变化；通过属性 `placeholder` 设置空值时的占位字符。
类型。

::: preview
demo-preview=./basic.vue
:::

### 禁用状态

通过属性 `disabled` 设置禁用状态。

::: preview
demo-preview=./disabled.vue
:::

### 输入框类型

通过属性 `type` 设置输入框类型。属性可选值为 `text`、`password`、`number`、`email`、`textarea` 以及
`url`。

::: preview
demo-preview=./type.vue
:::

### 设置图标

通过属性 `icon` 设置图标。属性值类型与 `<NueIcon>` 图标组件的 `name` 属性相同。

::: preview
demo-preview=./icon.vue
:::

### 大小

通过属性 `size` 设置，属性可选值为 `small` 和 `large` 。

::: preview
demo-preview=./size.vue
:::

## 清除控制与密码显示控制

通过属性 `clearable` 设置是否显示清除按钮。

通过属性 `allow-show-password` 设置是否显示控制密码显示按钮。`allow-show-password` 属性仅在 `type`
属性为 `password` 时生效。

::: preview
demo-preview=./clearable-show.vue
:::

## 字数限制与计数

通过属性 `maxlength` 设置最大字符限制。属性值类型同 `HTMLElement.maxlength` 属性类型，属于属性映射。

通过属性 `counter` 设置是否显示字数统计。属性可选值为 `off*`、`word-limit`、`word-left` 以及 `both`，其中：

- `off` 表示不显示字数统计。
- `word-limit` 表示只显示最大字数限制。
- `word-left` 表示只显示剩余字数。
- `both` 表示同时显示最大字数限制和剩余字数。

::: tip
`counter` 属性需要与 `maxlength` 属性配合使用才能产生效果。
:::

::: preview
demo-preview=./max-count.vue
:::

## 防抖

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致的性能问题。

通过属性 `debounceTime` 设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

::: preview
demo-preview=./debounce.vue
:::
