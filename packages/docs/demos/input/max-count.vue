<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            :maxlength="inputMaxlength" />
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            :maxlength="inputMaxlength"
            counter="word-limit" />
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            :maxlength="inputMaxlength"
            counter="word-left" />
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            :maxlength="inputMaxlength"
            counter="both" />
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const inputVModel = ref("");
const inputMaxlength = ref(48);
</script>
