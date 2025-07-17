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
    }).then(
        () => NueMessage.success('确认!'),
        () => NueMessage.info('取消!')
    );
}

function openConfirm2() {
    NueConfirm({
        content: '自定义了 自身 以及 背景层 的 动画 以及 动画的持续时间。',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        animation: 'slide-in-from-top',
        closeAnimation: { name: 'slide-out-to-top', duration: 512 },
        overlayAnimation: 'fade-in',
        overlayCloseAnimation: { name: 'fade-out', duration: 512 }
    }).then(
        () => NueMessage.success('确认!'),
        () => NueMessage.info('取消!')
    );
}

function openConfirmWithTheme() {
    NueConfirm({
        content: '自定义了主题',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        theme: 'custom'
    }).then(
        () => NueMessage.success('确认!'),
        () => NueMessage.info('取消!')
    );
}

function openConfirmWithOnConfirm() {
    NueConfirm({
        content: '自定义了确实时的回调函数',
        onConfirm: () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const randomNumber = Math.random();
                    if (randomNumber > 0.5) {
                        resolve('成功');
                    } else {
                        reject('失败，请重试');
                    }
                }, 1024);
            });
        }
    }).then(
        res => NueMessage.success(res as string),
        err => {
            if (err instanceof Error) {
                NueMessage.error(err.message);
            } else {
                NueMessage.info('操作取消!');
            }
        }
    );
}
</script>

<style>
.nue-overlay--custom {
    --nue-overlay-animation-name: fade-in;
    --nue-overlay-animation-duration: 0.36s;
    --nue-overlay-close-animation-name: fade-out;
    --nue-overlay-close-animation-duration: 0.512s;

    .nue-confirm--custom {
        --nue-confirm-bg-color: var(--nue-primary-color-900);
        --nue-confirm-header-color: var(--nue-primary-color-100);
        --nue-confirm-content-color: var(--nue-primary-color-500);
        --nue-confirm-animation-name: slide-in-from-top;
        --nue-confirm-animation-duration: 0.36s;
        --nue-confirm-close-animation-name: slide-out-to-top;
        --nue-confirm-close-animation-duration: 0.512s;

        .nue-confirm__footer {
            .nue-button {
                font-size: 14px;
                color: var(--nue-primary-color-100);
                --nue-button-hover-bg-color: #363636;
                --nue-button-active-bg-color: #363636;
            }

            .nue-button--primary {
                background-color: var(--nue-primary-color-200);
                color: var(--nue-primary-color-900);
            }
        }
    }
}
</style>
