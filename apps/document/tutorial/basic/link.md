# Link 链接

文字超链接

## 基础用法

通过 `NueLink` 组件可以实现文字超链接的功能。

通过 `href` 属性设置链接的目标地址。

::: preview
demo-preview=../demos/link/basic.vue
:::

## 禁用状态

通过 `disabled` 属性可以禁用链接。

::: preview
demo-preview=../demos/link/disabled.vue
:::

## 链接图标

通过 `icon` 属性可以给链接添加图标，接受 `string` 类型的值，表示图标的类名。

::: preview
demo-preview=../demos/link/icon.vue
:::

## 添加自定义类名以及使用预设主题

通过 `theme` 属性可以给按钮添加自定义的类名，接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

预设主题的使用依然是通过 `theme` 属性设置。预设主题包括 `btnlike`。

::: preview
demo-preview=../demos/link/theme.vue
:::

## 使用路由连接

通过 `route` 属性可以实现 VueRouter 路由。

`route` 属性接收 `string` 或 `{ name: string, params?: any, query?: any }` 类型的值。

::: tip

- `route` 属性的值会被转换为 `to` 用于匹配 VueRouter 的路由，因此当 `route` 属性存在时，`href` 属性失效。
- 组件标签会变为使用 `<router-link>`，以实现路由跳转。
- 当使用 `route` 属性后，链接的激活状态会被启用，若想要修改激活状态的样式，通过 `nue-link--actived`
  类名进行样式修改，目前不支持指定其他的激活状态类名。
- 通过 `theme` 属性能够模拟激活状态的样式。

:::

::: preview
demo-preview=../demos/link/route.vue
:::
