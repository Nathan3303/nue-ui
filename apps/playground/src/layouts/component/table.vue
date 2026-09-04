<template>
    <demo title="基础用法">
        <nue-table :data="baseData" :columns="baseColumns" />
    </demo>
    <demo title="长文本省略与列占满">
        <nue-div vertical>
            <nue-table :data="longData" :columns="longColumns" />
            <nue-text size="sm" theme="description">
                默认列均分占满宽度；超长内容在单元格内省略显示。
            </nue-text>
        </nue-div>
    </demo>
    <demo title="排序">
        <nue-div vertical>
            <nue-table :data="sortData" :columns="sortColumns" @sort-change="onSortChange" />
            <nue-text size="sm" theme="description">当前排序：{{ currentSort || '无' }}</nue-text>
        </nue-div>
    </demo>
    <demo title="初始排序">
        <nue-table :data="sortData" :columns="sortColumns" sort-key="score" sort-order="desc" />
    </demo>
    <demo title="自定义单元格">
        <nue-table :data="customData" :columns="customColumns" theme="border">
            <template #cell-user="{ row }">
                <nue-icon name="user" color="var(--nue-primary-color-700)" />
                <nue-text size="sm" style="margin-left: 0.5rem">{{ userName(row) }}</nue-text>
            </template>
            <template #cell-status="{ value }">
                <nue-text size="sm" weight="bold" :color="statusColor(value)">
                    {{ value }}
                </nue-text>
            </template>
            <template #header-score>评分（header 插槽）</template>
        </nue-table>
    </demo>
    <demo title="主题修饰">
        <nue-div>
            <nue-div flex="1" vertical gap="0.25rem">
                <nue-text size="sm">theme="striped,border"</nue-text>
                <nue-table :data="themeData" :columns="themeColumns" theme="striped,border" />
            </nue-div>
            <nue-div flex="1" vertical gap="0.25rem">
                <nue-text size="sm">theme="border,compact"</nue-text>
                <nue-table :data="themeData" :columns="themeColumns" theme="border,compact" />
            </nue-div>
        </nue-div>
    </demo>
    <demo title="空态与自定义空态">
        <nue-div>
            <nue-table :data="emptyData" :columns="emptyColumns" theme="border" />
            <nue-table :data="emptyData" :columns="emptyColumns" theme="border">
                <template #empty>
                    <nue-empty description="还没有数据，点击下方按钮加载">
                        <nue-button size="small" theme="primary" @click="reload">
                            加载数据
                        </nue-button>
                    </nue-empty>
                </template>
            </nue-table>
        </nue-div>
    </demo>
    <demo title="加载态">
        <nue-div vertical>
            <nue-div align="center" gap="var(--nue-gap-sm)">
                <nue-button icon="refresh" size="small" :loading="loading" @click="toggleLoading" />
                <nue-text size="sm" theme="description">loading 时表体显示加载行</nue-text>
            </nue-div>
            <nue-table
                :data="loadingData"
                :columns="loadingColumns"
                :loading="loading"
                theme="border"
            />
        </nue-div>
    </demo>
    <demo title="行点击">
        <nue-div vertical>
            <nue-table
                :data="rowData"
                :columns="rowColumns"
                @row-click="onRowClick"
                theme="border"
            />
            <nue-text size="sm" theme="description">最近点击：{{ lastRow || '暂无' }}</nue-text>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    NueTable,
    NueButton,
    NueIcon,
    NueText,
    NueEmpty,
    NueDiv,
    NueMessage
} from '@nue-ui/components';
import type { NueTableColumn, NueTableRowClickPayload } from '@nue-ui/components';
import Demo from '@/components/demo.vue';

const baseColumns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄', align: 'right' },
    { key: 'city', title: '城市' }
];
const baseData = [
    { name: '张三', age: 30, city: '上海' },
    { name: '李四', age: 25, city: '北京' },
    { name: '王五', age: 28, city: '深圳' }
];

const longColumns: NueTableColumn[] = [
    { key: 'title', title: '标题' },
    { key: 'content', title: '内容' },
    { key: 'updatedAt', title: '更新时间' }
];
const longData = [
    {
        title: '组件库文档更新',
        content: '这是很长的一段描述文字，用来演示表格列占满与单元格内容超出后的省略号处理效果……',
        updatedAt: '2026-09-01'
    },
    {
        title: 'v0.2.4 发布',
        content: '新增 NueTable 组件，支持列配置渲染、单元格插槽与排序。',
        updatedAt: '2026-09-03'
    }
];

const sortColumns: NueTableColumn[] = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'score', title: '分数', sortable: true, align: 'right' },
    { key: 'age', title: '年龄', sortable: true, align: 'right' }
];
const sortData = [
    { name: 'Alice', score: 95, age: 30 },
    { name: 'Bob', score: 88, age: 25 },
    { name: 'Carol', score: 92, age: 28 },
    { name: 'Dave', score: 76, age: 22 }
];
const currentSort = ref('');
const onSortChange = (state: { key: string; order: string }) => {
    currentSort.value = state.order
        ? `列 ${state.key} - ${state.order === 'asc' ? '升序' : '降序'}`
        : '';
};

const customColumns: NueTableColumn[] = [
    { key: 'user', title: '用户' },
    { key: 'dept', title: '部门' },
    { key: 'status', title: '状态' },
    { key: 'score', title: '评分', align: 'right' }
];
const customData = [
    { user: '张三', dept: '前端组', status: '启用', score: 95 },
    { user: '李四', dept: '后端组', status: '停用', score: 82 },
    { user: '王五', dept: '测试组', status: '待定', score: 68 }
];
const userName = (row: unknown) => String((row as { user?: string }).user ?? '');
const statusColor = (value: unknown) => {
    if (value === '启用') return 'var(--nue-success-color-70)';
    if (value === '停用') return 'var(--nue-error-color-70)';
    return 'var(--nue-warning-color-70)';
};

const themeColumns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'role', title: '角色' },
    { key: 'salary', title: '月薪', align: 'right' }
];
const themeData = [
    { name: '张三', role: '前端工程师', salary: 28000 },
    { name: '李四', role: '后端工程师', salary: 30000 },
    { name: '王五', role: '测试工程师', salary: 24000 }
];

const emptyColumns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'dept', title: '部门' }
];
const emptyData = ref<Record<string, string>[]>([]);
const reload = () => {
    emptyData.value = [
        { name: '张三', dept: '前端组' },
        { name: '李四', dept: '后端组' }
    ];
    NueMessage.success('加载成功');
};

const loadingColumns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'status', title: '状态' }
];
const loadingData = [{ name: '张三', status: '在线' }];
const loading = ref(false);
const toggleLoading = () => {
    loading.value = true;
    setTimeout(() => (loading.value = false), 100);
};

const rowColumns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'email', title: '邮箱' }
];
const rowData = [
    { name: '张三', email: 'zhangsan@example.com' },
    { name: '李四', email: 'lisi@example.com' }
];
const lastRow = ref('');
const onRowClick = (payload: NueTableRowClickPayload) => {
    lastRow.value = (payload.row as { name: string }).name;
};
</script>