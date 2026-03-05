<template>
    <nue-div>
        <nue-button @click="showPromptWithInputType('password')">密码类型</nue-button>
        <nue-button @click="showPromptWithInputType('number')">数字类型</nue-button>
        <nue-button @click="showPromptWithInputType('textarea')">富文本类型</nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';
import type { NueInputType } from 'nue-ui';

function showPromptWithInputType(type: NueInputType) {
    NuePrompt({
        title: '输入确认',
        placeholder: '请输入内容',
        inputType: type,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) return;
        NueMessage.success(`输入的文本为：${inputValue as string}`);
    });
}
</script>
