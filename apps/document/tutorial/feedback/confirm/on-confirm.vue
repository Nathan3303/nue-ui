<template>
    <nue-button @click="openConfirmWithOnConfirm">打开确认对话框</nue-button>
</template>

<script lang="ts" setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const openConfirmWithOnConfirm = () => {
    NueConfirm({
        title: '你确定要继续吗？',
        content: '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '继续',
        cancelButtonText: '不继续',
        onConfirm: async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const randomNumber = Math.floor(Math.random() * 100);
                    if (randomNumber % 2 === 0) {
                        resolve('执行成功!');
                    } else {
                        reject(new Error('执行失败!'));
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
};
</script>
