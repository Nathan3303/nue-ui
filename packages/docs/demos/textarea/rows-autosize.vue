<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="textareaVModel1"
            placeholder="请输入内容（3行最大高度）"
            autosize />
        <nue-textarea
            v-model="textareaVModel2"
            placeholder="请输入内容（999行最大高度）"
            autosize
            :rows="0" />
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const textareaVModel1 = ref("");
const textareaVModel2 = ref("");
</script>
