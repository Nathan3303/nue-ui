<template>
    <demo title="Switch 开关">
        <nue-div vertical>
            <nue-div align="center">
                <nue-switch />
                <nue-switch show-text />
                <nue-switch active-text="开" inactive-text="关" show-text />
                <nue-switch
                    active-text="这是打开时的描述"
                    inactive-text="这是开关组件关闭时的描述"
                    show-text
                />
            </nue-div>
            <nue-div align="center">
                <nue-switch
                    active-text="大型开关"
                    inactive-text="大型开关"
                    show-text
                    size="large"
                />
                <nue-switch
                    active-text="小型开关"
                    inactive-text="小型开关"
                    show-text
                    size="small"
                />
            </nue-div>
            <nue-div align="center">
                <nue-switch
                    v-model="isActive"
                    :before-switch="handleBeforeSwitch"
                    :loading="isLoading"
                    active-text="开"
                    inactive-text="关"
                    show-text
                />
            </nue-div>
            <nue-div align="center">
                <nue-switch theme="custom1" />
                <nue-switch theme="custom2" />
                <nue-switch theme="custom3" />
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueSwitch } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const isActive = ref(false);
const isLoading = ref(false);

const handleBeforeSwitch = async (value: boolean) => {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    isLoading.value = false;
    return !value;
};
</script>

<style scoped>
.nue-switch--custom1 {
    --background-active-color: var(--nue-success-color);
}

.nue-switch--custom2 {
    --background-active-color: var(--nue-warning-color);
}

.nue-switch--custom3 {
    --background-active-color: var(--nue-error-color);
}
</style>
