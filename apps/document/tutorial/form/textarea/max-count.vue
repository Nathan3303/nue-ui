<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="textareaVModel"
            placeholder="显示字符限制（正向计数）"
            :maxlength="256"
            counter="word-limit"
        />
        <nue-textarea
            v-model="textareaVModel"
            placeholder="显示剩余字数（逆向计数）"
            :maxlength="256"
            counter="word-left"
        />
        <nue-textarea
            v-model="textareaVModel"
            placeholder="同时显示字符限制和剩余字数"
            :maxlength="256"
            counter="both"
        />
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const textareaVModel = ref('');
</script>
