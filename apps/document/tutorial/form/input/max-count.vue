<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="inputVModel"
            placeholder="显示字符限制（正向计数）"
            maxlength="48"
            counter="word-limit"
            clearable
        />
        <nue-input
            v-model="inputVModel"
            placeholder="显示剩余字数（逆向计数）"
            maxlength="48"
            counter="word-left"
            clearable
        />
        <nue-input
            v-model="inputVModel"
            placeholder="同时显示字符限制和剩余字数"
            maxlength="48"
            counter="both"
            clearable
        />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputVModel = ref('');
</script>
