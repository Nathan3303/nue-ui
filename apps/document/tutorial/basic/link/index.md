# Link 链接

用于超链接或路由跳转。

## 基础用法

通过组件标签 `NueLink` 声明一个超链接组件。

### 链接目标

通过属性 `href` 设置链接目标地址。

::: preview
demo-preview=./basic.vue
:::

### 链接跳转方式

通过属性 `target` 设置链接跳转方式。默认情况下，组件的跳转方式与 `<a>` 标签一致，即 `_self` 当前标签页跳转。

::: preview
demo-preview=./target.vue
:::

### 禁用状态

通过属性 `disabled` 禁用链接组件。

::: preview
demo-preview=./disabled.vue
:::

### 链接图标

通过 `icon` 属性可以给链接添加图标。

::: preview
demo-preview=./icon.vue
:::

## 路由连接

通过 `route` 属性实现 VueRouter 路由跳转。`route` 属性接收 `string` 或
`{ name: string, params?: any, query?: any }` 类型的值。

当 `route` 属性存在时，组件渲染会使用 `<RouterLink>` 而非 `<a>` 标签；属性值会被转换为 `to` 用于匹配
VueRouter 的路由，此时的 `href` 属性将失效（即使存在）。

激活状态会在 `route` 属性存在时启用，主题名称为 `actived`。若想要修改激活状态的样式，通过
`nue-link--actived` 类名进行样式修改，目前不支持自定其他的激活状态类名。

::: preview
demo-preview=./route.vue
:::

## 链接样式

链接组件支持多种样式定制，可以通过主题或直接使用 CSS 类名进行样式修改。

### 默认样式

默认情况下，链接会显示为带有下划线的文本样式。

### 无下划线样式

可以通过自定义主题移除下划线，实现更简洁的视觉效果。

## 扩展插槽 <Badge text="1.8.53 以上版本" type="warning" />

通过插槽 `#prepend` 和 `#append` 分别可以在链接文字的前方和后方插入自定义元素。

::: preview
demo-preview=./slots.vue
:::

## 注意事项

1. **路由跳转**：`route` 属性需要项目配置了 VueRouter 才能使用，否则会导致渲染错误。
2. **优先级**：当同时设置 `href` 和 `route` 属性时，`route` 优先，`href` 会失效。
3. **激活状态**：激活状态仅在 `route` 属性存在时生效，CSS 类名为 `nue-link--actived`。
4. **禁用状态**：禁用状态的链接不可点击，但仍然可以获取焦点（无障碍考虑）。
5. **图标位置**：图标默认显示在链接文字的前方。

## 组件属性与事件

下方涵盖了 `NueLink` 组件所有的可用属性与事件。

### 属性

| 属性       | Type                                            | 默认值 | 说明                           |
| ---------- | ----------------------------------------------- | ------ | ------------------------------ |
| `href`     | `string`                                        | -      | 链接地址                       |
| `disabled` | `boolean`                                       | -      | 是否禁用                       |
| `icon`     | `string`                                        | -      | 图标名称                       |
| `route`    | `Record<string, unknown> \| string`             | -      | 路由对象，用于 VueRouter 跳转  |
| `flex`     | `string`                                        | -      | 弹性布局                       |
| `align`    | `string`                                        | -      | 对齐方式                       |
| `size`     | `string`                                        | -      | 尺寸                           |
| `title`    | `string`                                        | -      | 标题（原生 title 属性）        |
| `theme`    | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |