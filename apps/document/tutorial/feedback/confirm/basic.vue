<template>
    <nue-button @click="showConfirm">打开确认对话框</nue-button>
</template>

<script lang="ts" setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const showConfirm = () => {
    NueConfirm({
        title: '你确定要继续吗？',
        content: '执行此操作将无法撤销。这将永久删除您的帐户，并从我们的服务器上清除您的数据。',
        confirmButtonText: '继续',
        cancelButtonText: '不继续'
    }).then(
        () => NueMessage.success('确认!'),
        () => NueMessage.info('取消!')
    );
};
</script>
