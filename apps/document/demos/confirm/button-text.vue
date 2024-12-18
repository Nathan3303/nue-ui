<template>
    <nue-button @click="showConfirm">
        打开带有自定义按钮文本的确认框
    </nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage } from 'nue-ui';

const showConfirm = () => {
    NueConfirm({
        content: '你确定要继续吗',
        confirmButtonText: '是',
        cancelButtonText: '否'
    }).then(
        () => NueMessage.success('选择已确认'),
        () => NueMessage.info('选择已取消')
    );
};
</script>
