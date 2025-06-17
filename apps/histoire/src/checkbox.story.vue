<script lang="ts" setup>
import { ref } from 'vue';

const checkbox1 = ref(false);
</script>

<template>
    <Story title="NueCheckbox">
        <nue-checkbox v-model="checkbox1" label="基础复选框" />
    </Story>
</template>

<style scoped></style>
