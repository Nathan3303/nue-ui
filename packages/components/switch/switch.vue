<template>
    <div :class="classes" @click.stop="handleClick" ref="switchRef">
        <div class="nue-switch__circle">
            <nue-icon
                class="nue-switch__loading-icon"
                v-if="loading"
                name="loading"
                spin></nue-icon>
        </div>
        <div class="nue-switch__text" v-if="showText">
            <slot>{{ state ? activeText : inactiveText }}</slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { parseTheme } from "@nue-ui/utils";
import { isFunction } from "lodash-es";
import { NueIcon } from "../icon";
import type { NueSwitchProps, NueSwitchEmits } from "./types";
import "./switch.css";

defineOptions({ name: "NueSwitch" });
const props = withDefaults(defineProps<NueSwitchProps>(), {
    disabled: false,
    showText: false,
    loading: false,
    activeText: "I",
    inactiveText: "O",
});
const emit = defineEmits<NueSwitchEmits>();

const state = ref(false);
const switchRef = ref<HTMLDivElement>();

const classes = computed(() => {
    const { size, theme, disabled } = props;
    let list: string[] = [];
    const prefix = "nue-switch";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (state.value) list.push(`${prefix}--actived`);
    if (size) list.push(`${prefix}--${size}`);
    if (disabled) list.push(`${prefix}--disabled`);
    return list;
});

const handleClick = async () => {
    const { loading, disabled, beforeSwitch } = props;
    if (loading || disabled) return;
    if (isFunction(beforeSwitch)) {
        try {
            const result = await beforeSwitch(state.value);
            if (!result) return;
        } catch (error) {
            return;
        }
    }
    handleSwitch();
};

const handleSwitch = () => {
    state.value = !state.value;
    handleSetStateWidth();
    emit("update:modelValue", state.value);
    emit("change", state.value);
};

const handleSetStateWidth = () => {
    const cw = switchRef.value?.clientWidth;
    switchRef.value?.style.setProperty("--state-width", `${cw}px`);
};

watch(
    () => props.modelValue,
    (newValue) => {
        state.value = newValue;
        handleSetStateWidth();
    },
    { immediate: true }
);
</script>
