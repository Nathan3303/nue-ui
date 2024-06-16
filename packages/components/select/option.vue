<template>
    <li
        class="nue-select__option"
        :data-executeid="value"
        :data-disabled="disabled"
        :data-selected="selected">
        {{ label }}
        <nue-icon v-if="selected" name="completed"></nue-icon>
    </li>
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from "vue";
import type { SelectOptionProps, SelectContext } from "./types";
import { NueIcon } from "../index";
import "./option.css";

const selectContext: SelectContext = inject("SelectContext")!;

defineOptions({ name: "NueSelectOption" });
const props = defineProps<SelectOptionProps>();

const selected = computed(() => {
    return selectContext.selectedOption.value?.label === props.label;
});

onMounted(() => selectContext.optionRegister(props));
</script>
