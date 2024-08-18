<template>
    <nue-div align="center">
        <nue-switch v-model="state" show-text></nue-switch>
        <nue-switch
            v-model="state"
            show-text
            active-text="On"
            inactive-text="Off"></nue-switch>
        <nue-switch
            v-model="state"
            show-text
            active-text="Text for state ACTIVE"
            inactive-text="Text for state INACTIVE"></nue-switch>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);
</script>
