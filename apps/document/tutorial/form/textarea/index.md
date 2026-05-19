# Textarea 富文本输入框

用于获取用户输入的长文本。

## 基础用法

通过标签 `<NueTextarea>` 声明一个富文本输入框组件。

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

### 大小

通过属性 `size` 设置，属性可选值为 `small` 和 `large` 。

::: preview
demo-preview=./size.vue
:::

### 设置最大行数

通过属性 `rows` 设置图标。属性值接受数字类型，默认值为 `3`。当内容行数超过指定值则会显示滚动条。

::: preview
demo-preview=./rows.vue
:::

### 防抖

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致可能出现的性能问题。

通过 `debounceTime` 属性设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

::: preview
demo-preview=./debounce.vue
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

## 自动高度

通过属性 `autosize`
设置是否启用自适应内容高度，开启后文本框的高度会随着内容的增加而变高，即文本框会完全显示所输入的内容而非使用滚动条。

::: preview
demo-preview=./autosize.vue
:::

### 限制高度

属性 `autosize` 可以实现文本框高度自适应内容，但有时候并不是无限增高，会希望输入框在一定高度内保持自适应，可以搭配属性
`rows` 设置最大高度限制，当内容高度超过 `rows` 指定的行数时，则不会继续增加文本框高度，转而显示滚动条。

::: preview
demo-preview=./rows-autosize.vue
:::

## 手动调整输入框宽高

通过属性 `resize` 设置输入框宽高手动调整。属性为 `HTMLElement.resize` 的映射。

::: preview
demo-preview=./resize.vue
:::

## 扩展插槽 <Badge text="1.8.53 以上版本" type="warning" />

`<NueTextarea>` 组件支持如下扩展插槽：

- `#prefix` 插槽：在文本域组件包装器的开头插入自定义元素。
- `#actions` 插槽：在文本域组件包装器的末的动作栏中插入自定义元素。
- `#suffix` 插槽：在文本域组件包装器的末尾插入自定义元素。

三个插槽同时暴露出 `length` 和 `maxlength` 属性，用于获取当前输入内容的字数和最大字数限制；以及 `clear`
方法，用于清空输入内容。

::: preview
demo-preview=./slots.vue
:::

## 注意事项

1. **与 Input 的区别**：`NueTextarea` 是多行输入框，适用于长文本输入；`NueInput` 是单行输入框。
2. **自动高度**：`autosize` 属性可以设置布尔值或对象，设置为对象时可以指定最小和最大行数。
3. **调整大小**：`resize` 属性映射原生 `<textarea>` 元素的 resize 属性。
4. **防抖机制**：与 Input 组件类似，`debounceTime` 仅影响 `update:modelValue` 事件的触发。
5. **字数统计**：需要配合 `maxlength` 属性使用才能显示统计效果。

## 组件属性与事件

下方涵盖了 `NueTextarea` 组件所有的可用属性与事件。

### 属性

| 属性           | Type                                              | 默认值  | 说明                           |
| -------------- | ------------------------------------------------- | ------- | ------------------------------ |
| `modelValue`   | `string`                                          | -       | 绑定值                         |
| `id`           | `string`                                          | -       | ID（原生属性）                 |
| `placeholder`  | `string`                                          | -       | 占位符                         |
| `theme`        | `string \| string[]`                              | -       | 主题样式（继承自 GlobalProps） |
| `shape`        | `'rounded' \| 'noshape'`                          | -       | 形状样式                       |
| `disabled`     | `boolean`                                         | `false` | 是否禁用                       |
| `readonly`     | `boolean`                                         | `false` | 只读                           |
| `rows`         | `number`                                          | `3`     | 行数                           |
| `resize`       | `boolean`                                         | -       | 调整大小                       |
| `autosize`     | `boolean \| { minRows: number; maxRows: number }` | -       | 自动高度                       |
| `maxlength`    | `string`                                          | -       | 最大长度                       |
| `counter`      | `string`                                          | -       | 字数统计模式                   |
| `width`        | `string`                                          | -       | 宽度                           |
| `size`         | `'small' \| 'large'`                              | -       | 尺寸                           |
| `debounceTime` | `number`                                          | `0`     | 防抖时间(ms)                   |
| `flex`         | `string`                                          | -       | 弹性布局                       |

### 事件

| 事件                | 参数    | 说明                     |
| ------------------- | ------- | ------------------------ |
| `update:modelValue` | `value` | 值更新事件               |
| `input`             | `Event` | 输入事件（实时触发）     |
| `blur`              | `Event` | 失去焦点事件             |
| `change`            | `Event` | 值变化事件（失焦后触发） |
