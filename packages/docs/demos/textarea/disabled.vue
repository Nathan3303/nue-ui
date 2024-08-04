<template>
    <nue-textarea
        v-model="textareaVModel"
        placeholder="Please input something"
        disabled />
</template>

<script setup>
import { ref } from "vue";

const textareaVModel = ref("");
</script>
