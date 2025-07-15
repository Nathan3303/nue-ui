<template>
    <nue-switch
        v-model="state"
        show-text
        active-text="点击关闭"
        inactive-text="点击打开"
        :loading="loading"
        :before-switch="handleBeforeSwitch"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const state = ref(false);
const loading = ref(false);

const handleBeforeSwitch = async () => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    loading.value = false;
    return true;
};
</script>
