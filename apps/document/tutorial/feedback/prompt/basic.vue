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
    }).then(
        value => NueMessage.success(`您的姓名是: ${value}`),
        () => NueMessage.warn('操作取消')
    );
};
</script>
