<template>
    <nue-div align="center" :divider="{}">
        <nue-switch v-model="state"></nue-switch>
        <nue-text>{{ stateText }}</nue-text>
    </nue-div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const state = ref(false);

const stateText = computed(() => {
    return state.value ? "开" : "关";
});
</script>
