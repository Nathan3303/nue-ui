<template>
    <nue-checkbox-group
        v-model="activeNames"
        use-controller
        controller-label="Hobbies"
        :min="1"
        :max="3">
        <nue-div align="center">
            <nue-checkbox
                v-for="cbName in checkboxes"
                :key="cbName"
                :label="uppercaseFirst(cbName)"
                :name="cbName"></nue-checkbox>
            <nue-checkbox
                theme="custom"
                name="network"
                :before-check="handleBeforeCheck"
                :loading="loading">
                {{ loading ? "Checking..." : "Network" }}
            </nue-checkbox>
        </nue-div>
    </nue-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkboxes = ["game", "music", "movie", "sport", "travel"];
const activeNames = ref<string[]>(["game", "music"]);
const loading = ref(false);

const uppercaseFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleBeforeCheck = () => {
    loading.value = true;
    return new Promise((resolve) => {
        setTimeout(() => {
            loading.value = false;
            resolve(true);
        }, 1000);
    });
};
</script>

<style scoped>
.nue-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.nue-checkbox--custom.nue-checkbox--checked {
    --check-icon-color: var(--primary-color-a200);
    --check-label-color: var(--primary-color-a200);
}
</style>
