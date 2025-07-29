<template>
    <nue-button :theme="{ custom: true, round: isRounded }" @click="isRounded = !isRounded">
        点击{{ isRounded ? '取消' : '应用' }} Round 主题
    </nue-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isRounded = ref(false);
</script>

<style scoped>
.nue-button--custom {
    --custom-color: 0 72.22% 50.59%;

    color: white;
    background-color: hsl(var(--custom-color));
    border-color: transparent;
    transition: none;

    &:hover {
        background-color: hsl(var(--custom-color) / 0.9);
    }

    &:active {
        background-color: hsl(var(--custom-color) / 0.7);
    }
}

.nue-button--round {
    border-radius: 99px;
}
</style>
