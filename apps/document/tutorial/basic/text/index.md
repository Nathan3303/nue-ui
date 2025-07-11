# 文本

用于展示一行或多行文本内容的组件。

## 基础用法

通过标签 `NueText` 使用文本组件。

### 大小

通过属性 `size` 修改文本大小。属性类型为 `string`，可选值有 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 以及 CSS
大小值。

::: preview
demo-preview=./size.vue
:::

## 颜色

通过属性 `color` 修改文本颜色。属性类型为 `string`，支持 CSS `color` 属性值。

::: preview
demo-preview=./color.vue
:::

## 粗细

通过属性 `weight` 修改文本粗细。属性类型为 `string`，支持 CSS `font-weight` 属性值。

::: preview
demo-preview=./weight.vue
:::

## 装饰

通过属性 `decoration` 修改文本装饰。属性类型为 `string`，支持 CSS `text-decoration` 属性值。

::: preview
demo-preview=./decoration.vue
:::

## 标签变更

通过属性 `tag` 修改渲染时的元素标签。默认为 `<span>` 标签。

::: preview
demo-preview=./tag.vue
:::

## 文本溢出

通过属性 `clamped` 设置文本溢出时是否显示省略号。属性类型为 `number`
，表示显示省略号并限制显示的行数，默认为未定义。

::: preview
demo-preview=./clamped.vue
:::
