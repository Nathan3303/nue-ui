<template>
    <nue-button @click="drawerState = true">打开抽屉</nue-button>
    <nue-drawer v-model="drawerState" title="抽屉标题">
        <template #header="{ close }">
            <nue-div align="center" justify="space-between">
                <nue-text>自定义头部</nue-text>
                <nue-button @click="close">关闭</nue-button>
            </nue-div>
        </template>
        <template #default>
            <nue-div style="padding: 1rem">自定义主体</nue-div>
        </template>
        <template #footer>
            <nue-div>自定义底部</nue-div>
        </template>
    </nue-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawerState = ref(false);
</script>
