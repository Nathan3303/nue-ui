<template>
    <nue-table class="vp-raw" :data="data" :columns="columns" />
</template>

<script setup lang="ts">
import type { NueTableColumn } from 'nue-ui';

const data = [
    { name: '张三', age: 30, city: '上海' },
    { name: '李四', age: 25, city: '北京' },
    { name: '王五', age: 28, city: '深圳' }
];

const columns: NueTableColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' },
    { key: 'city', title: '城市' }
];
</script>