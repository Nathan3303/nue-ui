<template>
    <nue-button @click="drawerState = true">打开抽屉</nue-button>
    <nue-drawer v-model="drawerState" title="抽屉标题" span="60%" min-span="360px">
        <nue-div style="padding: 1rem">基础抽屉</nue-div>
    </nue-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawerState = ref(false);
</script>
