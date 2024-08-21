<template>
    <nue-div>
        <nue-checkbox v-model="state" label="Checkbox"></nue-checkbox>
        <nue-checkbox v-model="state">Checkbox</nue-checkbox>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
