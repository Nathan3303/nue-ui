<template>
    <nue-button @click="showMsg">创建一个消息提示</nue-button>
</template>

<script setup>
import { NueMessage } from "nue-ui";

const showMsg = () => {
    const messageOptiosn = { message: "创建Message成功" };
    NueMessage(messageOptiosn);
};
</script>
