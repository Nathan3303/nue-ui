<template>
    <nue-div align="center">
        <nue-checkbox v-model="state" label="Coding" size="small" />
        <nue-checkbox v-model="state" label="Swimming" />
        <nue-checkbox v-model="state" label="Music" size="large" />
        <nue-checkbox v-model="state" label="Movie" disabled />
        <nue-checkbox theme="bordered" v-model="state" label="Singing" />
        <nue-checkbox
            theme="custom"
            v-model="state"
            label="Draw"
            @change="handleChange" />
        <nue-checkbox
            v-model="state2"
            label="Draw"
            :before-check="handleBeforeCheck"
            :loading="loading"
            @checked="handleChecked"
            @unchecked="handleUnchecked" />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NueMessage } from "nue-ui";

const state = ref(false);
const state2 = ref(false);
const loading = ref(false);

const handleBeforeCheck = () => {
    loading.value = true;
    return new Promise((resolve) => {
        setTimeout(() => {
            loading.value = false;
            resolve(true);
        }, 1000);
    });
};

const handleChange = (state: boolean) => {
    NueMessage.info(`Changed (${state})`);
};

const handleChecked = () => {
    NueMessage.success("Checked");
};

const handleUnchecked = () => {
    NueMessage.success("Unchecked");
};
</script>

<style scoped>
.nue-checkbox--custom.nue-checkbox--checked {
    --check-icon-color: var(--primary-color-a200);
    --check-label-color: var(--primary-color-a200);
}
</style>
