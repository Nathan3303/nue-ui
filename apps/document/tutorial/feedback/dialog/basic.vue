<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <nue-button @click="visible = true">打开对话框</nue-button>
    <nue-dialog v-model="visible" title="基础对话框" />
</template>
