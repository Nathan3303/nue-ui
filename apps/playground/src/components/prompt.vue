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
        <nue-div>
            <nue-button @click="showPromptWithOnConfirm">同步确认回调</nue-button>
            <nue-button @click="showPromptWithAsyncOnConfirm">异步确认回调</nue-button>
        </nue-div>
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
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的文本为：${inputValue as string}`);
    });
};

const showPromptWithInitialValue = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: '一些初始文本 ...'
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的文本为：${inputValue as string}`);
    });
};

const showPromptWithDescription = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        description: '请在下方输入一些文本，100 至 200 字左右。'
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的文本为：${inputValue as string}`);
    });
};

const showPromptWithTextarea = () => {
    NuePrompt({
        title: '输入提示',
        placeholder: '请输入 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputType: 'textarea'
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的文本为：${inputValue as string}`);
    });
};

const showPromptWithValidator = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        validator: value => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            const isMatched = regExp.test(value as string);
            return isMatched ? null : '请输入正确的手机号码';
        }
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的手机号码为：${inputValue as string}`);
    });
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
            const isMatched = regExp.test(value as string);
            return isMatched ? null : '请输入正确的手机号码';
        }
    }).then(([isByCancel, inputValue]) => {
        if (isByCancel) {
            NueMessage.info('操作取消');
            return;
        }
        NueMessage.success(`输入的手机号码为：${inputValue as string}`);
    });
};

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
