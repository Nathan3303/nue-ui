# Button 按钮

常用的操作按钮组件。

## 基础用法

通过组件标签 `NueButton` 声明一个按钮组件。

::: preview
demo-preview=./basic.vue
:::

### 设置前置图标

通过属性 `icon` 指定按钮的前置图标。

::: tip
前置图标的实现使用了组件库的图标组件 `NueIcon` ，属性可选值请参考 Icon 图标组件文档中的 **所有图标** 一节。
:::

::: preview
demo-preview=./icon.vue
:::

### 设置禁用状态

通过属性 `disabled` 使按钮组件处于禁用状态。属性接受 `boolean` 类型的值，为 `true` 时表示禁用。

::: preview
demo-preview=./disabled.vue
:::

### 设置大小

通过属性 `size` 设置按钮的大小。属性接受 `small` 和 `large` 两个可选值，分别对应小和大两个尺寸。

::: preview
demo-preview=./size.vue
:::

### 内容对齐方式

通过属性 `alignment` 设置按钮内容的对齐方式。属性接受 `start`、`center` 和 `end` 三个可选值，分别对应左对齐、居中和右对齐。

::: preview
demo-preview=./alignment.vue
:::

### 扁平样式

通过属性 `flat` 设置按钮为扁平样式。扁平样式按钮相比普通按钮没有背景色和边框，适用于需要更简洁视觉风格的场景。

## 加载状态

通过属性 `loading` 使按钮组件处于加载状态。属性接受 `boolean` 类型的值，为 `true` 时表示加载中。

::: preview
demo-preview=./loading.vue
:::

### 设置其他的加载图标

通过属性 `loading-icon` 配置按钮在加载中的图标。属性值与 `icon` 属性相同。默认情况下的加载图标为 `loading`。

::: preview
demo-preview=./loading-icon.vue
:::

## 节流

在启用了节流模式，并且按钮组件在点击时，会限制点击频率，防止用户重复点击。即在设置的节流间隔内，按钮组件将不能再次点击。

通过属性 `use-throttle` 启用节流模式；属性 `throttle-duration` 设置节流间隔。节流单位为 `ms`，默认值为 `200` 。

::: preview
demo-preview=./throttle.vue
:::

::: tip
节流功能适用于高频点击场景，如提交表单、点赞等操作，可以有效防止用户重复提交。
:::

## 扩展插槽 <Badge text="1.8.53 以上版本" type="warning" />

`<NueButton>` 组件支持前置和后置扩展插槽。

### 前置扩展插槽

通过插槽 `#prepend` 可以在按钮文字的前方、图标的后方插入自定义的元素。

::: preview
demo-preview=./prepend.vue
:::

### 后置扩展插槽

通过插槽 `#append` 可以在按钮文字的后方插入自定义的元素。

::: preview
demo-preview=./append.vue
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
demo-preview=./button-group-basic.vue
:::

### 按钮组禁用状态

按钮组的禁用状态会继承到组内的所有按钮，当按钮组被禁用时，组内所有按钮都将不可点击。

## 注意事项

1. **无障碍性**：按钮组件内部渲染为原生 `<button>` 元素，支持键盘导航和屏幕阅读器。
2. **加载状态**：当 `loading` 为 `true` 时，按钮会自动禁用，不可点击。
3. **图标使用**：图标使用 Iconfont 字体图标库，详见 Icon 组件文档。
4. **节流与防抖**：节流功能仅在 `useThrottle` 设置为 `true` 时生效，默认不启用节流。

## 组件属性与事件

下方涵盖了 `NueButton` 组件所有的可用属性与事件。

### NueButton 属性

| 属性               | 类型                                            | 默认值     | 说明                           |
| ------------------ | ----------------------------------------------- | ---------- | ------------------------------ |
| `icon`             | `string`                                        | -          | 按钮图标                       |
| `disabled`         | `boolean`                                       | `false`    | 是否禁用                       |
| `loading`          | `boolean`                                       | `false`    | 加载状态                       |
| `loadingIcon`      | `string`                                        | `loading`  | 加载图标                       |
| `title`            | `string`                                        | -          | 按钮标题（原生 title 属性）    |
| `alignment`        | `'start' \| 'center' \| 'end'`                  | -          | 内容对齐方式                   |
| `flex`             | `string`                                        | -          | 弹性布局                       |
| `size`             | `'small' \| 'large'`                            | -          | 按钮尺寸                       |
| `useThrottle`      | `boolean`                                       | `false`    | 是否使用节流                   |
| `throttleDuration` | `number`                                        | `200`      | 节流时长(ms)                   |
| `flat`             | `boolean`                                       | `false`    | 扁平样式                       |
| `type`             | `'submit' \| 'reset' \| 'button'`               | `'button'` | 按钮类型                       |
| `theme`            | `string \| string[] \| Record<string, boolean>` | -          | 主题样式（继承自 GlobalProps） |

### NueButton 事件

| 事件    | 参数         | 说明     |
| ------- | ------------ | -------- |
| `click` | `MouseEvent` | 点击事件 |

### NueButtonGroup 属性

| 属性       | 类型                                            | 默认值  | 说明     |
| ---------- | ----------------------------------------------- | ------- | -------- |
| `size`     | `'small' \| 'large'`                            | -       | 按钮尺寸 |
| `disabled` | `boolean`                                       | `false` | 是否禁用 |
| `theme`    | `string \| string[] \| Record<string, boolean>` | -       | 主题样式 |