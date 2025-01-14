<template>
    <nue-button @click="showPromptWithBeforeConfirm">
        创建一个带有确认前回调函数的输入确认框
    </nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage, NuePrompt } from 'nue-ui';

function showPromptWithBeforeConfirm() {
    NuePrompt({
        title: '输入确认',
        placeholder: '请输入内容',
        beforeConfirm: async value => {
            await NueConfirm({ content: '确认提交吗？' });
            return value.toUpperCase();
        }
    }).then(
        value => NueMessage.success(`内容: ${value}`),
        () => NueMessage.warn('操作取消')
    );
}
</script>
