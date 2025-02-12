<script lang="ts" setup>
import { ref } from 'vue';
import { NueTextarea, NueButton, NueDiv } from '@nue-ui/components';

const text = ref('');

const changeText = () => {
    text.value = '修改了文本';
};
</script>

<template>
    <nue-div align="stretch" vertical>
        <nue-textarea v-model="text" />
        <nue-button @click="changeText">修改文本</nue-button>
    </nue-div>
</template>

<style scoped></style>
