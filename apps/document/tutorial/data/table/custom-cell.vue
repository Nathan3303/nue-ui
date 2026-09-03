<template>
    <nue-table :data="data" :columns="columns" theme="border">
        <template #cell-name="{ row }">
            <nue-icon name="user" color="var(--nue-primary-color-700)" />
            <nue-text style="margin-left: 0.5rem">{{ row.name }}</nue-text>
        </template>
        <template #cell-score="{ value }">
            <nue-text
                :color="
                    value >= 90
                        ? 'var(--nue-success-color-70)'
                        : value >= 80
                          ? 'var(--nue-warning-color-70)'
                          : 'var(--nue-error-color-70)'
                "
                weight="bold"
            >
                {{ value }}
            </nue-text>
        </template>
    </nue-table>
</template>

<script setup lang="ts">
const data = [
    { name: '张三', dept: '前端组', score: 95 },
    { name: '李四', dept: '后端组', score: 82 },
    { name: '王五', dept: '测试组', score: 68 }
];

const columns = [
    { key: 'name', title: '姓名' },
    { key: 'dept', title: '部门' },
    { key: 'score', title: '评分', align: 'right' }
];
</script>