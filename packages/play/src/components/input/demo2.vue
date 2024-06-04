<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="artical"
            placeholder="Enter artical"
            maxlength="512"
            counter="both"
            autosize
            :rows="99" />
        <nue-textarea
            v-model="description"
            placeholder="Enter description"
            resize
            :rows="0" />
        <nue-textarea
            disabled
            v-model="description"
            placeholder="Enter description"
            resize
            :rows="0" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const description = ref("");
const artical = ref("");
</script>

<style scoped></style>
