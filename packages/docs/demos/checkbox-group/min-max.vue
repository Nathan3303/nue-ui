<template>
    <nue-checkbox-group
        v-model="activeNames"
        use-controller
        :controller-label="controllerLabel"
        :min="1"
        :max="4">
        <nue-checkbox
            v-for="name in checkboxes"
            :key="name"
            :label="name"
            :name="name" />
    </nue-checkbox-group>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const checkboxes = ["Game", "Music", "Movie", "Sport", "Travel"];
const activeNames = ref<string[]>(["Game", "Music"]);

const controllerLabel = computed(() => {
    return "1 < " + activeNames.value.length + " < 4";
});
</script>
