# Divider 分隔符

用于显式地分隔内容区域。

## 基础用法

使用标签 `<NueDivider>` 声明一个分隔符组件。

::: preview
demo-preview=./basic.vue
:::

### 垂直方向

通过属性 `vertical` 设置分隔符组件的方向为垂直。

::: preview
demo-preview=./vertical.vue
:::

### 定义线条颜色、类型以及粗细

通过属性 `line-color` 定义分隔符组件线的颜色；属性 `line-style` 定义线条类型；属性 `line-width`
定义线条粗细。

::: preview
demo-preview=./color-type-width.vue
:::

### 定义文本或其他内容

通过属性 `text` 设置分隔符组件内部文字（显示在分割线上）；通过默认插槽 `#default` 自定义内部内容。

::: preview
demo-preview=./text-default.vue
:::

## 注意事项

1. **方向**：`vertical` 属性设置为 `true` 时，分隔符变为垂直方向。
2. **对齐方式**：`alignment` 属性控制带文字的分隔线的文字位置。
3. **线条样式**：`lineStyle` 支持实线、虚线、点线三种样式。
4. **自定义内容**：可以通过默认插槽自定义分隔线中间的内容。

## 组件属性与事件

下方涵盖了 `NueDivider` 组件所有的可用属性与事件。

### 属性

| 属性        | Type                                            | 默认值   | 说明                           |
| ----------- | ----------------------------------------------- | -------- | ------------------------------ |
| `vertical`  | `boolean`                                       | `false`  | 垂直方向                       |
| `alignment` | `'start' \| 'center' \| 'end'`                  | `center` | 文字对齐方式                   |
| `lineWidth` | `string`                                        | -        | 线条宽度                       |
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'`               | `solid`  | 线条样式                       |
| `lineColor` | `string`                                        | -        | 线条颜色                       |
| `text`      | `string`                                        | -        | 分隔线中间文字                 |
| `theme`     | `string \| string[] \| Record<string, boolean>` | -        | 主题样式（继承自 GlobalProps） |
