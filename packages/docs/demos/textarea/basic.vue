<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="textareaVModel"
            type="text"
            placeholder="Please input your text" />
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const textareaVModel = ref("");
</script>
