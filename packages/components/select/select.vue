<template>
    <nue-dropdown @execute="handleExecute">
        <template #default="{ switchVisible }">
            <nue-button :theme="size" @click="switchVisible" style="gap: 16px">
                <template #default>
                    <nue-text v-if="buttonText" size="12px">
                        {{ buttonText }}
                    </nue-text>
                    <nue-text v-else color="gray" size="12px">
                        Select an option
                    </nue-text>
                </template>
                <template #append>
                    <nue-icon name="select"></nue-icon>
                </template>
            </nue-button>
        </template>
        <template #dropdown>
            <slot>
                <li data-executeid="Option 1">Option 1</li>
                <li data-executeid="Option 2">Option 2</li>
                <li data-executeid="Option 3">Option 3</li>
            </slot>
        </template>
    </nue-dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { NueDropdown } from "../index";
import type { SelectProps, SelectEmits } from "./types";
import "./select.css";

defineOptions({ name: "NueSelect" });

const emit = defineEmits<SelectEmits>();
const props = defineProps<SelectProps>();

const currentSelection = ref("");

const buttonText = computed(() => {
    if (currentSelection.value && currentSelection.value !== "") {
        return currentSelection.value;
    }
    return props.placeholder;
});

function handleExecute(executeId: string) {
    currentSelection.value = executeId;
}
</script>
