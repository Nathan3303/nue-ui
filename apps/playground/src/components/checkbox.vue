<template>
    <demo title="Checkbox 复选框">
        <nue-checkbox-group
            v-model="activeNames"
            :max="3"
            :min="1"
            controller-label="Hobbies"
            use-controller
        >
            <nue-div align="center">
                <nue-checkbox
                    v-for="cbName in checkboxes"
                    :key="cbName"
                    :label="uppercaseFirst(cbName)"
                    :name="cbName"
                />
                <nue-checkbox
                    :before-check="handleBeforeCheck"
                    :loading="loading"
                    name="network"
                    theme="custom"
                >
                    {{ loading ? 'Checking...' : 'Network' }}
                </nue-checkbox>
            </nue-div>
        </nue-checkbox-group>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Demo from '../layouts/demo.vue';

const checkboxes = ['game', 'music', 'movie', 'sport', 'travel'];
const activeNames = ref<string[]>(['game', 'music']);
const loading = ref(false);

const uppercaseFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleBeforeCheck = () => {
    loading.value = true;
    return new Promise(resolve => {
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
    --check-icon-color: #3c3ce8;
    --check-label-color: #3c3ce8;
}
</style>
