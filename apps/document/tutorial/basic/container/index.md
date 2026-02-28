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

## 布局示例

以下是常见的布局示例，展示了如何使用布局容器组件快速搭建页面结构。

### 经典上下布局

包含头部、内容区和底部的经典布局。

### 侧边栏布局

包含侧边栏、主内容和可选的头部/底部布局。

### 响应式布局

通过 `responsive` 属性可以设置主体组件在不同屏幕尺寸下的响应式行为。

## 主题定制

布局容器组件支持通过 `theme` 属性进行主题定制，可以自定义组件的样式和行为。

### 使用预设主题

组件提供了多个预设主题，如 `nested` 用于嵌套布局。

## 注意事项

1. **Flex 布局**：所有布局组件都采用 Flex 布局，了解 Flex 布局有助于更好地使用这些组件。
2. **宽高设置**：
    - `NueContainer` 支持通过 `width` 和 `height` 设置宽高
    - `NueHeader` 和 `NueFooter` 支持设置宽高
    - `NueMain` 不支持直接设置宽高，通过父容器控制
    - `NueAside` 支持 `width`、`minWidth`、`maxWidth` 控制宽度范围
3. **拖拽调整**：`NueSeparator` 组件需要与 `NueAside` 配合使用，通过 `opTarget` 属性指定操作目标。
4. **嵌套布局**：使用 `nested` 系列主题时，需要为不同容器应用不同的主题类。

## 组件属性与事件

下方涵盖了布局容器组件所有的可用属性与事件。

### NueContainer 属性

| 属性     | 类型                                            | 默认值 | 说明                           |
| -------- | ----------------------------------------------- | ------ | ------------------------------ |
| `height` | `string`                                        | -      | 容器高度                       |
| `width`  | `string`                                        | -      | 容器宽度                       |
| `theme`  | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### NueHeader 属性

| 属性     | 类型                                            | 默认值 | 说明                           |
| -------- | ----------------------------------------------- | ------ | ------------------------------ |
| `width`  | `string`                                        | -      | 宽度                           |
| `height` | `string`                                        | -      | 高度                           |
| `theme`  | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### NueMain 属性

| 属性         | Type                                            | 默认值 | 说明                           |
| ------------ | ----------------------------------------------- | ------ | ------------------------------ |
| `responsive` | `boolean`                                       | -      | 是否响应式                     |
| `theme`      | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### NueAside 属性

| 属性             | Type                                            | 默认值 | 说明                           |
| ---------------- | ----------------------------------------------- | ------ | ------------------------------ |
| `width`          | `string`                                        | -      | 宽度                           |
| `minWidth`       | `string`                                        | -      | 最小宽度                       |
| `maxWidth`       | `string`                                        | -      | 最大宽度                       |
| `collapsedWidth` | `string`                                        | -      | 折叠宽度                       |
| `theme`          | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### NueContent 属性

| 属性    | Type                                            | 默认值 | 说明                           |
| ------- | ----------------------------------------------- | ------ | ------------------------------ |
| `pure`  | `boolean`                                       | -      | 是否纯净模式                   |
| `fill`  | `boolean`                                       | -      | 是否填充                       |
| `theme` | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### NueSeparator 属性

| 属性       | Type                                            | 默认值 | 说明                           |
| ---------- | ----------------------------------------------- | ------ | ------------------------------ |
| `opTarget` | `'previous' \| 'next' \| HTMLElement`           | -      | 操作目标                       |
| `disabled` | `boolean`                                       | -      | 是否禁用                       |
| `theme`    | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |

### NueSeparator 事件

| 事件     | 参数            | 说明         |
| -------- | --------------- | ------------ |
| `resize` | `width: number` | 调整宽度事件 |

### NueFooter 属性

| 属性     | Type                                            | 默认值 | 说明                           |
| -------- | ----------------------------------------------- | ------ | ------------------------------ |
| `width`  | `string`                                        | -      | 宽度                           |
| `height` | `string`                                        | -      | 高度                           |
| `theme`  | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps） |
