<template>
    <nue-div align="center">
        <nue-checkbox v-model="state" label="Small" size="small" />
        <nue-checkbox v-model="state" label="Normal" />
        <nue-checkbox v-model="state" label="Large" size="large"  />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
