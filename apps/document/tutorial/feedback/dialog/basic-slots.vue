<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <nue-button @click="visible = true">打开对话框</nue-button>
    <nue-dialog v-model="visible" title="基础对话框">
        <template #header="{ close }">
            <nue-div align="center" wrap="nowrap" gap="0.5rem">
                <nue-icon size="1rem" name="priority-1" />
                <nue-text size="1rem">提示</nue-text>
            </nue-div>
            <nue-text size="0.75rem" @click="close">关闭</nue-text>
        </template>
        <template #content>
            <nue-text size="0.875rem">这是一个基础对话框</nue-text>
        </template>
        <template #footer="{ close }">
            <nue-button theme="small" @click="close">取消</nue-button>
            <nue-button theme="small,primary" @click="close">确定</nue-button>
        </template>
    </nue-dialog>
</template>
