# Infinite Scroll 无限滚动 <Badge text="🧪 实验性" type="warning" />

无限滚动组件实现了滚动到底部时自动加载更多内容的功能。

## 基础用法

通过标签 `<NueInfiniteScroll>` 声明一个无限滚动组件。

### 触发加载事件

使用无限滚动组件时需要实现一个加载函数用于绑定到组件自定义事件 `load-more` 作为触发时的执行函数。

通过属性 `height` 设置无限滚动组件可视区域高度，默认为占满父元素。

::: preview
demo-preview=./load-more.vue
:::

### 调整触发阈值

触发阈值表示当前滚动位置与列表底部的距离，即滚动位置小于等于该值时，会触发加载事件。

触发阈值通过属性 `trigger-height` 设置，默认为 `1px`，即需要滚动到底时才触发加载事件。

::: preview
demo-preview=./trigger-height.vue
:::

### 加载和禁用状态

通过属性 `loading` 设置加载状态。当属性 `loading` 值为真时，组件默认会显示加载文字，也可以通过插槽
`#loading` 可以自定义加载时显示的内容。

通过属性 `disabled` 设置禁用状态。同样地，当属性 `disabled` 值为真时，组件默认会显示禁用文字，也可以通过插槽
`#disabled` 可以自定义禁用时显示的内容。

::: preview
demo-preview=./loading-disabled.vue
:::

## 组件属性与事件

下方涵盖了 `NueInfiniteScroll` 组件所有的可用属性与事件。

### 属性

| 属性            | 类型                                            | 默认值    | 说明                           |
| --------------- | ----------------------------------------------- | --------- | ------------------------------ |
| `triggerHeight` | `string`                                        | `0px`     | 触发阈值                       |
| `height`        | `string`                                        | -         | 容器高度                       |
| `disabled`      | `boolean`                                       | -         | 是否禁用                       |
| `loading`       | `boolean`                                       | -         | 加载状态                       |
| `root`          | `Element \| Document \| null \| 'wrapper'`      | `wrapper` | 滚动根元素                     |
| `rootMargin`    | `string`                                        | -         | 根元素边距                     |
| `threshold`     | `number \| number[]`                            | -         | 阈值                           |
| `theme`         | `string \| string[] \| Record<string, boolean>` | -         | 主题样式（继承自 GlobalProps） |

### 事件

| 事件       | 参数 | 说明         |
| ---------- | ---- | ------------ |
| `loadMore` | -    | 加载更多事件 |