<script setup lang="ts">
import { ref } from 'vue';

const vm = ref('');
</script>

<template>
    <nue-select v-model="vm">
        <nue-select-option value="loading" label="加载中" loading />
        <nue-select-option value="loading" label="加载中（指定图标）" loading loading-icon="scan" />
    </nue-select>
</template>
