<template>
    <nue-date-picker v-model="dateValue" clearable placeholder="可清除" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref('2026-03-05');
</script>
