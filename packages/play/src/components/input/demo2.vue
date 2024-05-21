<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="description"
            placeholder="Enter description"
            max-length="200" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const description = ref("");
</script>

<style scoped></style>
