<script setup lang="ts">
import { ref } from 'vue';

const vm = ref('');
</script>

<template>
    <nue-select v-model="vm">
        <nue-select-option value="disabled" label="禁用选项" disabled />
    </nue-select>
</template>
