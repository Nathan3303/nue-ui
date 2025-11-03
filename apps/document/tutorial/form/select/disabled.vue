<template>
    <nue-div align="center">
        <nue-select v-model="vm" :disabled="disabled">
            <nue-select-option label="选项 A" value="optionA" />
            <nue-select-option label="选项 B" value="optionB" />
        </nue-select>
        <nue-switch v-model="disabled" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const vm = ref(null);
const disabled = ref(false);
</script>
