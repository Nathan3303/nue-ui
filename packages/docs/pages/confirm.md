# Confirm 消息确认框

消息确认框用于确认用户的操作，常用于删除、确认等场景。

## 基本用法

通过库中的 `NueConfirm` 方法可以快速创建消息确认框。

`NueConfirm` 方法接收一个 `options` 对象作为参数，其中的 `content` 用于指定确认框的内容。

::: preview
demo-preview=../demos/confirm/basic.vue
:::

## 自定义标题文字

通过 `title` 属性来自定义确认框的标题文字。

::: preview
demo-preview=../demos/confirm/title.vue
:::

## 自定义按钮文字

通过 `confirmButtonText` 和 `cancelButtonText` 属性来自定义确认框的按钮文字。

::: preview
demo-preview=../demos/confirm/button-text.vue
:::
