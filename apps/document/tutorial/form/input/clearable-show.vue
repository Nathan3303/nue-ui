<template>
    <nue-input
        v-model="inputVModel"
        placeholder="Password"
        icon="lock"
        type="password"
        clearable
        allow-show-password
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
