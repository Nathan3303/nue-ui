<template>
    <nue-button @click="showConfirm">打开带有自定义标题的确认框</nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const showConfirm = () => {
    NueConfirm({
        content: '你确定要继续吗',
        title: '提示'
    }).then(
        () => NueMessage.success('选择已确认'),
        () => NueMessage.info('选择已取消')
    );
};
</script>
