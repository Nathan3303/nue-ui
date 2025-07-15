<template>
    <nue-div vertical align="stretch">
        <nue-input v-model="inputVModel" placeholder="请输入 ..." :debounceTime="500" clearable />
        <nue-text align="center" v-if="inputVModel">{{ inputVModel }}</nue-text>
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
