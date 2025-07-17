<template>
    <nue-button @click="showMsg">创建一个消息提示</nue-button>
</template>

<script lang="ts" setup>
import { NueMessage } from 'nue-ui';

const showMsg = () => {
    NueMessage({ message: '创建Message成功' });
};
</script>
