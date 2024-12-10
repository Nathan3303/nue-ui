# Container 布局容器

用于快速搭建常见的页面布局。

## 容器组件 `NueContainer`

通过组件 `NueContainer` 以及下属组件 `NueHeader`、`NueMain` 和 `NueFooter` 配合使用形成常见布局。

::: tip
通过属性 `theme` 可以使用内置或自定义主题，目前内置有 `vertical` 和 `horizontal` 两个可选主题。
:::

::: preview
demo-preview=../../demos/container/basic.vue
:::

::: preview
demo-preview=../../demos/container/basic2.vue
:::

::: preview
demo-preview=../../demos/container/basic3.vue
:::

## 头部组件 `NueHeader`

`NueHeader` 组件为容器头部，默认宽度为 `100%`、高度为 `70px`，通过属性 `width` 和 `height` 修改，接受 CSS 宽高值。

`NueHeader` 组件拥有四个具名插槽，分别是 `logo`、`nav/navigators`、`ops/actions` 以及 `user`，分别对应常见站点头部中的
“Logo区域”、“导航链接区域”、“操作按钮区域” 以及 “用户（头像）区域”。通过这些具名插槽可以快速地定制出常见的站点头部。当然我们也可以通过默认的插槽来定制头部，所有内容将会挂载在
`default` 插槽中。

下方是完全一致的两个示例，第一个示例通过具名插槽定制了头部，第二个示例通过默认插槽定制了头部。

::: preview
demo-preview=../../demos/container/header.vue
:::

::: preview
demo-preview=../../demos/container/header2.vue
:::

## 主体组件 `NueMain`

`NueMain` 组件为容器主体，默认的宽高为撑满容器中的剩余宽度和高度。

`NueMain` 组件拥有三个具名插槽，分别是 `aside`、`content` 以及 `outline`，分别对应常见站点主体的 “侧边栏区域”、“内容区域” 以及
“右侧（大纲）区域”。

通过属性 `asideWidth` 和 `outlineWidth` 可以设置侧边栏和右侧区域的起始宽度，接受 CSS 宽度值类型。

::: preview
demo-preview=../../demos/container/main-basic.vue
:::

### 关于可变区域

可以看到上方的示例中，`aside` 和 `outline` 区域都提供了滑块以便用户能够手动改变这两个区域的大小，因此这两个区域属于可变区域。

宽度可变是默认开启的功能，通过将属性 `allowResizeAside` 和 `allowResizeOutline` 置为 `false` 以关闭此功能。

::: tip
在后续的版本中，属性 `allowResizeAside` 和 `allowResizeOutline` 的默认值可能设置为 `false`，以此更符合属性名称语义。
:::

::: preview
demo-preview=../../demos/container/main-resize.vue
:::

### 关于可变区域的三个状态

在按下并滑动宽度变化滑块时，区域在默认情况下会出现三种状态，分别是 “正常”、“折叠” 以及 “隐藏” 状态。“正常”
态是指在区域最大宽度和最小宽度之间变化的状态、“折叠” 态是指区域在最小宽度以及 `70px` 之间的状态、而当区域宽度小于 `32px`
时会变为 “隐藏” 态。

::: tip
当区域（侧边栏区域）处于 “折叠” 态时，其中的 `NueLink` 链接组件会被设置为仅图标的样式，若没有设置图标，则显示文字部分的前一两个字，因此推荐为侧边栏中的链接组件设置图标属性。
:::

通过属性 `asideMinWidth` 和 `asideMaxWidth` 可以设置 `aside` 区域的最大宽度和最小宽度，`outline` 区域也有着同样的属性：
`outlineMinWidth` 和 `outlineMaxWidth` 。

通过属性 `allowCollapseAside` 和 `allowHideAside` 能够控制 “折叠” 和 “隐藏” 状态是否允许，`outline` 区域类似。

通过下方的示例能够了解这些属性的具体应用。

::: preview
demo-preview=../../demos/container/main-collapse.vue
:::

## 底部组件 `NueFooter`

`NueFooter` 组件为容器底部组件，与头部组件相同，默认宽度为 `100%`、高度为 `70px`，通过属性 `width` 和 `height` 修改，接受 CSS
宽高值。

`NueFooter` 组件仅设有默认插槽。

::: preview
demo-preview=../../demos/container/footer.vue
:::

## 容器嵌套

`NueContainer` 组件支持嵌套，即在一个容器中再嵌套一个容器，形成嵌套布局。通常情况下，嵌套的容器会是用在 `NueMain` 组件的
`content` 插槽中。

::: tip
关于嵌套容器，需要对其指定 `theme` 属性。`inner` 主题作为嵌套容器的修补主题，因此通常嵌套容器的 `theme` 属性值是
`theme="vertical,inner"` 或者 `theme="horizontal,inner"`。
:::

::: preview
demo-preview=../../demos/container/nested.vue
:::
