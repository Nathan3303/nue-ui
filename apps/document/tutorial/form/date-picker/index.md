# DatePicker 日期选择器 <Badge type="warning" text="1.8.27 +" />

用于选择日期或日期时间。

## 基础用法

通过标签 `<NueDatePicker>` 声明一个日期选择器组件。

### 日期选择

设置 `type` 为 `date` 可以选择日期。

::: preview
demo-preview=./date.vue
:::

### 日期时间选择

设置 `type` 为 `datetime` 可以选择日期和时间。

::: preview
demo-preview=./datetime.vue
:::

:::warning 关于输出格式
不管是什么输入格式，通过组件面板更新后都会转换为 ISO 8601 格式（`YYYY-MM-DDTHH:mm:ss.sssZ`）输出。当 `type="date"` 时，时间部分固定为 00:00:00。（可能因时区不同导致 “时” 部分有不同显示，本质为 00:00:00）
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

## 自定义日期单元格

通过 `DatePickerBody` 组件的 `#cell` 作用域插槽可以自定义单个日期单元格的内容。插槽传递出 `date`（日期对象）、`dateStr`（日期字符串）和 `isCurrentMonth`（是否为当前月）三个属性。

## 自定义底部操作

通过 `DatePickerPanel` 组件的 `#footer` 插槽可以替换日期选择面板底部的默认清除按钮。

## 生命周期 <Badge type="warning" text="1.8.28 +" />

通过事件 `close` 可以在日期选择器关闭时触发回调。

::: preview
demo-preview=./lifecycle.vue
:::

## 注意事项

1. **v-model**：组件使用 `v-model` 双向绑定数据，底层实现为 `modelValue` 属性和 `update:modelValue` 事件。
2. **日期格式**：
    - 组件统一输出 ISO 8601 格式
    - `type="date"` 时，返回格式为 `YYYY-MM-DDTHH:mm:ss.sssZ`（时间部分固定为 00:00:00）
    - `type="datetime"` 时，返回格式为 `YYYY-MM-DDTHH:mm:ss.sssZ`（时间部分为用户选择的时间）
3. **输入格式支持**：
    - 支持基本格式：`YYYY-MM-DD`、`YYYY-MM-DD HH:mm`
    - 支持 ISO 格式：`YYYY-MM-DDTHH:mm:ss`、`YYYY-MM-DDTHH:mm:ssZ`、`YYYY-MM-DDTHH:mm:ss.SSS+08:00` 等
4. **无效日期处理**：
    - 当传入的日期字符串无法正确解析时，按钮上会显示红色的"无效日期"字样
    - 选择面板中的日期和时间默认从当前时间中取值
5. **时间选择**：当 `type="datetime"` 时，可以点击小时或分钟数值进行手动输入修改。
6. **年份/月份选择**：点击年份或月份可快速切换到对应选择视图，再次点击即可返回。

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
| `close`             | -       | 关闭事件   |
