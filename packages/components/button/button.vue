<template>
    <button :class="classes" :disabled="disabled" :title="title" :style="style">
        <i v-if="icon || loading" :class="iconClasses"></i>
        <span v-if="$slots.default" class="nue_button__text">
            <slot></slot>
        </span>
        <div v-if="$slots.append" class="nue_button__append">
            <slot name="append"></slot>
        </div>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseTheme, parseFlexProp } from "@nue-ui/utils";
import type { ButtonPropsType } from "./types";
import "./button.css";

defineOptions({ name: "NueButton" });

const props = withDefaults(defineProps<ButtonPropsType>(), {
    shape: "square",
    disabled: false,
    loading: false,
    loadingIcon: "icon-loading",
    align: "center",
    flex: "none",
});

const style = computed(() => {
    const { flex } = props;
    return {
        "--align-y": props.align,
        "--font-size": props.size,
        flex: parseFlexProp(flex),
    };
});

const classes = computed(() => {
    let list: string[] = [];
    let themeList: string[] = [];
    const prefix = "nue-button";
    if (props.theme) themeList = parseTheme(props.theme, prefix);
    list = [prefix, ...themeList];
    list.push(`${prefix}--${props.shape}`);
    if (props.disabled) list.push(`${prefix}--disabled`);
    return list;
});

const iconClasses = computed(() => {
    const list: string[] = ["iconfont"];
    if (props.loading) {
        list.push(props.loadingIcon);
        list.push("loading-icon");
        return list;
    }
    if (props.icon) list.push(props.icon);
    return list;
});
</script>
