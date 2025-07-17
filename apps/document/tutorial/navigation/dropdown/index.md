# Dropdown 下拉菜单

下拉菜单（Dropdown）是一种常见的交互组件，在页面中提供一个下拉菜单，用户可以从中选择某项操作或选项。

## 基础用法

通过标签 `<NueDropdown>` 创建一个基本的下拉菜单组件。

### 触发按钮文本

通过属性 `trigger-text` 设置下拉菜单触发按钮中的文字。

::: preview
demo-preview=./basic.vue
:::

### 禁用状态

通过属性 `disabled` 设置下拉菜单组件的禁用状态。

::: preview
demo-preview=./disabled.vue
:::

### 大小

通过属性 `size` 设置下拉菜单组件的大小。属性可选值为 `small` 和 `large`。

::: preview
demo-preview=./size.vue
:::

### 菜单对齐方式

通过 `placement` 属性设置提示位置，可选值为
`[direction:top|bottom|left|right]-[alignment:start|center|end]`。其中 `direction` 表示提示框出现的位置，
`alignment` 表示提示框相对于触发元素的对齐方式。

::: preview
demo-preview=./placement.vue
:::

## 菜单选项事件处理

通过事件 `onExecute` 处理下拉菜单选项的点击事件。

通过给下拉菜单中的任意元素添加 `data-executeid` 属性来指定可执行选项的动作标识，并在 `execute` 事件所传递的
`id` 参数中获取该标识，根据标识执行对应的动作。

:::tip
在组件内部默认会为下拉菜单中的拥有 `nue-dropdown-option` 类名或标签为 `<li>`
的元素应用简单的下拉选项预设样式，若不希望应用对应样式可以采用其他元素或重写样式。
:::

::: preview
demo-preview=./execute.vue
:::

### 执行后关闭下拉菜单

通过属性 `close-when-executed` 设置下拉菜单在事件 `onExecute` 执行后自动收起。

::: preview
demo-preview=./close-when-executed.vue
:::

## 背景层穿透

默认情况下在下拉菜单打开时不允许同时点击其他元素，需要先将下拉菜单关闭。背景层穿透功能用于实现在菜单打开时同时可点击其他元素。

通过属性 `transparent` 启用背景层穿透。

::: preview
demo-preview=./transparent.vue
:::

## 自定义下拉菜单的触发元素

通过插槽 `#trigger` 自定义下拉菜单的触发元素。通过插槽传递出来的 `trigger` 方法来控制下拉菜单的显示与隐藏。

::: preview
demo-preview=./trigger-slot.vue
:::

## 下拉列表嵌套

::: preview
demo-preview=./nested.vue
:::
