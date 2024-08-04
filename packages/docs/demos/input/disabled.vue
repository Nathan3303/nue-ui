<template>
    <nue-input
        v-model="inputVModel"
        placeholder="Please input something"
        disabled />
</template>

<script setup>
import { ref } from "vue";

const inputVModel = ref("");
</script>
