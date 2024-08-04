<template>
    <nue-div>
        <nue-button @click="showMsgWithDuration(5000)">
            创建一个持续时间为 5 秒的消息提示
        </nue-button>
        <nue-button @click="showMsgWithDuration(0)">
            创建一个需要手动关闭的消息提示
        </nue-button>
    </nue-div>
</template>

<script setup>
import { NueMessage } from "nue-ui";

const showMsgWithDuration = (duration) => {
    const messageOptions = { message: "创建Message成功", duration };
    NueMessage(messageOptions);
};
</script>
