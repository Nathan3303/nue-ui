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

## 注意事项

1. **图片设置**：`imageSize` 属性用于设置图片的显示大小，接受 CSS 宽度值。
2. **描述文本**：`description` 属性和 `#description` 插槽可以同时使用，插槽内容会覆盖属性值。
3. **自定义图片**：可以使用 `imageSrc` 属性设置自定义的空状态图片。

## 组件属性与事件

下方涵盖了 `NueEmpty` 组件所有的可用属性与事件。

### 属性

| 属性          | Type                                            | 默认值 | 说明                           |
| ------------- | ----------------------------------------------- | ------ | ------------------------------ |
| `imageSrc`    | `string`                                        | -      | 自定义图片路径                 |
| `imageSize`   | `string`                                        | -      | 图片大小，接受 CSS 宽度值      |
| `description` | `string`                                        | -      | 描述文本                       |
| `theme`       | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |
