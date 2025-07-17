<template>
    <nue-input v-model="inputVModel" placeholder="请输入内容 ..." />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
