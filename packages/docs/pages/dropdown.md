# Dropdown 下拉菜单

下拉菜单（Dropdown）是一种常见的交互组件，在页面中提供一个下拉菜单，用户可以从中选择某项操作或选项。

## 基本使用

通过 `NueDropdown` 组件创建一个基本的按钮式的下拉菜单。

通过 `text` 属性设置下拉菜单触发按钮中的文字。

::: preview
demo-preview=../demos/dropdown/basic.vue
:::

## 设置菜单的对齐方式

通过 `placement` 属性设置下拉菜单的对齐方式，可选值为 `top-start`、`top-center`、`top-end`、`bottom-start`、`bottom-center` 以及 `bottom-end`。

::: preview
demo-preview=../demos/dropdown/placement.vue
:::

## 菜单选项事件处理

通过事件 `execute` 处理下拉菜单选项的点击事件。

在 `dropdown` 插槽内，通过给对应的元素添加 `data-executeid` 属性来指定可执行选项的动作标识，并在 `execute` 事件所传递的 `id` 参数中获取该标识，根据标识执行对应的动作。

::: preview
demo-preview=../demos/dropdown/execute.vue
:::

## 自定义下拉菜单的触发元素

通过默认插槽指定下拉菜单的触发元素。

通过插槽传递出来的 `clickTrigger` 方法来控制下拉菜单的显示。

::: preview
demo-preview=../demos/dropdown/click-trigger.vue
:::
