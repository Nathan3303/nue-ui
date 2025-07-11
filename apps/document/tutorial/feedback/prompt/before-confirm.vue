<template>
    <nue-button @click="showPromptWithOnConfirm">确认回调</nue-button>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';

const showPromptWithOnConfirm = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        validator: async value => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value as string);
        },
        onConfirm: async value => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const isSuccess = value && Math.random() > 0.7;
            if (!isSuccess) throw new Error('数据库更新失败');
            return value;
        }
    }).then(
        value => NueMessage.success(`输入的手机号码为：${value as string}`),
        err => err && NueMessage.error(err)
    );
};
</script>
