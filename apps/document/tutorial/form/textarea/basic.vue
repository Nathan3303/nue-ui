<template>
    <nue-textarea v-model="textareaVModel" placeholder="请输入内容 ..." />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textareaVModel = ref('');
</script>
