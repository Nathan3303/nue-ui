<template>
    <nue-select
        v-model="vm"
        placeholder="请选择"
        @before-open="() => NueMessage.info('选择器打开前')"
        @after-open="() => NueMessage.info('选择器打开后')"
        @before-close="() => NueMessage.info('选择器关闭前')"
        @after-close="() => NueMessage.info('选择器关闭后')"
    >
        <nue-select-option label="选项 A" value="optionA" />
        <nue-select-option label="选项 B" value="optionB" />
    </nue-select>
</template>

<script setup>
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const vm = ref(null);
</script>
