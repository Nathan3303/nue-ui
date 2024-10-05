<template>
    <nue-div>
        <nue-checkbox v-model="state" label="正常复选框" />
        <nue-checkbox v-model="state" label="禁用复选框" disabled />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
