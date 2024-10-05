<template>
    <nue-button @click="showConfirm">打开确认框</nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage } from "nue-ui";

const showConfirm = () => {
    const confirmOptions = { content: "确定要继续吗？" };
    NueConfirm(confirmOptions).then(
        () => NueMessage.success("选择已确认"),
        () => NueMessage.info("选择已取消")
    );
};
</script>
