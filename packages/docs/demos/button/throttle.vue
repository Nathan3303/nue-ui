<template>
    <nue-button use-throttle :throttle-duration="360" @click="count++">
        点击抢票 (网络请求次数: {{ count }})
    </nue-button>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
</script>
