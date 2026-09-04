# NueTable 后续功能规划（ROADMAP）

> 本文记录 NueTable v0（基础渲染 + 单元格插槽 + 排序）之后的演进清单。
> 目的：给后续开发提供 API 草案与落地要点，避免每次从零设计。
> 原则：延续 v0 既定约束——组件不带样式（视觉交给 `packages/themes/shadlike/src/components/table.css`，
> 通过 BEM 类名与 `--nue-table-*` CSS 变量契约）；表格结构保持语义化原生 `<table>`；扩展以
> columns 配置 + 作用域插槽为主形态。

## 阶段总览

| 阶段 | 主题       | 内容                                                             |
| ---- | ---------- | ---------------------------------------------------------------- |
| v1   | 行交互     | 行选择（多选/全选/单选高亮）、展开行、受控排序完善               |
| v2   | 表格能力   | 固定表头、固定列、列宽拖拽、列显隐/顺序、多级表头、合计行、size  |
| v3   | 数据与性能 | 长列表/虚拟滚动、服务端数据流、树形/分组行、单元格省略与气泡提示 |

---

## v1：行交互

### 1.1 行选择（checkbox / radio）

- **目标**：支持勾选列与全选，常用于批量操作。
- **API 草案**：
    - `NueTableColumn` 增加内置类型 `type: 'selection' | 'radio'`（该列不取数据，渲染勾选框）；
    - props：`v-model:selected` 或 `v-model:selected-keys`（多选，值为行 key 数组）；
    - 行 key：新增 `row-key`（string 键名或函数 `(row) => string`），多选/展开/固定高亮都依赖它；
    - 事件：`selection-change`（`{ keys, rows }`）、单选可 `current-change`；
    - 表头全选 checkbox、半选状态（部分选中）。
- **实现要点**：选中态通过数据行 key 集合维护（不塞进 row）；全选在 `<thead>` 渲染；
  checkbox 复用 `NueCheckbox`；禁用行可通过列配置 `selectable(row)` 支持。
- **契约位点**：组件类名 `nue-table__cell--selection`；主题提供表头/单元格选中底色
  （`--nue-table-row-selected-bg-color` 等）。

### 1.2 行点击高亮 / 单选

- 在现有 `row-click` 基础上：props `highlight-current-row` / `current-row-key`，
  `current-change` 事件；当前行类名 `nue-table__row--current`。

### 1.3 展开行

- **API 草案**：`NueTableColumn` 支持 `type: 'expand'`（首列渲染展开按钮），
  插槽 `#expand-row` 或展开区插槽 `row-expand`（`{ row }`）；展开状态由 `expand-row-keys`
  prop + `expand-change` 事件驱动；动画走主题（`--nue-table-expand-duration`）。
- **结构注意**：原生 table 下展开内容用 `<tr>` + `colspan=列数` 的副行（`.nue-table__expanded-row`），
  保持表格语义。

### 1.4 排序完善

- **多列排序**：`sort-multiple` 或列级 `sortable: { multiple: true }`；`sort-change` 载荷升级为数组。
- **全受控**：`sort-key/sort-order` 从"初值"升级为完全受控（内部不本地排序、纯事件驱动），
  服务端排序场景与 v0 的本地模式可通过 `sort-mode`/`remote-sort` 区分。

---

## v2：表格能力

### 2.1 固定表头（sticky thead）

- 双层结构已为它预留（`.nue-table` 是滚动容器）：`theme="sticky-header"` 或 props
  `max-height`，thead 用 `position: sticky; top: 0`。
- 注意斑马纹/悬浮底色在 sticky 表头上的背景连续性与 `border-collapse` 兼容问题
  （表头背景需不透明，见主题 css 处理）。

### 2.2 固定列

- columns 配置 `fixed: 'left' | 'right'`（或数字序号）；利用原生 table 上 `th/td`
  `position: sticky` + `left/right` 实现，行内单元格背景需统一（横向滚动时透底问题用
  `--nue-table-cell-bg-color` 补齐），并加阴影指示（`.nue-table__cell--fixed-left` 等）。

### 2.3 列宽拖拽

- **API 草案**：列配置 `resizable: true`，表头右侧渲染拖拽手柄（`.nue-table__resizer`），
  mousedown + 移动更新 `<colgroup>` 宽度并 emit `column-resize`；
  主题提供手柄 hover 态。拖拽回调里可把列宽持久化到外部。

### 2.4 列显隐 / 列顺序

- **API 草案**：受控 props `visible-columns` / `column-order`（或 `column-visible-change` 事件）；
  便捷方式可在文档提供"列设置"弹出层示例（复用 `NueDropdown`/`NueDialog`），核心组件只提供受控契约。

### 2.5 多级表头

- columns 支持嵌套 `children: NueTableColumn[]`，组件递归渲染 `<thead>` 分组行
  （`.nue-table__head-group`），底部表头以 `rowspan/colspan` 对齐。复杂度较高，放在基础能力之后。

### 2.6 合计行

- columns 列级 `summary?: (rows) => value | string` 或 prop `show-summary` + `summary-method`；
  渲染为 tbody 尾行 `.nue-table__summary-row`（可加 `theme="summary"` 样式）。

### 2.7 尺寸

- v0 明确不做，若需要走库内统一约定：`size: 'small' | 'large'`，在主题 css 里以
  `nue-table--small/large` 覆盖 `--nue-table-row-padding/font-size` 即可（组件层只需输出修饰类）。

---

## v3：数据与性能

### 3.1 长列表 / 虚拟滚动

- 大列表优先与 `NueInfiniteScroll` 配合（分页追加到 data）；
  真正需要虚拟滚动时再评估：原生 table 逐行渲染上限实测后再引入 `display: grid` 的替代结构
  （会牺牲部分无障碍，需 role 补全），并同步确认"方案 B"的取舍。

### 3.2 服务端数据流

- 文档示例沉淀：监听 `sort-change`/`page-change` → 请求 → 替换 `data`；
  （若引入分页）props `pagination` 或与外部分页组件对接的插槽约定。

### 3.3 单元格增强

- 列级 `formatter(row, column, value)`（本地默认渲染收口到统一函数，便于插槽/格式化并存）；
- 超长内容省略 + 气泡提示：主题 `--ellipsis` 状态类 + 复用 `NueTooltip` 的文档方案；
- 单元格内联可编辑（`editable` 列）作为远期考虑。

### 3.4 树形/分组行

- 树形：`tree-props`（children 字段）、缩进与展开箭头类；属于结构改造，优先级最低。

---

## 通用演进注意

1. **类型先行**：每个新特性先在 `types.ts` 给出类型与事件载荷，再实现（文档表格即类型镜像）。
2. **样式契约**：新增视觉维度 → 先在 `table.css` 顶部补 `--nue-table-*` 变量默认值与修饰类，
   组件只输出类名；勿在 `.vue` 加 `<style>`。
3. **测试配套**：每个特性同步 `__tests__/table.test.ts` 增量用例（类名/插槽/事件/排序结果断言）。
4. **文档配套**：`apps/document/tutorial/data/table/index.md` 与演示 `.vue` 同步更新；
   sidebar 已登记。
5. **回归**：改动后跑 `pnpm exec vp test run packages/components/table`、`vp lint`，
   涉及主题改动执行 `pnpm shadlike-theme build`。