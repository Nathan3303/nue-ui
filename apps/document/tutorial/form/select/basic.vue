<template>
    <nue-select v-model="selectVModel">
        <nue-select-option label="选项 A" value="1" />
        <nue-select-option label="选项 B" value="2" />
    </nue-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectVModel = ref(null);
</script>
