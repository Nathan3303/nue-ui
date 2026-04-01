<template>
    <demo title="日期选择">
        <nue-date-picker v-model="date" type="date" />
    </demo>
    <demo title="日期和时间选择 & 占位符">
        <nue-date-picker v-model="datetime" type="datetime" placeholder="选择日期和时间！😁" />
    </demo>
    <demo title="禁用状态">
        <nue-date-picker v-model="date" type="date" disabled />
    </demo>
    <demo title="按钮中直接可清除">
        <nue-date-picker v-model="clearable" type="date" clearable />
    </demo>
    <demo title="生命周期">
        <nue-date-picker v-model="lifecycle" type="date" @close="NueMessage.info(lifecycle)" />
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-date-picker v-model="size" type="date" size="small" />
            <nue-date-picker v-model="size" type="date" />
            <nue-date-picker v-model="size" type="date" size="large" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDatePicker, NueDiv } from '@nue-ui/components';
import Demo from '@/components/demo.vue';
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const date = ref('');
const datetime = ref('');
const clearable = ref('');
const lifecycle = ref('2026-03-05');
const size = ref('2026-04-01');
</script>

<style scoped></style>
