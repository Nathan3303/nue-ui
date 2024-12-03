<template>
    <nue-button @click="drawerState = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer v-model:visible="drawerState" title="抽屉标题">
            <template #header="{ close }">
                <nue-text>自定义头部</nue-text>
                <nue-button @click="close">关闭抽屉</nue-button>
            </template>
            <template #default>
                <nue-text>自定义主体</nue-text>
            </template>
            <template #footer>
                <nue-text>自定义底部</nue-text>
            </template>
        </nue-drawer>
    </teleport>
</template>

<script setup>
    import { ref } from 'vue';

    const drawerState = ref(false);
</script>
