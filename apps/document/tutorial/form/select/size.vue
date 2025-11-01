<template>
    <nue-div align="center">
        <nue-select v-model="vm" size="small" placeholder="请选择">
            <nue-select-option label="选项 A" value="optionA" />
            <nue-select-option label="选项 B" value="optionB" />
        </nue-select>
        <nue-select v-model="vm" size="large" placeholder="请选择">
            <nue-select-option label="选项 A" value="optionA" />
            <nue-select-option label="选项 B" value="optionB" />
        </nue-select>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const vm = ref(null);
</script>
