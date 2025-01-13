# Drawer 抽屉

抽屉组件用于在屏幕上显示临时内容，从而提供额外的操作或信息。

## 基本用法

通过 `NueDrawer` 组件创建一个抽屉。

需要传入一个 `v-model:visible` 的响应式属性，用于控制抽屉的显示和隐藏。

通过 `title` 属性设置抽屉的标题，接受一个 `String` 类型的值。

::: preview
demo-preview=../../demos/drawer/basic.vue
:::

## 打开方向

通过属性 `open-from` 设置抽屉组件打开的方向。

`open-form` 属性值必须是 `left`、`right*`、`top`、`bottom` 中的一个。

-   `*` 表示属性默认值。

::: preview
demo-preview=../../demos/drawer/open-from.vue
:::

## 自定义头部、主体以及底部

通过指定插槽完成对应内容的自定义。

-   `header` 插槽用于自定义抽屉的头部内容。头部插槽可以解构出 `close` 方法用于关闭抽屉。
-   `default` 默认插槽用于自定义抽屉的主体内容。
-   `footer` 插槽用于自定义抽屉的底部内容。

::: preview
demo-preview=../../demos/drawer/slots.vue
:::

## 展开范围以及最小展开范围

通过属性 `span` 和 `min-span` 分别设置抽屉的展开范围以及最小展开范围。

`span` 和 `min-span` 属性接收 `string` 类型的值，具体应用到 CSS 的 `width`、`height`、`min-width`、`min-height` 这些属性上。

::: tip
由于抽屉的开启方向可以是上下左右四个方向，因此在上下方向时，`span` 和 `min-span` 分别指的是高度和最小高度；在左右方向时，`span` 和 `min-span` 分别指的是宽度和最小宽度。
:::

::: tip
`span` 和 `min-span` 的效果会在视口发生变化时体现出来。
:::

::: preview
demo-preview=../../demos/drawer/span.vue
:::

## 仅允许通过关闭按钮关闭

抽屉组件默认允许点击抽屉以外的区域触发关闭动作，通过属性 `close-by-button-only` 设置仅允许通过关闭按钮关闭。

::: preview
demo-preview=../../demos/drawer/close-by-button-only.vue
:::

## 设置关闭前的回调函数

通过属性 `before-close` 设置关闭前的回调函数，该函数会在抽屉关闭之前执行。

回调函数在被调用时会传入一个 `finish` 函数，只有在调用该函数后才会执行抽屉的关闭操作。

::: preview
demo-preview=../../demos/drawer/before-close.vue
:::

## 连续打开多个抽屉

抽屉组件可以连续使用，在同一个页面上可以打开多个抽屉，这些抽屉元素会根据打开顺序进行显示而非文档结构。

::: preview
demo-preview=../../demos/drawer/open-more.vue
:::
