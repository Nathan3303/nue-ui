<template>
    <nue-div>
        <nue-button @click="openConfirm">点击打开确认对话框</nue-button>
        <nue-button @click="openConfirmWidthTheme">
            点击打开确认对话框（带自定义主题）
        </nue-button>
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

function openConfirmWidthTheme() {
    NueConfirm({
        title: "确认对话框",
        content: "你确定要删除吗？",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        theme: "custom",
    }).then(
        () => NueMessage.success("删除确认!"),
        () => NueMessage.info("操作取消!")
    );
}
</script>

<style>
.nue-confirm--custom {
    background-color: #c7ffff;

    .nue-confirm__header * {
        font-size: 14px;
        font-weight: bold;
    }

    .nue-confirm__content * {
        font-size: 14px;
    }

    .nue-confirm__footer {
        .nue-button {
            font-size: 14px;
        }

        .nue-button--primary {
            background-color: var(--primary-color-a200);
        }
    }
}
</style>
