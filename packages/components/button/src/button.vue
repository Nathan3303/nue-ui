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
import { type ShapeProp } from "@nue-ui/utils/types";
import "../style/button.css";

defineOptions({
    name: "NueButton",
});

const props = withDefaults(
    defineProps<{
        theme?: string | string[];
        shape?: ShapeProp;
        icon?: string;
        disabled?: boolean;
        loading?: boolean;
        loadingIcon?: string;
        title?: string;
        align?: string;
        flex?: string;
        size?: string;
    }>(),
    {
        shape: "square",
        disabled: false,
        loading: false,
        loadingIcon: "icon-loading",
        align: "center",
        flex: "none",
    }
);

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
    const list: string[] = [];
    list.push("iconfont");
    if (props.loading) {
        list.push(props.loadingIcon);
        list.push("loading-icon");
        return list;
    }
    if (props.icon) list.push(props.icon);
    return list;
});
</script>
