# Container 布局容器

用于快速搭建常见的页面布局。

## 基础使用

通过组件 `NueContainer`、`NueHeader`、`NueMain` 以及 `NueFooter` 配合使用形成常见布局。

::: preview
demo-preview=../demos/container/basic.vue
:::

## 内部子组件

### 组件 `NueHeader`

`NueHeader` 组件为容器头部，默认高度为 `60px`，可以通过属性 `height` 设置高度，接收 CSS `height` 属性值类型。

组件拥有四个具名插槽，分别是 `logo`、`nav`、`default`、`ops` 以及 `user`，对应常见头部的 “网站Logo区域”、“导航链接区域”、“中间区域”、“搜索或操作按钮区域” 以及 “用户信息区域”。

::: preview
demo-preview=../demos/container/header.vue
:::

### 组件 `NueMain`

`NueMain` 组件为容器主体，高度根据 `NueHeader` 以及 `NueFooter` 组件的高度自动计算，

组件拥有两个具名插槽，分别是 `aside` 以及 `content`，对应常见主体的 “侧边栏区域” 以及 “内容区域”。

通过属性 `aside-width`、`aside-min-width`、`aside-max-width` 可以设置侧边栏区域的宽度，接收 CSS `width` 属性值类型。

通过属性 `allow-resize-aside` 可以设置是否允许调整侧边栏区域的宽度，默认为 `false`。

::: tip

- 若 `allow-resize-aside` 设置为 `true` ，则侧边栏区域会在鼠标悬停时显示一个可调整的滑块，用户可以通过拖动滑块调整侧边栏区域的宽度，但侧栏区域的宽度依然会受到 `aside-min-width`、`aside-max-width` 的限制。
:::

::: preview
demo-preview=../demos/container/main.vue
:::

### 组件 `NueFooter`

`NueFooter` 组件为容器底部，默认高度为 `60px`，可以通过属性 `height` 设置高度，接收 CSS `height` 属性值类型。

组件拥有默认插槽。

::: preview
demo-preview=../demos/container/footer.vue
:::
