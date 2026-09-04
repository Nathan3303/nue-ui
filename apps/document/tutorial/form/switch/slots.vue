<script setup lang="ts">
import { ref } from 'vue';
const sw5 = ref(false);
</script>

<template>
    <nue-switch v-model="sw5">
        <template #circle>
            <img :src="`https://picsum.photos/32?t=${sw5}`" />
        </template>
        <template #text>
            {{ sw5 ? '开' : '关' }}
        </template>
    </nue-switch>
</template>