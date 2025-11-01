<template>
    <nue-div>
        <nue-button @click="showPromptWithOnConfirm">同步确认回调</nue-button>
        <nue-button @click="showPromptWithAsyncOnConfirm">异步确认回调</nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';

const showPromptWithOnConfirm = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        validator: value => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            const isMatched = regExp.test(value as string);
            return isMatched ? null : '请输入正确的手机号码';
        },
        onConfirm: (value, done) => {
            if (value === '13536563303') {
                done();
                return null;
            }
            return '手机号码错误';
        }
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的手机号码为：${inputValue as string}`);
    });
};

const showPromptWithAsyncOnConfirm = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        validator: async value => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            const isMatched = regExp.test(value as string);
            return isMatched ? null : '请输入正确的手机号码';
        },
        onConfirm: async (value, done) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (value === '13536563303') {
                done();
                return null;
            }
            return '手机号码错误';
        }
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的手机号码为：${inputValue as string}`);
    });
};
</script>
