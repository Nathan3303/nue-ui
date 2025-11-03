<template>
    <demo title="基础">
        <nue-button @click="openConfirm">打开确认对话框</nue-button>
    </demo>
    <demo title="自定义动画 & 动画持续时间">
        <nue-button @click="openConfirm2">打开确认对话框</nue-button>
    </demo>
    <demo title="自定义主题">
        <nue-button @click="openConfirmWithTheme">打开确认对话框</nue-button>
    </demo>
    <demo title="自定义确认回调">
        <nue-button @click="openConfirmWithOnConfirm">打开确认对话框</nue-button>
    </demo>
    <demo title="自定义事件">
        <nue-button @click="openConfirm3">打开确认对话框</nue-button>
    </demo>
</template>

<script lang="ts" setup>
import { NueButton, NueConfirm, NueMessage } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

function openConfirm() {
    NueConfirm({
        title: '你确定要继续吗？',
        content: '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '继续',
        cancelButtonText: '不继续'
    }).then(([isByCancel]) => {
        if (isByCancel) {
            NueMessage.info('取消!');
            return;
        }
        NueMessage.success('确认!');
    });
}

function openConfirm2() {
    NueConfirm({
        title: '动画',
        content: '自定义了 自身 以及 背景层 的 动画 以及 动画的持续时间。',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        animation: 'slide-in-from-top',
        closeAnimation: { name: 'slide-out-to-top', duration: 512 },
        overlayAnimation: 'fade-in',
        overlayCloseAnimation: { name: 'fade-out', duration: 512 }
    }).then(([isByCancel]) => {
        if (isByCancel) {
            NueMessage.info('取消!');
            return;
        }
        NueMessage.success('确认!');
    });
}

function openConfirmWithTheme() {
    NueConfirm({
        title: '自定义主题',
        content: '自定义了主题',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        theme: 'custom'
    }).then(([isByCancel]) => {
        if (isByCancel) {
            NueMessage.info('取消!');
            return;
        }
        NueMessage.success('确认!');
    });
}

function openConfirmWithOnConfirm() {
    NueConfirm({
        title: '自定义确认回调',
        content: '自定义了确认时的同步回调函数',
        onConfirm: async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const randomNumber = Math.floor(Math.random() * 100);
                    if (randomNumber % 2 === 0) {
                        resolve('确认成功!');
                    } else {
                        reject(new Error('确认失败!'));
                    }
                }, 1024);
            });
        }
    }).then(
        ([isByCancel, onConfirmResult]) => {
            if (isByCancel) return;
            NueMessage.success(onConfirmResult as string);
        },
        err => {
            if (err instanceof Error) {
                NueMessage.error(err.message);
                return;
            }
            NueMessage.error(err);
        }
    );
}

function openConfirm3() {
    NueConfirm({
        title: '生命周期回调',
        content: '定义了多个生命周期的回调函数',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        beforeOpen: () => console.log('beforeOpen'),
        afterOpen: () => console.log('afterOpen'),
        beforeClose: () => console.log('beforeClose'),
        afterClose: () => console.log('afterClose'),
        afterConfirm: () => console.log('afterConfirm'),
        afterCancel: () => console.log('afterCancel')
    }).then(([isByCancel]) => {
        if (isByCancel) {
            NueMessage.info('取消!');
            return;
        }
        NueMessage.success('确认!');
    });
}
</script>

<style>
.nue-confirm--custom {
    --nue-confirm-animation-name: slide-in-from-top;
    --nue-confirm-close-animation-name: slide-out-to-top;

    width: 16rem;
    height: 9rem;
    background-color: #212121;

    .nue-confirm__header {
        font-size: 1rem;
        color: #f9f9f9;
    }

    .nue-confirm__content {
        font-size: 0.875rem;
        color: #c5c5c5;
    }

    .nue-confirm__footer .nue-button--primary {
        background-color: #f2f2f2;
        color: #212121;
    }
}
</style>
