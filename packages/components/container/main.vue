<template>
    <main class="nue-main" :style="style">
        <!-- Aside -->
        <div v-if="$slots.aside" class="nue-main__aside">
            <slot name="aside"></slot>
        </div>
        <!-- Divider -->
        <!-- <nue-divider direction="vertical" /> -->
        <!-- Content -->
        <div v-if="$slots.content" class="nue-main__content">
            <slot name="content"></slot>
        </div>
        <!-- Default slot -->
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import { NueDivider } from "../divider";
import type { MainPropsType } from "./types";
import "./main.css";

defineOptions({ name: "NueMain" });

const props = withDefaults(defineProps<MainPropsType>(), {});

const style = computed(() => {
    const { asideWidth } = props;
    return {
        "--aside-width": asideWidth,
        "--content-padding": props.contentPadding,
    };
});
</script>
