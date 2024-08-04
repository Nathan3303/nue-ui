<template>
    <nue-button @click="drawerState = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawerState"
            title="抽屉标题"
            :before-close="beforeCloseDrawer">
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>

<script setup>
import { ref } from "vue";
import { NueConfirm } from "nue-ui";

const drawerState = ref(false);

const beforeCloseDrawer = (finish) => {
    const confirmOptions = {
        title: "关闭确认",
        content: "确认是否关闭抽屉",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    };
    NueConfirm(confirmOptions)
        .then(() => finish())
        .catch(() => {});
};
</script>
