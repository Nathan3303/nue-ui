<template>
    <nue-input v-model="inputVModel" placeholder="禁用状态" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
