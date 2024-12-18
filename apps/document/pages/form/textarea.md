# Textarea 富文本输入框

用于获取用户输入的长文本。

## 基础用法

通过 `NueTextarea` 组件生成输入框。

通过 `v-model` 绑定一个响应式数据，随输入内容变化。

通过 `placeholder` 属性设置占位字符，接收 `string` 类型。

::: preview
demo-preview=../../demos/textarea/basic.vue
:::

## 禁用状态

通过 `disabled` 属性设置禁用状态，接收 `boolean` 类型。

::: preview
demo-preview=../../demos/textarea/disabled.vue
:::

## 设置最大行数

通过 `rows` 属性设置图标，接收 `number` 类型，默认值为 `3`。

::: preview
demo-preview=../../demos/textarea/rows.vue
:::

## 内容高度自适应以及最大高度限制

### 内容高度自适应

通过 `autosize` 属性设置是否自适应内容高度，接收 `boolean` 类型，默认值为 `false`。

::: preview
demo-preview=../../demos/textarea/autosize.vue
:::

### 最大高度限制

通过 `autosize` 搭配 `rows` 属性设置最大高度限制，当内容高度超过 `rows` 指定的行数时，则不会继续增加文本框高度，转而显示滚动条。

::: tip
`rows` 的默认值为 `3`，所以只设置 `autosize` 属性时，文本框的最大高度依然会被限制在 3 行内。解除该限制可以通过将 `rows`
属性设置为 `0` 来解除高度限制。
:::

::: preview
demo-preview=../../demos/textarea/rows-autosize.vue
:::

## 字数限制与计数

通过 `maxlength` 属性设置最大字符限制，接收 `string` 类型。

与 `NueInput` 组件相同，可以通过 `counter` 属性设置是否显示字数统计，接收 `off*`、`word-limit`、`word-left` 以及 `both`
四个值之一。

- `off*` 表示不显示字数统计。
- `word-limit` 表示只显示最大字数限制。
- `word-left` 表示只显示剩余字数。
- `both` 表示同时显示最大字数限制和剩余字数。

::: tip

- `maxlength` 属性为原生 `HTMLElement.maxlength` 属性的映射。
- 建议 `counter` 属性与 `maxlength` 属性配合使用。

:::

::: preview
demo-preview=../../demos/textarea/max-count.vue
:::

## 防抖

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致可能出现的性能问题。

通过 `debounceTime` 属性设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

::: preview
demo-preview=../../demos/textarea/debounce.vue
:::

## 样式设置

### 输入框尺寸

富文本输入框拥有小、正常、大三种尺寸，通过 `size` 属性设置，小和大分别对应 `size` 值中的 `small` 和 `large`，不指定 `size`
则表示正常尺寸。

::: preview
demo-preview=../../demos/textarea/size.vue
:::

[//]: # (### 输入框外形)

[//]: # ()

[//]: # (通过 `shape` 属性设置输入框外形，接收 `noshape`。)

[//]: # ()

[//]: # (::: preview)

[//]: # (demo-preview=../../demos/textarea/shape.vue)

[//]: # (:::)

### 自定义样式

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

::: tip
添加后的类名为 `nue-input--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-input--custom`。
:::

::: preview
demo-preview=../../demos/textarea/theme.vue
:::
