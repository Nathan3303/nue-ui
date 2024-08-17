<template>
    <div class="nue-switch" :class="classes" @click.stop="handleClick">
        <div class="nue-switch__circle"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { parseTheme } from "@nue-ui/utils";
import type { NueSwitchProps, NueSwitchEmits } from "./types";
import "./switch.css";

defineOptions({ name: "NueSwitch" });
const props = withDefaults(defineProps<NueSwitchProps>(), {
    disabled: false,
    theme: "default",
});
const emit = defineEmits<NueSwitchEmits>();

const state = ref(false);

const classes = computed(() => {
    const { size, theme } = props;
    const list: string[] = [];
    const prefix = "nue-switch";
    list.push(prefix);
    if (theme) list.concat(parseTheme(theme, prefix));
    if (state.value) list.push("nue-switch--actived");
    if (size) list.push(`nue-switch--${size}`);
    return list;
});

const handleClick = () => {
    state.value = !state.value;
    emit("update:modelValue", state.value);
};

watch(
    () => props.modelValue,
    (newValue) => (state.value = newValue),
    { immediate: true }
);
</script>
