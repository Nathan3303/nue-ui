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

## 注意事项

1. **标签选择**：根据语义化需求选择合适的 HTML 标签，如标题使用 `h1`-`h4`，段落使用 `p`。
2. **溢出处理**：`clamped` 属性使用 `-webkit-line-clamp` 实现，需要注意浏览器兼容性。
3. **尺寸预设**：预设尺寸 `xs` 到 `xxl` 是组件内置的样式，如需自定义大小可直接传入 CSS 值。
4. **颜色继承**：默认情况下文本颜色会继承父元素，通过 `color` 属性可覆盖。

## 组件属性与事件

下方涵盖了 `NueText` 组件所有的可用属性与事件。

### 属性

| 属性         | Type                                            | 默认值 | 说明                                              |
| ------------ | ----------------------------------------------- | ------ | ------------------------------------------------- |
| `tag`        | `string`                                        | `span` | HTML 标签                                         |
| `size`       | `string`                                        | -      | 文本大小，支持预设值 xs/sm/md/lg/xl/xxl 或 CSS 值 |
| `color`      | `string`                                        | -      | 文本颜色，接受 CSS Color 值                       |
| `decoration` | `string`                                        | -      | 文本装饰，接受 CSS text-decoration 值             |
| `weight`     | `string \| number`                              | -      | 文本粗细，接受 CSS font-weight 值                 |
| `align`      | `string`                                        | -      | 文本对齐，接受 CSS text-align 值                  |
| `clamped`    | `number`                                        | -      | 溢出行数限制，使用 -webkit-line-clamp             |
| `theme`      | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps）                    |