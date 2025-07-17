<template>
    <nue-textarea v-model="textareaVModel" disabled placeholder="禁用状态" />
</template>

<script setup>
import { ref } from 'vue';

const textareaVModel = ref('');
</script>
