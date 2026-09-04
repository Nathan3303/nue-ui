<template>
    <nue-table class="vp-raw" :data="data" :columns="columns" theme="border">
        <template #cell-name="{ row }">
            <nue-icon name="user" color="var(--nue-primary-color-700)" />
            <nue-text style="margin-left: 0.5rem">{{ displayName(row) }}</nue-text>
        </template>
        <template #cell-score="{ value }">
            <nue-text :color="scoreColor(value)" weight="bold">
                {{ value }}
            </nue-text>
        </template>
    </nue-table>
</template>

<script setup lang="ts">
import type { NueTableColumn } from 'nue-ui';

const displayName = (row: unknown) => String((row as { name?: string } | null)?.name ?? '');

const scoreColor = (value: unknown) => {
    const score = Number(value);
    if (score >= 90) return 'var(--nue-success-color-70)';
    if (score >= 80) return 'var(--nue-warning-color-70)';
    return 'var(--nue-error-color-70)';
};

const data = [
    { name: '张三', dept: '前端组', score: 95 },
    { name: '李四', dept: '后端组', score: 82 },
    { name: '王五', dept: '测试组', score: 68 }
];

const columns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'dept', title: '部门' },
    { key: 'score', title: '评分', align: 'right' }
];
</script>