<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="searchText"
            icon="search"
            placeholder="Search"
            clearable
            counter="both"
            maxlength="64" />
        <nue-input
            v-model="password"
            icon="mima"
            type="password"
            placeholder="Password"
            clearable
            allow-show-password
            shape="round" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");
const password = ref("");
</script>

<style scoped></style>
