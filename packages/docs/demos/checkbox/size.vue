<template>
    <nue-div align="center">
        <nue-checkbox v-model="state1" label="小型复选框" size="small" />
        <nue-checkbox v-model="state2" label="正常复选框" />
        <nue-checkbox v-model="state3" label="大型复选框" size="large"  />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state1 = ref(false);
const state2 = ref(false);
const state3 = ref(false);
</script>
