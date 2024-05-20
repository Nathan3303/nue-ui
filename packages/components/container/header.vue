<template>
    <header class="nue-header" :style="styles">
        <!-- Logo -->
        <div class="item item-logo" v-if="$slots.logo">
            <slot name="logo"></slot>
        </div>
        <!-- Navigation -->
        <div class="item item-navigators" v-if="$slots.nav">
            <slot name="nav"></slot>
        </div>
        <!-- Default slot -->
        <slot></slot>
        <!-- Operation -->
        <div class="item item-operations" v-if="$slots.ops">
            <slot name="ops"></slot>
        </div>
        <!-- User -->
        <div class="item item-user" v-if="$slots.user">
            <slot name="user"></slot>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { HeaderPropsType } from "./types";
import "./header.css";

defineOptions({ name: "NueHeader" });

const props = withDefaults(defineProps<HeaderPropsType>(), {});

const styles = computed(() => {
    const { height, paddingX } = props;
    return {
        "--height": height,
        "--padding-x": paddingX,
    };
});
</script>
