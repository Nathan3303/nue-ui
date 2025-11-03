<script lang="ts" setup>
import { ref } from 'vue';

const vm = ref(null);
</script>

<template>
    <nue-select v-model="vm" placeholder="请选择一个选项">
        <nue-select-option label="选项 A" value="optionA" />
        <nue-select-option label="选项 B" value="optionB" />
    </nue-select>
</template>
