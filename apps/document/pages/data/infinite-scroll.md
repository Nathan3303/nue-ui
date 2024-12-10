# Infinite Scroll 无限滚动

无限滚动组件实现了滚动到底部时自动加载更多内容的功能。

## 基础用法

通过 `NueInfiniteScroll` 组件可以实现无限滚动功能。

使用组件时需要绑定事件 `load-more` 的执行函数，事件会在滚动到加载阈值时触发。

加载阈值表示当前滚动位置与列表底部的距离，可以通过属性 `trigger-height` 设置，默认为 `150px` 。

通过 `height` 属性设置可视区域的高度，默认为 `100%` 。

::: preview
demo-preview=../../demos/infinite-scroll/basic.vue
:::

## 加载状态和禁用状态

通过 `loading` 属性设置加载状态，当 `loading` 为 `true` 时，组件会显示加载文字，通过 `loading` 插槽可以自定义加载元素。

通过 `disabled` 属性设置禁用状态，当 `disabled` 为 `true` 时，组件不会触发加载事件。

::: preview
demo-preview=../../demos/infinite-scroll/loading-disabled.vue
:::
