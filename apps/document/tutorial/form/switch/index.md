# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

通过标签 `<NueSwitch>` 声明一个开关组件。

### 值

通过 `v-model` 为开关组件绑定一个响应式值。

::: preview
demo-preview=./basic.vue
:::

### 大小

通过属性 `size` 设置开关组件的大小，可选值为 `small` 和 `large`，不指定则为默认大小。

::: preview
demo-preview=./size.vue
:::

### 状态文字描述

通过属性 `show-text` 设置开关描述文字是否显示。

通过属性 `active-text` 和 `inactive-text` 设置开关的描述文字。属性接受 `string` 类型值，开关状态默认值分别为
I 和 O。

::: preview
demo-preview=./state-text.vue
:::

### 禁用状态

通过属性 `disabled` 设置开关组件的禁用状态。

::: preview
demo-preview=./disabled.vue
:::

## 加载态 & 状态切换前的回调函数

通过属性 `loading` 设置开关组件的加载状态。属性 `loading` 通常与状态切换前回调函数 `before-switch`
搭配使用。在 `before-switch` 回调函数中，只有返回 Resolved Promise 或是 `ture` 时才会使开关组件的状态发生改变。

::: preview
demo-preview=./loading.vue
:::

## 扩展插槽 <Badge text="1.8.53 以上版本" type="warning" />

`<NueSwitch>` 组件支持如下扩展插槽：

- `#circle`：在开关的圆形滑块内插入自定义内容。
- `#text`：在开关的描述文字位置插入自定义内容。

::: preview
demo-preview=./slots.vue
:::

## 注意事项

1. **双向绑定**：使用 `v-model` 绑定布尔值，实现双向数据同步。
2. **异步切换**：`beforeSwitch` 回调函数支持返回 Promise，可用于处理异步操作（如 API 请求）。
3. **加载状态**：`loading` 状态时组件会自动禁用，防止用户重复操作。
4. **状态文字**：`showText` 需要设置为 `true` 才能显示 `activeText` 和 `inactiveText`。

## 组件属性与事件

下方涵盖了 `NueSwitch` 组件所有的可用属性与事件。

### 属性

| 属性           | Type                                            | 默认值  | 说明                              |
| -------------- | ----------------------------------------------- | ------- | --------------------------------- |
| `modelValue`   | `boolean`                                       | -       | 绑定值                            |
| `size`         | `'small' \| 'normal' \| 'large'`                | -       | 尺寸                              |
| `disabled`     | `boolean`                                       | `false` | 是否禁用                          |
| `loading`      | `boolean`                                       | `false` | 加载状态                          |
| `loadingIcon`  | `string`                                        | -       | 加载图标                          |
| `showText`     | `boolean`                                       | `false` | 显示状态文字                      |
| `activeText`   | `string`                                        | -       | 开启状态显示的文字                |
| `inactiveText` | `string`                                        | -       | 关闭状态显示的文字                |
| `beforeSwitch` | `(value: boolean) => Promise<boolean>`          | -       | 切换前回调，返回 false 可阻止切换 |
| `theme`        | `string \| string[] \| Record<string, boolean>` | -       | 主题样式（继承自 GlobalProps）    |

### 事件

| 事件                | 参数             | 说明         |
| ------------------- | ---------------- | ------------ |
| `update:modelValue` | `value: boolean` | 值更新事件   |
| `change`            | `value: boolean` | 状态变化事件 |
