# Collapse 折叠面板

实现内容区域的折叠和展开，用于收纳长内容。

## 基础用法

通过 `NueCollapse` 和 `NueCollapseItem` 组件，实现内容区域的折叠和展开。

### 面板状态

在 `NueCollapse` 折叠面板容器组件中，允许通过 `v-model` 绑定一个响应式数据用于记录或控制每个面板的展开状态，值类型为
`string[]` 或 `string`（手风琴模式）。其中会记录当前所展开的 `NueCollapseItem` 折叠面板组件的标识符，该标识符可以在
`NueCollapseItem` 折叠面板组件上通过 `name` 属性指定。

::: preview
demo-preview=./model-value.vue
:::

### 手风琴模式

通过属性 `accordion` 设置是否开启手风琴模式，开启后有且只能有一个面板可以被展开。

::: tip
手风琴模式下仅有一个面板能够内展开，因此 `v-model` 的值只会是 `string` 类型，若传入 `string[]` 类型，最终也会被修改为
`string` 类型。
:::

::: preview
demo-preview=./accordion.vue
:::

### 自定义标题

通过 `title` 属性自定义面板的标题。

也可以通过 `header` 这个作用域插槽自定义面板的头部。解构出来的 `collpase` 函数操作该面板的展开和收起；`state` 获取面板展开状态。

::: preview
demo-preview=./header-slot.vue
:::