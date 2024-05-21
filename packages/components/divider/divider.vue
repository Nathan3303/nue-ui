<template>
    <div :class="classes" :style="styles">
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
import type { DividerPropsType } from "./types";
import "./divider.css";

defineOptions({ name: "NueDivider" });

const props = withDefaults(defineProps<DividerPropsType>(), {
    direction: "horizontal",
    vertical: false,
});

const classes = computed(() => {
    const prefix = "nue-divider";
    const { direction } = props;
    let list: string[] = [prefix];
    list.push(`${prefix}--${direction}`);
    return list;
});

const styles = computed(() => {
    const { borderType, borderWidth, borderColor, align } = props;
    return {
        "--border-width": borderWidth,
        "--border-type": borderType,
        "--border-color": borderColor,
        "--justify-content": align,
    };
});
</script>
