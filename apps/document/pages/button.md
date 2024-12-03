# Button 按钮

常用的操作按钮组件。

## 基础用法

使用 `NueButton` 组件创建一个按钮。

通过 `icon` 属性指定按钮图标。

::: preview
demo-preview=../demos/button/basic.vue
:::

## 禁用状态

使用 `disabled` 属性可以禁用按钮，类型为 `boolean`。

::: preview
demo-preview=../demos/button/disabled.vue
:::

## 设置按钮大小

按钮拥有小、正常、大三种尺寸，通过 `size` 属性设置。小和大尺寸分别对应 `size` 属性的值 `small` 和 `large`，不指定 `size` 属性则为正常尺寸。

::: preview
demo-preview=../demos/button/size.vue
:::

## 按钮组及统一属性控制

通过 `NueButtonGroup` 组件可以将多个按钮以按钮组的形式排列。

按钮组组件 `NueButtonGroup` 接收 `size` 和 `disabled` 属性控制组中按钮的属性。

-   `size` 用于控制按钮组中的按钮大小。
-   `disabled` 用于控制按钮组中的按钮是否禁用。

::: tip
按钮组组件中对按钮的属性控制优先级高于按钮组组件自身的属性。
:::

::: preview
demo-preview=../demos/button-group/basic.vue
:::

## 加载状态以及加载图标

按钮可以显示加载状态，通过 `loading` 属性设置。

`loading` 属性接受 `boolean` 类型的值，`true` 表示显示加载状态，`false` 表示隐藏加载状态。

按钮可以自定义加载图标，通过 `loading-icon` 属性设置。

::: preview
demo-preview=../demos/button/loading.vue
:::

## 节流

通过 `use-throttle` 属性启用节流模式，默认值为 `false`。

通过 `throttle-duration` 属性设置节流间隔，单位为 `ms`，默认值为 `200` 。

::: preview
demo-preview=../demos/button/throttle.vue
:::

## 添加自定义类名以及使用预设主题

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

预设主题包括 `icon-only`、 `primary` 以及 `pure`。

::: tip

-   除了以 `string[]` 的方式传递多个主题名，还支持通过 `,` 分隔的字符串形式传递多个主题名。如 `theme="custom1,custom2"` 等价于 `:theme="['custom1', 'custom2']`。
-   添加后的类名为 `nue-button--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-button--custom`。

:::

::: preview
demo-preview=../demos/button/theme.vue
:::
