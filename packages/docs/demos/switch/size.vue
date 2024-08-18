<template>
    <nue-div align="center">
        <nue-switch v-model="state" size="small"></nue-switch>
        <nue-switch v-model="state"></nue-switch>
        <nue-switch v-model="state" size="large"></nue-switch>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
