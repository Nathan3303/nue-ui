<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <nue-button @click="visible = true">打开对话框</nue-button>
    <nue-dialog v-model="visible" title="基础对话框">
        <template #reset="{ close }">
            <nue-text size="1rem">自定义头部</nue-text>
            <nue-text size="0.875rem">这是一个自定义的主体内容</nue-text>
            <nue-div justify="end" gap="0.5rem">
                <nue-button theme="small" @click="close">取消</nue-button>
                <nue-button theme="small,primary" @click="close">确定</nue-button>
            </nue-div>
        </template>
    </nue-dialog>
</template>
