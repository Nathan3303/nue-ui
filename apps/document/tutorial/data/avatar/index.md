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

## 注意事项

1. **优先级**：图片加载成功时显示图片；图片加载失败时显示 `icon`；两者都没有时显示默认插槽内容。
2. **填充方式**：`fit` 属性控制图片如何适应容器，类似于 CSS `object-fit` 属性。
3. **尺寸单位**：`size` 属性接受任何有效的 CSS 宽度/高度值。
4. **错误处理**：可以通过 `error` 事件监听图片加载失败，进行错误处理或显示占位图。

## 组件属性与事件

下方涵盖了 `NueAvatar` 组件所有的可用属性与事件。

### 属性

| 属性      | Type                                                       | 默认值  | 说明                           |
| --------- | ---------------------------------------------------------- | ------- | ------------------------------ |
| `src`     | `string`                                                   | -       | 图片地址                       |
| `icon`    | `string`                                                   | -       | 备用图标（图片加载失败时显示） |
| `size`    | `string`                                                   | -       | 尺寸，接受 CSS 宽度/高度值     |
| `title`   | `string`                                                   | -       | 标题（原生 title 属性）        |
| `fit`     | `'fill' \| 'cover' \| 'contain' \| 'none' \| 'scale-down'` | -       | 图片填充方式                   |
| `rounded` | `boolean`                                                  | `false` | 是否圆角                       |
| `alt`     | `string`                                                   | -       | 图片替代文本                   |
| `theme`   | `string \| string[] \| Record<string, boolean>`            | -       | 主题样式（继承自 GlobalProps） |

### 事件

| 事件    | 参数    | 说明             |
| ------- | ------- | ---------------- |
| `error` | `Event` | 图片加载失败事件 |
