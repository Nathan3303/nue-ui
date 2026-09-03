<template>
    <nue-table :data="data" :columns="columns" theme="striped,border" />
</template>

<script setup lang="ts">
const data = [
    { name: 'Alice', age: 30, score: 95 },
    { name: 'Bob', age: 25, score: 88 },
    { name: 'Carol', age: 28, score: 92 },
    { name: 'Dave', age: 22, score: 76 }
];

const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true, align: 'right' },
    { key: 'score', title: '分数', sortable: true, align: 'right' }
];
</script>