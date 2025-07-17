<template>
    <nue-div align="center">
        <nue-switch v-model="state1" disabled />
        <nue-switch v-model="state2" disabled />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const state1 = ref(false);
const state2 = ref(true);
</script>
