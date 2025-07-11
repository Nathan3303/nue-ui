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
