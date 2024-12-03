# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基本使用

通过 `NueTooltip` 标签生成提示信息。

通过 `content` 属性设置提示内容。

通过 `placement` 属性设置提示位置。可选值为 `top-start`、`top-enter`、`top-end`、`bottom-start`、`bottom-center`、`bottom-end`、`left-start`、`left-center`、`left-end`、`right-start`、`right-center`、`right-end`。上述值可以总结为  
`[direction:top|bottom|left|right]-[alignment:start|center|end]`，
其中 `direction` 表示提示框出现的位置，`alignment` 表示提示框相对于触发元素的对齐方式。

::: preview
demo-preview=../demos/tooltip/basic.vue
:::

## 插槽 `#content`

通过 `#content` 插槽可以自定义提示的内容。

::: tip
要注意的是，提示元素在内部设定了最大宽度为视口宽度的 36%，因此当插槽中的文本在过长时会自动换行，如果需要自定义宽度时，请使用 `theme` 属性应用自定义样式。`theme` 属性的使用方式会在后面的小节中作出说明。
:::

::: preview
demo-preview=../demos/tooltip/content.vue
:::

## 大小

通过 `size` 属性设置提示元素的大小，接受 String 类型，可选值为 `small` 和 `large`，不设置则为正常大小。

::: preview
demo-preview=../demos/tooltip/size.vue
:::

## 自定义主题

通过 `theme` 属性自定义提示元素的样式。

::: tip
要注意的是，提示元素在内部实现时使用了 Vue3 的 teleport 特性，因此使用自定义主题时需要将自定义的 CSS 片段设置到全局上才能够生效。
:::

::: preview
demo-preview=../demos/tooltip/theme.vue
:::
