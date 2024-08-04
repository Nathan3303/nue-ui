<template>
    <nue-div height="128px">
        <nue-select v-model="selectVModel">
            <nue-select-option label="Option 1" value="1" />
            <nue-select-option label="Option 2" value="2" />
        </nue-select>
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const selectVModel = ref(null);
</script>
