<template>
    <nue-textarea v-model="textareaVModel" placeholder="请输入内容 ..." :rows="2" />
</template>

<script setup>
import { ref } from 'vue';

const textareaVModel = ref('');
</script>
