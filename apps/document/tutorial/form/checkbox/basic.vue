<template>
    <nue-div>
        <nue-checkbox v-model="state" />
        <nue-checkbox v-model="state" label="复选框" />
        <nue-checkbox v-model="state">复选框</nue-checkbox>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state = ref(false);
</script>
