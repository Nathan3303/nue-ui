# Input 输入框

用于获取用户输入。

## 基础用法

通过标签 `<NueInput>` 声明一个单行输入框组件。

### 值与占位字符

通过 `v-model` 绑定一个响应式数据，随输入内容变化；通过属性 `placeholder` 设置空值时的占位字符。
类型。

::: preview
demo-preview=./basic.vue
:::

### 禁用状态

通过属性 `disabled` 设置禁用状态。

::: preview
demo-preview=./disabled.vue
:::

### 输入框类型

通过属性 `type` 设置输入框类型。属性可选值为 `text`、`password`、`number`、`email`、`textarea` 以及
`url`。

::: preview
demo-preview=./type.vue
:::

### 设置图标

通过属性 `icon` 设置图标。属性值类型与 `<NueIcon>` 图标组件的 `name` 属性相同。

::: preview
demo-preview=./icon.vue
:::

### 大小

通过属性 `size` 设置，属性可选值为 `small` 和 `large` 。

::: preview
demo-preview=./size.vue
:::

## 清除控制与密码显示控制

通过属性 `clearable` 设置是否显示清除按钮。

通过属性 `allow-show-password` 设置是否显示控制密码显示按钮。`allow-show-password` 属性仅在 `type`
属性为 `password` 时生效。

::: preview
demo-preview=./clearable-show.vue
:::

## 字数限制与计数

通过属性 `maxlength` 设置最大字符限制。属性值类型同 `HTMLElement.maxlength` 属性类型，属于属性映射。

通过属性 `counter` 设置是否显示字数统计。属性可选值为 `off*`、`word-limit`、`word-left` 以及 `both`，其中：

- `off` 表示不显示字数统计。
- `word-limit` 表示只显示最大字数限制。
- `word-left` 表示只显示剩余字数。
- `both` 表示同时显示最大字数限制和剩余字数。

::: tip
`counter` 属性需要与 `maxlength` 属性配合使用才能产生效果。
:::

::: preview
demo-preview=./max-count.vue
:::

## 防抖

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致的性能问题。

通过属性 `debounceTime` 设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

::: preview
demo-preview=./debounce.vue
:::

## 形状样式

输入框组件支持不同的形状样式，通过 `shape` 属性设置。

### 圆角输入框

设置 `shape` 为 `rounded` 可以获得圆角样式的输入框。

### 无形状输入框

设置 `shape` 为 `noshape` 可以获得无边框圆角的扁平样式。

## 主题定制

输入框组件支持通过 `theme` 属性进行主题定制，可以自定义输入框的样式。

## 注意事项

1. **v-model**：组件使用 `v-model` 双向绑定数据，底层实现为 `modelValue` 属性和 `update:modelValue` 事件。
2. **防抖机制**：`debounceTime` 属性仅影响 `update:modelValue` 事件的触发，不会延迟 `input` 事件。
3. **字数统计**：`counter` 属性需要与 `maxlength` 配合使用才能显示统计效果。
4. **密码显示**：`allowShowPassword` 属性仅在 `type="password"` 时生效。
5. **清除按钮**：`clearable` 属性在有值时显示清除按钮，点击后可清空输入内容。

## 组件属性与事件

下方涵盖了 `NueInput` 组件所有的可用属性与事件。

### 属性

| 属性                | Type                                                        | 默认值  | 说明                           |
| ------------------- | ----------------------------------------------------------- | ------- | ------------------------------ |
| `type`              | `'text' \| 'password' \| 'number' \| 'email' \| 'textarea'` | `text`  | 输入框类型                     |
| `modelValue`        | `string \| number`                                          | -       | 绑定值                         |
| `id`                | `string`                                                    | -       | ID（原生属性）                 |
| `shape`             | `'rounded' \| 'noshape'`                                    | -       | 形状样式                       |
| `icon`              | `string`                                                    | -       | 前置图标                       |
| `placeholder`       | `string`                                                    | -       | 占位符                         |
| `maxlength`         | `string`                                                    | -       | 最大长度（原生属性映射）       |
| `disabled`          | `boolean`                                                   | `false` | 是否禁用                       |
| `readonly`          | `boolean`                                                   | `false` | 只读                           |
| `clearable`         | `boolean`                                                   | `false` | 可清除                         |
| `allowShowPassword` | `boolean`                                                   | `false` | 显示密码切换按钮               |
| `counter`           | `string`                                                    | -       | 字数统计模式                   |
| `width`             | `string`                                                    | -       | 宽度                           |
| `size`              | `'small' \| 'large'`                                        | -       | 尺寸                           |
| `debounceTime`      | `number`                                                    | `0`     | 防抖时间(ms)                   |
| `flex`              | `string \| boolean`                                         | -       | 弹性布局                       |
| `name`              | `string`                                                    | -       | 名称（原生属性）               |
| `theme`             | `string \| string[] \| Record<string, boolean>`             | -       | 主题样式（继承自 GlobalProps） |

### 事件

| 事件                | 参数    | 说明                     |
| ------------------- | ------- | ------------------------ |
| `update:modelValue` | `value` | 值更新事件               |
| `input`             | `Event` | 输入事件（实时触发）     |
| `blur`              | `Event` | 失去焦点事件             |
| `change`            | `Event` | 值变化事件（失焦后触发） |
