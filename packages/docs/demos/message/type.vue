<template>
    <nue-div>
        <nue-button @click="showTypedMsg('success')">成功</nue-button>
        <nue-button @click="showTypedMsg('info')">信息</nue-button>
        <nue-button @click="showTypedMsg('warning')">警告</nue-button>
        <nue-button @click="showTypedMsg('error')">错误</nue-button>
        <nue-button @click="showTypedMsg('log')">日志</nue-button>
    </nue-div>
</template>

<script setup>
import { NueMessage } from "nue-ui";

const showTypedMsg = (type) => {
    const messageOptions = { message: "创建Message成功", type };
    NueMessage(messageOptions);
};
</script>
