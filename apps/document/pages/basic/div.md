# FlexDiv 弹性盒

使用 `Flex` 布局方式的弹性盒组件。

## 基础用法

使用 `NueDiv` 包裹使用。

默认的布局方向 `flex-direction` 为 `row`。

::: preview
demo-preview=../../demos/div/basic.vue
:::

## 垂直排列

通过属性 `vertical` 设置布局方向 `flex-direction` 为 `column`。属性接收 `boolean` 类型。

::: preview
demo-preview=../../demos/div/vertical.vue
:::

## 设置元素对齐方式

对齐方式拥有主轴和副轴两个方向，具体应用到 CSS 的 `justify-content` 和 `align-items` 两个属性。

通过 `justify` 和 `align` 属性设置主轴和副轴的对齐方式。它们的值类型都为 `string`，可选值与 CSS 一致。

::: preview
demo-preview=../../demos/div/justify-align.vue
:::

## 断行

通过 `wrap` 属性设置是否断行，具体应用到 CSS 的 `flex-wrap` 样式。

::: preview
demo-preview=../../demos/div/wrap.vue
:::

## 设置元素分隔符

通过 `divider` 属性设置元素之间的分隔符。

`divider` 属性接收 `string`、`number` 以及 `object` 类型。

::: tip
当 `divider` 为 `object` 类型时，所插入的分隔符会渲染为 `NueDivider` 组件，其中的键值对将被作为 `NueDivider` 的 props。
组件具体的 props 请参考 [`NueDivider`](/pages/others/divider.html) 文档。
:::

::: preview
demo-preview=../../demos/div/divider.vue
:::
