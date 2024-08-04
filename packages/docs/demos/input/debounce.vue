<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            :debounceTime="500" />
        <nue-text size="14px"> 输入框文本：{{ inputVModel }} </nue-text>
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const inputVModel = ref("");
</script>
