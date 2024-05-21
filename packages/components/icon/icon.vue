<template>
    <i :class="classes" :style="styles"></i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconPropsType } from "./types";
import "./icon.css";

defineOptions({ name: "NueIcon" });

const props = withDefaults(defineProps<IconPropsType>(), {});

const classes = computed(() => {
    const { name } = props;
    return ["nue-icon", "iconfont", `icon-${name}`];
});

const styles = computed(() => {
    const { size, color } = props;
    return {
        "--icon-size": size,
        "--icon-color": color,
    };
});
</script>
