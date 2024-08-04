<template>
    <nue-button @click="drawerState = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer v-model:visible="drawerState" title="抽屉标题">
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>

<script setup>
import { ref } from "vue";

const drawerState = ref(false);
</script>
