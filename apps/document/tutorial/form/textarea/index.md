# Textarea 富文本输入框

用于获取用户输入的长文本。

## 基础用法

通过标签 `<NueTextarea>` 声明一个富文本输入框组件。

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

### 大小

通过属性 `size` 设置，属性可选值为 `small` 和 `large` 。

::: preview
demo-preview=./size.vue
:::

### 设置最大行数

通过属性 `rows` 设置图标。属性值接受数字类型，默认值为 `3`。当内容行数超过指定值则会显示滚动条。

::: preview
demo-preview=./rows.vue
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

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致可能出现的性能问题。

通过 `debounceTime` 属性设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

::: preview
demo-preview=./debounce.vue
:::

## 自动高度

通过属性 `autosize` 设置是否启用自适应内容高度，开启后文本框的高度会随着内容的增加而变高，即文本框会完全显示所输入的内容而非使用滚动条。

::: preview
demo-preview=./autosize.vue
:::

### 限制高度

属性 `autosize` 可以实现文本框高度自适应内容，但有时候并不是无限增高，会希望输入框在一定高度内保持自适应，可以搭配属性
`rows` 设置最大高度限制，当内容高度超过 `rows` 指定的行数时，则不会继续增加文本框高度，转而显示滚动条。

::: preview
demo-preview=./rows-autosize.vue
:::

## 手动调整输入框宽高

通过属性 `resize` 设置输入框宽高手动调整。属性为 `HTMLElement.resize` 的映射。

::: preview
demo-preview=./resize.vue
:::
