<template>
    <nue-textarea v-model="textareaVModel" placeholder="请输入内容" autosize />
</template>

<script setup>
import { ref } from "vue";

const textareaVModel = ref("");
</script>
