# Calendar 日历 <Badge type="warning" text="1.9.56 +" />

用于直接展示并选择日期（或日期时间），区别于 DatePicker 的按钮触发下拉式选择。Calendar 内联渲染，始终显示日历网格，适合直接嵌入页面或表单。

## 基础用法

通过标签 `<NueCalendar>` 声明一个日历组件，通过 `v-model` 绑定选中的日期。

::: preview
demo-preview=./basic.vue
:::

### 日期时间选择

设置 `type` 为 `datetime` 可以在日历下方同时选择时间和分钟。

::: preview
demo-preview=./datetime.vue
:::

:::warning 关于输出格式
不管是什么输入格式，通过组件更新后都会转换为 ISO 8601 格式（`YYYY-MM-DDTHH:mm:ss.sssZ`）输出。当 `type="date"` 时，时间部分固定为 00:00:00。（可能因时区不同导致"时"部分有不同显示，本质为 00:00:00）
:::

## 尺寸

通过 `size` 属性可以设置日历的尺寸，支持 `small`、`default` 和 `large` 三种尺寸。

::: preview
demo-preview=./size.vue
:::

## 日期范围

通过 `min-date` 和 `max-date` 属性可以限制可选日期的范围，超出范围的日期会被禁用。

::: preview
demo-preview=./range.vue
:::

## 插槽

`<NueCalendar>` 组件目前支持如下两个插槽：

- **`#cell`** 插槽，用于自定义日期单元格的内容。插槽传递出 `date`（日期对象）、`dateStr`（日期字符串）和 `isCurrentMonth`（是否为当前月）三个属性。
- **`#footer`** 插槽，用于自定义日历底部的操作区域。插槽传递出清除函数 `clear`。与 DatePicker 不同，Calendar 仅在提供 `#footer` 插槽时才会渲染底部区域，没有默认的"清除"按钮。

::: preview
demo-preview=./slots.vue
:::

## 注意事项

1. **v-model**：组件使用 `v-model` 双向绑定数据，底层实现为 `modelValue` 属性和 `update:modelValue` 事件。
2. **日期格式与 `valueFormat`**（**易踩坑，务必读**）：

    默认 `valueFormat="iso"` 输出 ISO 8601 UTC 时间戳，**该格式在东八区会「差一天」**：选 `2024-05-06` 得到
    `2024-05-05T16:00:00.000Z`。若直接取前 10 位当日期用，会拿到 `2024-05-05`。

    | `valueFormat`      | 输出（三时区恒定）                              | 说明                                                   |
    | ------------------ | ----------------------------------------------- | ------------------------------------------------------ |
    | `'iso'`（默认）    | 随浏览器时区漂移，如 `2024-05-05T16:00:00.000Z` | 既有行为，仅为兼容保留                                 |
    | **`'date'`**       | **`2024-05-06`**                                | **推荐**：`type="date"` 的语义正确形态，且不受时区影响 |
    | `'local-datetime'` | `2024-05-06 14:05:00`                           | `type="datetime"` 且需要本地时刻时使用                 |

    ```vue
    <!-- 推荐：选哪一天就存哪一天 -->
    <nue-calendar v-model="date" value-format="date" />
    ```

    `'date'` 与 `'local-datetime'` 的实现**不经过 `Date` 的时区换算**，因此在任意时区下结果一致。

3. **输入格式支持**：
    - 支持基本格式：`YYYY-MM-DD`、`YYYY-MM-DD HH:mm`
    - 支持 ISO 格式：`YYYY-MM-DDTHH:mm:ss`、`YYYY-MM-DDTHH:mm:ssZ`、`YYYY-MM-DDTHH:mm:ss.SSS+08:00` 等
4. **非法日期不会清空你的数据**：`modelValue` 为非法值（如 `'abc'`、`'2024-02-31'`）时，点击日期**不生效且不发事件**，原值保持不变。日历是受控组件，不会在你没有成功选择时销毁已存数据。
5. **年份/月份选择**：点击年份或月份可快速切换到对应选择视图，再次点击即可返回。
6. **与 DatePicker 的区别**：Calendar 内联渲染，始终显示日历；DatePicker 通过按钮触发下拉弹出日历面板。

## 组件属性与事件

下方涵盖了 `NueCalendar` 组件所有的可用属性与事件。

### 属性

| 属性          | Type                                            | 默认值 | 说明                                                   |
| ------------- | ----------------------------------------------- | ------ | ------------------------------------------------------ |
| `modelValue`  | `string`                                        | -      | 绑定值                                                 |
| `type`        | `'date' \| 'datetime'`                          | `date` | 日历类型                                               |
| `valueFormat` | `'iso' \| 'date' \| 'local-datetime'`           | `iso`  | 输出格式；**推荐 `date`**（默认 `iso` 会因时区差一天） |
| `size`        | `'small' \| 'large'`                            | -      | 尺寸                                                   |
| `minDate`     | `string`                                        | -      | 可选的最小日期（`YYYY-MM-DD` 格式）                    |
| `maxDate`     | `string`                                        | -      | 可选的最大日期（`YYYY-MM-DD` 格式）                    |
| `theme`       | `string \| string[] \| Record<string, boolean>` | -      | 主题样式（继承自 GlobalProps）                         |

### 事件

| 事件                | 参数    | 说明       |
| ------------------- | ------- | ---------- |
| `update:modelValue` | `value` | 值更新事件 |
| `change`            | `value` | 值变化事件 |
| `clear`             | -       | 清除事件   |

### 插槽

| 插槽名   | 作用域                                                     | 说明                   |
| -------- | ---------------------------------------------------------- | ---------------------- |
| `cell`   | `{ date: Date, dateStr: string, isCurrentMonth: boolean }` | 自定义日期单元格内容   |
| `footer` | `{ clear: () => void }`                                    | 自定义日历底部操作区域 |