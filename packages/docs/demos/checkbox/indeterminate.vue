<template>
    <nue-div>
        <nue-checkbox v-model="state1" label="Unchecked" />
        <nue-checkbox
            v-model="state2"
            :indeterminate="isIndeterminate"
            label="Indeterminate" />
        <nue-checkbox v-model="state3" label="Checked" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state1 = ref(false);
const state2 = ref(false);
const state3 = ref(true);
const isIndeterminate = ref(true);
</script>
