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
