<template>
    <nue-date-picker v-model="dateValue" disabled placeholder="禁用状态" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref('2026-03-05');
</script>