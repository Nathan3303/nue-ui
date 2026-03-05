<template>
    <nue-date-picker v-model="dateValue" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref('2026-03-05');
</script>
