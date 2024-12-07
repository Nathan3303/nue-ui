<template>
    <nue-div>
        <nue-switch />
        <nue-switch show-text />
        <nue-switch active-text="开" inactive-text="关" show-text />
        <nue-switch
            active-text="这是打开时的描述"
            inactive-text="这是开关组件关闭时的描述"
            show-text
        />
        <nue-switch
            v-model="isActive"
            :before-switch="handleBeforeSwitch"
            :loading="isLoading"
            active-text="开"
            inactive-text="关"
            show-text
        />
        <nue-switch theme="custom" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isActive = ref(false);
const isLoading = ref(false);

const handleBeforeSwitch = async () => {
    isLoading.value = true;
    const result = await new Promise(resolve => {
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
