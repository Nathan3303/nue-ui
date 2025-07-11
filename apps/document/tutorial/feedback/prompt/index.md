# Prompt 输入确认框

用于采集少量用户输入的对话框，并提供确认和取消按钮。

## 基础用法

通过组件库中暴露的 `NuePrompt` 方法创建输入对话框，无需编写页面结构即可实现少量采集用户输入。

`NuePrompt` 方法接收一个 `options` 对象作为参数，参数中的成员用于设置输入对话框的属性。

- `title` 设置输入确认框标题。
- `placeholder` 设置输入框的占位符。
- `confirmButtonText` 设置确认按钮的文字。
- `cancelButtonText` 设置取消按钮的文字。

::: preview
demo-preview=./basic.vue
:::

## 更换输入类型

通过成员 `input-type` 设置输入框的类型。由于组件内部进行了复用，因此 `type` 可选值包括 `<NueInput>`
组件的 `type` 属性可选值以及 `textarea`。当 `type` 值为 `textarea` 时，输入组件会渲染为
`<NueTextarea>`。

::: preview
demo-preview=./input-type.vue
:::

## 输入验证器

通过成员 `validator` 设置输入框的验证器，接收一个同步或者异步函数。验证器函数允许接收一个参数，即输入框的值，最终需要返回一个布尔值以表示输入的数据是否合法。

::: preview
demo-preview=./validator.vue
:::

## 确认前的回调函数

通过成员 `before-confirm` 设置输入确认前的回调函数，接收一个函数作为参数。回调函数接收一个参数，即输入框的值，可以对输入的数据进行处理，然后返回处理后的数据。

::: preview
demo-preview=./before-confirm.vue
:::
