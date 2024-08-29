<template>
    <nue-div>
        <nue-button @click="openConfirm">点击打开确认对话框</nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueConfirm, NueMessage } from "nue-ui";

function openConfirm() {
    NueConfirm({
        title: "确认对话框",
        content: "你确定要删除吗？",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    }).then(
        () => NueMessage.success("删除确认!"),
        () => NueMessage.info("操作取消!")
    );
}
</script>

<style scoped></style>
