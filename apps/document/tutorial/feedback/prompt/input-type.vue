<template>
    <nue-div>
        <nue-button @click="showPromptWithInputType('password')">
            创建一个密码类型的输入确认框
        </nue-button>
        <nue-button @click="showPromptWithInputType('number')">
            创建一个数字类型的输入确认框
        </nue-button>
        <nue-button @click="showPromptWithInputType('textarea')">
            创建一个富文本类型的输入确认框
        </nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';

function showPromptWithInputType(type) {
    NuePrompt({
        title: '输入确认',
        placeholder: '请输入内容',
        inputType: type,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(
        value => NueMessage.success(`内容: ${value}`),
        () => NueMessage.warn('操作取消')
    );
}
</script>
