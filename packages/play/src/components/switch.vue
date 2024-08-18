<template>
    <nue-div align="center">
        <nue-switch size="small"></nue-switch>
        <nue-switch></nue-switch>
        <nue-switch size="large"></nue-switch>
        <nue-switch show-text></nue-switch>
        <nue-switch show-text active-text="开" inactive-text="关"></nue-switch>
        <nue-switch
            show-text
            active-text="开"
            inactive-text="关"
            v-model="isActive"
            :loading="isLoading"
            :before-switch="handleBeforeSwitch"></nue-switch>
        <nue-switch theme="custom"></nue-switch>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
const isLoading = ref(false);

const handleBeforeSwitch = async () => {
    isLoading.value = true;
    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
    isLoading.value = false;
    return result;
};
</script>

<style scoped>
.nue-switch--custom {
    --background-active-color: var(--primary-color-a200);
}
</style>
