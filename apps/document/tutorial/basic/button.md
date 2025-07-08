# Button 按钮

常用的操作按钮组件。

## 基础用法

通过组件标签 `NueButton` 声明一个按钮组件。

::: preview
demo-preview=../demos/button/basic.vue
:::

### 设置前置图标

通过属性 `icon` 指定按钮的前置图标。

::: tip
前置图标的实现使用了组件库的图标组件 `NueIcon` ，属性可选值请参考 [Icon 图标](/tutorial/basic/icon)
组件文档中的 **所有图标** 一节。
:::

::: preview
demo-preview=../demos/button/icon.vue
:::

### 设置禁用状态

通过属性 `disabled` 使按钮组件处于禁用状态。属性接受 `boolean` 类型的值，为 `true` 时表示禁用。

::: preview
demo-preview=../demos/button/disabled.vue
:::

### 设置大小

通过属性 `size` 设置按钮的大小。属性接受 `small` 和 `large` 两个可选值，分别对应小和大两个尺寸。

::: preview
demo-preview=../demos/button/size.vue
:::

## 加载状态

通过属性 `loading` 使按钮组件处于加载状态。属性接受 `boolean` 类型的值，为 `true` 时表示加载中。

::: preview
demo-preview=../demos/button/loading.vue
:::

### 设置其他的加载图标

通过属性 `loading-icon` 配置按钮在加载中的图标。属性值与 `icon` 属性相同。默认情况下的加载图标为
`loading`。

::: preview
demo-preview=../demos/button/loading-icon.vue
:::

## 节流

在启用了节流模式，并且按钮组件在点击时，会限制点击频率，防止用户重复点击。即在设置的节流间隔内，按钮组件将不能再次点击。

通过属性 `use-throttle` 启用节流模式；属性 `throttle-duration` 设置节流间隔。节流单位为 `ms`，默认值为
`200` 。

::: preview
demo-preview=../demos/button/throttle.vue
:::

## 添加自定义类名以及使用预设主题

通过属性 `theme` 可以给按钮添加自定义的类名。

:::tip
属性 `theme` 是 NueUI 中的一个全局属性，所有组件都继承了该属性。`theme`
属性用于添加自定义类名，或者使用预设的类名，以达到样式补充的效果。`theme` 属性
用法和 Vue 的 `class` 动态绑定类似，支持 `string`、`object`、`string[]`、`object[]`
类型。在应用主题时，所使用的主题名称会被添加为 `{ComponentName}--{theme}` 类名。即应用的主题名称为
`primary`，则会添加 `nue-button--primary` 类名，那么在自定义主题的时候，需要通过 `nue-button--primary`
进行选择。
:::

::: preview
demo-preview=../demos/button/theme.vue
:::

## 后置扩展插槽

通过插槽 `#append` 可以在按钮文字的后方插入自定义的元素。

::: preview
demo-preview=../demos/button/append.vue
:::

## 按钮组及统一属性控制

通过 `NueButtonGroup` 组件可以将多个按钮以按钮组的形式排列。

按钮组组件 `NueButtonGroup` 拥有 `size` 和 `disabled` 属性控制组中按钮的对应属性。

- `size` 用于控制按钮组中的按钮大小。
- `disabled` 用于控制按钮组中的按钮是否禁用。

::: tip
当按钮的属性和按钮组的属性同时被指定时，按钮组的属性会优先于按钮自身的属性。
:::

::: preview
demo-preview=../demos/button-group/basic.vue
:::
