<template>
    <nue-button @click="openConfirm2">打开确认对话框</nue-button>
</template>

<script lang="ts" setup>
import { NueConfirm } from 'nue-ui';

function openConfirm2() {
    NueConfirm({
        content: '自定义了 自身 以及 背景层 的 动画 以及 动画的持续时间。',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        animation: 'slide-in-from-top',
        closeAnimation: { name: 'slide-out-to-top', duration: 240 },
        overlayAnimation: 'fade-in',
        overlayCloseAnimation: { name: 'fade-out', duration: 240 }
    });
}
</script>
