<template>
    <nue-date-picker v-model="dateValue" @close="handleClose" />
</template>

<script lang="ts" setup>
import { NueMessage } from 'nue-ui';
import { ref } from 'vue';

const dateValue = ref('2026-03-05');

const handleClose = () => {
    NueMessage.info('当前日期为：' + dateValue.value);
};
</script>