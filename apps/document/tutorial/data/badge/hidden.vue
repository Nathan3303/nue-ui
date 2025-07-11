<template>
    <nue-badge :hidden="visible" value="徽标">
        <nue-button @click="visible = !visible">{{ !visible ? '隐藏' : '显示' }}徽标</nue-button>
    </nue-badge>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);
</script>
