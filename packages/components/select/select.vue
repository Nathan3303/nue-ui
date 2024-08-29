<template>
    <nue-dropdown
        :class="classes"
        :size="size"
        :hide-on-clicked="hideOnSelect"
        :keep-alive="!!$slots.default"
        @execute="handleExecute">
        <template #default="{ clickTrigger }">
            <nue-button
                :size="size"
                :disabled="disabled"
                style="gap: 16px"
                @click.stop="clickTrigger">
                <template #default>
                    <template v-if="label">{{ label }}</template>
                    <nue-text
                        v-else
                        color="gray"
                        style="font-size: inherit !important">
                        {{ placeholder }}
                    </nue-text>
                </template>
                <template #append>
                    <nue-icon name="select" />
                    <nue-icon
                        v-if="clearable && selectedOption"
                        name="clear"
                        @click.stop="handleClear" />
                </template>
            </nue-button>
        </template>
        <template #dropdown>
            <slot />
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
    hideOnSelect: true,
    placeholder: "Select",
    clearable: false,
});

const options = ref<SelectOption[]>([]);
const selectedOption = ref<SelectOption>();

const classes = computed(() => {
    const { theme } = props;
    const prefix = "nue-select";
    let list: string[] = [prefix];
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
            // console.log(payload, selectedOption.value.value);
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
        emit("update:modelValue", _option?.value);
        emit("change", _option?.value);
    }
    selectedOption.value = _option || void 0;
}

function handleClear() {
    selectedOption.value = void 0;
    emit("update:modelValue", void 0);
    emit("change", void 0);
}

watch(
    () => props.modelValue,
    (newValue) => {
        handleSelect(newValue, true);
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
