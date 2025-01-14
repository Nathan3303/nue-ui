# Container 布局容器

用于快速搭建常见的页面布局。

## 容器组件 `NueContainer`

通过组件 `NueContainer` 以及下属组件 `NueHeader`、`NueMain` 和 `NueFooter` 配合使用形成常见布局。

::: tip
通过属性 `theme` 可以使用内置或自定义主题，目前内置有 `vertical` 和 `horizontal` 两个可选主题。
:::

::: preview
demo-preview=../demos/container/basic.vue
:::

::: preview
demo-preview=../demos/container/basic2.vue
:::

## 头部组件 `NueHeader`

`NueHeader` 组件为容器头部，默认宽度为 `100%`、高度为 `70px`，通过属性 `width` 和 `height` 修改，接受 CSS 宽高值。

`NueHeader` 组件拥有四个具名插槽，分别是 `logo`、`nav/navigators`、`ops/actions` 以及 `user`，分别对应常见站点头部中的
“Logo区域”、“导航链接区域”、“操作按钮区域” 以及 “用户（头像）区域”。通过这些具名插槽可以快速地定制出常见的站点头部。当然我们也可以通过默认的插槽来定制头部，所有内容将会挂载在
`default` 插槽中。

下方是完全一致的两个示例，第一个示例通过具名插槽定制了头部，第二个示例通过默认插槽定制了头部。

::: preview
demo-preview=../demos/container/header.vue
:::

::: preview
demo-preview=../demos/container/header2.vue
:::

## 主体组件 `NueMain`

`NueMain` 组件为容器主体，默认的宽高为撑满容器中的剩余宽度和高度。

`NueMain` 组件拥有三个具名插槽，分别是 `aside`、`content` 以及 `outline`，分别对应常见站点主体的 “左侧栏”、“内容” 以及
“右侧栏” 三个区域。

通过属性 `asideWidth` 和 `outlineWidth` 可以设置对应侧栏起始宽度；`asideMinWidth` 和 `outlineMinWidth` 设置最小宽度；
`asideMaxWidth` 和 `outlineMaxWidth` 设置最大宽度，这些属性都接受 CSS 宽高值。

::: preview
demo-preview=../demos/container/main-basic.vue
:::

### 拖拽侧栏边线改变宽度

上方的示例中，`aside` 和 `outline` 区域都提供了拖拽边线以手动改变这区域大小。宽度可变是默认开启的功能，若想要禁用，则可以通过属性
`disableAsideResize` 或 `disableOutlineResize` 禁用对应区域的功能。

::: preview
demo-preview=../demos/container/main-resize.vue
:::

### 折叠状态

侧栏拥有 “折叠状态”。当拖拽边线改变宽度小于所指定的 “最小宽度” 时，侧栏会被加上属性 `data-collapsed=true`，并且宽度为
66px（若设置了值则已设置的值为准。通过 `asideCollapsedWidth` 或 `outlineCollapsedWidth` 属性进行设置），此时边栏会应用部分改变内部元素的样式，如
`NueLink` 链接组件和 `NueCollapse` 组件等，当然也可以通过 `theme` 属性来应用定制的折叠状态时的样式。

::: raw
::: preview
demo-preview=../demos/container/main-collapse.vue
:::

## 底部组件 `NueFooter`

`NueFooter` 组件为容器底部组件，与头部组件相同，默认宽度为 `100%`、高度为 `70px`，通过属性 `width` 和 `height` 修改，接受 CSS
宽高值。

`NueFooter` 组件仅设有默认插槽。

::: preview
demo-preview=../demos/container/footer.vue
:::

## 容器嵌套

`NueContainer` 组件支持嵌套，即在一个容器中再嵌套一个容器，形成嵌套布局。通常情况下，嵌套的容器会是用在 `NueMain` 组件的
`content` 插槽中。

::: tip
关于嵌套容器，需要对其指定 `theme` 属性。`inner` 主题作为嵌套容器的修补主题，因此通常嵌套容器的 `theme` 属性值是
`theme="vertical,inner"` 或者 `theme="horizontal,inner"`。
:::

通过嵌套容器，可以快速地搭建出各种复杂的页面布局。

::: preview
demo-preview=../demos/container/nested.vue
:::

::: preview
demo-preview=../demos/container/nested2.vue
:::

## 容器类型

`NueContainer` 组件提供了两种类型，分别对应两个实现方式，即 `flex` 和 `grid`。

通过属性 `type` 设置容器的类型，默认值为 `grid` 。

::: tip
对于 `grid` 类型，其布局通过属性 `grid-template-areas` 来实现，area 名称分别为 `header`、`main` 以及 `footer`。
:::
