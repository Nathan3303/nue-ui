# Collapse 折叠面板

实现内容区域的折叠和展开，用于收纳长内容。

## 基础用法

通过 `NueCollapse` 和 `NueCollapseItem` 组件，实现内容区域的折叠和展开。

::: preview
demo-preview=../demos/collapse/basic.vue
:::

## 记录面板状态

通过 `v-model` 绑定一个响应式数据用于记录或控制每个面板的展开状态，该数据可以是 `string` 或 `string[]` 类型的值。

通过 `name` 属性为每个面板指定一个标识符，用于记录。当面板展开时，对应的 `name` 值会被添加到该数组中，当面板收起时，对应的
`name` 值会被从数组中移除。

::: tip
`v-model` 值为 `string` 类型仅支持在手风琴模式下使用，在非手风琴模式下传入 `string` 类型则会被修改为 `string[]` 类型。
:::

::: preview
demo-preview=../demos/collapse/model-value.vue
:::

## 手风琴模式

通过 `accordion` 属性设置是否开启手风琴模式，开启后有且只能有一个面板可以被展开。

::: tip
手风琴模式下仅有一个面板能够内展开，因此 `v-model` 的值只会是 `string` 类型，若传入 `string[]` 类型，最终也会被修改为
`string` 类型。
:::

::: preview
demo-preview=../demos/collapse/accordion.vue
:::

## 自定义标题

通过 `title` 属性自定义面板的标题。

也可以通过 `header` 这个作用域插槽自定义面板的头部。解构出来的 `collpase` 函数操作该面板的展开和收起；`state` 获取面板展开状态。

::: preview
demo-preview=../demos/collapse/header.vue
:::

## 使用预设或自定义主题

通过 `theme` 属性设置主题。

::: preview
demo-preview=../demos/collapse/theme.vue
:::
