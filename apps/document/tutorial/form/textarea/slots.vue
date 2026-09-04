<script lang="ts" setup>
import { ref } from 'vue';

const data = ref<string>('lorem ipsum dolor sit amet, consectetur adipiscing elit.');
</script>

<template>
    <nue-textarea placeholder="请输入内容" v-model="data">
        <template #prefix="{ length, maxlength }">
            <nue-text>前置插槽（{{ length }}/{{ maxlength }}）</nue-text>
        </template>
        <template #actions="{ clear }">
            <nue-button theme="secondary,small" icon="clear" @click="clear">清除</nue-button>
        </template>
        <template #suffix="{ length, maxlength }">
            <nue-text>后置插槽（{{ length }}/{{ maxlength }}）</nue-text>
        </template>
    </nue-textarea>
</template>