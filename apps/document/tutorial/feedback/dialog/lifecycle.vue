<script setup lang="ts">
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const visible = ref(false);
</script>

<template>
    <nue-button @click="visible = true">打开对话框</nue-button>
    <nue-dialog
        v-model="visible"
        title="对话框"
        @before-open="() => NueMessage.info('打开对话框前')"
        @after-open="() => NueMessage.info('打开对话框后')"
        @before-close="() => NueMessage.info('关闭对话框前')"
        @after-close="() => NueMessage.info('关闭对话框后')"
    >
        <nue-text>这是一个基础对话框</nue-text>
    </nue-dialog>
</template>
