<template>
    <demo title="Prompt 输入提示">
        <nue-div vertical>
            <nue-div>
                <nue-button @click="showPrompt">基础输入提示</nue-button>
                <nue-button @click="showPromptWithInitialValue">
                    输入提示：提供输入初始值
                </nue-button>
                <nue-button @click="showPromptWithDescription">
                    输入提示：提供描述文本以及使用富文本框
                </nue-button>
            </nue-div>
            <nue-div>
                <nue-button @click="showPromptWithValidator">
                    输入提示：提供自定验证器
                </nue-button>
                <nue-button @click="showPromptWithAsyncValidator">
                    输入提示：提供自定异步验证器
                </nue-button>
                <nue-button @click="showPromptWithOnConfirm">
                    输入提示：提供自定异步验证器以及确认回调
                </nue-button>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueMessage } from 'nue-ui';
import NuePrompt from '@nue-ui/components/prompt/prompt.ts';
import Demo from '../layouts/demo.vue';

defineOptions({ name: 'PromptDemo1' });

const showPrompt = () => {
    NuePrompt({
        placeholder: '请输入一些文本 ...'
    }).then(
        value => NueMessage.success(`输入的文本为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithInitialValue = () => {
    NuePrompt({
        inputValue: '一些初始文本 ...'
    }).then(
        value => NueMessage.success(`输入的文本为：${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithDescription = () => {
    NuePrompt({
        description: '请在下方输入一些文本，100 至 200 字左右。',
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
        validator: value => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value as string);
        }
    }).then(value =>
        NueMessage.success(`输入的手机号码为：${value as string}`)
    );
};

const showPromptWithAsyncValidator = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
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
        validator: async value => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value as string);
        },
        onConfirm: async value => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const isSuccess = value && Math.random() > 0.7;
            return isSuccess ? value : new Error('数据库更新失败');
        }
    }).then(
        value => NueMessage.success(`输入的手机号码为：${value as string}`),
        err => err && NueMessage.info(err)
    );
};
</script>
