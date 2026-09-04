# Table 表格 <Badge type="warning" text="1.12.0 +" />

表格组件用于以行列形式展示结构化数据，支持列配置渲染、单元格自定义与排序等基础能力。

## 基础用法

通过组件标签 `NueTable` 声明一个表格。使用 `data` 属性传入数据行（对象数组），使用 `columns`
属性配置列。

::: preview
demo-preview=./basic.vue
:::

列配置项 `columns` 为一个数组，每个元素描述一列：

- `key`：列的取值键，组件会以 `row[key]` 的方式取单元格数据；
- `title`：列标题文本（缺省时展示 `key`）；
- `width`：列宽，`number` 类型按 px 处理；
- `align`：对齐方式，可选 `left`（默认）、`center`、`right`。

## 排序

通过给列配置 `sortable: true` 让该列表头可点击排序。点击表头会在升序、降序、取消之间循环，
组件内部对当前 `data` 进行本地排序（不修改传入的数据）。

::: preview
demo-preview=./sort.vue
:::

排序状态变化时会触发 `sort-change` 事件，回调参数为 `{ key, order }`，其中 `order` 为
`asc`、`desc` 或 `''`（取消排序）。当数据来自服务端时，可在事件中发起请求并把返回结果更新到
`data`；也可通过 `sort-key`、`sort-order` 属性指定初始排序。

## 自定义单元格

单元格内容默认展示该行在列 `key` 下的值（`null`/`undefined` 显示为空）。需要自定义展示时，
使用以 `cell-{key}` 命名的作用域插槽，例如列 key 为 `name` 时插槽名为 `cell-name`。

插槽接收作用域参数 `{ row, column, index, value }`。类似地，表头可通过 `header-{key}` 插槽
自定义，接收 `{ column }`。

::: preview
demo-preview=./custom-cell.vue
:::

## 空态与自定义空态

当 `data` 为空数组时，表格展示空态（默认使用 `NueEmpty`，文案由 `empty-text` 控制）。可通过
`#empty` 插槽完全接管空态内容。

::: preview
demo-preview=./empty.vue
:::

## 加载状态

通过 `loading` 属性使表格进入加载态：表头保留，表体展示加载行。

::: preview
demo-preview=./loading.vue
:::

## 样式修饰

表格不内置样式，视觉由主题提供。可通过 `theme` 属性叠加以下修饰类（可组合）：

- `striped`：斑马纹行；
- `border`：完整网格边框；
- `compact`：紧凑行距。

同时支持自定义主题类名，便于按需覆盖样式（更多信息参考「主题属性」章节）。

## 注意事项

1. **数据不可变性**：排序在副本上进行，不会改动传入的 `data` 数组；
2. **列宽**：`width` 以 `<col>` 与单元格样式同时生效，未指定时由内容自适应；
3. **空值与排序**：`null`/`undefined` 的单元格在排序时始终排到末尾。

## 组件属性与事件

### NueTable 属性

| 属性        | 类型                                            | 默认值     | 说明                                  |
| ----------- | ----------------------------------------------- | ---------- | ------------------------------------- |
| `data`      | `unknown[]`                                     | `[]`       | 表格数据行（对象数组，按列 key 取值） |
| `columns`   | `NueTableColumn[]`                              | `[]`       | 列配置                                |
| `emptyText` | `string`                                        | `暂无数据` | 空数据时的默认文案                    |
| `loading`   | `boolean`                                       | `false`    | 是否展示加载态                        |
| `sortKey`   | `string`                                        | -          | 初始排序列 key                        |
| `sortOrder` | `'asc' \| 'desc' \| ''`                         | -          | 初始排序方向                          |
| `theme`     | `string \| string[] \| Record<string, boolean>` | -          | 主题样式（继承自 GlobalProps）        |

### NueTableColumn 列配置

| 属性       | 类型                            | 默认值  | 说明                                |
| ---------- | ------------------------------- | ------- | ----------------------------------- |
| `key`      | `string`                        | -       | 取值键与插槽后缀（`cell-{key}` 等） |
| `title`    | `string`                        | `key`   | 列标题                              |
| `width`    | `string \| number`              | -       | 列宽，number 单位为 px              |
| `align`    | `'left' \| 'center' \| 'right'` | `left`  | 内容对齐方式                        |
| `sortable` | `boolean`                       | `false` | 是否可排序                          |

### NueTable 事件

| 事件          | 参数                                                 | 说明           |
| ------------- | ---------------------------------------------------- | -------------- |
| `sort-change` | `{ key: string, order: 'asc' \| 'desc' \| '' }`      | 排序状态变化   |
| `row-click`   | `{ row: unknown, index: number, event: MouseEvent }` | 点击某行数据行 |

### NueTable 插槽

| 插槽名         | 作用域参数                      | 说明                 |
| -------------- | ------------------------------- | -------------------- |
| `cell-{key}`   | `{ row, column, index, value }` | 自定义某列单元格内容 |
| `header-{key}` | `{ column }`                    | 自定义某列表头内容   |
| `empty`        | -                               | 自定义空态内容       |