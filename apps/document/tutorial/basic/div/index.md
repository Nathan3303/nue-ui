# Div 盒组件

盒组件是对基本元素 `div` 和 `flex` 流式布局的封装。

## 基础用法

通过标签 `NueDiv` 声明一个盒组件。

盒组件默认的布局方向为水平，排列间距为 `1rem`。

::: preview
demo-preview=./basic.vue
:::

## 垂直排列

通过属性 `vertical` 设置布局方向为垂直，具体应用为 `flex-direction` 为 `column`。

::: preview
demo-preview=./vertical.vue
:::

## 对齐方式

流式布局的对齐方式拥有主轴和副轴两个方向，具体应用到 CSS 的 `justify-content` 和 `align-items` 两个属性。

通过属性 `justify` 和 `align` 设置主轴和副轴的对齐方式，值类型同 CSS 属性值。

::: preview
demo-preview=./justify-align.vue
:::

## 溢出断行

通过属性 `wrap` 设置是否在溢出时断行，具体应用到 CSS 的 `flex-wrap` 样式，属性值类型同 CSS
属性值，默认产生断行。

::: preview
demo-preview=./wrap.vue
:::
