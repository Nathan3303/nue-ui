<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="searchText"
            icon="search"
            placeholder="Search"
            clearable
            counter="both"
            :debounce-time="256"
            maxlength="64" />
        <nue-input
            v-model="password"
            icon="lock"
            type="password"
            placeholder="Password"
            clearable
            allow-show-password />
        <nue-input
            placeholder="Disabled input"
            v-model="description"
            disabled />
        <nue-div align="center">
            <nue-input
                theme="noshape"
                placeholder="This is a noshape input"
                v-model="noshape" />
            <nue-input
                theme="small"
                placeholder="Small input"
                v-model="small"
                icon="search" />
            <nue-input
                theme="large"
                placeholder="Large input"
                v-model="large" />
        </nue-div>
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
            placeholder="Enter description" />
        <nue-textarea
            theme="noshape"
            :rows="3"
            v-model="noshape"
            placeholder="This is a noshape textarea" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");
const password = ref("");
const description = ref("");
const noshape = ref("");
const small = ref("");
const large = ref("");
const artical = ref("");
</script>

<style scoped></style>
