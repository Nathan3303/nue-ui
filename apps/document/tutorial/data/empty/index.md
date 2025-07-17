# Empty 空状态

当某个区域的内容为空时，显示一个“空状态”的占位提示信息。

## 基础用法

通过标签 `NueEmpty` 生成空状态组件。

### 描述

使用属性 `description` 属性或者插槽 `#description` 设置占位文本。

::: preview
demo-preview=./description.vue
:::

### 图片路径

通过属性 `imageSrc` 设置自定义图片的路径。

::: preview
demo-preview=./image-src.vue
:::

### 图片大小

通过属性 `imageSize` 设置图片大小。属性类型为 `string`，支持 CSS `width` 单位值。

::: tip
由于属性 `imageSize` 不支持分别设置宽高，所有图片大小仅实现缩放效果。若要同时设置宽度和高度（且不同），可以使用
`theme` 属性进行自定义样式的应用。
:::

::: preview
demo-preview=./image-size.vue
:::
