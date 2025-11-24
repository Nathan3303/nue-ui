# Container 布局容器

用于快速搭建页面布局。

## 布局组件基础

布局组件通常用于规划站点页面或者是某个独立区域的布局，这些布局通常包含头部、主体、侧栏以及底部等区域。

我们针对这些区域创建了布局组件，包含容器组件 `NueContainer` 以及一系列构成组件。构成组件包含头部组件
`NueHeader`、主体组件 `NueMain`、主体内容组件 `NueContent`、侧栏组件 `NueAside`、底部组件 `NueFooter`
以及可以用于拖拽改变元素宽度的 `NueSeparator` 组件（通常用于调整侧栏组件的宽度）。

## 容器组件

容器组件 `NueContainer` 用于承载所有构成组件。

容器组件以及构成组件都采用了 `flex` 流式布局，默认情况下，容器组件的布局方向为垂直，即
`flex-direction: column`。

容器组件的默认宽度和高度都是占满父容器，也就是 100%。通过属性 `width` 和 `height` 可以修改宽高默认值，接受
CSS 宽高属性值。也通过 `theme` 属性应用主题样式达到同样的效果。

::: preview
demo-preview=./basic.vue
:::

## 头部组件和底部组件

头部组件 `NueHeader` 和底部组件 `NueFooter` 的设计相似，默认布局方向为横向，且元素居中排列。

头部组件的默认高度为 `4rem`；底部组件的默认高度为 `3rem`。通过属性 `width` 和 `height` 可以修改宽高默认值，接受
CSS 宽高属性值。

::: preview
demo-preview=./header-comp.vue
:::

::: preview
demo-preview=./footer-comp.vue
:::

## 主体组件

主体组件 `NueMain` 用于承载内容组件 `NueContent` 以及一个或多个侧栏组件 `NueAside` 。

主体组件的默认布局方向为横向，宽高默认占满容器组件的剩余空间。不支持通过属性 `width` 和 `height`
直接修改宽高，但可以通过容器组件的 `theme` 属性进行修改。

::: preview
demo-preview=./main-comp.vue
:::

## 侧栏组件

侧栏组件 `NueAside` 通常用于承载路由链接、菜单等元素，默认的布局方向为垂直，默认高度为占满父元素；宽度为
`16rem`。

侧栏组件在设计时考虑到宽度可变性，因此侧栏组件拥有 `width`、`min-width` 以及 `max-width`
三个属性，分别对应起始宽度、最小宽度以及最大宽度。通过拖拽变宽组件 `NueSeparator`
实现侧栏宽度变化，最小宽度和最大宽度可以限定宽度变化范围。

::: preview
demo-preview=./aside-comp.vue
:::

## 拖拽变宽组件

拖拽变宽组件 `NueSeparator` 用于实现目标元素宽度（通常为侧栏组件）的动态变化。
该组件的展示形式为一个垂直线，通过点击这条垂直线，可以拖拽改变侧栏宽度。拖拽变宽组件的默认宽度为 `1px`
，默认高度为占满父元素。

通过属性 `op-target` 指定拖拽变宽时操作的元素，可选值为 `'previous' | 'next' | HTMLElement`，默认为
`previous`。

通过属性 `disabled` 禁用拖拽变宽功能。

::: preview
demo-preview=./separator.vue
:::

## 容器嵌套

容器组件 `NueContainer` 默认支持一套嵌套布局，通过主题 `nested`、`nested_aside` 以及 `nested_main` 搭配使用。需要分别应用于包裹容器、侧栏容器以及主体容器。

其中侧栏容器的默认宽度为 `24%`、最小宽度为 `16%`、最大宽度为 `32%`，能够通过拖拽变宽组件调整宽度。

::: preview
demo-preview=./nested.vue
:::
