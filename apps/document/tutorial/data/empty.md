# Empty 空状态

当某个区域的内容为空时，显示一个“空状态”的占位提示信息。

## 基本使用

通过标签 `NueEmpty` 生成一个“空状态”的占位提示信息。

使用属性 `description` 属性或者插槽 `#description` 设置占位文本。

::: preview
demo-preview=../../demos/empty/basic.vue
:::

## 自定义图片

通过属性 `imageSrc` 设置自定义图片的路径，接受 String 类型。

通过属性 `imageSize` 设置图片大小，接受 String 类型，为 CSS 单位值。

::: tip
目前的图片在内部样式中设置了 1 的宽高比，因此不能够自由设置图片的宽度和高度，但这项功能会在后面的版本中实现，届时的 `imageSize` 属性能够接受 String 数组类型，设置图片的宽度和高度，例如 `:image-size="['100px', '200px']"`。
:::

::: preview
demo-preview=../../demos/empty/image.vue
:::

## 自定义主题

通过 `theme` 属性设置自定义样式。

::: preview
demo-preview=../../demos/empty/theme.vue
:::
