<script setup lang="ts">
import { ref } from 'vue';

const vm = ref('');
</script>

<template>
    <nue-select v-model="vm">
        <nue-select-option icon="theme" value="icon" label="图标选项" />
    </nue-select>
</template>
