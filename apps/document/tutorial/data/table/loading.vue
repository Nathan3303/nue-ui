<template>
    <nue-table class="vp-raw" :data="loading ? [] : data" :columns="columns" :loading="loading">
        <template #empty>等待加载…</template>
    </nue-table>
</template>

<script setup lang="ts">
import type { NueTableColumn } from 'nue-ui';
import { onMounted, ref } from 'vue';

const columns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' }
];
const data = [{ name: '张三', age: 30 }];
const loading = ref(true);

onMounted(() => {
    setTimeout(() => (loading.value = false), 1500);
});
</script>