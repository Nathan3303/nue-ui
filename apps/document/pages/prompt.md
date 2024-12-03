# Prompt 输入确认框

用于采集少量用户输入的弹出框，并提供确认和取消按钮。

## 基础使用

通过库中暴露的 `NuePrompt` 方法创建输入弹框，无需编写页面结构即可实现少量采集用户输入。

`NuePrompt` 方法接收一个 `options` 对象作为参数，其中的参数用于设置输入确认框。

通过 `title` 属性为输入确认框标题。

通过 `placeholder` 属性为输入框的占位符。

::: preview
demo-preview=../demos/prompt/basic.vue
:::

## 更换输入框类型

通过 `input-type` 属性可以设置输入框的类型，接收 `string` 类型的值。

::: tip
由于组件内部进行了复用，因此 `type` 属性的可选值为 `NueInput` 组件 `type` 属性的可选值。在 `NueInput` 组件文档中的 [基础用法](/pages/input.html#基础用法) 一节中可以查看具体的可选值。
:::

::: preview
demo-preview=../demos/prompt/input-type.vue
:::

## 设置输入验证器

通过 `validator` 属性可以设置输入框的验证器，接收一个函数作为参数。

验证器函数接收一个参数，即输入框的值，最终需要返回一个布尔值以表示输入的数据是否合法。

::: preview
demo-preview=../demos/prompt/validator.vue
:::

## 设置确认前的回调函数

通过 `before-confirm` 属性可以设置输入确认前的回调函数，接收一个函数作为参数。

回调函数接收一个参数，即输入框的值，可以对输入的数据进行处理，然后返回处理后的数据。

::: preview
demo-preview=../demos/prompt/before-confirm.vue
:::
