<script setup lang="ts">
import { ref } from 'vue';

const vm = ref('');
</script>

<template>
    <nue-select v-model="vm">
        <nue-select-option value="append-slot" label="自定义追加插槽">
            <nue-div align="center" gap="0.5rem">
                <nue-avatar
                    theme="round"
                    size="1.75rem"
                    src="https://avatars.githubusercontent.com/u/67311306?v=4&size=64"
                />
                <nue-text>Nathan</nue-text>
            </nue-div>
            <template #append>
                <nue-text size="0.875rem" color="green">Online</nue-text>
            </template>
        </nue-select-option>
    </nue-select>
</template>
