# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

通过标签 `NueSwitch` 生成一个开关组件。

通过 `v-model` 绑定开关状态。

::: preview
demo-preview=../../demos/switch/basic.vue
:::

## 大小

通过属性 `size` 设置开关组件的大小，可选值为 `small` 和 `large`，不指定则为默认大小。

::: preview
demo-preview=../../demos/switch/size.vue
:::

## 文字描述

通过属性 `show-text` 设置开关描述文字是否显示，接受 `boolean` 类型值，默认为 false 。

通过属性 `active-text` 和 `inactive-text` 设置开关的描述文字，接受 `string` 类型值，默认值分别为 I 和 O。

::: preview
demo-preview=../../demos/switch/text.vue
:::

## 设置禁用状态

通过属性 `disabled` 设置开关组件的禁用状态，接受 `boolean` 类型值，默认为 false 。

::: preview
demo-preview=../../demos/switch/disabled.vue
:::

## 加载状态以及切换前的回调函数

通过属性 `loading` 设置开关组件的加载状态，接受 `boolean` 类型值，默认为 false 。

通常属性 `loading` 与切换前的回调函数 `before-switch` 搭配使用。在 `before-switch` 回调函数中，只有返回 Resolved Promise
或是布尔类型 ture 时才会使开关组件的状态发生改变。

::: preview
demo-preview=../../demos/switch/loading.vue
:::
