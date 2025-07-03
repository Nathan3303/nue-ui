<template>
    <demo title="基础">
        <nue-button @click="showPrompt">基础输入提示</nue-button>
    </demo>
    <demo title="初始值">
        <nue-button @click="showPromptWithInitialValue">提供输入初始值</nue-button>
    </demo>
    <demo title="描述文本">
        <nue-button @click="showPromptWithDescription">描述文本</nue-button>
    </demo>
    <demo title="输入框类型">
        <nue-button @click="showPromptWithTextarea">富文本框</nue-button>
    </demo>
    <demo title="定义校验器">
        <nue-div>
            <nue-button @click="showPromptWithValidator">同步验证器</nue-button>
            <nue-button @click="showPromptWithAsyncValidator">异步验证器</nue-button>
        </nue-div>
    </demo>
    <demo title="定义确认回调">
        <nue-button @click="showPromptWithOnConfirm">确认回调</nue-button>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueButton, NueMessage, NuePrompt } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

defineOptions({ name: 'PromptDemo1' });

const showPrompt = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
    }).then(
        value => NueMessage.success(`输入的文本为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithInitialValue = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: '一些初始文本 ...'
    }).then(
        value => NueMessage.success(`输入的文本为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithDescription = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        description: '请在下方输入一些文本，100 至 200 字左右。'
    }).then(
        value => NueMessage.success(`输入的文本为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithTextarea = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputType: 'textarea'
    }).then(
        value => NueMessage.success(`输入的文本为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

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
