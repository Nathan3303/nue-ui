import type { GlobalProps } from '@nue-ui/utils';

export type NueTableAlign = 'left' | 'center' | 'right';

export type NueTableSortOrder = 'asc' | 'desc' | '';

export interface NueTableColumn {
    /** 列标识：作为行数据取值键、作用域插槽后缀（#cell-{key} / #header-{key}） */
    key: string;
    /** 列标题文案；需要富文本时用 #header-{key} 插槽覆盖 */
    title?: string;
    /** 列宽，number 单位为 px */
    width?: string | number;
    /** 单元格内容对齐方式（默认左对齐） */
    align?: NueTableAlign;
    /** 是否可通过点击表头排序（组件内本地排序 + sort-change 事件） */
    sortable?: boolean;
}

export interface NueTableSortState {
    key: string;
    order: NueTableSortOrder;
}

export interface NueTableCellScope {
    row: unknown;
    column: NueTableColumn;
    index: number;
    value: unknown;
}

export interface NueTableHeaderScope {
    column: NueTableColumn;
}

export interface NueTableRowClickPayload {
    row: unknown;
    index: number;
    event: MouseEvent;
}

export interface NueTableProps extends GlobalProps {
    /** 表格数据行（对象数组，按 column.key 取值） */
    data?: unknown[];
    /** 列配置 */
    columns?: NueTableColumn[];
    /** 空数据时展示的文案 */
    emptyText?: string;
    /** 是否处于加载态（此时表体展示加载行） */
    loading?: boolean;
    /** 受控排序 key 初值（默认空，由点击驱动） */
    sortKey?: string;
    /** 受控排序方向初值 */
    sortOrder?: NueTableSortOrder;
}

export type NueTableEmits = {
    'sort-change': [state: NueTableSortState];
    'row-click': [payload: NueTableRowClickPayload];
};