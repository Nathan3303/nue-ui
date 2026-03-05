# DatePicker 日期选择器 <Badge type="warning" text="1.8.27 +" />

用于选择日期或日期时间。

## 基础用法

通过标签 `<NueDatePicker>` 声明一个日期选择器组件。

### 日期选择

设置 `type` 为 `date` 可以选择日期，返回格式为 `YYYY-MM-DD`。

::: preview
demo-preview=./date.vue
:::

### 日期时间选择

设置 `type` 为 `datetime` 可以选择日期和时间，返回格式为 `YYYY-MM-DD HH:mm`。

::: preview
demo-preview=./datetime.vue
:::

## 禁用状态

通过属性 `disabled` 设置禁用状态。

::: preview
demo-preview=./disabled.vue
:::

## 清除功能

通过属性 `clearable` 设置是否显示清除按钮。

::: preview
demo-preview=./clearable.vue
:::

## 注意事项

1. **v-model**：组件使用 `v-model` 双向绑定数据，底层实现为 `modelValue` 属性和 `update:modelValue` 事件。
2. **日期格式**：
    - `type="date"` 时，返回格式为 `YYYY-MM-DD`
    - `type="datetime"` 时，返回格式为 `YYYY-MM-DD HH:mm`
3. **时间选择**：当 `type="datetime"` 时，可以点击小时或分钟数值进行手动输入修改。
4. **年份/月份选择**：点击年份或月份可快速切换到对应选择视图，再次点击即可返回。

## 组件属性与事件

下方涵盖了 `NueDatePicker` 组件所有的可用属性与事件。

### 属性

| 属性          | Type                                            | 默认值     | 说明                           |
| ------------- | ----------------------------------------------- | ---------- | ------------------------------ |
| `modelValue`  | `string`                                        | -          | 绑定值                         |
| `type`        | `'date' \| 'datetime'`                          | `date`     | 选择器类型                     |
| `placeholder` | `string`                                        | `选择日期` | 占位符                         |
| `disabled`    | `boolean`                                       | `false`    | 是否禁用                       |
| `readonly`    | `boolean`                                       | `false`    | 是否只读                       |
| `clearable`   | `boolean`                                       | `false`    | 是否可清除                     |
| `theme`       | `string \| string[] \| Record<string, boolean>` | -          | 主题样式（继承自 GlobalProps） |

### 事件

| 事件                | 参数    | 说明       |
| ------------------- | ------- | ---------- |
| `update:modelValue` | `value` | 值更新事件 |
| `change`            | `value` | 值变化事件 |
| `clear`             | -       | 清除事件   |
