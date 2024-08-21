<template>
    <nue-div vertical>
        <nue-checkbox-group v-model="activeNames" disabled>
            <nue-checkbox
                v-for="name in checkboxes"
                :key="name"
                :label="name"
                :name="name" />
        </nue-checkbox-group>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkboxes = ["Game", "Music", "Movie"];
const activeNames = ref([]);
</script>
