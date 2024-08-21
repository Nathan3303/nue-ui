<template>
    <nue-div vertical>
        <nue-checkbox-group v-model="activeNames">
            <nue-checkbox
                v-for="name in checkboxes"
                :key="name"
                :label="name"
                :name="name" />
            <nue-checkbox label="Unnamed" />
        </nue-checkbox-group>
        <nue-text size="14px">
            Checked: {{ activeNames.join(", ") || "none" }}
        </nue-text>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkboxes = ["Game", "Music", "Movie"];
const activeNames = ref([]);
</script>
