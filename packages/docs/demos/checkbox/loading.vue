<template>
    <nue-div>
        <nue-checkbox
            v-model="state"
            :label="label"
            :loading="loading"
            :before-check="handleBeforeCheck" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const state = ref(false);
const loading = ref(false);

const label = computed(() => {
    if (loading.value) {
        return "加载中...";
    }
    return state.value ? "已选中" : "未选中";
});

const handleBeforeCheck = () => {
    loading.value = true;
    return new Promise((resolve) => {
        setTimeout(() => {
            loading.value = false;
            resolve(true);
        }, 2000);
    });
};
</script>
