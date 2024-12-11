<template>
    <demo title="Prompt 输入提示">
        <nue-div>
            <nue-button theme="small" @click="showPrompt">
                打开输入提示框
            </nue-button>
            <nue-button theme="small" @click="showPromptWithInitialValue">
                打开输入提示框 (带初始值)
            </nue-button>
            <nue-button theme="small" @click="showPromptWithValidator">
                打开输入提示框（带验证器）
            </nue-button>
            <nue-button theme="small" @click="showPromptWithAsyncValidator">
                打开输入提示框（带异步验证器）
            </nue-button>
            <nue-button theme="small" @click="showPromptWithOnConfirm">
                打开输入提示框（带异步验证器以及回调函数）
            </nue-button>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueMessage, NuePrompt } from 'nue-ui';
import Demo from '../layouts/demo.vue';

defineOptions({ name: 'PromptDemo1' });

const showPrompt = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(
        (value: unknown) => NueMessage.success(`${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithInitialValue = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        inputValue: '13800138000',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(
        (value: unknown) => NueMessage.success(`${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithValidator = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        validator: (value: string) => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value);
        }
    }).then((value: unknown) => NueMessage.success(`${value as string}`));
};

const showPromptWithAsyncValidator = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        validator: (value: string) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const regExp = new RegExp(
                        /^(?:(?:\+|00)86)?1[3456789]\d{9}$/
                    );
                    resolve(regExp.test(value));
                }, 1000);
            });
        }
    }).then(
        (value: unknown) => NueMessage.success(`${value as string}`),
        () => NueMessage.info('操作取消')
    );
};

const showPromptWithOnConfirm = () => {
    NuePrompt({
        title: '手机号码填写',
        placeholder: '请输入您的手机号 ...',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        validator: (value: string) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const regExp = new RegExp(
                        /^(?:(?:\+|00)86)?1[3456789]\d{9}$/
                    );
                    resolve(regExp.test(value));
                }, 1000);
            });
        },
        onConfirm: (value: string) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const randomNumber = Math.random();
                    if (value && randomNumber > 0.5) {
                        resolve(1);
                    } else {
                        reject('更新失败');
                    }
                }, 1000);
            });
        }
    }).then(
        (value: unknown) => NueMessage.success(`${value as string}`),
        err => {
            if (!err) NueMessage.info('操作取消');
            NueMessage.error(err.message);
        }
    );
};
</script>
