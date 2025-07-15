<template>
    <nue-div align="center">
        <nue-switch v-model="state"></nue-switch>
        <nue-text>{{ state ? '开' : '关' }}</nue-text>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const state = ref(false);
</script>
