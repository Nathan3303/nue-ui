<template>
    <nue-button @click="showPromptWithValidator">
        创建一个带有验证器的输入确认框
    </nue-button>
</template>

<script setup>
import { NueMessage, NuePrompt } from 'nue-ui';

function showPromptWithValidator() {
    NuePrompt({
        title: '输入确认',
        placeholder: '请输入数字',
        validator: value => /^[0-9]+$/.test(value)
    }).then(
        value => NueMessage.success(`内容: ${value}`),
        () => NueMessage.warn('操作取消')
    );
}
</script>
