<template>
    <demo title="日期选择">
        <nue-date-picker v-model="date" type="date" />
    </demo>
    <demo title="日期和时间选择 & 占位符">
        <nue-date-picker v-model="datetime" type="datetime" placeholder="选择日期和时间！😁" />
    </demo>
    <demo title="只读">
        <nue-date-picker v-model="date" type="date" readonly />
    </demo>
    <demo title="按钮中直接可清除">
        <nue-date-picker v-model="clearable" type="date" clearable />
    </demo>
</template>

<script lang="ts" setup>
import { NueDatePicker } from '@nue-ui/components';
import Demo from '@/components/demo.vue';
import { ref } from 'vue';

const date = ref('');
const datetime = ref('');
const clearable = ref('');
</script>

<style scoped></style>
