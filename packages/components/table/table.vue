<template>
    <div :class="classes" :data-loading="loading || void 0">
        <table class="nue-table__table">
            <colgroup>
                <col
                    v-for="column in columns"
                    :key="column.key"
                    :style="columnWidthStyle(column.width)"
                />
            </colgroup>
            <thead class="nue-table__head">
                <tr class="nue-table__row">
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        :class="headCellClasses(column)"
                        :style="columnWidthStyle(column.width)"
                        @click="handleHeaderClick(column)"
                    >
                        <span class="nue-table__head-cell__content">
                            <slot :name="`header-${column.key}`" :column="column">
                                {{ column.title || column.key }}
                            </slot>
                            <nue-icon
                                v-if="activeSortKey === column.key && activeSortOrder"
                                :name="activeSortOrder === 'asc' ? 'arrow-up' : 'arrow-down'"
                                class="nue-table__sort-icon"
                            />
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="nue-table__body">
                <tr v-if="loading" class="nue-table__state-row">
                    <td
                        :colspan="columns.length || 1"
                        class="nue-table__cell nue-table__cell--state"
                    >
                        <nue-icon name="loading" spin class="nue-table__state-icon" />
                        <span>加载中...</span>
                    </td>
                </tr>
                <tr v-else-if="displayRows.length === 0" class="nue-table__state-row">
                    <td
                        :colspan="columns.length || 1"
                        class="nue-table__cell nue-table__cell--state"
                    >
                        <slot name="empty">
                            <nue-empty :description="emptyText" image-size="48px" />
                        </slot>
                    </td>
                </tr>
                <tr
                    v-else
                    v-for="(row, index) in displayRows"
                    :key="index"
                    class="nue-table__row"
                    @click="handleRowClick(row, index, $event)"
                >
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        :class="cellClasses(column)"
                        :style="columnWidthStyle(column.width)"
                    >
                        <slot
                            :name="`cell-${column.key}`"
                            :row="row"
                            :column="column"
                            :index="index"
                            :value="cellValue(row, column)"
                        >
                            {{ formatCell(cellValue(row, column)) }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import { NueEmpty } from '../empty';
import type { NueTableColumn, NueTableEmits, NueTableProps, NueTableSortOrder } from './types';

defineOptions({ name: 'NueTable' });

const props = withDefaults(defineProps<NueTableProps>(), {
    data: () => [],
    columns: () => [],
    emptyText: '暂无数据',
    loading: false
});
const emit = defineEmits<NueTableEmits>();

const prefix = 'nue-table';

const columns = computed(() => props.columns);
const activeSortKey = ref<string>(props.sortKey ?? '');
const activeSortOrder = ref<NueTableSortOrder>(props.sortOrder ?? '');

watch(
    () => props.sortKey,
    value => {
        if (value !== void 0) activeSortKey.value = value;
    }
);
watch(
    () => props.sortOrder,
    value => {
        if (value !== void 0) activeSortOrder.value = value;
    }
);

const classes = computed(() => {
    return [prefix, ...parseTheme(props.theme, prefix), props.loading && `${prefix}--loading`];
});

const displayRows = computed(() => {
    const rows = props.data;
    const column = columns.value.find(item => item.key === activeSortKey.value);
    if (!column?.sortable || !activeSortOrder.value) return rows;
    const order = activeSortOrder.value;
    return [...rows].sort((a, b) => compareRows(a, b, column.key, order));
});

const cellValue = (row: unknown, column: NueTableColumn): unknown => {
    if (!row || typeof row !== 'object') return void 0;
    if (Array.isArray(row)) {
        const index = Number(column.key);
        return Number.isInteger(index) ? (row as unknown[])[index] : void 0;
    }
    return (row as Record<string, unknown>)[column.key];
};

const compareRows = (a: unknown, b: unknown, key: string, order: NueTableSortOrder): number => {
    const av = (a as Record<string, unknown> | null)?.[key];
    const bv = (b as Record<string, unknown> | null)?.[key];
    const aEmpty = av === void 0 || av === null;
    const bEmpty = bv === void 0 || bv === null;
    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1;
    if (bEmpty) return -1;
    let result: number;
    if (typeof av === 'number' && typeof bv === 'number') {
        result = av - bv;
    } else {
        result = String(av).localeCompare(String(bv));
    }
    return order === 'desc' ? -result : result;
};

const formatCell = (value: unknown): string => {
    if (value === void 0 || value === null) return '';
    return String(value);
};

const columnWidthStyle = (width: string | number | undefined) => {
    if (!width) return void 0;
    return { width: typeof width === 'number' ? `${width}px` : width };
};

const headCellClasses = (column: NueTableColumn) => {
    return [
        'nue-table__head-cell',
        column.align && `${prefix}__head-cell--${column.align}`,
        column.sortable && `${prefix}__head-cell--sortable`
    ];
};

const cellClasses = (column: NueTableColumn) => {
    return ['nue-table__cell', column.align && `${prefix}__cell--${column.align}`];
};

const handleHeaderClick = (column: NueTableColumn) => {
    if (!column.sortable || props.loading) return;
    let order: NueTableSortOrder;
    if (activeSortKey.value === column.key) {
        order =
            activeSortOrder.value === 'asc'
                ? 'desc'
                : activeSortOrder.value === 'desc'
                  ? ''
                  : 'asc';
    } else {
        activeSortKey.value = column.key;
        order = 'asc';
    }
    activeSortOrder.value = order;
    emit('sort-change', { key: column.key, order });
};

const handleRowClick = (row: unknown, index: number, event: MouseEvent) => {
    emit('row-click', { row, index, event });
};
</script>