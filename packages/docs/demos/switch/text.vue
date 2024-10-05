<template>
    <nue-div align="center">
        <nue-switch v-model="state1" show-text></nue-switch>
        <nue-switch
            v-model="state2"
            show-text
            active-text="开"
            inactive-text="关"></nue-switch>
        <nue-switch
            v-model="state3"
            show-text
            active-text="当前状态为开"
            inactive-text="状态：关"></nue-switch>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state1 = ref(false);
const state2 = ref(false);
const state3 = ref(false);
</script>
