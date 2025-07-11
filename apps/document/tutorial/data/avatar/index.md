# Avatar 头像

用于展示用户头像或者其他图形。

## 基础用法

通过标签 `NueAvatar` 生成头像。

### 图片 URL

通过属性 `src` 指定头像图片的 URL。

::: preview
demo-preview=./url.vue
:::

### 大小

通过属性 `size` 设置大小。属性类型为 `string`，支持 CSS `width` 和 `height` 值。

::: preview
demo-preview=./size.vue
:::

### 图标

通过属性 `icon` 设置头像的图标，该属性接受一个 `string` 类型的值。

当属性 `src` 未指定或者所指定的图片无法显示时，`icon` 属性生效。

::: preview
demo-preview=./icon.vue
:::

### 文本

通过默认插槽插入内容。

当属性 `src` 未指定或者所指定的图片无法显示，并且 `icon` 又同时未指定时，插槽内容将会生效。

::: preview
demo-preview=./inner-text.vue
:::

## 设置图片填充方式

通过 `fit` 属性设置图片填充方式。

`fit` 属性接受 `fill`、`contain`、`cover*`、`none` 以及 `scale-down` 五个可选值，
分别对应填充、包含、覆盖、不填充、缩小填充五种方式。

::: preview
demo-preview=./fit.vue
:::
