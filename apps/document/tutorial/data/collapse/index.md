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

### 内容部分的高度控制 <Badge text="v 1.7.27 +" />

通过 `min-height` 和 `max-height` 属性设置面板的最小高度和最大高度。

::: preview
demo-preview=./min-max-height.vue
:::

## 注意事项

1. **手风琴模式**：`accordion` 属性设置为 `true` 时，同时只能展开一个面板。
2. **双向绑定**：`v-model` 绑定的值是展开面板的 `name` 组成的数组。
3. **标识符**：`name` 属性用于标识每个面板，建议设置具有唯一性的值。
4. **高度控制**：`minHeight` 和 `maxHeight` 用于控制面板内容区域的高度。

## 组件属性与事件

下方涵盖了 `NueCollapse` 和 `NueCollapseItem` 组件所有的可用属性与事件。

### NueCollapse 属性

| 属性         | Type                                            | 默认值  | 说明                           |
| ------------ | ----------------------------------------------- | ------- | ------------------------------ |
| `modelValue` | `string[]`                                      | -       | 展开面板的 name 数组           |
| `accordion`  | `boolean`                                       | `false` | 手风琴模式（同时只能展开一个） |
| `theme`      | `string \| string[] \| Record<string, boolean>` | -       | 主题样式（继承自 GlobalProps） |

### NueCollapse 事件

| 事件                | 参数              | 说明             |
| ------------------- | ----------------- | ---------------- |
| `update:modelValue` | `value: string[]` | 展开状态变化事件 |

### NueCollapseItem 属性

| 属性        | Type                                            | 默认值 | 说明                           |
| ----------- | ----------------------------------------------- | ------ | ------------------------------ |
| `title`     | `string`                                        | -      | 面板标题                       |
| `name`      | `string`                                        | -      | 面板唯一标识符                 |
| `minHeight` | `string`                                        | -      | 最小高度                       |
| `maxHeight` | `string`                                        | -      | 最大高度                       |
| `theme`     | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |
