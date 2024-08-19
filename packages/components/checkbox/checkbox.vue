<template>
    <div :class="classes" @click="handleClick">
        <nue-icon class="nue-checkbox__icon" :name="iconName" :spin="loading" />
        <span class="nue-checkbox__label">
            <slot>{{ label }}</slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import NueIcon from "../icon/icon.vue";
import { parseTheme } from "@nue-ui/utils";
import type { NueCheckboxProps, NueCheckboxEmits } from "./types";
import "./checkbox.css";
import { isFunction } from "lodash-es";

defineOptions({ name: "NueCheckbox" });
const props = withDefaults(defineProps<NueCheckboxProps>(), {
    disabled: false,
    loading: false,
});
const emit = defineEmits<NueCheckboxEmits>();

const checked = ref(false);

const classes = computed(() => {
    const { disabled, theme, size, loading } = props;
    let list: string[] = [];
    const prefix = "nue-checkbox";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (size) list.push(`${prefix}--${size}`);
    if (disabled) list.push(`${prefix}--disabled`);
    if (loading) list.push(`${prefix}--loading`);
    if (checked.value) list.push(`${prefix}--checked`);
    return list;
});

const label = computed(() => {
    const { label, name } = props;
    return label ?? name;
});

const iconName = computed(() => {
    const { loading } = props;
    if (loading) return "loading";
    return checked.value ? "square-check-fill" : "square";
});

const handleClick = async () => {
    const { loading, disabled, beforeCheck } = props;
    if (loading || disabled) return;
    if (isFunction(beforeCheck)) {
        try {
            const result = await beforeCheck(checked.value);
            if (!result) return;
        } catch (e) {
            return;
        }
    }
    checked.value = !checked.value;
    emit("update:modelValue", checked.value);
    emit("change", checked.value);
    if (checked.value) {
        emit("checked");
    } else {
        emit("unchecked");
    }
};

watch(
    () => props.modelValue,
    (newValue) => (checked.value = newValue),
    { immediate: true }
);
</script>
