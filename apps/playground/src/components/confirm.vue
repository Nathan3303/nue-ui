<template>
    <nue-div>
        <nue-button theme="small" @click="openConfirm">
            打开确认对话框
        </nue-button>
        <nue-button theme="small" @click="openConfirmWithTheme">
            打开确认对话框（带自定义主题）
        </nue-button>
        <nue-button theme="small" @click="openConfirmWithOnConfirm">
            打开确认对话框（带自定义确认回调）
        </nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { NueConfirm, NueMessage } from 'nue-ui';

function openConfirm() {
    NueConfirm({
        title: '确认对话框',
        content: '你确定要删除吗？',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
    }).then(
        () => NueMessage.success('删除确认!'),
        () => NueMessage.info('操作取消!')
    );
}

function openConfirmWithTheme() {
    NueConfirm({
        title: '确认对话框',
        content: '你确定要删除吗？',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        theme: 'custom'
    }).then(
        () => NueMessage.success('删除确认!'),
        () => NueMessage.info('操作取消!')
    );
}

function openConfirmWithOnConfirm() {
    NueConfirm({
        title: '确认对话框',
        content: '你确定要删除吗？',
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
        res => NueMessage.success(res),
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
    background-color: #c7ffff;

    .nue-confirm__header * {
        font-size: 14px;
        font-weight: bold;
    }

    .nue-confirm__content * {
        font-size: 14px;
    }

    .nue-confirm__footer {
        .nue-button {
            font-size: 14px;
        }

        .nue-button--primary {
            background-color: var(--primary-color-a200);
        }
    }
}
</style>
