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
