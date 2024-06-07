<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="searchText"
            icon="search"
            placeholder="Search with debounce"
            clearable
            counter="both"
            :debounce-time="256"
            maxlength="64" />
        <nue-input
            v-model="searchText"
            placeholder="Search value (readonly)"
            readonly />
        <nue-input
            v-model="password"
            icon="lock"
            type="password"
            placeholder="Password"
            clearable
            allow-show-password
            theme="rounded" />
        <nue-input
            placeholder="Disabled input"
            v-model="description"
            disabled />
        <nue-input
            theme="noshape"
            placeholder="This is a noshape input"
            v-model="noshape" />
        <nue-input theme="small" placeholder="Small input" v-model="small" icon="search" />
        <nue-input theme="large" placeholder="Large input" v-model="large" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");
const password = ref("");
const description = ref("This is a description");
const noshape = ref("This is a noshape input");
const small = ref("This is a small input");
const large = ref("This is a large input");
</script>

<style scoped></style>
