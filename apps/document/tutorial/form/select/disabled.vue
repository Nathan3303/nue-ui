<template>
    <nue-select v-model="selectVModel" disabled>
        <nue-select-option label="Option 1" value="1" />
        <nue-select-option label="Option 2" value="2" />
    </nue-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectVModel = ref(null);
</script>
