<template>
    <nue-dropdown :class="classes" @execute="handleExecute">
        <template #default="{ clickTrigger }">
            <nue-button
                :theme="size"
                @click="() => clickTrigger()"
                style="gap: 16px"
                :disabled="disabled">
                <template #default> {{ label }} </template>
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
import { ref, computed, watch, provide } from "vue";
import { NueDropdown, NueButton, NueIcon, NueText } from "../index";
import { parseTheme } from "@nue-ui/utils";
import type {
    SelectProps,
    SelectEmits,
    SelectOption,
    SelectOptions,
    SelectContext,
} from "./types";

defineOptions({ name: "NueSelect" });

const emit = defineEmits<SelectEmits>();
const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: "Select an option",
});

const options = ref<SelectOptions>([]);
const selectedOption = ref<SelectOption>();

const classes = computed(() => {
    const { theme } = props;
    let list: string[] = [];
    const prefix = "nue-select";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const label = computed(() => {
    return selectedOption.value
        ? selectedOption.value.label
        : props.placeholder;
});

function optionRegister(option: SelectOption) {
    options.value.push(option);
}

function handleExecute(executeId: unknown) {
    // console.log(executeId);
    let _option: SelectOption | null = null;
    for (const option of options.value) {
        if (option.value === executeId) {
            _option = option;
            break;
        }
    }
    if (!_option) {
        let _id = executeId as string;
        _option = { label: _id, value: _id };
    }
    selectedOption.value = _option as SelectOption;
}

watch(
    () => selectedOption.value,
    (newValue) => {
        const _nv = newValue ? newValue.value : null;
        emit("update:modelValue", _nv);
        emit("change", _nv);
    }
);

watch(
    () => props.modelValue,
    (newValue) => {
        handleExecute(newValue);
    }
);

provide<SelectContext>("SelectContext", {
    optionRegister,
    selectedOption,
});
</script>
