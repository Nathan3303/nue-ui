<template>
    <nue-checkbox-group
        v-model="activeNames"
        use-controller
        controller-label="*">
        <nue-checkbox
            v-for="name in checkboxes"
            :key="name"
            :label="name"
            :name="name" />
    </nue-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkboxes = ["Game", "Music", "Movie", "Sport", "Travel"];
const activeNames = ref<string[]>(["Game", "Music"]);
</script>
