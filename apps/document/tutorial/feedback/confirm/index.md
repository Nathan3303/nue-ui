# Confirm 消息确认框

消息确认框用于确认用户的操作，常用于删除、确认等场景。

## 基础用法

通过组件库暴露的方法 `NueConfirm` 创建一个消息确认框。

`NueConfirm` 方法接收一个 `options` 对象作为参数，其中：

- `content` 用于指定确认框的内容
- `title` 用于指定确认框的标题文字
- `confirmButtonText` 用于指定确认按钮的文字
- `cancelButtonText` 用于指定取消按钮的文字。
::: preview
demo-preview=./basic.vue
:::

### 关于返回值

需要注意的是，确认框的返回值为一个 Promise 对象。不管用户点击了确认按钮还是取消按钮，Promise 都将被 resolve。resolve 值为一个数组，其中包含一个布尔值 `isByCancel`，用于表示用户是否点击了取消按钮；以及回调函数 `onConfirm` 的返回值（如果有，没有则为 `null`）。当回调函数 `onConfirm` 或者组件内部执行出现错误时，Promise 会被 reject。

具体的类型定义如下（简化）：

```typescript
type IsByCancel = boolean;
type OnConfirmResult = unknown;
type CallerResult = [IsByCancel, OnConfirmResult]
// 确认框的返回值类型
type CallerReturn = Promise<CallerResult>
```

## 自定义确认回调

通过属性 `onConfirm` 传入一个函数作为确认时的回调函数，函数会在用户点击确认按钮后执行。

组件同时支持异步的回调函数，当用户点击确认按钮后，组件会等待回调函数执行完毕，再执行确认的后续逻辑。执行其间所有的按钮都将处于禁用，确认按钮会显示为加载状态。

::: preview
demo-preview=./on-confirm.vue
:::

## 自定义动画

通过属性 `animation` 配置组件的起始动画效果。属性值接受 `string` 以及
`{ name: string; duration?: number }` 类型值。其中 `name` 成员指定动画名称，（如果有指定）会被转换为 CSS
中的 `animation-name` 的值，需要在 CSS 中定义对应的动画效果；`duration` 属性指定动画持续时间，（如果有指定）会被转换为
CSS 中的 `animation-duration` 的值，单位建议为 `ms`。

通过属性 `closeAnimation` 配置组件的关闭动画效果。属性值接受类型值与 `animation` 属性一致；属性
`overlayAnimation` 和 `overlayCloseAnimation` 配置组件遮罩层动画效果。属性值接受类型值分别与
`animation` 和 `closeAnimation` 属性一致。

根据上述描述，动画相关属性分别为：`animation`、`closeAnimation`、`overlayAnimation` 以及
`overlayCloseAnimation`。

:::warning 注意
请确保自定义动画效果在某个 CSS 文件中被定义，否则会导致动画失效。
:::

::: preview
demo-preview=./animation.vue
:::

## 自定义主题

通过 `theme` 属性可以自定义确认框的主题。属性值为一个字符串，用于指定自定义主题的类名。

::: preview
demo-preview=./theme.vue
:::
