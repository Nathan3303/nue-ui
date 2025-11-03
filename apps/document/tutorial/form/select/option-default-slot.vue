<script setup lang="ts">
import { ref } from 'vue';

const vm = ref('');
</script>

<template>
    <nue-select v-model="vm">
        <nue-select-option value="custom-content" label="自定义主体">
            <nue-div align="center" gap="0.5rem">
                <nue-avatar
                    theme="round"
                    size="1.75rem"
                    src="https://avatars.githubusercontent.com/u/67311306?v=4&size=64"
                />
                <nue-text>Nathan</nue-text>
            </nue-div>
        </nue-select-option>
    </nue-select>
</template>
