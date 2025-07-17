<template>
    <nue-button @click="basic.visible = true">打开抽屉</nue-button>
    <nue-drawer v-model="basic.visible" title="基础抽屉">
        <nue-div style="padding: 1rem">基础抽屉</nue-div>
    </nue-drawer>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const basic = reactive({ visible: false });
</script>
