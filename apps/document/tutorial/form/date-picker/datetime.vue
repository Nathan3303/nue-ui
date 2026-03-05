<template>
    <nue-date-picker v-model="datetimeValue" type="datetime" placeholder="选择日期和时间" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const datetimeValue = ref('');
</script>
