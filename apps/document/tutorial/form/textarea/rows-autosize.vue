<template>
    <nue-textarea
        v-model="textareaVModel1"
        placeholder="请输入内容（3行最大高度）"
        autosize
        :rows="3"
    />
</template>

<script setup>
import { ref } from 'vue';

const textareaVModel1 = ref('');
</script>
