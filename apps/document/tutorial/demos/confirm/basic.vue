<template>
    <nue-button @click="showConfirm">打开确认框</nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const showConfirm = () => {
    NueConfirm({ content: '确定要继续吗？' }).then(
        () => NueMessage.success('选择已确认'),
        () => NueMessage.info('选择已取消')
    );
};
</script>
