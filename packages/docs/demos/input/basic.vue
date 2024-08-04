<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="inputVModel1"
            type="text"
            placeholder="Please input your account" />
        <nue-input
            v-model="inputVModel2"
            type="password"
            placeholder="Please input your password" />
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const inputVModel1 = ref("");
const inputVModel2 = ref("");
</script>
