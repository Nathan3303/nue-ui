# Prompt 输入确认框

用于采集少量用户输入的对话框，并提供确认和取消按钮。

::: tip
在需要两个或以上输入的情况或其他复杂场景下，建议转用“Dialog 对话框”组件。
:::

## 基础用法

通过组件库中暴露的 `NuePrompt` 方法创建输入对话框。

`NuePrompt` 方法接收一个 `options` 对象，参数中的成员用于设置输入对话框的属性。

- `title` 设置输入确认框标题。
- `placeholder` 设置输入框的占位符。
- `confirmButtonText` 设置确认按钮的文字。
- `cancelButtonText` 设置取消按钮的文字。

::: preview
demo-preview=./basic.vue
:::

### 关于返回值

输入确认框方法的返回值是一个 Promise 对象。不管用户点击了确认按钮还是取消按钮，Promise 都将置为 Resolved。

Promise 的 resolve 值是一个两个元素的数组，其中一个为布尔值，用于表示用户是否点击了取消按钮；另一个则是输入框的值。

根据设计，组件中含有错误提示功能，因此输入确认框方法返回的 Promise 不会被置为 Rejected。

具体的返回值类型定义如下（简化）：

```typescript
type IsByCancel = boolean;
type InputValue = unknown;
type CallerResult = [IsByCancel, InputValue];
// 输入确认框的返回值类型
type CallerReturn = Promise<CallerResult>;
```

## 更换输入类型

通过属性 `input-type` 设置输入框的类型。`type` 可选值包括 `number | text | password | email | textarea`。

::: preview
demo-preview=./input-type.vue
:::

## 输入验证器

通过属性 `validator` 设置输入框的验证器，支持同步或异步函数。

验证器函数允许接收一个参数，即输入框的值。最终需要返回一个错误信息来表示验证是否通过。返回 `null` 表示验证通过；返回 `string | Error` 则表示验证失败，其中的值会被组件内部处理并显示为错误提示。

具体类型如下（简化）：

```typescript
type ValidatorErr = string | Error | null;
type Validator: (value: unknown) => ValidatorErr | Promise<ValidatorErr>
```

::: preview
demo-preview=./validator.vue
:::

## 确认时的回调函数

通过属性 `on-confirm` 设置输入确认时的回调函数，支持同步或异步函数。

确认时的回调函数能够收到两个形参，分别是输入框的值以及一个用于结束确认流程的 `done` 函数。

`on-confirm` 回调函数需要返回一个错误信息，用于表示确认流程是否通过。如果返回 `null` 或 `undefined`，则表示确认流程通过（此时应调用 `done` 函数）。否则，返回的错误信息会被组件内部处理并显示为错误提示。

具体类型如下（简化）：

```typescript
type OnConfirmErr = string | Error | null;
type VoidFn = () => void;
type OnConfirm: (value: unknown, done: VoidFn) => OnConfirmErr | Promise<OnConfirmErr>
```

::: preview
demo-preview=./on-confirm.vue
:::

## 组件属性与事件

下方涵盖了 `NuePrompt` 方法所有的可用参数与回调。

### 参数

| 属性                    | 类型                                                                                                | 默认值   | 说明                           |
| ----------------------- | --------------------------------------------------------------------------------------------------- | -------- | ------------------------------ |
| `title`                 | `string`                                                                                            | -        | 标题                           |
| `description`           | `string`                                                                                            | -        | 描述                           |
| `placeholder`           | `string`                                                                                            | `请输入` | 占位符                         |
| `inputType`             | `'text' \| 'password' \| 'number' \| 'email' \| 'textarea'`                                         | `text`   | 输入类型                       |
| `inputValue`            | `string \| number`                                                                                  | -        | 输入值                         |
| `confirmButtonText`     | `string`                                                                                            | `确认`   | 确认按钮文字                   |
| `cancelButtonText`      | `string`                                                                                            | `取消`   | 取消按钮文字                   |
| `animation`             | `string \| { name: string; duration?: number }`                                                     | -        | 打开动画                       |
| `closeAnimation`        | `string \| { name: string; duration?: number }`                                                     | -        | 关闭动画                       |
| `overlayAnimation`      | `string \| { name: string; duration?: number }`                                                     | -        | 遮罩层打开动画                 |
| `overlayCloseAnimation` | `string \| { name: string; duration?: number }`                                                     | -        | 遮罩层关闭动画                 |
| `validator`             | `(value: unknown) => string \| Error \| null \| Promise<string \| Error \| null>`                   | -        | 验证器                         |
| `onConfirm`             | `(value: unknown, done: () => void) => string \| Error \| null \| Promise<string \| Error \| null>` | -        | 确认回调                       |
| `afterConfirm`          | `() => void \| Promise<void>`                                                                       | -        | 确认后回调                     |
| `afterCancel`           | `() => void \| Promise<void>`                                                                       | -        | 取消后回调                     |
| `beforeOpen`            | `() => void`                                                                                        | -        | 打开前回调                     |
| `afterOpen`             | `() => void`                                                                                        | -        | 打开后回调                     |
| `beforeClose`           | `() => void`                                                                                        | -        | 关闭前回调                     |
| `afterClose`            | `() => void`                                                                                        | -        | 关闭后回调                     |
| `theme`                 | `string \| string[] \| Record<string, boolean>`                                                     | -        | 主题样式（继承自 GlobalProps） |