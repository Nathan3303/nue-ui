<template>
    <div :class="classes" :style="style">
        <div class="nue-divider__line"></div>
        <div class="nue-divider__text" v-if="$slots.default || text">
            <span class="nue-divider__text__inner">
                <slot>{{ text }}</slot>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "../style/divider.css";

defineOptions({ name: "NueDivider" });

const props = withDefaults(
    defineProps<{
        direction?: "horizontal" | "vertical";
        text?: string;
        borderType?: "solid" | "dashed" | "dotted";
        borderWidth?: string;
        borderColor?: string;
        align?: "start" | "center" | "end";
    }>(),
    {
        direction: "horizontal",
        borderType: "solid",
        borderWidth: "1px",
        borderColor: "#e5e5e5",
        align: "start",
    }
);

const classes = computed(() => {
    const prefix = "nue-divider";
    let list: string[] = [prefix];
    list.push(`${prefix}--${props.direction}`);
    return list;
});

const style = computed(() => {
    let styleObject: { [key: string]: string } = {};
    const { borderType, borderWidth, borderColor, align } = props;
    if (borderType !== "solid") styleObject["--border-type"] = borderType;
    if (borderWidth !== "1px") styleObject["--border-width"] = borderWidth;
    if (borderColor !== "#e5e5e5") styleObject["--border-color"] = borderColor;
    if (align !== "start") styleObject["--justify-content"] = align;
    return styleObject;
});
</script>
