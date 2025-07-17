<template>
    <nue-div>
        <nue-button @click="showPromptWithValidator">同步验证器</nue-button>
        <nue-button @click="showPromptWithAsyncValidator">异步验证器</nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';

const showPromptWithValidator = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        validator: value => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value as string);
        }
    }).then(value => NueMessage.success(`输入的手机号码为：${value as string}`));
};

const showPromptWithAsyncValidator = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        validator: async value => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value as string);
        }
    }).then(
        value => NueMessage.success(`输入的手机号码为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};
</script>
