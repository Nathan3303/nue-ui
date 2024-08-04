<template>
    <nue-div>
        <nue-button
            icon="search"
            @click="changeLoadingState"
            :loading="loadingState">
            搜索
        </nue-button>
        <nue-button
            icon="search"
            @click="changeLoadingState"
            :loading="loadingState"
            loading-icon="scan">
            搜索
        </nue-button>
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const loadingState = ref(false);

const changeLoadingState = () => {
    loadingState.value = true;
    setTimeout(() => (loadingState.value = false), 3000);
};
</script>
