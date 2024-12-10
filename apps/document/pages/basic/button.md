# Button 按钮

常用的操作按钮组件。

## 基础用法

使用 `NueButton` 创建一个按钮。

通过属性 `icon` 可以指定按钮的前置图标。

::: tip
按钮的前置图标的内部实现使用了 `NueIcon` 组件，关于图标的可选值请参考 [Icon 图标](/pages/basic/icon) 组件文档。
:::

::: preview
demo-preview=../../demos/button/basic.vue
:::

## 禁用状态

使用属性 `disabled` 使按钮组件处于不可用状态。

::: preview
demo-preview=../../demos/button/disabled.vue
:::

## 设置按钮大小

通过 `size` 属性设置按钮的大小。`size` 属性拥有 `small` 和 `large` 两个可选值，分别对应小和大两个尺寸。

::: preview
demo-preview=../../demos/button/size.vue
:::

## 按钮组及统一属性控制

通过 `NueButtonGroup` 组件可以将多个按钮以按钮组的形式排列。

按钮组组件 `NueButtonGroup` 接收 `size` 和 `disabled` 属性控制组中按钮的属性。

- `size` 用于控制按钮组中的按钮大小。
- `disabled` 用于控制按钮组中的按钮是否禁用。

::: tip
按钮组组件中对按钮的属性控制优先级高于按钮组组件自身的属性。
:::

::: preview
demo-preview=../../demos/button-group/basic.vue
:::

## 加载状态以及加载图标

通过 `loading` 属性设置按钮的加载状态；通过 `loading-icon` 属性设置按钮在处于加载状态时所显示的图标。

::: tip

- 当按钮组件处于加载态时会同时处于不可用状态。
- `loading-icon` 的属性值与 `icon` 属性相同。

:::

::: preview
demo-preview=../../demos/button/loading.vue
:::

## 节流

通过 `use-throttle` 属性启用节流模式；`throttle-duration` 属性设置节流间隔，单位为 `ms`，默认值为 `200` 。

::: preview
demo-preview=../../demos/button/throttle.vue
:::

## 对齐方式

通过属性 `alignment` 设置按钮组件内元素的对齐方式。属性值为 `left`、`center` 以及 `right` 。

::: preview
demo-preview=../../demos/button/alignment.vue
:::

## 扩展插槽

通过插槽 `append` 可以在按钮文字的后方插入自定义的元素。

::: preview
demo-preview=../../demos/button/append.vue
:::

## 添加自定义类名以及使用预设主题

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

预设主题包括 `icon-only`、 `primary` 以及 `pure`。

::: tip

- 除了以 `string[]` 的方式传递多个主题名，还支持通过 `,` 分隔的字符串形式传递多个主题名。如 `theme="custom1,custom2"` 等价于
  `:theme="['custom1', 'custom2']`。
- 添加后的类名为 `nue-button--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-button--custom`。

:::

::: preview
demo-preview=../../demos/button/theme.vue
:::