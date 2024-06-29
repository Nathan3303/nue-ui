<template>
    <nue-dropdown :class="classes" @execute="handleExecute">
        <template #default="{ clickTrigger }">
            <nue-button
                :theme="size"
                @click="() => clickTrigger()"
                style="gap: 16px"
                :disabled="disabled">
                <template #default>
                    <template v-if="label">{{ label }}</template>
                    <nue-text
                        v-else
                        color="gray"
                        style="font-size: inherit !important"
                        >{{ placeholder }}</nue-text
                    >
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
import { ref, computed, watch, provide, onMounted } from "vue";
import { NueDropdown, NueButton, NueIcon, NueText } from "../index";
import { parseTheme } from "@nue-ui/utils";
import type {
    SelectProps,
    SelectEmits,
    SelectOption,
    SelectContext,
} from "./types";

defineOptions({ name: "NueSelect" });

const emit = defineEmits<SelectEmits>();
const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: "Select",
});

const options = ref<SelectOption[]>([]);
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
    return selectedOption && selectedOption.value?.label;
});

function optionRegister(option: SelectOption) {
    options.value.push(option);
}

function handleExecute(executeId: string) {
    // console.log(executeId);
    handleSelect(executeId);
}

function handleSelect(payload: unknown, isParseMV = false) {
    let _option: SelectOption | undefined = void 0;
    if (isParseMV) {
        if (selectedOption.value && payload === selectedOption.value.value) {
            return;
        }
        for (const option of options.value) {
            if (payload === option.value) {
                _option = option;
                break;
            }
        }
    } else {
        if (
            selectedOption.value &&
            payload === selectedOption.value.executeId
        ) {
            return;
        }
        for (const option of options.value) {
            if ((payload as string) === option.executeId) {
                _option = option;
                break;
            }
        }
    }
    selectedOption.value = _option || void 0;
}

watch(
    () => props.modelValue,
    (newValue) => handleSelect(newValue, true)
);

watch(
    () => selectedOption.value,
    (newValue) => {
        const _nv = newValue ? newValue.value : null;
        emit("update:modelValue", _nv);
        emit("change", _nv);
    }
);

onMounted(() => {
    handleSelect(props.modelValue, true);
});

provide<SelectContext>("SelectContext", {
    optionRegister,
    selectedOption,
});
</script>
