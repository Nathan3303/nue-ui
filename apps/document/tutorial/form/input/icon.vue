<template>
    <nue-input v-model="inputVModel" placeholder="Search" icon="search" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
