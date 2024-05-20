<template>
    <nue-div>
        <nue-button icon="search" :loading="isSearching" @click="handleSearch">
            Loading Button
        </nue-button>
        <nue-button use-throttle :throttle-duration="360" @click="count++">
            Throttle Button ({{ count }})
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>
