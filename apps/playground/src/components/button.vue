<template>
    <nue-div align="center">
        <nue-button :loading="isSearching" @click="handleSearch">
            加载
        </nue-button>
        <nue-button :throttle-duration="360" use-throttle @click="count++">
            节流 ({{ count }})
        </nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>
