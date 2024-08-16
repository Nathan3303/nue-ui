<template>
    <div class="nue-progress" :style="progressStyle">
        <template v-if="type === 'line'">
            <div class="nue-progress--line">
                <div class="nue-progress__outer-bar">
                    <div
                        class="nue-progress__inner-bar"
                        :style="{ width: percentage }">
                        <span v-if="showInnerText">{{ percentage }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="type === 'circle'">
            <svg
                class="nue-progress--circle"
                viewBox="0 0 100 100"
                :style="circleStyles">
                <circle
                    class="nue-progress__outer-path"
                    r="50"
                    cx="50"
                    cy="50"></circle>
                <circle
                    class="nue-progress__inner-path"
                    r="50"
                    cx="50"
                    cy="50"></circle>
            </svg>
        </template>
        <slot v-if="!showInnerText">
            <span class="nue-progress__text">{{ formatter(percentage) }}</span>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isArray } from "@nue-ui/utils";
import type { ProgressEmits, ProgressProps } from "./types";
import "./progress.css";

defineOptions({ name: "NueProgress" });
const props = withDefaults(defineProps<ProgressProps>(), {
    type: "line",
    percentage: 0,
    strokeWidth: 6,
    formatter: (p) => p,
    showInnerText: false,
    scale: 1,
    color: "#7777ff",
});
const emit = defineEmits<ProgressEmits>();

const percentage = computed(() => {
    const { percentage } = props;
    if (percentage < 0) return "0%";
    if (percentage === 100) emit("full");
    if (percentage > 100) return "100%";
    return percentage + "%";
});

const strokeWidth = computed(() => {
    return props.strokeWidth * props.scale + "px";
});

const color = computed<string | undefined>(() => {
    const { type, color } = props;
    switch (type) {
        case "line":
            return isArray(color)
                ? `linear-gradient(to right, ${(color as string[]).join(", ")})`
                : color as string;
        case "circle":
            return isArray(color) ? color[0] : color as string;
        default:
            return void 0;
    }
});

const progressStyle = computed(() => {
    const { type } = props;
    return {
        "--stroke-width": strokeWidth.value,
        "--flex": type === "line" ? "auto" : "none",
        "--inner-bar-background-color": color.value,
    };
});

const strokeDashArray = computed(() => {
    return Math.ceil(2 * Math.PI * 50);
});

const circleStyles = computed(() => {
    return {
        "--circle-size": `${props.scale * 100}px`,
        "--stroke-dash-array": strokeDashArray.value,
        "--stroke-dash-offset": Math.ceil(
            (1 - parseInt(percentage.value) / 100) * strokeDashArray.value
        ),
    };
});
</script>
