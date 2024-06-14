<template>
    <nue-dropdown @execute="handleExecute">
        <template #default="{ clickTrigger }">
            <nue-button
                :theme="size"
                @click="() => clickTrigger()"
                style="gap: 16px"
                :disabled="disabled">
                <template #default>
                    <template v-if="buttonText" size="12px">
                        {{ buttonText }}
                    </template>
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
                <nue-text color="gray" size="12px" align="center">
                    No options
                </nue-text>
            </slot>
        </template>
    </nue-dropdown>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { NueDropdown, NueButton, NueIcon, NueText } from "../index";
import type { SelectProps, SelectEmits } from "./types";
import "./select.css";

defineOptions({ name: "NueSelect" });

const emit = defineEmits<SelectEmits>();
const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: "Select an option",
});

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

watch(
    () => currentSelection.value,
    (newValue) => emit("change", newValue)
);
</script>
