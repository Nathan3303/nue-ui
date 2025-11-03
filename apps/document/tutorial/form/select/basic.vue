<template>
    <nue-div align="center">
        <nue-select v-model="vm">
            <nue-select-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
            />
        </nue-select>
        当前值: {{ vm || '无' }}
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const vm = ref(null);
const options = [
    { label: '选项 A', value: 'optionA' },
    { label: '选项 B', value: 'optionB' }
];
</script>
