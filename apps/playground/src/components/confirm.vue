<template>
    <demo title="Confirm 确认对话框">
        <nue-div vertical>
            <nue-button @click="openConfirm">打开确认对话框</nue-button>
            <nue-button @click="openConfirmWithTheme">
                打开确认对话框（带自定义主题）
            </nue-button>
            <nue-button @click="openConfirmWithOnConfirm">
                打开确认对话框（带自定义确认回调）
            </nue-button>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueButton, NueConfirm, NueMessage } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

function openConfirm() {
    NueConfirm({
        title: '你确定要继续吗？',
        content:
            '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
    }).then(
        () => NueMessage.success('删除确认!'),
        () => NueMessage.info('操作取消!')
    );
}

function openConfirmWithTheme() {
    NueConfirm({
        title: '你确定要继续吗？',
        content:
            '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '继续',
        cancelButtonText: '不继续',
        theme: 'custom'
    }).then(
        () => NueMessage.success('删除确认!'),
        () => NueMessage.info('操作取消!')
    );
}

function openConfirmWithOnConfirm() {
    NueConfirm({
        title: '你确定要继续吗？',
        content:
            '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        onConfirm: () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const randomNumber = Math.random();
                    if (randomNumber > 0.5) {
                        resolve('删除成功');
                    } else {
                        reject('删除失败，请重试');
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
.nue-confirm--custom {
    background-color: var(--nue-primary-color-900);

    .nue-confirm__header {
        color: var(--nue-primary-color-100);
    }

    .nue-confirm__content {
        color: var(--nue-primary-color-500);
    }

    .nue-confirm__footer {
        .nue-button {
            font-size: 14px;
            color: var(--nue-primary-color-100);
            --hover-background-color: transparent;
            --active-background-color: transparent;
        }

        .nue-button--primary {
            background-color: var(--nue-primary-color-200);
            color: var(--nue-primary-color-900);
        }
    }
}
</style>
