<template>
    <nue-button @click="showPrompt">创建一个输入确认框</nue-button>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';

const showPrompt = () => {
    NuePrompt({
        title: '请输入您的姓名',
        placeholder: '请输入您的姓名',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) return;
        NueMessage.success(`输入的文本为：${inputValue as string}`);
    });
};
</script>
