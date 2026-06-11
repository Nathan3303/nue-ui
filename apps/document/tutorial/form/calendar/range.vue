<template>
    <nue-div vertical gap="sm" align="start">
        <nue-text>使用 <code>min-date</code> 和 <code>max-date</code> 限制可选日期范围：</nue-text>
        <nue-calendar v-model="dateValue" min-date="2026-06-01" max-date="2026-06-30" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref('');
</script>
