<template>
    <nue-button use-throttle :throttle-duration="460" @click="count++">
        计数：{{ count }}
    </nue-button>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
</script>
