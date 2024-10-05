<template>
    <nue-div>
        <nue-checkbox v-model="state" label="复选框"></nue-checkbox>
        <nue-checkbox v-model="state">复选框</nue-checkbox>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
