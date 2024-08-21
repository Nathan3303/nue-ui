<template>
    <nue-div>
        <nue-checkbox v-model="state" label="Normal" />
        <nue-checkbox v-model="state" label="Disabled" disabled />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
