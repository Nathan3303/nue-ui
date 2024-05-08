<template>
    <div :class="classes">
        <slot></slot>
        <component
            :is="$slots.default ? 'sup' : 'span'"
            v-if="!hidden && (content || dot)"
            v-text="content"
            class="badge-content"></component>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseTheme, isString } from "@nue-ui/utils/";
import "../style/badge.css";

defineOptions({ name: "NueBadge" });

const props = withDefaults(
    defineProps<{
        theme?: string | string[];
        value?: string | number;
        max?: number;
        hidden?: boolean;
        dot?: boolean;
    }>(),
    {
        theme: "default",
        hidden: false,
        dot: false,
    }
);

const classes = computed(() => {
    const prefix = "nue-badge";
    let list: string[] = [prefix, ...parseTheme(props.theme, prefix)];
    if (props.dot) list.push(`${prefix}--dot`);
    return list;
});

const content = computed(() => {
    if (props.dot) return "";
    if (isString(props.value) && !props.max) return props.value;
    if ((props.value as number) > props.max!) return `${props.max}+`;
    return props.value;
});
</script>
