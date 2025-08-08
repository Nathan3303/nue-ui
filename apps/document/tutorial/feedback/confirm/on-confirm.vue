<template>
    <nue-button @click="openConfirmWithOnConfirm">打开确认对话框</nue-button>
</template>

<script lang="ts" setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const confirmHandler = () => {
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
};

const openConfirmWithOnConfirm = () => {
    NueConfirm({
        title: '你确定要继续吗？',
        content: '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '继续',
        cancelButtonText: '不继续',
        onConfirm: async () => await confirmHandler()
    })
        .then((res: string) => NueMessage.success(res as string))
        .catch((err: Error) => NueMessage.error(err.message));
};
</script>
