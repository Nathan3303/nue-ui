<template>
    <component :is="tag" :class="classes" :style="style">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseFlex, parseSize, parseTheme } from "@nue-ui/utils";
import "../style/text.css";

defineOptions({ name: "NueText" });
const props = withDefaults(
    defineProps<{
        theme?: string | Array<string>;
        tag?: string;
        size?: string | number;
        color?: string;
        decoration?: string;
        weight?: string | number;
        align?: string;
        flex?: string;
    }>(),
    { tag: "span" }
);

const style = computed(() => {
    const { color, decoration, weight, align, size, flex } = props;
    let styleObject: {
        "--flex"?: string;
        "--font-size"?: string | number;
        "--font-color"?: string;
        "--font-weight"?: string | number;
        "--text-decoration"?: string;
        "--text-align"?: string;
    } = {};
    if (size) styleObject["--font-size"] = parseSize(size);
    if (color) styleObject["--font-color"] = color;
    if (weight) styleObject["--font-weight"] = weight;
    if (decoration) styleObject["--text-decoration"] = decoration;
    if (align) styleObject["--text-align"] = align;
    styleObject["--flex"] = parseFlex(flex as string);
    return styleObject;
});

const classes = computed(() => {
    const prefix = "nue-text";
    let list: string[] = [];
    let themeList: string[] = [];
    if (props.theme) themeList = parseTheme(props.theme, prefix);
    list = [prefix, ...themeList];
    return list;
});

defineExpose({ style });
</script>
