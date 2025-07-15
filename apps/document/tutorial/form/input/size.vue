<template>
    <nue-div align="center">
        <nue-input v-model="inputVModel" placeholder="Small" size="small" />
        <nue-input v-model="inputVModel" placeholder="Large" size="large" />
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
