# Avatar 头像

用于展示用户头像或者其他图形。

## 基础使用

通过 `NueAvatar` 组件展示用户头像

通过 `src` 属性指定头像图片的 URL。

通过 `rounded` 属性设置组件形状，接收 `boolean` 类型的值。

::: preview
demo-preview=../demos/avatar/basic.vue
:::

## 设置大小

通过 `size` 属性设置大小，属性接收一个 `string` 类型的值，该值会被直接作为 CSS 的 `width` 和 `height` 值。

::: preview
demo-preview=../demos/avatar/size.vue
:::

## 设置图标

通过 `icon` 属性设置头像的图标，该属性接受一个 `string` 类型的值。

::: tip
当 `src` 属性所指定的 **图片无法显示时** 或者 **未指定时**，`icon` 属性将会生效。
:::

::: preview
demo-preview=../demos/avatar/icon.vue
:::

## 设置图片填充方式

通过 `fit` 属性设置图片填充方式。

`fit` 属性接受 `fill`、`contain`、`cover*`、`none` 以及 `scale-down` 五个可选值，分别对应填充、包含、覆盖、不填充、缩小填充五种方式。

::: preview
demo-preview=../demos/avatar/fit.vue
:::
