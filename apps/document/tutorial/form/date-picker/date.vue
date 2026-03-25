<template>
    <nue-date-picker v-model="dateValue" placeholder="选择日期" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref('');
</script>
