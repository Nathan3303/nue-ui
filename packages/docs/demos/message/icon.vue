<template>
    <nue-button @click="showMsgWithIcon('completed')">
        创建一个带图标的消息提示
    </nue-button>
</template>

<script setup>
import { NueMessage } from "nue-ui";

const showMsgWithIcon = (icon) => {
    const messageOptions = { message: "创建Message成功", icon };
    NueMessage(messageOptions);
};
</script>
