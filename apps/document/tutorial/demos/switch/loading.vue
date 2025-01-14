<template>
    <nue-div align="center">
        <nue-switch
            v-model="state"
            show-text
            active-text="点击关闭"
            inactive-text="点击打开"
            :loading="loading"
            :before-switch="handleBeforeSwitch"
        ></nue-switch>
    </nue-div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { NueMessage } from 'nue-ui';

    const state = ref(false);
    const loading = ref(false);

    const handleBeforeSwitch = async (state: boolean) => {
        loading.value = true;
        const stateText = state ? '关闭' : '打开';
        const valid = await new Promise(resolve => {
            setTimeout(() => resolve(Math.random() >= 0.3), 1000);
        });
        if (valid) {
            NueMessage.success(`${stateText}成功`);
        } else {
            NueMessage.error(`${stateText}失败`);
        }
        loading.value = false;
        return valid;
    };
</script>
