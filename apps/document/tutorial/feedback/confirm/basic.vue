<template>
    <nue-button @click="showConfirm">基础确认对话框</nue-button>
</template>

<script lang="ts" setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const showConfirm = () => {
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
};
</script>
