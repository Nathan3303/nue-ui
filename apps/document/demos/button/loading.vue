<template>
    <nue-div>
        <nue-button icon="search" :loading="loading1" @click="changeLoading1">
            搜索
        </nue-button>
        <nue-button
            icon="refresh"
            loading-icon="refresh"
            :loading="loading2"
            @click="changeLoading2"
        >
            刷新
        </nue-button>
    </nue-div>
</template>

<script setup>
    import { ref } from 'vue';

    const loading1 = ref(false);
    const loading2 = ref(false);

    const changeLoading1 = () => {
        loading1.value = true;
        setTimeout(() => (loading1.value = false), 3000);
    };

    const changeLoading2 = () => {
        loading2.value = true;
        setTimeout(() => (loading2.value = false), 3000);
    };
</script>
