# 图标

生成一个图标。

## 基础用法

通过组件标签 `NueIcon` 声明一个图标组件。

图标组件目前仅支持 Iconfont 形式，通过属性 `name` 指定图标内容。

::: preview
demo-preview=./basic.vue
:::

## 大小

通过属性 `size` 指定图标大小，接受 CSS FontSize 的合法值，默认继承父元素。

::: preview
demo-preview=./size.vue
:::

## 颜色

通过属性 `color` 指定图标颜色，接受 CSS Color 的合法值，默认继承父元素。

::: preview
demo-preview=./color.vue
:::

## 图标自旋转

通过属性 `spin` 指定图标是否自旋转，接受布尔类型值，默认为 `false` 。

通过属性 `spin-speed` 指定图标自旋转速度，接受 CSS Duration 合法值，默认为 `2s` 。

::: preview
demo-preview=./spin.vue
:::

## 所有图标

下方表格列出了所有可用的图标名称，通过 `name` 属性指定即可使用对应图标。

::: preview
demo-preview=./icons.vue
:::

## 注意事项

1. **图标来源**：图标组件基于 Iconfont 字体图标库，需要确保图标字体已正确加载。
2. **继承行为**：`size` 和 `color` 属性默认继承父元素样式，便于通过 CSS 统一控制。
3. **旋转动画**：`spin` 属性仅控制动画的启停，动画本身由 CSS 实现。
4. **性能考虑**：大量使用图标时，建议按需引入需要的图标，避免加载整个图标库。

## 组件属性与事件

下方涵盖了 `NueIcon` 组件所有的可用属性与事件。

### 属性

| 属性        | Type                 | 默认值  | 说明                           |
| ----------- | -------------------- | ------- | ------------------------------ |
| `name`      | `string`             | -       | 图标名称                       |
| `size`      | `string`             | -       | 图标大小，接受 CSS FontSize 值 |
| `color`     | `string`             | -       | 图标颜色，接受 CSS Color 值    |
| `spin`      | `boolean`            | `false` | 是否旋转                       |
| `spinSpeed` | `string`             | `2s`    | 旋转速度，接受 CSS Duration 值 |
| `hinting`   | `boolean`            | `true`  | 是否启用字体抗锯齿（hinting）  |
| `theme`     | `string \| string[]` | -       | 主题样式（继承自 GlobalProps） |