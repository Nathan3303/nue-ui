<template>
    <section class="nue-container" :id="id" :style="styles">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ContainerPropsType } from "./types";
import { generateId } from "@nue-ui/utils";
import "./container.css";

defineOptions({ name: "NueContainer" });

const props = withDefaults(defineProps<ContainerPropsType>(), {
    id: generateId(),
});

const styles = computed(() => {
    const { height, width, paddingX } = props;
    return {
        "--height": height,
        "--width": width,
        "--padding-x": paddingX,
    };
});
</script>
