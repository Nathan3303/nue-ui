<template>
    <component :is="tag" :class="classes" :style="style">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseFlex, parseTheme } from "@nue-ui/utils";
import type { TextProps } from "./types";
import { TEXT_SIZE_VALUES } from "./constants";
import "./text.css";

defineOptions({ name: "NueText" });

const props = withDefaults(defineProps<TextProps>(), {
    tag: "span",
});

const size = computed(() => {
    const { size } = props;
    if (!size) return null;
    const isPresetValue = TEXT_SIZE_VALUES[size];
    return isPresetValue ? isPresetValue : size;
});

const style = computed(() => {
    const { color, decoration, weight, align, flex } = props;
    return {
        "--color": color,
        "--font-size": size.value,
        "--font-weight": weight,
        "--text-decoration": decoration,
        "--text-align": align,
        "--flex": parseFlex(flex as string),
    };
});

const classes = computed(() => {
    const prefix = "nue-text";
    let list: string[] = [];
    let themeList: string[] = [];
    if (props.theme) themeList = parseTheme(props.theme, prefix);
    list = [prefix, ...themeList];
    return list;
});
</script>
