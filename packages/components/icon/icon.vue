<template>
    <i :class="classes" :style="styles">
        <slot></slot>
    </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseTheme } from "@nue-ui/utils";
import type { IconPropsType } from "./types";
import "./icon.css";

defineOptions({ name: "NueIcon" });

const props = withDefaults(defineProps<IconPropsType>(), {
    spin: false,
});

const classes = computed(() => {
    const prefix = "nue-icon";
    const { name, spin, theme } = props;
    let themeClasses: string[] = [];
    if (theme) themeClasses = parseTheme(theme, prefix);
    return [
        prefix,
        "iconfont",
        `icon-${name}`,
        { "nue-icon--spin": spin },
        ...themeClasses,
    ];
});

const styles = computed(() => {
    const { size, color, spinSpeed } = props;
    return {
        "--icon-size": size,
        "--icon-color": color,
        "--spin-speed": spinSpeed,
    };
});
</script>
