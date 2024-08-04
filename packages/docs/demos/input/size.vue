<template>
    <nue-div align="center" wrap="nowrap" gap="12px">
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            size="large" />
        <nue-input v-model="inputVModel" placeholder="Please input something" />
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            size="small" />
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const inputVModel = ref("");
</script>
