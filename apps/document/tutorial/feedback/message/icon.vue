<template>
    <nue-button @click="showMsgWithIcon('completed')">创建一个带图标的消息提示</nue-button>
</template>

<script lang="ts" setup>
import { NueMessage } from 'nue-ui';

const showMsgWithIcon = icon => {
    NueMessage({
        message: '创建Message成功',
        icon
    });
};
</script>
