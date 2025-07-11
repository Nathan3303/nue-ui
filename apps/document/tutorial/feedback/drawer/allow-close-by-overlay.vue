<template>
    <nue-button @click="drawerState = true">打开抽屉</nue-button>
    <nue-drawer v-model="drawerState" allow-close-by-overlay title="基础抽屉">
        <nue-div style="padding: 1rem">基础抽屉</nue-div>
    </nue-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawerState = ref(false);
</script>
