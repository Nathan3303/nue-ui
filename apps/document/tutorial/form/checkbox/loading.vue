<template>
    <nue-checkbox
        v-model="state"
        :before-check="handleBeforeCheck"
        :label="label"
        :loading="loading"
    />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const state = ref(false);
const loading = ref(false);

const label = computed(() => {
    if (loading.value) return '处理中...';
    return state.value ? '已选中' : '未选中';
});

const handleBeforeCheck = () => {
    loading.value = true;
    return new Promise(resolve => {
        setTimeout(() => {
            loading.value = false;
            resolve(true);
        }, 2000);
    });
};
</script>
