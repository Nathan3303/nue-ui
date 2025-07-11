<template>
    <nue-button use-throttle :throttle-duration="600" @click="count++">
        节流计数：{{ count }}
    </nue-button>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>
