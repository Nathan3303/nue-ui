<template>
    <nue-div vertical align="stretch">
        <nue-textarea v-model="textareaVModel" placeholder="Please input something" size="large" />
        <nue-textarea v-model="textareaVModel" placeholder="Please input something" size="small" />
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const textareaVModel = ref('');
</script>
