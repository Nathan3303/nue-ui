<template>
    <nue-div>
        <nue-checkbox theme="custom" v-model="state" label="带主题的复选框" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>

<style scoped>
.nue-checkbox--custom {
    &.nue-checkbox--checked {
        --check-icon-color: var(--primary-color-a200);
        --check-label-color: var(--primary-color-a200);
    }
}
</style>
