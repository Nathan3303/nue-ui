<template>
    <nue-checkbox v-model="state" label="带主题的复选框" theme="custom" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state = ref(false);
</script>

<style scoped>
.nue-checkbox--custom.nue-checkbox--checked {
    --nue-check-icon-color: #448aff;
    --nue-check-label-color: #448aff;
}
</style>
