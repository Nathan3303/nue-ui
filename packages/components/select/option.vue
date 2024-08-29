<template>
    <li
        class="nue-select__option"
        :data-executeid="executeId"
        :data-disabled="disabled"
        :data-selected="selected"
        @click="handleClick">
        {{ label }}
        <nue-icon v-if="selected" name="completed"></nue-icon>
    </li>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import type { SelectOptionProps, SelectContext } from "./types";
import { generateId } from "@nue-ui/utils";
import { NueIcon } from "../index";
import "./option.css";

const selectContext: SelectContext = inject("SelectContext")!;

defineOptions({ name: "NueSelectOption" });
const props = defineProps<SelectOptionProps>();

const executeId = ref<string>(generateId(4));

const selected = computed(() => {
    const selectedOption = selectContext.selectedOption.value;
    return selectedOption?.label === props.label;
});

function handleClick(e: MouseEvent) {
    if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
    }
}

selectContext.optionRegister({
    executeId: executeId.value,
    ...props,
});

</script>
