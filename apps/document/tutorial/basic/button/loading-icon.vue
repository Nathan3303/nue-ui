<template>
    <nue-button :loading="loading" icon="search" loading-icon="scan" @click="changeLoading">
        搜索
    </nue-button>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const changeLoading = () => {
    loading.value = true;
    setTimeout(() => (loading.value = false), 3000);
};
</script>
