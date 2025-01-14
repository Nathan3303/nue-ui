# 图标

用于生成一个图标。

## 基础用法

通过 `NueIcon` 标签生成图标。

通过 `name` 属性指定生成的图标。

::: preview
demo-preview=../demos/icon/basic.vue
:::

## 大小和颜色

通过 `size` 属性指定图标大小，接受 CSS FontSize 的合法值，默认为 `16px` 。

通过 `color` 属性指定图标颜色，接受 CSS Color 的合法值，默认为字体颜色。

::: preview
demo-preview=../demos/icon/color-size.vue
:::

## 图标自旋转

通过 `spin` 属性指定图标是否自旋转，接受布尔类型的值，默认为 `false` 。

通过 `spin-speed` 属性指定图标的旋转速度，接受 CSS Time 的合法值，默认为 `2s` 。

::: preview
demo-preview=../demos/icon/spin.vue
:::

## 所有图标

下方表格列出了所有可用的图标名称，通过 `name` 属性指定即可使用对应图标。

::: preview
demo-preview=../demos/icon/icons.vue
:::
